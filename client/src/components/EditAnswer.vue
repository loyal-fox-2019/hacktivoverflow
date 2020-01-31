<template>
  <div>
    <!-- <pre> {{ $route.params.id }} </pre>

    <pre>
        {{ answer }}
    </pre> -->
    <q-intersection transition="scale">
      <q-form
        @submit="confirm = true"
        @reset="onReset"
        class="q-gutter-md q-mx-auto q-mt-md"
        style="width: 80%;"
      >
        <h4 class="text-center">Edit Answer</h4>

        <q-editor v-model="answer.description" />

        <div>
          <q-btn label="Update" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
          <q-btn
            label="Back"
            type="button"
            color="primary"
            @click="$router.go(-2)"
            flat
            class="q-ml-sm"
          />
        </div>

        <q-dialog v-model="confirm" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar color="primary" text-color="white">
                <i class="fas fa-question"></i>
              </q-avatar>
              <span class="q-ml-sm"
                >Are you sure want to update your answer?</span
              >
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="primary" v-close-popup />
              <q-btn
                @click="onSubmit"
                flat
                label="Yes"
                color="primary"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-form>
    </q-intersection>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'EditAnswer',
  created() {
    let answerId = this.$route.params.id
    this.$store.dispatch('FETCH_ANSWER_DETAIL', answerId)
  },
  data() {
    return {
      confirm: false
    }
  },
  computed: {
    answer: {
      get() {
        return this.$store.state.answer
      },
      set(value) {
        this.value = value
      }
    }
  },
  methods: {
    onSubmit() {
      //   console.log(this.question.description, this.question.title)
      let answerId = this.$route.params.id
      axios({
        method: 'put',
        url: 'http://3.1.84.218:3000/answers/update/' + answerId,
        headers: {
          token: localStorage.token
        },
        data: {
          description: this.answer.description
        }
      })
        .then(({ data }) => {
          // console.log(data)
          this.$router.go(-2)
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Answer updated'
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
      let answerId = this.$route.params.id
      this.$store.dispatch('FETCH_ANSWER_DETAIL', answerId)
    }
  }
}
</script>

<style></style>
