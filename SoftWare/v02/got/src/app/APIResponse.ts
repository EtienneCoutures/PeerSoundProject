import { Playlist } from './playlist/playlist'

export class APIResponse {
  code: number;
  errors: {message: string[]};
  info: {message: string};
  Playlist?: Playlist[];
}
