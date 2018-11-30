var { app, BrowserWindow, ipcMain } = require('electron')
var fs = require('fs');
// const { PerformanceObserver, performance } = require('perf_hooks');
// const async_hooks = require('async_hooks');

var time = 0.0

function timeup() {
  time += 0.015
}

setInterval(timeup, 15)

// var ElectronOnline = require('electron-online')

var mainWindow = BrowserWindow.getFocusedWindow()
// var Downloader = require('./music-downloader')
//
// var downloader = new Downloader(mainWindow)

var PspFile = require('./offline-playlist')

var pspFilePath = './'
var pspFiles = {}
var pspFile = new PspFile()


// const obs = new PerformanceObserver((items) => {
//   console.log(items.getEntries()[0].duration);
//   performance.clearMarks();
// });
// obs.observe({ entryTypes: ['measure'] });

// performance.mark('A');

// doSomeLongRunningProcess(() => {
//   performance.mark('B');
//   performance.measure('A to B', 'A', 'B');
// });

// function open(i, max) {
//   return new Promise((resolve, reject) => {
//
//     if (i >= max) {
//       console.log(i)
//       resolve()
//     }
//     else {
//       pspFile.addMusic('./music' + (i + 1) + '.flac', 1, 'brassens ' + i).then(() => {
//         addMusics(i+1, max).then(() => {
//           resolve()
//         }, (err) => {
//           reject('err 1')
//         })
//       }, (err) => {
//         reject(err)
//       })
//     }
//   })
// }

function addMusics(i, max, file, id) {
  return new Promise((resolve, reject) => {

    if (i >= max) {
      resolve()
    }
    else {
      file.addMusic('./music1.flac', i, 'brassens ' + (id * max + i)).then(() => {
        addMusics(i+1, max, file, id).then(() => {
          resolve()
        }, (err) => {
          reject('err 1')
        })
      }, (err) => {
        reject(err)
      })
    }
  })
}

time = 0
for (let i=0; i!=1; i++) {
  pspFiles[i] = new PspFile()

  pspFiles[i].open('test' + i + '.psp', true).then(() => {
    console.log('' + i + ': open', time)

    addMusics(0, 10, pspFiles[i], i).then(() => {
      console.log('' + i + ': addMusic', time)

      pspFiles[i].save().then(() => {
        console.log('' + i + ': save', time)
        pspFiles[i].addMusic('./music2.flac', 1000, 'brassens1000').then(() => {
          pspFiles[i].save().then(() => {
            console.log('' + i + ': save2', time)
          })
        })
        // var tmp = new PspFile()
        // tmp.open('test.psp').then(() => {
        //   console.log('time: ', time)
        // })
      })
    }, (err) => {
      console.log(err)
    })
  })
}






// var connection = new ElectronOnline()
// var isAppOnline = false




