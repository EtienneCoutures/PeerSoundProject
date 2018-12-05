import * as XmlBuilder from 'xmlbuilder'
import * as xml2js from 'xml2js'
import { MusicEntry } from './music-entry'

export class OfflinePlaylistHeader {

  private _playlistName: string = ''
  private _musics: MusicEntry[] = []
  private _changes = false

  constructor() {

  }

  load(data: any) : Promise<any> {
    return new Promise((resolve, reject) => {

      var parser = new xml2js.Parser()
      var self = this

      parser.parseString(data, function(err, res) {
        if (err || !res.root || !res.root.$ || !res.root.musics)
          reject('Header corrupted')

        self._playlistName = res.root.$.name
        if (res.root.musics[0]) {
          res.root.musics[0].music.forEach(function(music, index, array) {
            music = music.$
            self.addMusic(music.filename, music.pos, music.name, false, music.isInFile, music._source)
          });
        }
        resolve()
      })
    })
  }

  clear(): void {
    this._musics.length = 0
    this._playlistName = ''
  }

  addMusic(filename: string, pos: number, name: string, insert: boolean = true, isInFile: boolean = false, source: string = 'local'): boolean {
    if (this.getMusicByName(name) && !insert) {
      // console.log('from addmus : ret err')
      return false
    }
    // console.log('????')
    var music = new MusicEntry(pos, name, filename, isInFile)
    if (insert)
      this._musics.splice(pos, 0, music)
    else
      this._musics[pos] = music
    this._changes = true
    return true
  }

  delMusicByPos(pos: number): boolean {
    if (!this._musics[pos])
      return false
    this._musics[pos] = undefined

    this._changes = true
    return true
  }

  delMusicByName(name: string) : boolean {
    var index
    var music = this._musics.find((elem, i, array) => {
      index = i
      if (elem)
        return elem.name == name
    })

    if (!music)
      return false

    this.delMusicByPos(index)
    return true
  }

  setMusicPos(curPos: number, newPos: number): boolean {
    if (!this._musics[curPos])
      return false

    if (curPos == newPos)
      return true

    if (curPos < newPos)
      newPos -= 1

    var music = this._musics.splice(curPos, 1)[0]
    this._musics.splice(newPos, 0, music)

    this._changes = true
    return true
  }

  switchMusicPos(pos1: number, pos2: number): boolean {
    if (!this.setMusicPos(pos1, pos2))
      return false
    return this.setMusicPos(pos1 > pos2 ? pos2 + 1 : pos2, pos1)
  }

  getMusicByPos(pos: number): MusicEntry {
    return this._musics[pos]
  }

  getMusicByName(name: string): MusicEntry {
    return this._musics.find((music) => {
      if (music)
        return music.name == name
    })
  }

  getMusics(from: number = 0, to: number = null): MusicEntry[] {
    from = from
    to = to || this._musics.length
    return this._musics.slice(from, to)
  }

  get name(): string {
    return this._playlistName
  }

  set name(val: string) {
    this._playlistName = val
    this._changes = true
  }

  get changes(): boolean {
    return this._changes
  }

  toXml(): any {
    var xml = XmlBuilder.create('root').att('name', this._playlistName).ele('musics')
    var i = 0
    this._musics.forEach(function(music) {
      if (music) {
        xml.importDocument(music.toXml(i));
        i += 1
      }
    })
    return xml.root()
  }

  toString(): string {
    return this.toXml().doc().end().toString({ pretty:true })
  }
}
