<template>
  <div class="detail d-flex justify-content-center">
    <div class="detail-question d-flex-column justify-content-center">
      <h1>ad</h1>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    const valid = localStorage.getItem('token')
    if (!valid) {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.detail {
  margin-top: 74px !important;
  height: 88vh !important;
}

.detail-question {
  overflow: scroll;
  width: 70%;
  border-right: 0.9px solid #cccccc;
  border-left: 0.9px solid #cccccc;
}
</style>