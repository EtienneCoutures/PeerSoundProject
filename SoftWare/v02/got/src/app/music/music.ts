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
  isDownloading?: boolean;
  dlProgress?: number;
  isLocalFile?: boolean = false;

  constructor(mus: MusicEntry, url: string = null, src: string) {
    this.music_id = mus._pos
    this.music_name = mus._name
    this.isOfflineAvailable = (mus._isInFile == 'true' ? true : false)
    this.music_url = url
    this.isDownloading = false
    this.dlProgress = 0
    this.music_source = src
    this.isLocalFile = true
  }
}
