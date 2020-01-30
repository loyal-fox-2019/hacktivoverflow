<template>
  <div>
    <Content :content="konten"></Content>
    <div class="container">
      <div class="row" style="place-content:center">
        <div class="col-8">
          <b-form-textarea
            id="textarea"
            v-model="answer"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </div>
        <div class="col" style="max-width:min-content;">
          <button
            @click.prevent="addComment"
            class="btn btn-success btn-md ml-auto"
          >
            Add Answer
          </button>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row" style="place-content:center">
        <div class="col-6">
          <Comment
            v-for="(data, key) in konten.comment"
            :key="key"
            :comment="data"
          ></Comment>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Comment from '../components/Comment'
import Content from '../components/ContentDesc'
import axios from 'axios'
export default {
  name: 'ContentDescription',
  data() {
    return {
      answer: ''
    }
  },
  components: {
    Content,
    Comment
  },
  methods: {
    ...mapActions(['getContentById', 'getAllContent']),
    update() {
      let contentId = this.$route.params.contentId
      console.log(contentId)
      this.getContentById(contentId)
    },
    addComment() {
      console.log('ini dari storenya ')
      console.log(this.konten._id)
      axios({
        method: 'post',
        url: `http://localhost:3000/content/comment/${this.konten._id}`,
        data: {
          answer: this.answer
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log('berhasil add comment')
          console.log(data)
          this.getAllContent()
          setTimeout(() => {
            this.getContentById(this.konten._id)
          }, 2000)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    konten() {
      return this.$store.state.contentDetail
    },
    contentId() {
      return this.$route.params.contentId
    },
    allContent() {
      return this.$store.state.allContent
    }
  },
  created() {
    this.getAllContent()
    this.update()
  },
  watch: {
    contentId: function(newValue, oldValue) {
      if (newValue) {
        this.update()
      }
    }
  }
}
</script>

<style></style>
