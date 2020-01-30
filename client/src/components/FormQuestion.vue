<template>
  <v-form v-model="valid" @submit.prevent="createPOST" class="mx-auto">
    <v-container>
      <v-col
      v-if="formType === 'questions'"
          class="mx-auto w-75"
        >
          <v-text-field
            v-model="title"
            :rules="nameRules"
            label="Title"
            required
          ></v-text-field>
        </v-col>

        <v-col
          class="mx-auto w-75"
        >
          <vue-editor v-model="content" required></vue-editor>
        </v-col>

        <v-col
        v-if="formType === 'questions'"
          class="mx-auto w-75"
        >
            <b-form-tags v-model="tags" separator=" ,;" class="mb-2"></b-form-tags>
        </v-col>

        <v-col
        class="mx-auto w-75"
        >
        <v-btn small color="primary" type="submit" :block="true">Submit</v-btn>
        </v-col>
    </v-container>
  </v-form>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  name: 'FormQuestion',
  props: ['formType'],
  data () {
    return {
      valid: false,
      title: '',
      nameRules: [
        v => !!v || 'Title is required',
        v => v.length > 10 || 'Title must be more than 10 characters'
      ],
      content: '',
      tags: []
    }
  },
  components: {
    VueEditor
  },
  methods: {
    createPOST () {
      if (this.$store.state.isLogin) {
        if (this.formType === 'questions') {
          this.axios({
            method: 'post',
            url: 'questions',
            data: {
              title: this.title,
              content: this.content,
              tags: this.tags
            },
            headers: {
              token: localStorage.getItem('token')
            }
          })
            .then(({ data }) => {
            //   this.$store.state.theAnswer.push(data)
              this.$store.commit('PUSH_QUESTION', data)
              this.title = ''
              this.content = ''
              this.tags = []
              this.$emit('tutupForm')
            }).catch((err) => {
              console.log(err.response.data.message)
              this.$store.commit('SET_ALERT', {
                message: err.response.data.message,
                variant: 'danger'
              })
            })
        } else {
          console.log('masuk kasndasf')
          this.axios({
            method: 'post',
            url: 'answers/' + this.$route.params.id,
            data: {
              content: this.content
            },
            headers: {
              token: localStorage.getItem('token')
            }
          })
            .then(({ data }) => {
              this.title = ''
              this.content = ''
              this.tags = []
              this.$store.commit('PUSH_ANSWER', data)
              this.$emit('tutupForm')
            }).catch((err) => {
              console.log(err.response.data.message)
              this.$store.commit('SET_ALERT', {
                message: err.response.data.message,
                variant: 'danger'
              })
            })
        }
      } else {
        this.$store.commit('SET_ALERT', {
          message: 'Join the Hack beloflow community',
          variant: 'warning'
        })
        this.$store.state.dismissCountDown = 3
        this.$router.push('/signin/login')
      }
    }
  }
}
</script>

<style>

</style>
