/**
 * @api {get} /musiclink/:id Read all musiclink of a User
 * @apiVersion 1.0.0
 * @apiName Getmusiclink
 * @apiGroup musiclink
 * @apiPermission user
 *
 *
 * @apiParam {Number} id The Users-ID musiclink.
 *
 * @apiExample Example usage:
 * curl -i http://localhost/musiclink/1
 *
 * @apiSuccess {Number}       id                    The musiclink-ID.
 * @apiSuccess {datetime}    date                   musiclink-datetime.
 * @apiSuccess {String}      music_id             id of music.
 * @apiSuccess {String}      playlist_id          playlist of music.
 * @apiSuccess {String}      user_id              id of user.
 * @apiSuccess {Number}      musiclink_update     date when music is update.
 * @apiSuccess {Number}      musiclink_create     date when music is create.
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
function Getmusiclink() { return; }

/**
 * @api {post} /musiclink Create a new musiclink
 * @apiVersion 1.0.0
 * @apiName Postmusiclink
 * @apiGroup musiclink
 * @apiPermission none
 *
 * @apiDescription In this case "apiErrorStructure" is defined and used.
 * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 *
 * @apiParam {String} link music whith all link (playlist, user, music).
 *
 * @apiSuccess {Number} id         The new Users-ID musiclink.
 *
 * @apiUse CreatemusiclinkError
 */
function postmusiclink() { return; }

/**
 * @api {put} /musiclink/:id Change a User
 * @apiVersion 1.0.0
 * @apiName Putmusiclink
 * @apiGroup musiclink
 * @apiPermission none
 *
 * @apiDescription This function has same errors like POST /musiclink, but errors not defined again, they were included with "apiErrorStructure"
 *
 * @apiParam {String} name Name of themusiclinker.
 *
 * @apiUse CreatemusiclinkError
 */
function putmusiclink() { return; }
