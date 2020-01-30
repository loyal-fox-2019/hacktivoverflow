<template>
  <div id="home">
    <div class="container">
      <div class="row justify-content-center" style="padding-top: 140px;">
        <div class="col-lg-10">
          <h1 style="color: #fff; text-align: center">{{title}}</h1>
          <h3 style="color: #fff; text-align: center;">We build products that empower developers 
            and connect them to solutions that enable productivity, 
            growth, and discovery.</h3>
          <div class="button-container" style="text-align: center;">
            <router-link to="/post" class="btn btn-lg btn-developer mt-3">For Developers</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {

  },
  data() {
    return {
      title: `We <3 people who code`
    }
  }
}
</script>

<style scoped>
#home {
  background: linear-gradient(rgba(0, 0, 0, 0.4), 
  rgba(0, 0, 0, 0.4)), url('../assets/images/home-bg-1.jpg') no-repeat center;
  min-width: 100%;
  min-height: 100%;
  height: 91.6vh;
  background-size: cover;
  position: relative;
}

.btn-developer {
  border-color: #f48024; 
  color: #f48024;
}

.btn-developer:hover {
  background-color: #f48024 !important;
  color: #ffffff;
}
</style>
