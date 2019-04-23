<template>
  <div>
    <b-modal title="確認" @ok="onOkClicked()" @cancel="onCancelClicked">
      <p>{{message}}</p>
    </b-modal>
  </div>
</template>

<script>
  export default {
    props: ['message'],
    methods: {
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
