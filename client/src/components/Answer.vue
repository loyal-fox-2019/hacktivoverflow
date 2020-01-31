<template>
  <div class="card down">
    <div class="card-body container">
      <div class="row">
        <div class="d-flex-column align-items-center point votes pl-4 pr-4">
          <a class="questionTitle" ref="" @click.prevent="upvotes(data._id)"><i class="fas fa-caret-up"></i></a>
          <p class="sum">  {{data.upVotes.length - data.downVotes.length}} </p>
          <a class="questionTitle" ref="" @click.prevent="downvotes(data._id)"><i class="fas fa-caret-down"></i></a>
        </div>
        <div class="col">
          <p class="author"> <i class="fas fa-user-astronaut mr-2"></i> {{ data.userId }} </p>
          <p class="desc" v-html="data.description"> </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
      // detail: this.asnwer
    }
  },
  methods: {
    upvotes (id) {
      this.$store.dispatch('upVotesAnswer', id)
        .then(({ data }) => {
          let a = this.$route.params.id
          this.$store.dispatch('readQuestion', a)
          // this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    downvotes (id) {
      this.$store.dispatch('downVotesAnswer', id)
        .then(({ data }) => {
          let a = this.$route.params.id
          this.$store.dispatch('readQuestion', a)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>

.down {
  border-radius: 0px;
  border-top: none;
  border-bottom: 0.9px solid #cccccc;
  border-left: none;
  border-right: none
}

.desc {
  font-size: 14px !important;
  font-weight: 0px
}

.sum {
  margin-bottom: 0;
  color: #cccccc;
}

.vote {
  font-size: 30px !important;
  color: #cccccc !important
}

.votes {
  font-size: 20px;
  text-align: center;
  justify-content: center;

}

.questionTitle,
.questionTitle:focus {
  color: #cccccc;
  font-size: 30px !important;
  cursor: pointer;
}

.questionTitle:hover {
  color: #717b83;
}

.author {
  font-size: 12px;
  text-align: right
}
</style>
