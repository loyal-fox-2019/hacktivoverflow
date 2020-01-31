<template>
  <div class="mx-auto" style="70vw">
      <h1 class="mx-auto mt-10" style="text-align:center;">My Questions</h1>
<Cards
:tipe="'questions'"
v-for="(item, index) in myList"
:key="index"
:data="item"
style="width: 60vw"
class="mt-12"
/>
  </div>
</template>

<script>
import Cards from '../components/Cards'
export default {
  name: 'MyPage',
  components: {
    Cards
  },
  data () {
    return {
      myList: []
    }
  },
  methods: {
    fetchMine () {
      this.axios({
        url: 'questions/mine',
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.myList = data
        }).catch((err) => {
          console.log(err.response.data.message)
          this.$store.commit('SET_ALERT', {
            message: err.response.data.message,
            variant: 'danger'
          })
        })
    }
  },
  beforeMount () {
    this.fetchMine()
  }
}
</script>

<style>

</style>
