<template>
  <div id="app">
    <form>
      <div class="form-group">
        <label for="inputTitle">Title</label>
        <input type="email" class="form-control" id="inputTitle" v-model="title">
      </div>
      <div>
        <vue-editor v-model="description"></vue-editor>
      </div>
      <button type="submit" class="btn btn-primary mt-3" v-on:click.prevent="addQue">Submit</button>
    </form>
  </div>
</template>
 
<script>
import { VueEditor } from "vue2-editor";
 
export default {
  components: {
    VueEditor,

  }, 
  data() {
    return {
      title: '',
      description: '',
    };
  },
  methods: {
    addQue() {
      let id = localStorage.getItem('id');
      axios({
          url: 'http://localhost:3000/question',
          method: 'post',
          data: {
            title: this.title,
            description: this.description,
            UserId: id,
          },
          headers: { token: localStorage.getItem('token') }
      })
      .then(({ data }) => {
          this.$store.commit('addQuestions', data);
          this.title = '';
          this.description = '';
          this.$router.push({path: '/'});
      })
      .catch(err => {
          console.log(err.response);
      })
    },
  }
};
</script>
<style scoped>

</style>