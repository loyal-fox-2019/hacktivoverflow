<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark positionNya">
      <!-- <router-link to="/">Home</router-link>
      <router-link class="ml-2" to="/about">About</router-link>
      <router-link class="ml-2" to="/login">Register</router-link>
      <router-link class="ml-2" to="/products">Product List</router-link>
      <router-link class="ml-2" to="/additem">Admin to Add item</router-link>
      <router-link class="ml-2" to="/usercart">User Cart Page</router-link> -->
      <h3 style="color:white; cursor:pointer" @click.prevent="home">
        HacktiveOverFlow
      </h3>
      <div
        class="collapse navbar-collapse justify-content-end"
        id="navbarTogglerDemo02"
      >
        <span class="spanduk h1 mb-2" v-if="!showLoginPage">
          <b-icon
            @click="questionPage"
            class="mt-3 mr-3"
            icon="document-text"
            variant="secondary"
            v-b-tooltip.hover
            title="Create Question"
            style="cursor:pointer;"
          ></b-icon>
        </span>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
          <button v-show="showLoginPage" class="btn btn-info my-2 my-sm-0 ml-3">
            Login
          </button>
          <div class="img-frame-circle dropleft">
            <img
              src="https://img.icons8.com/officel/2x/user.png"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              alt="Image"
              class="img-fluid dropdown-toggle cursorNya"
              v-show="!showLoginPage"
            />
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a
                @click.prevent="userPage"
                class="dropdown-item"
                style="cursor:pointer"
                >Profile</a
              >
              <a
                @click.prevent="keluar"
                class="dropdown-item"
                style="cursor:pointer"
                >Sign Out</a
              >
            </div>
          </div>
        </form>
      </div>
    </nav>
    <router-view v-if="!showLoginPage" />
    <RegisterLoginPage v-show="showLoginPage"></RegisterLoginPage>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import RegisterLoginPage from './views/RegisterLoginPage'
export default {
  name: 'App',
  components: {
    RegisterLoginPage
  },
  methods: {
    ...mapMutations(['HIDE_LOGINPAGE']),
    ...mapActions(['getAllContent', 'signOut', 'getUserContent']),
    home() {
      this.$router.push({
        path: '/'
      })
    },
    keluar() {
      this.signOut()
    },
    questionPage() {
      this.$router.push({
        path: '/addcontent'
      })
    },
    userPage() {
      this.$router.push({
        path: '/usercontent'
      })
    }
  },
  computed: {
    showLoginPage() {
      return this.$store.state.showLoginPage
    }
  },
  created() {
    if (localStorage.token) {
      this.getAllContent()
      this.getUserContent()
      this.HIDE_LOGINPAGE()
    }
  }
}
</script>

<style scoped>
.img-frame-circle {
  position: relative;
}
.cursorNya {
  cursor: pointer;
}
.img-frame-circle > .img-fluid {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-left: 10px;
  background-color: #b8860b;
  object-fit: cover;
  object-position: center right;
}
</style>
