<template>
  <div class="d-flex justify-content-center row py-5 konten">
    <!-- product -->
    <div class="card col-sm-8 p-0 mb-5">
      <h5 class="card-header" style="margin:0">Product</h5>
      <div class="card-body">
        <h5 class="card-title">Judul Pertanyaan:</h5>
        <b-form-input
          v-model="data.judul"
          placeholder="Masukkan judul pertanyaan"
        ></b-form-input>
        <h5 class="card-title mt-3">Isi Pertanyaan:</h5>
        <b-form-textarea
          id="textarea"
          v-model="data.keterangan"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
        <h5 class="card-title mt-3">Tags:</h5>

        <b-form-tags
          v-model="data.tags"
          separator=" "
          placeholder="Enter new tags separated by space"
          remove-on-delete
          no-add-on-enter
          class="mb-2"
        ></b-form-tags>
        <b-button @click.prevent="tambahkanKonten" class="mt-3" variant="info"
          >Button</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'AddContent',
  data() {
    return {
      data: {
        keterangan: '',
        judul: '',
        tags: ['tagSample']
      }
    }
  },
  methods: {
    ...mapActions(['addContent']),
    tambahkanKonten() {
      this.addContent(this.data)
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
