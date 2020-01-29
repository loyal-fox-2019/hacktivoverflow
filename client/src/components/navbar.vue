<template>
    <div>
        <nav id="nav" class="navbar navbar-light fixed-top">
            <router-link class="navbar-brand mr-auto" to="/">
                <img src="../../public/bulb.png" width="30" height="30" class="d-inline-block align-top" alt="">
            iHaveAQuestion!
            </router-link>
        <form class="form-inline my-2 my-lg-0 mr-auto">
            <input class="form-control mr-sm-2" type="search" placeholder="Search">
            <button class="btn btn-primary my-2 my-sm-0"
                    id="search-btn"
                    >Search</button>
        </form>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle"
                href="#" id="navbarDropdown"
                role="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
            <b>{{isLogin ? this.$cookies.get('username') : "Account" }}</b>
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="dropdown-item" href="#" to="/login" v-if="!isLogin">Login</router-link>
                <router-link class="dropdown-item" href="#" to="/register" v-if="!isLogin">Register</router-link>
                <router-link class="dropdown-item" href="#" to="/myproducts" v-if="isLogin">Manage</router-link>
                <a class="dropdown-item" href="#" v-if="isLogin" @click="logoutUser">Logout</a>
                
            </div>
        </li>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "Navbar"
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
  width: 50vw;
  margin: auto;
}
</style>