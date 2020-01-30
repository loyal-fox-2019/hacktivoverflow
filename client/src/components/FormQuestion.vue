<template>
  <div>
    <q-btn label="Ask Question" color="primary" @click="dialog = true">
      <q-tooltip>
        Post New Question
      </q-tooltip>
    </q-btn>
    <q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-light-blue-2 text-black">
        <q-bar>
          <q-space />

          <q-btn
            dense
            flat
            icon="minimize"
            @click="maximizedToggle = false"
            :disable="!maximizedToggle"
          >
            <q-tooltip
              v-if="maximizedToggle"
              content-class="bg-white text-primary"
              >Minimize</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            flat
            icon="crop_square"
            @click="maximizedToggle = true"
            :disable="maximizedToggle"
          >
            <q-tooltip
              v-if="!maximizedToggle"
              content-class="bg-white text-primary"
              >Maximize</q-tooltip
            >
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section class="q-pt-none">
          <div class="q-pa-md q-mx-auto" style="max-width: 50%;">
            <q-form
              @submit.prevent="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
            >
              <h4 class="text-center">Post Your Question</h4>
              <q-input
                filled
                v-model="title"
                label="Question Title"
                hint="Your question title"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Title must not empty'
                ]"
              />

              <div class="q-mt-lg text-h6">
                <label>Description :</label>
                <Editor @text="text" />
              </div>

              <div class="flex justify-center">
                <q-btn label="POST QUESTION" type="submit" color="primary" />
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
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar color="primary" text-color="white">
            <i class="fas fa-question"></i>
          </q-avatar>
          <span class="q-ml-sm">Are you sure want to post this question?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Yes"
            color="primary"
            v-close-popup
            @click="postQuestion"
          />
          <q-btn flat label="Cancel" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import Editor from './Editor'
export default {
  name: 'FormQuestion',
  components: {
    Editor
  },
  data() {
    return {
      name: null,
      age: null,
      accept: false,
      title: '',
      description: '',
      dialog: false,
      confirm: false,
      maximizedToggle: true
    }
  },
  computed: {},
  methods: {
    onSubmit() {
      this.confirm = true
    },
    text(value) {
      this.description = value
    },
    onReset() {
      this.title = null
      this.$store.state.descriptionText = null
    },
    postQuestion() {
      // console.log(this.description, this.title)
      axios({
        method: 'post',
        url: 'http://localhost:3000/questions/',
        headers: {
          token: localStorage.token
        },
        data: {
          title: this.title,
          description: this.description
        }
      })
        .then(({ data }) => {
          // console.log(data)
          this.$store.dispatch('FETCH_QUESTIONS')
          this.$store.dispatch('FETCH_MY_QUESTIONS')
          this.dialog = false
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Question posted'
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
    }
  }
}
</script>

<style></style>
