<template>
  <b-form @submit.prevent="postQuestion" class="animated fadeInDown">
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
      id="input-2">
      </quillEditor>
    </b-form-group>
        <b-form-group
        id="input-group-3"
        label="Tags:"
        label-for="input-3"
    >
     <b-form-tags v-model="tag" class="mb-2"></b-form-tags>
    </b-form-group>
    <b-button pill variant="danger" class="can" @click="cancel">Cancel</b-button>
    <b-button pill variant="dark" type="submit" v-if="!edit">Submit</b-button>
    <b-button pill variant="dark" type="submit" v-if="edit" @click.prevent="editQuest">Edit</b-button>
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
    if (this.data === 'ask') {
      console.log('s')
    } else {
      setTimeout(() => { this.patchForm() }, 1000)
    }
  },
  data () {
    return {
      content: '',
      tag: [],
      title: '',
      edit: false
    }
  },
  components: {
    quillEditor
  },
  computed: {
    titleCom () {
      return this.$store.state.questionDetail
    }
  },
  methods: {
    postQuestion () {
      if (this.$store.state.login === true) {
        let input = {
          title: this.title,
          description: this.content,
          tag: this.tag
        }
        this.$emit('submitQ')
        this.$store.dispatch('postQuestion', input)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please Login First'
        })
      }
    },
    cancel () {
      this.$emit('cancel')
    },
    editQuest () {
      let tmp = {
        id: this.$route.params.id,
        input: {
          title: this.title,
          description: this.content,
          tag: this.tag
        }
      }
      this.$emit('edited')
      this.$store.dispatch('editQuestion', tmp)
    },
    patchForm () {
      if (this.data !== undefined || this.data !== null) {
        this.content = this.titleCom.description
        this.tag = this.titleCom.tag
        this.title = this.titleCom.title
        this.edit = true
      }
    }
  }

}
</script>

<style>
.can{
  margin-right: 20px;
}

</style>
