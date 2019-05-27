<template>
  <div>
    <b-modal ref="modal" size="lg" title="試合結果取得設定" ok-title="保存して閉じる" cancel-title="保存しないで閉じる" @ok="onOkClicked()">
      <b-form-group description="大会の試合結果が掲載される「QMA 全国魔法学校賢技選手権」公式サイトのURLを入力します。" label="試合結果掲載ページのURL">
        <b-form-input v-model="importUrl" trim></b-form-input>
      </b-form-group>
      <b-form-group description="成績自動追尾機能有効時の成績データ取得間隔を指定します。" label="成績自動追尾間隔（秒）">
        <b-form-input type="number" v-model="importIntervalSec"></b-form-input>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
import Constants from '../../Constants.js'
import FileUtils from '../../logic/FileUtils.js'

  export default {
    data () {
      return {
        importUrl: '',
        importIntervalSec: 45
      }
    },
    methods: {
      show () {
        FileUtils.loadJsonFile(Constants.SETTING_FILE_NAME).then((data) => {
          if (data.scoreUrl != undefined) {
            // すでに保存してある場合はフォームにURL設定
            this.importUrl = data.scoreUrl
          }
          if (data.importIntervalSec != undefined) {
            // すでに保存してある場合はフォームに秒数設定
            this.importIntervalSec = data.importIntervalSec
          }
        })
        this.$refs.modal.show()
      },
      onOkClicked () {
        FileUtils.loadJsonFile(Constants.SETTING_FILE_NAME).then((settings) => {
          settings.scoreUrl = this.importUrl
          settings.importIntervalSec = parseInt(this.importIntervalSec)
          FileUtils.saveJsonFile(Constants.SETTING_FILE_NAME, settings)
        })
      }
    }
  }
</script>

<style>
</style>
