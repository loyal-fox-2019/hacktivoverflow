<template>
  <div class="mb-2">
    <el-card class="question-card" shadow="never">
      <div class="row">
        <div class="col-md-8">
          <p class="question-title text-primary">
            <router-link :to="'/questions/'+ data._id">{{ substringtitle }}</router-link>
          </p>
          <p class="question-detail">{{ substringdescription }}</p>
          <p class="user-post">
            Posted by
            <strong>{{ data.userId.username }}</strong>
          </p>
        </div>
        <div class="col-md list-detail">
          <div class="votes">
            <p class="votes-count">{{ totalvotes }}</p>
            <p class="votes-text">Votes</p>
          </div>
          <div class="answer">
            <p class="answer-count">{{countAnswer.length}}</p>
            <p class="answer-text">Answer</p>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ['data'],
  computed: {
    substringtitle() {
      return this.data.title.substring(0, 100)
    },
    substringdescription() {
      let regex = /(<([^>]+)>)/gi
      return this.data.description.substring(0, 150).replace(regex, '')
    },
    totalvotes() {
      let upvote = this.data.upvote.length
      let downvote = this.data.downvote.length
      return upvote - downvote
    },
    countAnswer() {
      let listanswer = this.$store.state.allAnswer
      console.log(listanswer)
      return listanswer.filter(item => {
        return item.questionId === this.data._id
      })
    }
  }
}
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
  min-height: 130px;
}
.question-title {
  font-size: 20px;
  margin-bottom: 5px;
}
.question-detail {
  font-size: 16px;
  margin-bottom: 17px;
}
.user-post {
  font-size: 14px;
  margin-bottom: 0;
}
</style>
