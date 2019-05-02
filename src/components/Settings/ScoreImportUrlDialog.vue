<template>
  <div>
    <b-modal ref="modal" size="lg" title="試合結果取得設定" ok-title="保存して閉じる" cancel-title="保存しないで閉じる" @ok="onOkClicked()">
      <b-form-group description="大会の試合結果が掲載されるQMA Japan Tour公式サイトのURLを入力します。" label="試合結果掲載ページのURL">
        <b-form-input v-model="importUrl" trim></b-form-input>
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
        importUrl: ''
      }
    },
    methods: {
      show () {
        FileUtils.loadJsonFile(Constants.SETTING_FILE_NAME).then((data) => {
          if (data.scoreUrl != undefined) {
            // すでに保存してある場合はフォームに設定
            this.importUrl = data.scoreUrl
          }
        })
        this.$refs.modal.show()
      },
      onOkClicked () {
        const settings = FileUtils.loadJsonFile(Constants.SETTING_FILE_NAME)
        settings.scoreUrl = this.importUrl
        FileUtils.saveJsonFile(Constants.SETTING_FILE_NAME, settings)
      }
    }
  }
</script>

<style>
</style>