// class OfflinePlaylistHandler {
//     constructor() {
//
//     }
//
//     changePspFile(name) {
//       if (!pspFiles[name])
//         pspFiles[name] = new PspFile()
//       pspFile = pspFiles[name];
//     }
//
//     // dlPlaylist(data) {
//     //     data.forEach((mus, i, a) => {
//     //         dlMusic(mus);
//     //     })
//     // }
//
//     dlMusic(data) {
//       // var dlSavePath = './'
//       // var plSavePath = SavePath + data.playlist + '.psp'
//
//       if (!isAppOnline) {
//         mainWindow.webContents.send('set-dl-status', 'dl fail : no internet connection');
//         return ;
//       }
//
//       if (!pspFile || pspFile.name !== data.plName)
//         this.changePspFile(data.plName)
//
//       pspFile.open(pspFilePath + data.plName + '.psp', true).then(function () {
//         mainWindow.webContents.send('set-dl-status', 'dl-init...');
//
//         console.log('moncul', pspFile.getMusicMetadata(data.musPos).offline, pspFile.getMusicMetadata(data.musPos).name, 'moncul')
//         if (pspFile.getMusicMetadata(data.musPos).offline != false) { // if music not in file
//           // console.log('we did it')
//
//             mainWindow.webContents.send('set-dl-status', 'connecting...');
//             downloader.dlFromSoundCloud2Mp3(data.musUrl, pspFilePath + data.musName + '.mp3').then(() => { // start dl
//
//                 mainWindow.webContents.send('set-dl-status', 'packing...');
//                 pspFile.addMusic(pspFilePath + data.musName + '.mp3', data.musPos, data.musName).then(() => { // add music to header
//
//                     pspFile.save(mainWindow).then(() => { // pack mp3 to zip file
//                         fs.unlink(pspFilePath + data.musName + '.mp3', function(err) { // del mp3 file
//                             if (err)
//                                 throw new Error(err);
//                             mainWindow.webContents.send('set-dl-status', 'dl-ok');
//                             // mainWindow.webContents.send('set-offline-available');
//                         })
//                     })
//                 })
//             }, (err) => {
//                 mainWindow.webContents.send('set-dl-status', 'dl-ko')
//                 throw new Error(err);
//             })
//         } else {
//             fs.unlink(pspFilePath + data.musName + '.mp3', function() { // del mp3 file
//                 mainWindow.webContents.send('set-dl-status', 'already downloaded');
//             })
//         }
//       }, (err) => {
//         mainWindow.webContents.send('set-dl-status', 'dl-ko')
//         throw new Error(err)
//       });
//     }
//
//
//     // getMusicSize(url) {
//     //
//     // }
// }

// var offPlHandler = new OfflinePlaylistHandler();


// ipcMain.on('dl-music', (event, data) => {
//   offPlHandler.dlMusic(data)
// });
//
//
// connection.on('online', () => {
//   isAppOnline = true
//   mainWindow.webContents.send('app-online')
// })
//
//
// connection.on('offline', () => {
//   isAppOnline = false
//   mainWindow.webContents.send('app-offline')
// })
//
//
// ipcMain.on('change-pl', (event, data) => { // data = {name}
//   offPlHandler.changePspFile(data.name)
//   mainWindow.webContents.send('change-pl-ok')
// })
//
//
// ipcMain.on('add-pl-to-header', (event, data) => { // data = {name, musics}
//   if (!pspFile || pspFile.name !== data.name)
//     offPlHandler.changePspFile(data.name)
//
//   // console.log('ici', data)
//   pspFile.open(pspFilePath + data.name + '.psp', true).then(() => {
//     // console.log('open ok')
//
//     data.musics.forEach((music) => {
//       // console.log(music)
//       pspFile.addMusicMetadata(music.Music.music_id, music.Music.music_name)
//     })
//
//     pspFile.save(mainWindow).then(() => {
//       mainWindow.webContents.send('add-pl-to-header-ok')
//     })
//   }, (err) => {
//     throw new Error(err)
//   })
// })
//
//
// ipcMain.on('get-offline-pl-metadata', (event, data) => { // data = {name}
//   if (!pspFile || pspFile.name !== data.name)
//     offPlHandler.changePspFile(data.name)
//
//   pspFile.open(pspFilePath + data.name + '.psp', false).then(() => {
//     // console.log('metadata', pspFile.getMusicsMetadata())
//     mainWindow.webContents.send('get-offline-pl-metadata-ok', pspFile.getMusicsMetadata())
//   })
// })

// ipcMain.on('dl-playlist', (event, data) => {
//
// });
//
//
// ipcMain.on('check-music-offline-available', (event, data) => {
//     // console.log('check-music-offline-available')
//
//     var dlSavePath = './public/offlinePlaylists/'
//         // pspfile = new PspFile();
//
//     pspfile.open(dlSavePath + data.playlist + '.psp', false).then(() => {
//         if (pspfile.getMusicMetadata(data.pos)) {
//             mainWindow.webContents.send('set-dl-status', {msg:'offline-available', pos:data.pos});
//             mainWindow.webContents.send('set-offline-available', data.pos);
//         }
//     }, function(err) {
//         // console.log('okokokok')
//         throw new Error(err)
//     });
// });
//
//
