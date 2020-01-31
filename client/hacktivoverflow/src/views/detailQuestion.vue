<template>
  <div>
      <b-container class="detal">
          <h2>Question: {{detailQuestion.title}}</h2>
            <b-button variant="outline-danger" v-if="iconDelete" @click.prevent="deleteQuestion">Delete</b-button>
            <b-button variant="outline-success" v-if="iconDelete" id="editQuest" @click.prevent="edit">Edit</b-button>
          <br><br>
      <b-row>
          <b-col cols="1" class="total">
              <p><i class="far fa-arrow-alt-circle-up star" @click.prevent="upquestion"></i></p>
              <p class="num animated fadeIn">{{detailQuestion.upvotes.length - detailQuestion.downvotes.length}}</p>
              <p><i class="far fa-arrow-alt-circle-down star" @click.prevent="downquestion"></i></p>
          </b-col>
          <b-col cols="11" class="description">
            <editQuest :data="detailQuestion" v-if="iconform" @cancel="call" @edited="call"></editQuest>
            <span v-if="!iconform">
              <p v-html="detailQuestion.description"></p>
            </span>
          </b-col>
          <b-col offset="8">
            <span>Tags: </span>
           <span v-for="(tag, i) in detailQuestion.tag" :key="i">
             <b-button pill variant="info">{{tag}}</b-button>
            </span>
          </b-col>
      </b-row>
      <b-row>
          <br>
          <b-col offset="1">
              <h3>Answer</h3>
              <hr>
              <answer v-for="(questAnswer,i) in answerQuestion" :key="i" :data="questAnswer"></answer>
              <formAnswer></formAnswer>
          </b-col>
      </b-row>
      </b-container>
  </div>
</template>

<script>
import answer from '../components/answer'
import formAnswer from '../components/answerForm'
import Swal from 'sweetalert2'
import editQuest from '../components/form'
export default {
  components: {
    answer,
    formAnswer,
    editQuest
  },
  methods: {
    patch () {
      this.$store.dispatch('patchQuestionDetail', this.$route.params.id)
    },
    call () {
      this.iconform = false
    },
    edit () {
      this.iconform = true
    },
    patchAnswer () {
      this.$store.dispatch('patchQuestionAnswer', this.$route.params.id)
    },
    async upquestion () {
      if (this.$store.state.login === true) {
        await this.$store.dispatch('upQuestion', this.$route.params.id)
        this.patch()
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please Login First'
        })
      }
    },
    async downquestion () {
      if (this.$store.state.login === true) {
        await this.$store.dispatch('downQuestion', this.$route.params.id)
        this.patch()
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please Login First'
        })
      }
    },
    deleteQuestion () {
      this.$store.dispatch('deleteQuestion', this.$route.params.id)
    }
  },
  created () {
    this.patch()
    this.patchAnswer()
    this.updown()
  },
  computed: {
    detailQuestion () {
      return this.$store.state.questionDetail
    },
    answerQuestion () {
      return this.$store.state.questionAnswer
    },
    iconDelete () {
      if (this.$store.state.questionDetail.owner === this.$store.state.userId) {
        return true
      } else {
        return false
      }
    }
  },
  data () {
    return {
      iconform: false
    }
  }
}
</script>

<style>
.star{
    font-size: 30px;
    cursor: pointer;
}
.star:hover{
    color: red
}
.total{
    text-align: center;
}
.detal{
  margin-top: 30px;
}
.description{
  background: rgb(243, 243, 243);
}
.num{
  font-size: 30px;
  font-weight: bold
}

#editQuest{
  margin-left: 20px;
}

.tg{
  text-align: right;
  position: relative;
  float: right;
}

</style>
