<template>
    <div>
        <nav id="nav" class="navbar navbar-light fixed-top">
            <router-link class="navbar-brand mr-auto" to="/">
                <img src="../../public/bulb.png" width="30" height="30" class="d-inline-block align-top" alt="">
            iHaveAQuestion!
            </router-link>
        <form class="form-inline my-2 my-lg-0 mr-auto">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" v-model="searchbarStr">
            <button class="btn btn-primary my-2 my-sm-0"
                    id="search-btn"
                    >Search</button>
        </form>
        <li class="nav-item dropdown" style="margin-right:50px">
            <a class="nav-link dropdown-toggle"
                href="#" id="navbarDropdown"
                role="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
            <b>{{this.$store.state.isLogin ? this.$cookies.get('username') : "Account" }}</b>
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="dropdown-item" href="#" to="/login" v-if="!this.$store.state.isLogin">Login</router-link>
                <router-link class="dropdown-item" href="#" to="/register" v-if="!this.$store.state.isLogin">Register</router-link>
                <router-link class="dropdown-item" href="#" to="/account" v-if="this.$store.state.isLogin">Account</router-link>
                <a class="dropdown-item" href="#" v-if="this.$store.state.isLogin" @click="logoutUser">Logout</a>
                
            </div>
        </li>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "Navbar",
        data() {
          return {
            searchbarStr: ""
          }
        },
        methods: {
          logoutUser() {
            this.$cookies.remove('username');
            this.$cookies.remove('token');
            this.$cookies.remove('email');
            this.$store.commit('SET_LOGIN_STATE',false);
            this.$router.push('/')
          }
        }
    }
</script>

<style scoped>
#nav {
  height: 60px;
  position: fixed;
  background-color: cornflowerblue;
}

#nav a {
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  font-weight: bold;
  color: #006eff;
}

.navbar-brand {
  color: yellow !important;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
}

#search-btn {
  background-color: blue;
  color: white;
}


li {
  list-style: none;
}

.form-control {
  width: 50vw!important;
  margin: auto;
}
</style>