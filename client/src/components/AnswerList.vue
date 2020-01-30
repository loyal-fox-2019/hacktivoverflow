<template>
  <div class="p-4">
    <div class="row">
      <div class="col-md-1">
        <p>
          <strong>{{data.userId.username}}</strong>
        </p>
        <p class="vote-section">
          <i class="fas fa-sort-up large"></i>
        </p>
        <p class="vote-section">0</p>
        <p class="vote-section">
          <i class="fas fa-sort-down large"></i>
        </p>
      </div>
      <div class="col-md question-content" v-html="data.description"></div>
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style>
.vote-section {
  font-size: 34px;
  text-align: center;
  margin-bottom: 0;
  height: 25px;
  color: #bbc0c4;
}
.large {
  font-size: 40px;
}
pre.ql-syntax {
  padding: 20px;
  background-color: #EFF0F1!Important;
  color: #000!Important;
}
</style>
