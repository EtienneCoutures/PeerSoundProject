import { MusicEntry } from '../../offline-playlist-src/music-entry'
import { PlaylistService } from '../playlist/playlist.service'

export class Music {
  music_id?: number;
  music_name?: string;
  music_description?: string;
  music_comment?: string;
  music_picture_default?: string;
  music_insert?: string;
  music_update?: string;
  music_source?: string;
  music_group?: string;
  music_url?: string;
  music_date?: string;
  usr_id?: string;
  duration?: string;
  isOfflineAvailable?: boolean;
  isDownloading?: boolean;
  dlProgress?: number;

  constructor(mus: MusicEntry, url: string = null) {
    this.music_id = mus._pos
    this.music_name = mus._name
    this.isOfflineAvailable = mus._isInFile
    console.log('cul', mus._isInFile)
    this.music_url = url
    this.isDownloading = false
    this.dlProgress = 0
  }
}
