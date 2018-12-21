import { MusicEntry } from '../../offline-playlist-src/music-entry'
import { PlaylistService } from '../playlist/playlist.service'


export class Music {
  music_id?: number;
  music_name?: string;
  music_description?: string = 'unknown';
  music_comment?: string = 'unknown';
  music_picture_default?: string;
  music_insert?: string;
  music_update?: string;
  music_source?: string;
  music_group?: string = 'unknown';
  music_url?: string = 'unknown';
  music_date?: string = 'unknown';
  usr_id?: string;
  duration?: string;
  isOfflineAvailable?: boolean = false;
  isDownloading?: boolean = false;
  dlProgress?: number = 0;
  isLocalFile?: boolean = false
  isExtractedPromise?: Promise<any>

  constructor(id=0, name='', desc='', com='', pict='', insert='', update='',
              src='', group='', url='', date='', usr_id='', duration='') {
    this.music_id = id
    this.music_name = name
    this.music_description = desc
    this.music_comment = com
    this.music_picture_default = pict
    this.music_insert = insert
    this.music_update = update
    this.music_source = src
    this.music_group = group
    this.music_url = url
    this.music_date = date
    this.usr_id = usr_id
    this.duration = duration
  }

  static getMusFromMusicEntry(mus: any, url: string = null, src: string) {
    var res: Music = new Music()

    res.music_name = mus._name
    res.music_url = url
    res.music_source = src
    res.isOfflineAvailable = (mus._isInFile == 'true' ? true : false)
    res.isLocalFile = true
    return (res)
  }

  static getMusFromMusicLink(musLink: any) {
      var res: Music = new Music()

      res = musLink.Music
      return (res)
  }
}
