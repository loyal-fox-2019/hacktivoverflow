<template>
    <form class="container mt-5">
      <div class="form-group">
        <label for="inputTitle">Title</label>
        <input type="email" class="form-control" id="inputTitle" v-model="title">
      </div>
      <div>
        <vue-editor v-model="description"></vue-editor>
      </div>
      <button type="submit" class="btn btn-primary mt-3" v-on:click.prevent="saveQue">Submit</button>
    </form>
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
      dataOneQuestion: ''
    };
  },
  created() {
      this.dataOneQuestion = this.$store.state.findOneQuestion;
  },
  methods: {
    saveQue() {
      let id = localStorage.getItem('id');
      axios({
          url: 'http://localhost:3000/question',
          method: 'put',
          data: {
            title: this.title,
            description: this.description,
            UserId: id,
          },
          headers: { token: localStorage.getItem('token') }
      })
      .then(({ data }) => {
        //   this.$store.commit('addQuestions', data);
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