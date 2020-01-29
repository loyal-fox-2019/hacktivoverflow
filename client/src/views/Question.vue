<template>
  <div class="question p-5 mx-auto">
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-7">
        <div class="d-flex justify-content-between mb-3">
          <h3 class="title-question">All Question</h3>
          <router-link to="/post-question">
            <el-button type="primary">Ask Question</el-button>
          </router-link>
        </div>
        <div class="d-flex justify-content-end mb-2">
          <el-button-group>
            <el-button size="small">All Question</el-button>
            <el-button size="small">Top Question</el-button>
            <el-button size="small">My Question</el-button>
          </el-button-group>
        </div>
        <QuestionCard></QuestionCard>
      </div>
      <div class="col-md"></div>
    </div>
  </div>
</template>

<script>
import QuestionCard from '../components/QuestionCard'
export default {
  components: {
    QuestionCard
  }
}
</script>

<style scoped>
.question {
  width: 95%;
  display: block;
}
.title-question {
  margin-bottom: 0!Important;
  font-size: 26px;
}
</style>
