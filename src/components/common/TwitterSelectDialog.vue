<template>
  <div>
    <b-modal ref="modal" title="Twitter速報選択" @ok="onOkClicked()">
      <p>Twitter速報としてツイートする内容を選択してください</p>
      <b-form-select v-model="selected" :options="options"></b-form-select>
    </b-modal>
  </div>
</template>

<script>
import TwitterUtils from '../../logic/TwitterUtils.js'

export default {
  props: ['roundName'],
  data () {
    return {
      options: [],
      selected: ''
    }
  },
  methods: {
    show () {
      this.$refs.modal.show()
    },
    onOkClicked () {
      // this.$emit('onOkClicked')
    }
  },
  mounted: function () {
    this.options = TwitterUtils.getTweetSelection(this.roundName).map((e) => { return {value: e.id, text: e.description} })
  }
}
</script>

<style>
</style>
