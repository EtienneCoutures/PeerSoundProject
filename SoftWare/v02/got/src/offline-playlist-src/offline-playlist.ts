import * as XmlBuilder from 'xmlbuilder'
import { OfflinePlaylistHeader } from './offline-playlist-header'
import { MusicEntry } from './music-entry'
import * as Const from './constants'
import * as Zip from 'jszip'
import * as fs from 'fs'
import * as path from 'path'
import * as EventEmitter from 'events'

export class OfflinePlaylist extends EventEmitter {

  private _zip: Zip = new Zip()
  private _header: OfflinePlaylistHeader = new OfflinePlaylistHeader()
  private _filepath: string = ''
  private _musicFolderName = 'musics/'
  private _isOpening: boolean = false
  private _isOpened: boolean = false
  _interval: any = null

  constructor() {
    super()
  }

  private genMusFilename(len: number): string {
    var res = '',
        possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i=0; i<len; i++)
      res += possible.charAt(Math.floor(Math.random() * possible.length))
    return res
  }

  private isFileExtOk(ext: string): boolean {
    return Const.VALEXT.find((validExt) => {
      return ext == ('.' + validExt)
    })
  }

  create(filepath: string, playlistName: string): void {
    this._filepath = filepath
    this._header.name = playlistName
  }

  open(dest: string, filename: string, autocreate: boolean = false): Promise<any> {
    this._isOpening = true
    return new Promise((resolve, reject) => {
      this.processOpening(dest, filename, autocreate).then(() => {
        this._isOpened = true
        this._isOpening = false
        resolve()
      }, (err) => {
        this._isOpened = this._isOpening = false
        reject(err)
      })
    })
  }

  private processOpening(dest: string, filename: string, autocreate: boolean = false): Promise<any> {
    return new Promise((resolve, reject) => {
      var self = this
      var filepath = ''
      var ext = path.extname(filename).toLowerCase()
      var basename = path.basename(filename, ext)

      if (basename == '')
        reject('Name given is empty')

      if (ext == '')// if no file extention given -> add default one
        ext = '.' + Const.FILEXT

      filepath = dest + basename + ext
      if (filepath === self._filepath) { // if file already open -> resolve
        resolve('file already opened')
      }
      if (!self.isFileExtOk(ext)) // check file extention
        reject('Can\'t open file : File extention must be .' + Const.FILEXT + ' !')

      if (!fs.existsSync(filepath)) { // if file doesn't exist
        if (autocreate) { // if param given -> auto-create new file & resolve
          self.create(filepath, basename)
          resolve()
        }
        else { // file not found
          reject('No such file, open \'' + filepath + '\'')
        }
      }

      fs.readFile(filepath, (err, data) => { // read header
          if (err)
            reject(err)
          Zip.loadAsync(data).then((zip) => {
            self._zip = zip

            if (!self._zip.file('header.xml'))
              reject('File corrupted : Header missing !')

            self._zip.file('header.xml').async('string').then(function (data) {
              self._filepath = filepath
              self._header.clear()
              // setTimeout(() => {
                self._header.load(data).then(() => { // load header data
                  resolve()
                }, (err) => {
                  reject('File corrupted : ' + err)
                })
              // }, 3000)
            },
            (err) => { // file().async() fail
              reject(err)
            })
          },
          (err) => { // loadAsync()
            reject(err)
          })
      })
    })
  }

  save(): Promise<any> {
    var self = this
    return new Promise((resolve, reject) => {
      // if (!self._header.changes) // rien a été modifié
      //   resolve()

      if (self._filepath) {
        self._zip.file('header.xml', self._header.toString()); // add header

        self._zip.generateNodeStream({streamFiles : true}, function progress(metadata) {
          self.emit('psp-packing', metadata.percent)
        }).pipe(fs.createWriteStream(self._filepath)).on('finish', () => {
          resolve()
        }).on('error', (err) => {
          // ici backup de la file en cas d'echec
          reject(err)
        })
      }
      else {
        reject('No .' + Const.FILEXT + ' file loaded yet : Use create(filepath, playlistName) or open(filepath [, autocreate]) first !')
      }
    })
  }

  deleteFile(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this._filepath)
        reject('deleteFile failed : No opened file')

      fs.unlink(this._filepath, (err) => {
        if (err)
          reject(err)
        resolve()
      })
    })
  }

  addMusicFile(filepath: string, pos: number, name: string, insert: boolean = true): Promise<any> {
    var filename = this.genMusFilename(10) + path.extname(filepath),
        self = this

    return new Promise((resolve, reject) => {
      var contentPromise = new Zip.external.Promise(function (resolve, reject) {
        fs.readFile(filepath, function(err, data) {
          if (err)
            reject(err)
          console.log('insert', insert)
          if (self._header.addMusic(filename, pos, name, insert, true) == false) {
            // console.log('1 ->', (self._header.getMusicByPos(pos)._isInFile == false))
            // console.log('2 ->', (self._header.getMusicByPos(pos)._isInFile === false))
            // console.log('3 ->', (self._header.getMusicByPos(pos)._isInFile == true))
            // console.log('4 ->', (self._header.getMusicByPos(pos)._isInFile === true))
            // console.log('4 ->', (self._header.getMusicByPos(pos)._isInFile == 'false'))
            // console.log('4 ->', (self._header.getMusicByPos(pos)._isInFile === 'false'))
            // console.log(' 5 ->', self._header.getMusicByPos(pos)._isInFile)
            if (self._header.getMusicByPos(pos)._isInFile == 'false') {
              console.log('ici c\'est cool')
              self._header.getMusicByPos(pos).isInFile = true
            } else {
              console.log('6->', self._header.getMusicByPos(pos))
              reject('Can\'t add music "' + name + '" : Already in the playlist !')
            }
          }
          resolve(data)
        });
      });

      contentPromise.then(function(data) {
        self._zip.folder(self._musicFolderName).file(filename, data)
        resolve()
      },
      (err) => {
        reject(err)
      });
    })
  }

  extractMusicFile(filepath: string, pos: number, outputName: string = null): Promise<any> {
    var metadata = this._header.getMusicByPos(pos),
        self = this

    return new Promise((resolve, reject) => {
      if (outputName && path.extname(outputName) === '') // if no extention on given output name -> add default one
        outputName = outputName + path.extname(metadata.filename)

      outputName = outputName || metadata.filename

      self._zip.folder(this._musicFolderName).file(metadata.filename).async('nodebuffer').then(function (data) {
        fs.writeFile(filepath + outputName, data, (err) => {
          if (err)
            reject(err);
          resolve(metadata.filename);
        });
      }, (err) => {
        reject(err);
      });
    });
  }

  delMusicByPos(pos: number): void {
    var music = this._header.getMusicByPos(pos)
    if (music)
      this._zip.remove(this._musicFolderName + music.filename)
    this._header.delMusicByPos(pos)
  }

  delMusicByName(name: string): void {
    var music = this._header.getMusicByName(name)
    if (music)
      this._zip.remove(this._musicFolderName + music.filename)
    this._header.delMusicByName(name)
  }

  setMusicPos(curPos: number, newPos: number): void {
    this._header.setMusicPos(curPos, newPos)
  }

  getMusicMetadataByPos(pos: number): MusicEntry {
    return this._header.getMusicByPos(pos)
  }

  getMusicMetadataByName(name: string): MusicEntry {
    return this._header.getMusicByName(name)
  }

  getMusicsMetadata(from: number = 0, to: number = null): MusicEntry[] {
    return this._header.getMusics(from, to)
  }

  get name(): string {
    return this._header.name
  }

  set name(val: string) {
    this._header.name = val
  }

  get header(): OfflinePlaylistHeader {
    return this._header
  }

  get isOpening(): boolean {
    return this._isOpening
  }

  get isOpened(): boolean {
    return this._isOpened
  }
}
