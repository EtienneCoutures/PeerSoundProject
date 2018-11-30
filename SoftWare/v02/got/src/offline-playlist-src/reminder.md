[Markdown reminder](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

**Node** / **electron **

```bash
$ node file.js
```

```bash
$ npm install nomdumodule
```

```bash
$ npm start
```

**BDD local** : exec MySql Command Line Client | password = judelapoire
```bash
$ mysql> use peersoundproject;
$ (mysql> show tables;)
$ (mysql> drop database dbname;) -> delete db
```

**Server local** : go to PeerSoundProject/Web/backend
```bash
$ npm install
$ node server.js
```

-> https://127.0.0.1:8000

**Plugin** : go google chrome -> Outils -> Plus d'outils -> Extentions (-> activer mode développeur) -> Charger l'extention non empaquetée -> PeerSoundProject/Plugin


**Zip**

- [adm-zip +++++++](https://www.npmjs.com/package/adm-zip)
- [archiver](https://www.npmjs.com/package/archiver)
- [zilb doc](https://nodejs.org/api/zlib.html)
- [tar / zip / gz explications et performences](https://itsfoss.com/tar-vs-zip-vs-gz/)

- Adm zip
```js
var AdmZip = require('adm-zip');

 // reading archives
 var zip = new AdmZip("./my_file.zip");
 var zipEntries = zip.getEntries(); // an array of ZipEntry records

 zipEntries.forEach(function(zipEntry) {
     console.log(zipEntry.toString()); // outputs zip entries information
     if (zipEntry.entryName == "my_file.txt") {
          console.log(zipEntry.data.toString('utf8'));
     }
 });
 // outputs the content of some_folder/my_file.txt
 console.log(zip.readAsText("some_folder/my_file.txt"));
 // extracts the specified file to the specified location
 zip.extractEntryTo(/*entry name*/"some_folder/my_file.txt", /*target path*/"/home/me/tempfolder", /*maintainEntryPath*/false, /*overwrite*/true);
 // extracts everything
 zip.extractAllTo(/*target path*/"/home/me/zipcontent/", /*overwrite*/true);

 // creating archives
 var zip = new AdmZip();

 // add file directly
 zip.addFile("test.txt", new Buffer("inner content of the file"), "entry comment goes here");
 // add local file
 zip.addLocalFile("/home/me/some_picture.png");
 // get everything as a buffer
 var willSendthis = zip.toBuffer();
 // or write everything to disk
 zip.writeZip(/*target file name*/"/home/me/files.zip");
```

**Filesystem**

- [read standardized file format module](https://www.npmjs.com/package/stream-parser)
- [filsystem doc](https://nodejs.org/api/fs.html)
- [fs tuto](https://www.tutorialspoint.com/nodejs/nodejs_file_system.htm)
- [move cursor (fs extention)](https://github.com/baudehlo/node-fs-ext)
- [writeStream tuto](http://codewinds.com/blog/2013-08-19-nodejs-writable-streams.html#writing_text_file)
- [stream tuto](https://www.sitepoint.com/basics-node-js-streams/)
```js
var fs = require('fs');
```

- writeStream
```js
var wstream = fs.createWriteStream('myOutput.txt');
wstream.write('Hello world!\n');
wstream.write('Another line\n', 'base64');
wstream.end();
```

- fs.createReadStream() has an option you can pass it to specify the start position for the stream.
```js
let f = fs.createReadStream("myfile.txt", {start: 1000, end: 2000});
```

- Is there a way to insert a string to a file at a specific line number ?

   As long as the text file isn't that large, you should be able to just read in the text file into an array, insert an element into the specific line index, and then output the array back to the file :

 ```js
 var fs = require('fs');

 var data = fs.readFileSync('file.txt').toString().split("\n");
 data.splice(lineNumber, 0, "Your String");
 var text = data.join("\n");

 fs.writeFile('file.txt', text, function (err) {
    if (err) return console.log(err);
});
```

**Playing music from raw data**

- [web audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [audio stream protocol](http://www.garymcgath.com/streamingprotocols.html)

**Mp3 player example**
- [Simple audio player](https://github.com/akabekobeko/examples-electron/tree/master/audio-player)
- [Another simple audio player (using yarn vs NPM)](https://github.com/mashaal/destroyer)

**Some projects similar to psp**

- [Museeks (lecteur mp3 poilu)](https://github.com/KeitIG/museeks)
- [URTube : Youtube (and soundcloud ?) to mp3 downloader](https://github.com/RedDuckss/URTube)
- [Youtube dl core](modulehttps://github.com/fent/node-ytdl-core)
- [almost what we do](https://github.com/benkaiser/stretto)

**Encryption**

- **ODP file example**

  When OpenDocument file is password protected the file structure of bundle remains the same, but contents of XML files in package are encrypted using following algorithm:

  **1)** The file contents are compressed with the DEFLATE algorithm.

  **2)** A checksum of a portion of the compressed file is computed (SHA-1 of the file contents, or SHA-1 of the first 1024 bytes of the file, or SHA-256 of the first 1024 bytes of the file) and stored so password correctness can be verified when decrypting.

  **3)** A digest (hash) of the user entered password in UTF-8 encoding is created and passed to the package component. ODF versions 1.0 and 1.1 only mandate support for the SHA-1 digest here, while version 1.2 recommends SHA-256.

  **4)** This digest is used to produce a derived key by undergoing key stretching with PBKDF2 using HMAC-SHA-1 with a salt of arbitrary length (in ODF 1.2 – it's 16 bytes in ODF 1.1 and below) generated by the random number generator for an arbitrary iteration count (1024 by default in ODF 1.2).

  **5)** The random number generator is used to generate a random initialization vector for each file.

  **6)** The initialization vector and derived key are used to encrypt the compressed file contents. ODF 1.0 and 1.1 use Blowfish in 8-bit cipher feedback mode, while ODF 1.2 considers it a legacy algorithm and allows Triple DES and AES (with 128, 196 or 256 bits), both in cipher block chaining mode, to be used instead.

**XML**

- **[xmlbuilder js](https://github.com/oozcitak/xmlbuilder-js)**

    ```js
    var builder = require('xmlbuilder');
    var doc = builder.create();

    doc.begin('root')
      .ele('xmlbuilder')
        .att('for', 'node-js')
        .ele('repo')
          .att('type', 'git')
          .txt('git://github.com/oozcitak/xmlbuilder-js.git')
        .up()
      .up()
      .ele('test')
        .txt('complete');

    console.log(doc.toString({ pretty: true }));
    ```
which will result in:
    ```xml
    <root>
      <xmlbuilder for="node-js">
        <repo type="git">git://github.com/oozcitak/xmlbuilder-js.git</repo>
      </xmlbuilder>
      <test>complete</test>
    </root>
    ```
