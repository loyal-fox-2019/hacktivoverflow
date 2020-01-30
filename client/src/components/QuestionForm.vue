<template>
  <div>
    <v-content>
      <v-container>
        <Toolbar :title="{ name: 'Ask Question' }" v-show="!isEdit"/>
        <v-form>
          <v-col cols="12" sm="12">
            <v-text-field v-model="title" label="Title" required></v-text-field>
          </v-col>
          <quillEditor ref="myTextEditor" v-model="content"> </quillEditor>
          <div class="btn-group mt-2">
            <v-btn
              class="mr-4"
              @click.prevent="edit"
              color="orange"
              style="color: white;"
              v-show="isEdit"
              >Edit</v-btn
            >
            <v-btn
              class="mr-4"
              @click.prevent="submit"
              color="primary"
              v-show="!isEdit"
              >Submit</v-btn
            >
            <v-btn @click.prevent="clear" color="red" style="color: white;"
              >Clear</v-btn
            >
          </div>
        </v-form>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import Toolbar from '@/components/Toolbar'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: 'questionForm',
  data() {
    return {
      title: '',
      content: ''
    }
  },
  components: {
    quillEditor,
    Toolbar
  },
  methods: {
    submit() {
      const form = {
        title: this.title,
        content: this.content
      }
      this.$store.dispatch('CREATE_QUESTION', form)
    },
    clear() {
      this.title = ''
      this.content = ''
    }
  },
  computed: {
    isEdit() {
      return this.$store.state.editStatus
    }
  }
}
</script>

<style lang="css"></style>
