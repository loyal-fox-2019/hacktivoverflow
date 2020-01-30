<template>
  <div id="app">
    <navbar></navbar>
    <div class="container-fluid no-gutters">
      <div class="row">
        <div class="col-2">
          <dash-board></dash-board>
        </div>
        <div class="col-10 overflow-auto isiUtama">
          <router-view />
        </div>
      </div>
    </div>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>-->
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import Navbar from "./components/Narvbar.vue";
import DashBoard from "./components/DashBoard.vue";
export default {
  name: "app",
  components: {
    Navbar,
    DashBoard
  }
};
</script>

<style scoped>
.isiUtama {
  height: 90vh;
}
</style>