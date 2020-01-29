<template>
  <div class="mb-2">
    <el-card class="question-card" shadow="never">
      <div class="row">
        <div class="col-md-8">
          <p class="question-title text-primary">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque
            deserunt eum quasi!
          </p>
          <p class="question-detail">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
            provident voluptatum iusto adipisci aliquam vel error cum totam.
          </p>
          <p class="user-post">Posted by <strong>Username</strong></p>
        </div>
        <div class="col-md list-detail">
          <div class="votes">
            <p class="votes-count">2</p>
            <p class="votes-text">Votes</p>
          </div>
          <div class="answer">
            <p class="answer-count">2</p>
            <p class="answer-text">Answer</p>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style>
.list-detail {
  display: flex;
  justify-content: center;
  align-items: center;
}
.votes,
.answer {
  width: 80px;
  height: 80px;
  border: 1px solid #e9e9e9;
  padding: 10px;
  margin: auto 15px;
  overflow: hidden;
}
.answer {
  border: 1px solid #48a8686c;
}
.answer-count {
  margin-bottom: 0;
  font-size: 24px;
  color: #48a868;
  text-align: center;
}
.answer-text {
  font-size: 14px;
  text-align: center;
  margin-bottom: 0;
  color: #48a868;
}
.votes-count {
  margin-bottom: 0;
  font-size: 24px;
  text-align: center;
}
.votes-text {
  font-size: 14px;
  text-align: center;
  margin-bottom: 0;
}
.question-card {
  width: 100%;
  min-height: 165px;
}
.question-title {
  font-size: 16px;
  margin-bottom: 5px;
}
.question-detail {
  font-size: 13px;
  margin-bottom: 17px;
}
.user-post {
  font-size: 14px;
  margin-bottom: 0;
}
</style>
