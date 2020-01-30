<template>
  <div>
    <form class="w-full max-w-lg">

    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Title
        </label>
        <input v-model="title" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Question's title">
      </div>
    </div>

    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Tags
        </label>
        <input v-model="tags" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Question's tags">
      </div>
    </div>

    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
          Content
        </label>
        <quill-editor
          ref="myTextEditor"
          v-model="content"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
    ></quill-editor>
      </div>
    </div>
    
    <div class="flex items-center justify-between">
      <button @click.prevent="submitQuestion" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Submit
      </button>
    </div>
  </form>
  </div>
</template>

<script>
export default {
  name: 'Post',
  data() {
    return {
      title: "",
      tags: "",
      content: "",
      id: "",
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
            ["link"]
          ]
        }
      }
    }
  },
  methods: {
    // eslint-disable-next-line
    onEditorBlur(editor) {},
    // eslint-disable-next-line
    onEditorFocus(editor) {},
    // eslint-disable-next-line
    onEditorReady(editor) {},
    submitQuestion() {
      if (this.id) {
        this.$axios({
          method: 'PUT',
          url: `questions/${this.id}`,
          data: {
            title: this.title,
            tags: this.tags,
            content: this.content
          }
        })
        .then(({ data }) => {
          console.log(data)
          this.$store.commit('SEND_SUCCESS', 'Question successfully edited!')
          this.$store.dispatch('fetchQuestion', this.id);
          this.$router.push(`/questions/${this.id}`).catch(() => {})
        })
        .catch(err => {
          this.$store.commit('SEND_ERROR', err.response.data.error)
        })
        .finally(() => {
          this.resetForm();
        })
      } else {
        this.$axios({
          method: 'POST',
          url: 'questions',
          data: {
            title: this.title,
            tags: this.tags,
            content: this.content
          }
        })
        .then(({ data }) => {
          this.$store.commit('SEND_SUCCESS', 'Question successfully created!')
          this.$store.dispatch('fetchQuestions');
          this.$router.push(`/questions/${data._id}`).catch(() => {})
        })
        .catch(err => {
          this.$store.commit('SEND_ERROR', err.response.data.error)
        })
        .finally(() => {
          this.resetForm();
        })
      }
    },
    editQuestion() {
      this.title = this.question.title
      this.tags = this.question.tags
      this.content = this.question.content
      this.id = this.question._id
    },
    resetForm() {
      this.tags = ""
      this.title = ""
      this.content = ""
      this.id = ""
    }
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill;
    },
    contentCode() {
      // eslint-disable-next-line
      return hljs.highlightAuto(this.content).value;
    },
    question() {
      return this.$store.state.question
    },
  },
  created() {
    if (this.$route.params.id) {
      this.editQuestion()
    }
  }
}
</script>

<style>

</style>