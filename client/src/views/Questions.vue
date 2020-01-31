<template>
  <div class="container mx-auto flex flex-col text-left w-3/5">
    <Loading 
      :active.sync="isLoading" 
      :can-cancel="false"
      :is-full-page="true">
    </Loading>
    <div class="p-2 items-center mt-20 flex flex-row justify-between">
      <h3 class="text-xl">All Questions</h3>
      <div class="py-2">
        <router-link
          to="/new-question"
          class="p-2 bg-blue-100 border border-blue-600 hover:bg-blue-200 rounded text-blue-600">
          Ask a Question
        </router-link>
        <span
          @click.prevent="openedWatchedTags = !openedWatchedTags"
          class="ml-2 p-2 cursor-pointer bg-blue-100 border border-blue-600 hover:bg-blue-200 rounded text-blue-600">
          Watched Tags
        </span>
      </div>
    </div>
    <transition name="fade">
      <div 
        v-if="openedWatchedTags"
        class="p-4 mb-8 border border-gray-300 bg-blue-100 flex flex-col rounded shadow-md min-h-48 p-2 mb-2">
        <div class="flex justify-between">
          <h3>Watched Tags</h3>
          <div
            @click.prevent="openedWatchedTags = !openedWatchedTags"
            class="arrow cursor-pointer"
            ><font-awesome-icon icon="angle-up"></font-awesome-icon>
          </div>
        </div>
        <div class="mt-4 flex">
          <div
            v-for="tag in watchedTags" :key="tag"
            class="shadow p-1 hover:bg-blue-300 cursor-pointer inline-block flex mb-2 bg-gray-200 rounded-full px-3 text-sm font-semibold text-gray-700 mr-2">
            <span class="my-auto inline-block">{{ tag }}</span>
            <img 
              @click.prevent="deleteTag(tag)"
              class="my-auto w-6 ml-2 p-1 hover:bg-orange-500 rounded-full" src="https://img.icons8.com/ios-glyphs/30/000000/close-window.png">
          </div>
        </div>
        <div>
          <form @submit.prevent="addTags">
            <div class="my-4">
              <h4 class="text-gray-700">Add Tags:</h4>
              <span
                class="text-sm text-gray-600">
                (Tags are separated by comma and all whitespace between will be omitted)
              </span>
              <input
                v-model="tags"
                class="shadow-md border rounded-sm border-gray-200 w-full p-2"
                placeholder="Eg. python, go, java">
            </div>
            <button
              class="bg-blue-400 px-2 py-1 rounded-sm shadow-md text-white hover:bg-blue-700"
              type="submit">
              Submit 
            </button>
          </form>
        </div>
      </div>
    </transition>
    <QuestionCard
      v-for="question in questions"
      :key="question._id"
      :question="question"
    />
    
  </div>
</template>

<script>
import { mapState } from 'vuex'
import QuestionCard from '../components/QuestionCard'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
  name: 'Questions',
  components: {
    QuestionCard,
    Loading
  },
  data () {
    return {
      openedWatchedTags: false,
      tags: ''
    }
  },
  methods: {
    addTags () {
      const payload = {
        tags: this.tags
      }
      this.$store.dispatch('addTags', payload)
      this.tags = ''
    },
    deleteTag(tag) {
      this.$store.dispatch('removeTag', tag)
    }
  },
  computed: {
    ...mapState(['isLoading', 'questions', 'watchedTags'])
  },
  created () {
    this.$store.dispatch('fetchAllQuestions')
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-enter {
  animation: bounce-in 0.8s
}

.fade-leave-active, .fade-leave {
  animation: bounce-out 0.3s
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
</style>