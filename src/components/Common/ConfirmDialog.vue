<template>
  <div>
    <b-modal ref="modal" title="確認" @ok="onOkClicked()" @cancel="onCancelClicked()">
      <span v-html="message"></span>
    </b-modal>
  </div>
</template>

<script>
  export default {
    props: ['message'],
    data () {
      return {
        targetEntryNo: ''
      }
    },
    methods: {
      show (targetEntryNo) {
        this.$refs.modal.show()
        this.targetEntryNo = targetEntryNo
      },
      onOkClicked () {
        this.$emit('onOkClicked', this.targetEntryNo)
      },
      onCancelClicked () {
        this.$emit('onCancelClicked')
      }
    }
  }
</script>

<style>
</style>
