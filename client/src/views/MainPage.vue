<template>
  <div class="main d-flex justify-content-center">
    <div class="question d-flex-column justify-content-center">
      <div class="container">
      <div class="row title">
        <div class="col mb-4 mt-4">
          <h2 v-if="status == 'all' ">All Questions</h2>
          <h2 v-else>Your Questions</h2>
          <p> {{length.toLocaleString("id")}} questions</p>
        </div>
        <div class="col mt-4 but-add ">
          <div class="d-flex">
            <Favorite />
            <b-button v-if="status == 'all' " size="sm" class="my-2 my-sm-0 nav-but add pt-2 pb-2 mr-3" @click.prevent="yourQuestion">Your Questions</b-button>
            <b-button v-else size="sm" class="my-2 my-sm-0 nav-but add pt-2 pb-2 mr-3" @click.prevent="allQuestion">All Questions</b-button>
            <b-button size="sm" class="my-2 my-sm-0 nav-but add pt-2 pb-2" @click.prevent="askQuestion">Ask Questions</b-button>
          </div>
        </div>
      </div>
      <div class="card" v-for="question in questions" :key="question._id">
        <div class="card-body">
          <div class="row">
            <div class="d-flex-column point">
              <h4> {{question.upVotes.length - question.downVotes.length}} </h4>
              <p class="desc">votes</p>
              <h4> {{ question.answers.length }} </h4>
              <p class="desc">answer</p>
            </div>
            <div class="col">
              <b-button v-if="status == 'my'" size="sm" class="my-2 my-sm-0 nav-but edit" @click.prevent="edit(question)"><i class="fas fa-edit"></i></b-button>
              <b-button v-if="status == 'my'" size="sm" class="my-2 my-sm-0 nav-but delete" @click.prevent="destroy(question._id)"><i class="fas fa-trash-alt"></i></b-button>
              <a class="questionTitle mr-4" ref="" @click.prevent="read(question._id)">{{question.title}}</a>
              <label v-for="(tag, index) in question.tags" :key="index">
                  <button type="button" class="btn btn-sm btn-danger disabled ml-2 tags" data-toggle="button" aria-pressed="false">
                  {{tag}}
                  </button></label>
              <p class="mt-2 description" v-html="sliceQuestion(question.description)"></p>
              <p v-if="status == 'all'" class="author"> <i class="fas fa-user-astronaut mr-2"></i> {{ question.userId.username }} </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import Favorite from '../components/createModal'
import swal from 'sweetalert2'

export default {
  components: {
    Favorite
  },
  data () {
    return {
      status: ''
    }
  },
  methods: {
    sliceQuestion (question) {
      let a = ''
      if (question.length > 200) {
        a = question.slice(0, 250) + ' ...'
      } else {
        a = question
      }
      return a
    },
    askQuestion () {
      this.$router.push('/question')
    },
    read (id) {
      this.$store.dispatch('readQuestion', id)
      this.$router.push(`/question/${id}`)
    },
    yourQuestion () {
      this.$store.dispatch('myQuestion')
      this.status = 'my'
    },
    allQuestion () {
      this.$store.dispatch('fetchQuestion')
      this.status = 'all'
    },
    edit (data) {
      let a = data._id
      this.$store.dispatch('readQuestion', a)
      this.$router.push(`/question/edit/${data._id}`)
    },
    destroy (id) {
      swal.fire({
        title: 'Are you sure?',
        text: 'Back to Shopping this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('deleteQuestion', id)
            .then(({ data }) => {
              this.allQuestion()
              swal.fire(
                'Deleted!',
                'Your item has been deleted.',
                'success'
              )
            })
        }
      })
    }
  },
  computed: {
    length () {
      return this.$store.state.question.length
    },
    questions () {
      return this.$store.state.question
    }
  },
  created () {
    const valid = localStorage.getItem('token')
    if (!valid) {
      this.$router.push('/')
    }
    this.$store.dispatch('fetchQuestion')
    this.status = 'all'
  }
}
</script>

<style scoped>
.main {
  margin-top: 74px !important;
  height: 88vh !important;
}

.tags {
  font-size: 0.5rem !important;
  background-color: #f48024;
  border-color: #f48024
}

.btn.disabled, .btn:disabled {
    opacity: 1;
    box-shadow: none
}

.title {
  border-bottom: 0.9px solid #cccccc;
}

.but-add {
  text-align: right;
}

.card {
  border-left: none !important;
  border-right: none !important;
  border-top: none !important;
  border-bottom: 0.9px solid #cccccc;
  border-radius: 0px !important
}

.point {
  text-align: center;
  justify-content: center;
  width: 70px;
}

.questionTitle,
.questionTitle:focus {
  color: #0196ff;
  font-size: 24px !important;
  cursor: pointer;
}

.questionTitle:hover {
  color: #0077cc;
}

.add,
.add:focus {
  background-color: #0196ff;
  color: white;
  border-color: #39739e;
  box-shadow: none !important;
}

.add:hover {
  background-color: #0077cc;
}

.question {
  overflow: scroll;
  width: 70%;
  border-right: 0.9px solid #cccccc;
  border-left: 0.9px solid #cccccc;
}

h4 {
  font-size: 25px !important;
  font-weight: none !important;
  margin-bottom: 0px !important
}

.desc {
  font-size: 10px !important;
  margin-bottom: 10px !important
}

.author {
  font-size: 12px;
  text-align: right
}

.description {
  margin-bottom: 10px
}

.edit, .edit:focus, .delete, .delete:focus {
  background-color: #0196ff;
  border: #0196ff;
  box-shadow: none !important;
  width: 30px;
  margin-right: 10px
}

.edit:hover, .delete:hover {
  background-color: #0077cc;
  border: #0077cc;
}
</style>
