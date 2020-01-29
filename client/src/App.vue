<template>
  <v-app>
   <NavBar class="mt-2 mb-2" style="height: 10vh"/>
    <v-content style="height: 90vh">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import NavBar from './components/NavBar';

export default {
  name: 'App',

  components: {
    // HelloWorld
    NavBar
  },

  data: () => ({
    //
  })
}
</script>
