import * as XmlBuilder from 'xmlbuilder'

export class MusicEntry {

  _pos: number
  _name: string
  _filename: string
  _isInFile: any
  _isDeleted: boolean

  constructor(pos: number, name: string, filename: string, isInFile: boolean) {
    this._pos = pos
    this._name = name
    this._filename = filename
    this._isInFile = isInFile
    // console.log('filename:')
    // console.log('new music', pos, name, filename, isInFile)
  }

  get pos(): number { // !!! ne pas faire confience si musique déplacée ou nouvelle musique ajoutée
    return this._pos
  }

  set pos(val: number) {
    this._pos = val
  }

  get name(): string {
    return this._name
  }

  set name(val: string) {
    this._name = val
  }

  get filename(): string {
    return this._filename
  }

  set filename(val: string) {
    this._filename = val
  }

  get isInFile(): boolean {
    return this._isInFile
  }

  set isInFile(val: boolean) {
    this._isInFile = val
  }

  get isDeleted(): boolean {
    return this._isDeleted
  }

  set isDeleted(val: boolean) {
    this._isDeleted = val
  }

  toXml(pos: number = undefined): any {
    pos = pos || this._pos
    return XmlBuilder.create('music').att('name', this._name).att('pos', pos).att('filename', this._filename).
      att('isInFile', this._isInFile)
  }

  toString(pos: number): string {
    return this.toXml().toString({ pretty:true })
  }
}
