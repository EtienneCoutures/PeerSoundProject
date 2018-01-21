define([
    './controllers/initModule',
    './controllers/siteModule',
    './controllers/musicModule',
    './controllers/userModule',
    './controllers/playlistModule'
], function(){
    return [
        'initModule',
        'siteModule',
        'musicModule',
        'userModule',
        'playlistModule'
    ];
});
