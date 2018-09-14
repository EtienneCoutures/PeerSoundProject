/**
 * @api {get} /music/:id Read all music of a User
 * @apiVersion 1.0.0
 * @apiName Getmusic
 * @apiGroup music
 * @apiPermission user
 *
 *
 * @apiParam {Number} id The Users-ID music.
 *
 * @apiExample Example usage:
 * curl -i http://localhost/music/1
 *
 * @apiSuccess {Number}       id                    The music-ID.
 * @apiSuccess {Number}       usr_id                    user id music.
 * @apiSuccess {datetime}    date                   music-datetime.
 * @apiSuccess {String}      music_name             name of music.
 * @apiSuccess {String}      music_description      description of the music.
 * @apiSuccess {String}      music_comment          description of the music.
 * @apiSuccess {Enum}      music_source           source of the music(youtube, spotify, soundcloud).
 * @apiSuccess {String}      music_group            group of the music.
 * @apiSuccess {Number}      duration               duration of the music.
 * @apiSuccess {enum}      invited_role             user role of the playlist.
 *
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiError UserNotFound   The <code>id</code> of the User was not found.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401 Not Authenticated
 *     {
 *       "error": "NoAccessRight"
 *     }
 */
function Getmusic() { return; }

/**
 * @api {post} /music Create a new music
 * @apiVersion 1.0.0
 * @apiName Postmusic
 * @apiGroup music
 * @apiPermission none
 *
 * @apiDescription In this case "apiErrorStructure" is defined and used.
 * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 *
 * @apiParam {String} name Name of the User invited.
 *
 * @apiSuccess {Number} id         The new Users-ID music.
 *
 * @apiUse CreatemusicError
 */
function postmusic() { return; }

/**
 * @api {put} /music/:id Change a User
 * @apiVersion 1.0.0
 * @apiName Putmusic
 * @apiGroup music
 * @apiPermission none
 *
 * @apiDescription This function has same errors like POST /music, but errors not defined again, they were included with "apiErrorStructure"
 *
 * @apiParam {String} name Name of themusicer.
 *
 * @apiUse CreatemusicError
 */
function putmusic() { return; }
