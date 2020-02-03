<template>
  <div>
    <!--<pre> {{ $route.params.id }} </pre>

    <pre>
        {{ question }}
    </pre> -->

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md q-mx-auto q-mt-md"
      style="width: 80%;"
    >
      <h4 class="text-center">Edit Question</h4>
      <q-input
        filled
        v-model="question.title"
        label="Title"
        hint="Your Title"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-editor v-model="question.description" />

      <div>
        <q-btn label="Update" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'EditQuestion',
  created() {
    let questionId = this.$route.params.id
    this.$store.dispatch('FETCH_MY_QUESTION_DETAIL', questionId)
  },
  computed: {
    question: {
      get() {
        return this.$store.state.question
      },
      set(value) {
        this.value = value
      }
    }
  },
  methods: {
    onSubmit() {
      //   console.log(this.question.description, this.question.title)
      let questionId = this.$route.params.id
      axios({
        method: 'put',
        url: 'http://3.1.84.218:3000/questions/update/' + questionId,
        headers: {
          token: localStorage.token
        },
        data: {
          title: this.question.title,
          description: this.question.description
        }
      })
        .then(({ data }) => {
          //   console.log(data)
          this.$router.push('/my-questions')
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Question updated'
          })
        })
        .catch((err) => {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Something went wrong'
          })
        })
    },

    onReset() {
      let questionId = this.$route.params.id
      this.$store.dispatch('FETCH_MY_QUESTION_DETAIL', questionId)
    }
  }
}
</script>

<style></style>
