<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<script>
import navbar from './components/navbar'
export default {
  name: 'app',
  components: {
    navbar
  }
}
</script>

<style>

</style>
