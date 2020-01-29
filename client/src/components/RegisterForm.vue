<template>
  <!-- Container -->
  <div class="container mx-auto">
    <div class="flex justify-center px-6 my-12">
      <!-- Row -->
      <div class="w-full xl:w-3/4 lg:w-11/12 flex shadow-xl">
        <!-- Col -->
        <div
          class="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
          style="background-image: url('198.jpg')"
        ></div>
        <!-- Col -->
        <div class="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
          <h3 class="pt-4 text-2xl text-center">Create an Account!</h3>
          <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
            <div class="mb-4">
              <label class="block mb-2 text-sm font-bold text-gray-700" for="name">
                Name
              </label>
              <input
                class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="John Doe"
                v-model="name"
              />
            </div>
            <div class="mb-4">
              <label class="block mb-2 text-sm font-bold text-gray-700" for="email">
                Email
              </label>
              <input
                class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Email"
                v-model="email"
              />
            </div>
            <div class="mb-4 md:flex md:justify-between">
              <div class="mb-4 md:mr-2 md:mb-0">
                <label class="block mb-2 text-sm font-bold text-gray-700" for="password">
                  Password
                </label>
                <input
                  class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="password"
                  placeholder="******************"
                  v-model="password"
                />
              </div>
              <div class="md:ml-2">
                <label class="block mb-2 text-sm font-bold text-gray-700" for="c_password">
                  Confirm Password
                </label>
                <input
                  class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="password"
                  placeholder="******************"
                  v-model="confirm_pass"
                />
              </div>
            </div>
            <div class="mb-6 text-center">
              <button
                class="w-full px-4 py-2 font-bold text-gray-700 bg-yellow-400 rounded-full hover:bg-gray-700 hover:text-yellow-400 focus:outline-none focus:shadow-outline"
                type="button"
                @click="register"
              >
                Register Account
              </button>
            </div>
            <hr class="mb-6 border-t" />
            <!-- <div class="text-center">
              <a
                class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div> -->
            <div class="text-center">
              <a
                class="inline-block text-base text-yellow-600 align-baseline hover:text-blue-800"
                href="#"
                @click="toLogin"
              >
                Already have an account? Login!
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirm_pass: ''
    }
  },
  methods: {
    register() {
      if (this.password !== this.confirm_pass) {
        this.$store.commit('SEND_ERROR', 'Password and confirm password does not match! Please retry.')
        return this.resetForm()
      }
      this.$axios({
        method: 'POST',
        url: 'users/register',
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('image', data.image)
          localStorage.setItem('name', data.name)
          localStorage.setItem('email', data.email)
          this.$store.commit('SEND_SUCCESS', 'Successfully registered!')
          this.$router.push('/')
        })
        .catch(err => {
          this.$store.commit('SEND_ERROR', err.response.data.error)
        })
        .finally(() => {
          this.resetForm()
        })
    },
    toLogin() {
      this.$emit('to-login')
    },
    resetForm() {
      this.name = ''
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style>

</style>