<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="white" class="nav-bor fixed-top">
      <b-navbar-brand to="/">
        <img class="image-logo" src="../../public/iconstack.png" alt="stackoverflow">
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav v-if="!status" class="ml-auto">
            <b-button size="sm" class="my-2 my-sm-0 mr-3 nav-but login" @click.prevent="loginPage">Log in</b-button>
            <b-button size="sm" class="my-2 my-sm-0 nav-but signup" @click.prevent="signupPage">Sign up</b-button>
        </b-navbar-nav>
        <b-navbar-nav v-if="status" class="ml-auto">
            <b-button size="sm" class="my-2 my-sm-0 nav-but logout" @click.prevent="logout">Log out</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import swal from 'sweetalert2'

export default {
  methods: {
    loginPage () {
      this.$router.push('/login')
    },
    signupPage () {
      this.$router.push('/signup')
    },
    logout () {
      swal.fire({
        title: 'Are you sure to Logout?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Logout!'
      }).then((result) => {
        if (result.value) {
          swal.fire({
            title: 'Success!',
            text: 'See you soon.....',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          localStorage.removeItem('token')
          this.$store.commit('SET_LOGIN', false)
          this.$router.push('/')
        }
      })
    }
  },
  computed: {
    status () {
      return this.$store.state.isLogin
    }
  }
}
</script>

<style scoped>
.image-logo {
  width: 200px
}

.nav-bor {
  border-top: 4px solid #f48024;
  border-bottom: 0.8px solid #cccccc
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1); */
}

.nav-but {
  width: 70px
}

.login,
.login:focus {
  background-color: #e2ecf4;
  color: #39739e;
  border-color: #39739e;
  box-shadow: none !important;
}

.login:hover {
  background-color: #b5cee3;
}

.signup,
.signup:focus {
  background-color: #0196ff;
  color: white;
  border-color: #39739e;
  box-shadow: none !important;
}

.signup:hover {
  background-color: #0077cc;
}

.logout,
.logout:focus {
  background-color: #f48024 !important;
  border: #f48024 !important;
  box-shadow: none !important;
}
.logout:hover {
  background-color: #cb9b2d !important;
  border: #cb9b2d !important;
}
</style>
