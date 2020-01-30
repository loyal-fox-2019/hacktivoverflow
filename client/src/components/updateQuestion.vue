<template>
  <div class="d-flex justify-content-center row py-5 konten">
    <!-- product -->
    <div class="card col-sm-8 p-0 mb-5">
      <h5 class="card-header" style="margin:0">Product</h5>
      <div class="card-body">
        <h5 class="card-title">Judul Pertanyaan:</h5>
        <b-form-input
          v-model="content.judul"
          placeholder="Masukkan judul pertanyaan"
        ></b-form-input>
        <h5 class="card-title mt-3">Isi Pertanyaan:</h5>
        <b-form-textarea
          id="textarea"
          v-model="content.keterangan"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
        <h5 class="card-title mt-3">Tags:</h5>

        <b-form-tags
          v-model="content.tags"
          separator=" "
          placeholder="Enter new tags separated by space"
          remove-on-delete
          no-add-on-enter
          class="mb-2"
        ></b-form-tags>
        <b-button @click.prevent="updateKonten" class="mt-3" variant="info"
          >Edit Content</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'
export default {
  name: 'updateQuestion',
  data() {
    return {
      data: {
        keterangan: '',
        judul: '',
        tags: ''
      }
    }
  },
  methods: {
    ...mapActions(['addContent', 'getAllContent']),
    updateKonten() {
      console.log(this.content)
      axios({
        method: 'patch',
        url: `http://localhost:3000/content/${this.content._id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          keterangan: this.content.keterangan,
          judul: this.content.judul,
          tags: this.content.tags
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.getAllContent()
        })
        .catch(err => {
          console.log(err)
        })
      this.$router.push({
        path: '/usercontent'
      })
    }
  },
  computed: {
    content() {
      return this.$store.state.content2update
    }
  }
}
</script>
<style scoped>
.konten {
  background-color: #f5f5f5;
  height: 100vh;
}
</style>
