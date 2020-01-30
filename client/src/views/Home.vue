<template>
  <b-container>
    <b-row>
      <b-col>
        <!-- <b-input-group style="width: 50%;margin:2rem auto;">
          <b-form-input placeholder="Search questions..."></b-form-input>
          <b-input-group-append>
            <b-button size="sm" text="Button" variant="dark"><b-icon icon="search"></b-icon></b-button>
          </b-input-group-append>
        </b-input-group> -->
        <b-input-group v-if="isLogin" style="width: 50%;margin:2rem auto;">
          <b-form-tags v-model="tags" class="mb-2" placeholder="Add watched tag by press enter...">
          </b-form-tags>
          <b-input-group-append>
            <b-button size="sm" text="Button" variant="dark" @click="updateTags"><i class="far fa-save"></i></b-button>
          </b-input-group-append>
        </b-input-group>
        <QuestionList
              v-for="question in questions"
              :key="question._id"
              :question="question"
            />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import QuestionList from '@/components/QuestionList.vue'

export default {
  name: 'home',
  data () {
    return {
      tags: []
    }
  },
  components: {
    QuestionList
  },
  methods: {
    fetchQuestions () {
      this.$store.dispatch('fetchQuestions')
    },
    updateTags () {
      this.$store.dispatch('updateTags', this.tags)
    },
    async fetchTags () {
      await this.$store.commit('CHECK_LOGIN')
      this.tags = this.$store.state.watchedTags
    }
  },
  watch: {
    tagsComp (n, o) {
      if (this.tagsComp === null) {
        this.tags = null
      }
    }
  },
  computed: {
    questions () {
      return this.$store.state.questions
    },
    isLogin () {
      return this.$store.state.isLogin
    },
    tagsComp () {
      return this.$store.state.watchedTags
    }
  },
  created () {
    this.fetchQuestions()
    this.fetchTags()
  }
}
</script>
<style>
  .add-thread {
    display: block;
    margin-bottom: 1rem;
  }
</style>
