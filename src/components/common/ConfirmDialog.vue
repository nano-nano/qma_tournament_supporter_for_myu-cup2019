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
      }
    },
    methods: {
      show () {
        this.$refs.modal.show()
      },
      onOkClicked () {
        this.$emit('onOkClicked')
      },
      onCancelClicked () {
        this.$emit('onCancelClicked')
      }
    }
  }
</script>

<style>
</style>
