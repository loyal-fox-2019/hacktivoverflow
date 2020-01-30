<template>
  <div class="question">
    <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
      <b-form-group
        label="Title:" style="text-align:left"
      >
        <b-form-input
          id="input-1"
          v-model="form.title"
          type="text"
          required
          placeholder="Enter title"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Question:"
         style="text-align:left"
      >
        <wysiwyg
          id="input-2"
          v-model="form.content"
          type="textarea"
          required
          placeholder="Enter question here"
        ></wysiwyg>
      </b-form-group>

      <div class="button-group">
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>

export default {
  name: 'thread',
  data () {
    return {
      form: {
        title: '',
        content: '',
        tags: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('addThread', this.form)
    },
    onReset () {
      this.form.title = ''
      this.form.content = ''
    }
  },
  components: {
  }
}
</script>

<style scoped>
  .question {
    width: 80%;
    height: 500px;
    margin: auto;
    border: 1px solid #9c9c9c;
    padding: 2rem;
  }
  .hero-center {
    text-align: center;
    font-family: 'Bree Serif', serif;
    color: #5dbeba;
  }
  .button-group {
    display: flex;
    flex-direction: row-reverse;
  }
  .button-group button {
    margin-left: 1rem;
  }
</style>
