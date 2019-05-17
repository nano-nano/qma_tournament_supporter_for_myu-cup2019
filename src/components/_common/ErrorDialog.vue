<template>
  <div>
    <b-modal ref="modal" hide-header ok-only body-text-variant="danger" @ok="onOkClicked()">
      <b>【エラー】</b><span v-html="message"></span>
    </b-modal>
  </div>
</template>

<script>
  export default {
    props: ['message'],
    data () {
      return {
      }
    },
    methods: {
      show () {
        this.$refs.modal.show()
      },
      onOkClicked () {
        this.$emit('onOkClicked')
      }
    }
  }
</script>

<style>
</style>
