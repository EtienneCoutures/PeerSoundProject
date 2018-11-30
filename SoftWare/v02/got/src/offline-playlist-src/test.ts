import { OfflinePlaylist } from './offline-playlist'
import { OfflinePlaylistHeader } from './offline-playlist-header'
import { MusicEntry } from './music-entry'
import * as fs from 'fs'

export class Test {

  _playlist: OfflinePlaylist = new OfflinePlaylist()
  _header: OfflinePlaylistHeader = null

  test1(): void {
    this._playlist.open('./', 'test1.psp', true).then(() => {

      this._header = this._playlist.header

      console.assert(this._header.addMusic('none', 5, '1', false, false), '1')
      console.assert(this._header.addMusic('none', 2, '2', false, false), '2')
      console.assert(this._header.addMusic('none', 10, '3', false, false), '3')
      console.assert(this._header.addMusic('none', 7, '4', false, false), '4')
      console.assert(!this._header.addMusic('none', 7, '4', false, false), '5')

      console.assert(this._header.getMusicByPos(1) == undefined, '6')
      console.assert(this._header.getMusicByPos(10) != undefined, '7')
      console.assert(this._header.getMusicByPos(20) == undefined, '8')

      console.assert(this._header.getMusicByName('4') != undefined, '9')
      console.assert(this._header.getMusicByName('unknown') == undefined, '10')

      console.assert(this._header.delMusicByPos(2), '11')
      console.assert(this._header.delMusicByName('4'), '12')

      console.assert(this._header.getMusicByPos(2) == undefined, '13')
      console.assert(this._header.getMusicByName('4') == undefined, '14')

      console.log(this._header.toString())

      console.assert(this._header.setMusicPos(5, 10))
      console.assert(this._header.setMusicPos(10, 5))
      console.assert(this._header.setMusicPos(1, 8) == false)
      console.assert(this._header.switchMusicPos(5, 10))
      console.assert(this._header.switchMusicPos(10, 5))

      this._playlist.save().then(() => {
        var tmp = new OfflinePlaylist()

        tmp.open('./', 'test1.psp').then(() => {
          console.log(tmp.header.toString())

          tmp.addMusicFile('./src/offline-playlist-src/music1.flac', 0, 'music1').then(() => {
            tmp.on('psp-packing', (data) => {
              console.log('packing', data)
            })
            tmp.save().then(() => {
              tmp.extractMusicFile('./', 0, 'test1').then(() => {
                tmp.deleteFile()
              })
            })
          })

          this._playlist = null
          this._header = null
        })
      })
    })
  }
}
