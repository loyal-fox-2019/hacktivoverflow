<template>
  <div>
  <b-navbar toggleable="lg" type="dark" style="background-color: #020104;">
    <!-- <b-img src="https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/so/so-logo.png?v=9c558ec15d8a" fluid alt="Responsive image"></b-img> -->
    <b-navbar-brand href="#"><router-link :to="'/'">HacktivOverflow?</router-link></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#"><router-link :to="'/myquestion'"> My Questions </router-link></b-nav-item>
        <b-nav-item-dropdown>
          <template v-slot:button-content>
          <em>User</em>
        </template>
        <b-dropdown-item href="#" v-on:click.prevent="signOut">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="searched"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit" v-on:click.prevent="searching">Search</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
    name: 'navbar',
    methods:{
      toProfile(){
        this.$router.push('/profile')
      },
      searching(){
        let filter = []
        if(!this.searched){
          this.$store.dispatch('getAllQuestions')
        }else{
          console.log('masuk')
          // this.$store.dispatch('getAllQuestions')
          this.$store.state.allQuestions.forEach(element=>{
            // console.log(element.title,'elemeny')
            if(element.title.includes(this.searched)){
              filter.push(element)
            }
          })
            this.$store.commit('SET_FILTERED', filter)
        }
      },
      signOut(){
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        this.$router.push('/login')
      }
    },
    data(){
      return{
        searched: ''
      }
    }
}
</script>

<style>
b-img{
    height: 10%;
    width: 10%;
}
</style>