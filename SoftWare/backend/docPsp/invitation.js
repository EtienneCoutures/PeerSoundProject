/**
 * @api {get} /invitation/:id Read all invitation of a User
 * @apiVersion 1.0.0
 * @apiName GetInvitation
 * @apiGroup invitation
 * @apiPermission user
 *
 *
 * @apiParam {Number} id The Users-ID invitation.
 *
 * @apiExample Example usage:
 * curl -i http://localhost/invitation/1
 *
 * @apiSuccess {Number}       id                    The Users-ID.
 * @apiSuccess {datetime}    date                   invatation-datetime.
 * @apiSuccess {datetime}    update                   invatation-uptedate.
 * @apiSuccess {Number}      inviter_usr_id         id of the User invite.
 * @apiSuccess {Number}      invited_usr_id         id of the User invite.
 * @apiSuccess {Number}      playlist_id            id of the playlist.
 * @apiSuccess {enum}      invited_role            user role of the playlist.
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
function Getinvitation() { return; }

/**
 * @api {post} /invitation Create a new invitation
 * @apiVersion 1.0.0
 * @apiName Postinvitation
 * @apiGroup invitation
 * @apiPermission none
 *
 * @apiDescription In this case "apiErrorStructure" is defined and used.
 * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 *
 * @apiParam {String} name Name of the User invited.
 *
 * @apiSuccess {Number} id         The new Users-ID invitation.
 *
 * @apiUse CreateInvitationError
 */
function postinvitation() { return; }

/**
 * @api {put} /invitation/:id Change a User
 * @apiVersion 1.0.0
 * @apiName Putinvitation
 * @apiGroup invitation
 * @apiPermission none
 *
 * @apiDescription This function has same errors like POST /invitation, but errors not defined again, they were included with "apiErrorStructure"
 *
 * @apiParam {String} name Name of theinvitationer.
 *
 * @apiUse CreateinvitationError
 */
function putinvitation() { return; }
