<template>
  <div class="post-question p-4">
    <h3>Ask a public question</h3>
    <div class="row">
      <div class="col-md-8">
        <PostQuestion></PostQuestion>
      </div>
      <div class="col-md"></div>
    </div>
  </div>
</template>

<script>
import PostQuestion from '../components/FormQuestion'
export default {
  components: {
    PostQuestion
  }
}
</script>

<style>
.post-question {
  width: 95%;
  display: block;
  margin: auto;
}
</style>
