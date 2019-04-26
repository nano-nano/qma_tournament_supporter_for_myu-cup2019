'use strict'

import FsExtra from 'fs-extra'
import XlsxPopulate from 'xlsx-populate'

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

    static importEntryDataExcel (filePath) {
        XlsxPopulate.fromFileAsync(filePath).then((workbook) => {
            const sheet = workbook.sheet('rawData')
            let entryNoCell = sheet.cell('B4')
            // EntryNo.セルに'END'が出るまでデータをインポート
            while (entryNoCell.value() != 'END') {
                console.debug(entryNoCell.value() + ', ')
                console.debug(entryNoCell.relativeCell(0, 1).value() + ', ')
                console.debug(entryNoCell.relativeCell(0, 3).value())
                console.debug('---')

                entryNoCell = entryNoCell.relativeCell(1, 0)
            }
        })
    }
}