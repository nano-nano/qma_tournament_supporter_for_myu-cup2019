'use strict'

import FsExtra from 'fs-extra'

export default class FileUtils {

    static ALL_PLAYERS_DATA_JSON_NAME = "allPlayersData"

    static saveJsonFile (fileName, data) {
        const filePath = process.cwd() + '/json/' + fileName + '.json'
        return FsExtra.outputJson(filePath, data)
      }
    
    static loadJsonFile (fileName) {
        const filePath = process.cwd() + '/json/' + fileName + '.json'
        return FsExtra.readJson(filePath, { throws: false })
    }

    static isJsonFileExist (fileName) {
        const filePath = process.cwd() + '/json/' + fileName + '.json'
        return (FsExtra.readJsonSync(filePath, { throws: false }) != null)
    }

    static saveAllPlayersData (data) {
        return this.saveJsonFile(this.ALL_PLAYERS_DATA_JSON_NAME, data)
    }

    static loadAllPlayersData () {
        return this.loadJsonFile(this.ALL_PLAYERS_DATA_JSON_NAME)
    }

    static isAllPlayersDataJsonExist () {
        return this.isJsonFileExist(this.ALL_PLAYERS_DATA_JSON_NAME)
    }
}