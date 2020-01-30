<template>
  <v-card class="mx-auto d-flex" outlined @click.prevent="moveTo(data._id)" :disable="$route.path !== '/'">
    <div style="width: 10%; text-align: center">
      <b-button v-if="this.$route.name != 'home'" @click.prevent="upVote">^</b-button>

      <b-card-text class="my-3">
        {{totalVote}}
      </b-card-text>
      <small v-if="this.$route.name == 'home'">votes</small>
      <b-card-text class="my-1" v-if="this.$route.name == 'home'">
        {{totalAnswer}}
      </b-card-text>
      <small v-if="this.$route.name == 'home'">answers</small>

      <b-button v-if="this.$route.name != 'home'" @click.prevent="downVote">v</b-button>
    </div>
    <div style="width: 90%">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">{{data.title}}</v-list-item-title>
          <hr v-if="this.$route.name != 'home'">
          <v-list-item-subtitle v-html="data.content"></v-list-item-subtitle>
        </v-list-item-content>
        <div class="overline">
          <v-avatar>
            <img :src="imageku" alt="John" />
          </v-avatar>
          {{namaku}}
          <br />
          asked: {{date}}
        </div>
      </v-list-item>

      <v-card-actions>
        <v-btn v-for="(tag, index) in data.tags" :key="index" x-small color="grey-blue">{{tag}}</v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'Card',
  computed: {
    route () {
      return this.$route.path
    },
    totalVote () {
      return this.data.upVotes ? this.data.upVotes.length - this.data.downVotes.length : 0
    },
    date () {
      return new Date(this.data.createdAt).toLocaleString()
    },
    totalAnswer () {
      return this.data.answer ? this.data.answer.length : 0
    },
    imageku () {
      return this.data.author ? this.data.author.photo : 'kosong'
    },
    namaku () {
      return this.data.author ? this.data.author.name : ''
    }
  },
  props: ['data', 'tipe'],
  mounted () {
    console.log(this.data.upVotes)
  },
  methods: {
    moveTo (id) {
      if (this.$route.path === '/') this.$router.push(`/question/${id}`)
    },
    upVote () {
      if (!this.$store.state.isLogin) {
        this.$store.commit('SET_ALERT', {
          message: 'Join the Hack beloflow community',
          variant: 'warning'
        })
        this.$store.state.dismissCountDown = 3
        this.$router.push('/signin/login')
      } else {
        console.log(this.tipe, this.data._id)
        if (this.tipe === 'questions') {
          this.axios({
            method: 'patch',
            url: `questions/upvote/${this.data._id}`,
            headers: {
              token: localStorage.getItem('token')
            }
          })
            .then(({ data }) => {
              this.$store.dispatch('fetchAllQuestion')
              this.$emit('loadUlangQuestion')
            }).catch((err) => {
              console.log(err.response.data.message)
              this.$store.commit('SET_ALERT', {
                message: err.response.data.message,
                variant: 'danger'
              })
            })
        } else {
          this.axios({
            method: 'patch',
            url: `answers/upvote/${this.data._id}`,
            headers: {
              token: localStorage.getItem('token')
            }
          })
            .then(({ data }) => {
              this.$store.dispatch('fetchAllQuestion')
              this.$emit('loadUlangAnswer')
            }).catch((err) => {
              console.log(err.response.data.message)
              this.$store.commit('SET_ALERT', {
                message: err.response.data.message,
                variant: 'danger'
              })
            })
        }
      }
    },
    downVote () {
      console.log(this.tipe, this.data._id)
      if (!this.$store.state.isLogin) {
        this.$store.commit('SET_ALERT', {
          message: 'Join the Hack beloflow community',
          variant: 'warning'
        })
        this.$store.state.dismissCountDown = 3
        this.$router.push('/signin/login')
      } else {
        if (this.tipe === 'questions') {
          this.axios({
            method: 'patch',
            url: `questions/downvote/${this.data._id}`,
            headers: {
              token: localStorage.getItem('token')
            }
          })
            .then(({ data }) => {
              this.$store.dispatch('fetchAllQuestion')
              this.$emit('loadUlangQuestion')
            }).catch((err) => {
              console.log(err.response.data.message)
              this.$store.commit('SET_ALERT', {
                message: err.response.data.message,
                variant: 'danger'
              })
            })
        } else {
          this.axios({
            method: 'patch',
            url: `answers/downvote/${this.data._id}`,
            headers: {
              token: localStorage.getItem('token')
            }
          })
            .then(({ data }) => {
              this.$store.dispatch('fetchAllQuestion')
              this.$emit('loadUlangAnswer')
            }).catch((err) => {
              console.log(err.response.data.message)
              this.$store.commit('SET_ALERT', {
                message: err.response.data.message,
                variant: 'danger'
              })
            })
        }
      }
    }
  }
}
</script>

<style>
</style>
