<template>
  <div class="home">
    <h1 class="title-home">We &lt;3 people who code</h1>
    <div class="text-wrapper d-block mx-auto">
      <p class="text-center sub-title-home mb-3">
        We build products that empower developers and connect them to solutions
        that enable productivity, growth, and discovery.
      </p>
    </div>
    <div class="wrapper-btn">
      <router-link to="/questions">
        <el-button type="warning" plain class="btn-see">See All Question and Answer</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style scoped>
.home {
  min-height: calc(100vh - 69px);
  background-color: #ed7f24;
}
.wrapper-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}
.title-home {
  font-weight: 800;
  text-align: center;
  font-size: 55px;
  padding-top: 150px;
  color: #ffffff;
}
.sub-title-home {
  font-size: 21px;
  margin-bottom: 0;
  color: #ffffff;
}
.text-wrapper {
  width: 30%;
}
a:hover {
  text-decoration: none!Important;
}
</style>
