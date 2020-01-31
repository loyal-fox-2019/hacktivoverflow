<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="question-preview container mt-3">
            <router-view/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  components: {

  },
  computed : {
    
  },
  created(){
    if(!this.$store.state.loginStatus){
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  .side-bar{
    background-color: white;
    box-shadow: 12px 12px 12px 0 rgba(0, 0, 0, .03);
  }
  .question-preview{
    max-height: 90vh;
    overflow: scroll;
    scrollbar-width: none;
  }

</style>