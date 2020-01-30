<template>
<div>
  <b-container>
    <b-row>
      <b-col cols="12" class="flex-me mb-5 bg-white p-4 br-2 rounded">
        <div class="left">
          <VoteButton :modeURL="'question'" :data="currentQuestion"/>
        </div>
        <div class="right" style="width:100%;">
          <h1>{{currentQuestion.title}}</h1>
          <hr>
          <p><span v-html="currentQuestion.content"></span></p>
        </div>
        <!-- <b-button
          class="flex-to-right"
          variant="danger"
          @click="deleteThread(currentQuestion._id)">
          <b-icon icon="x"></b-icon>
        </b-button> -->
      </b-col>
      <b-col cols="12">
        <hr>
        <b-form-group>
            <div v-if="tagLength > 0" class="tags-wrapper" >
              <b-badge pill variant="secondary" v-for="tag in tags" :key="tag.id" class="mr-1">{{tag}}</b-badge>
            </div>
          </b-form-group>
      </b-col>
      <b-col cols="12">
        <b-form @submit.prevent="onSubmit" @reset.prevent="onReset" class="mb-5 mt-4">
          <b-form-group>
            <wysiwyg
              id="input-2"
              v-model="form.content"
              type="textarea"
              required
              placeholder="Enter reply here"
            ></wysiwyg>
          </b-form-group>
          <div class="button-group">
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </div>
        </b-form>
        <AnswerList v-for="answer in currentQuestion.answers" :key="answer._id" :answer="answer" />
      </b-col>
    </b-row>
  </b-container>
</div>
</template>

<script>
import VoteButton from '../components/VoteButton.vue'
import AnswerList from '../components/AnswerList.vue'

export default {
  name: 'SingleQuestion',
  components: {
    VoteButton,
    AnswerList
  },
  data () {
    return {
      form: {
        content: ''
      }
    }
  },
  created () {
    this.$store.dispatch('fetchQuestion', this.$route.params.id)
  },
  computed: {
    currentQuestion () {
      return this.$store.state.currentQuestion
    },
    tagLength () {
      return this.$store.state.currentQuestion.tags.length
    },
    tags () {
      return this.$store.state.currentQuestion.tags
    }
  },
  methods: {
    replyThread () {
    },
    async onSubmit () {
      const payload = {
        id: this.currentQuestion._id,
        data: {
          content: this.form.content
        }
      }
      await this.$store.dispatch('replyThread', payload)
      this.form.content = ''
    },
    onReset () {
      this.form.content = ''
    },
    deleteThread (id) {
      // this.$store.dispatch('deleteThread', id)
    }
  }
}
</script>

<style scoped>
  .flex-me {
    display: flex;
  }
  .editr {
    background-color: #fff;
  }
  input[type="textarea"] {
    background-color: #fff !important;
  }
  .button-group {
    display: flex;
    flex-direction: row-reverse;
  }
  .button-group button {
    margin-left: 1rem;
  }
  .flex-to-right {
    margin-left: auto;
    align-self: flex-start;
  }
  .tags-wrapper {
    display: flex;
    justify-content: flex-end;
  }
</style>
