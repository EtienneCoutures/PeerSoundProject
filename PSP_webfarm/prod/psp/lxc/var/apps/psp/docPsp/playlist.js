/**
 * @api {get} /playlist/:id Read all playlist of a User
 * @apiVersion 1.0.0
 * @apiName Getplaylist
 * @apiGroup playlist
 * @apiPermission user
 *
 *
 * @apiParam {Number} id The Users-ID playlist.
 *
 * @apiExample Example usage:
 * curl -i http://localhost/playlist/1
 *
 * @apiSuccess {Number}       playlist_id              The playlist-ID.
 * @apiSuccess {datetime}    date                      playlist-datetime.
 * @apiSuccess {String}      playlist_name             name of playlist.
 * @apiSuccess {Enum}        playlist_style            style  of playlist.
 * @apiSuccess {String}      playlist_description      description of the playlist.
 * @apiSuccess {String}      playlist_comment          comment of the playlist.
 * @apiSuccess {Number}      playlist_creator           id of user creator.
 * @apiSuccess {String}      playlist_update            group of the playlist.
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
function Getplaylist() { return; }

/**
 * @api {post} /playlist Create a new playlist
 * @apiVersion 1.0.0
 * @apiName Postplaylist
 * @apiGroup playlist
 * @apiPermission none
 *
 * @apiDescription In this case "apiErrorStructure" is defined and used.
 * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 *
 * @apiParam {String} name Name of the User invited.
 *
 * @apiSuccess {Number} id         The new Users-ID playlist.
 *
 * @apiUse CreateplaylistError
 */
function postplaylist() { return; }

/**
 * @api {put} /playlist/:id Change a User
 * @apiVersion 1.0.0
 * @apiName Putplaylist
 * @apiGroup playlist
 * @apiPermission none
 *
 * @apiDescription This function has same errors like POST /playlist, but errors not defined again, they were included with "apiErrorStructure"
 *
 * @apiParam {String} name Name of theplaylister.
 *
 * @apiUse CreateplaylistError
 */
function putplaylist() { return; }
