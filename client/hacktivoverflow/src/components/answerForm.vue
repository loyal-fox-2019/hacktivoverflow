<template>
  <b-form @submit.prevent="postAnswer" class="animated fadeInDown">
    <b-form-group
        id="input-group-1"
        label="Title:"
        label-for="input-1"
    >
        <b-form-input
        id="input-1"
        type="text"
        required
        placeholder="title"
        v-model="title"
        ></b-form-input>
    </b-form-group>
        <b-form-group
        id="input-group-2"
        label="Description:"
        label-for="input-2"
    >
      <quillEditor
      v-model="content"
      id="input-3">
      </quillEditor>
    </b-form-group>
    <b-button pill variant="dark" type="submit" class="sub" v-if="!editans">Submit</b-button>
    <b-button pill variant="dark" type="submit" class="sub" v-if="editans" @click.prevent="answeredit">Edit</b-button>
    <b-button pill variant="warning" type="submit" class="sub" v-if="editans" @click.prevent="cancels">Cancel</b-button>
  </b-form>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import Swal from 'sweetalert2'

export default {
  props: ['data'],
  created () {
    if (this.data.title !== null || this.data.title !== undefined) {
      this.content = this.data.description
      this.title = this.data.title
      this.editans = true
    }
  },
  data () {
    return {
      content: '',
      title: '',
      editans: false
    }
  },
  components: {
    quillEditor
  },
  methods: {
    postAnswer () {
      if (this.$store.state.login === true) {
        let input = {
          title: this.title,
          description: this.content,
          question: this.$route.params.id
        }
        let tmp = {
          input,
          route: this.$route.params.id
        }
        this.$store.dispatch('postAnswer', tmp)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please Login First'
        })
      }
    },
    answeredit () {
      if (this.$store.state.login === true) {
        let tmp = {
          question: this.$route.params.id,
          id: this.data._id,
          input: {
            title: this.title,
            description: this.content
          }
        }
        this.$emit('close')
        this.$store.dispatch('editAnswer', tmp)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please Login First'
        })
      }
    },
    cancels () {
      this.$emit('close')
    }
  }
}
</script>

<style>
.sub{
  position: relative;
  float: right
}

</style>
