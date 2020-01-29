<template>
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
						<h3 class="pt-4 text-2xl text-center">Welcome Back!</h3>
						<form class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
							<div class="mb-4">
								<label class="block mb-2 text-sm font-bold text-gray-700" for="email">
									Email
								</label>
								<input
                  v-model="email"
									class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									type="email"
									placeholder="john@mail.com"
								/>
							</div>
							<div class="mb-4">
								<label class="block mb-2 text-sm font-bold text-gray-700" for="password">
									Password
								</label>
								<input
                  v-model="password"
									class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									type="password"
									placeholder="******************"
								/>
							</div>
							<div class="mb-4">
								<!-- <input class="mr-2 leading-tight" type="checkbox" id="checkbox_id" />
								<label class="text-sm" for="checkbox_id">
									Remember Me
								</label> -->
							</div>
							<div class="mb-6 text-center">
								<button
									class="w-full px-4 py-2 font-bold text-gray-700 bg-yellow-400 rounded-full hover:bg-gray-700 hover:text-yellow-400 focus:outline-none focus:shadow-outline"
									type="button"
                  @click="login"
								>
									Sign In
								</button>
							</div>
							<hr class="mb-6 border-t" />
							<div class="text-center">
								<a
									class="inline-block text-basic text-yellow-600 align-baseline hover:text-yellow-700"
									href="#"
                  @click="toRegister"
								>
									Create an Account!
								</a>
							</div>
              <div class="text-center">
								<g-signin-button
									class="inline-block text-basic cursor-pointer text-yellow-600 align-baseline hover:text-yellow-700"
									:params="googleSignInParams"
									@success="onSignInSuccess"
									@error="onSignInError">
									Sign in with Google
								</g-signin-button>
							</div>
							<!-- <div class="text-center">
								<a
									class="inline-block text-sm text-yellow-600 align-baseline hover:text-yellow-700"
									href="./forgot-password.html"
								>
									Forgot Password?
								</a>
							</div> -->
						</form>
					</div>
				</div>
			</div>
		</div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      password: '',
			email: '',
			googleSignInParams: {
        client_id: '948794319816-f2dr4giald6d07ivr6vnb5cvfvnnap8j.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    login() {
      this.$axios({
        method: 'POST',
        url: 'users/login',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('image', data.image)
          localStorage.setItem('name', data.name)
          localStorage.setItem('email', data.email)
					this.$store.commit('SEND_SUCCESS', 'Successfully signed in!')
          this.$router.push('/')
        })
        .catch(err => {
          this.$store.commit('SEND_ERROR', err.response.data.error)
        })
        .finally(() => {
          this.resetForm()
        })
		},
		onSignInSuccess (googleUser) {
			const id_token = googleUser.getAuthResponse().id_token;
			this.$axios.post('users/googleSignIn', {
				id_token
      })
				.then(({ data }) => {
					localStorage.setItem('access_token', data.access_token)
					localStorage.setItem('name', data.name)
					localStorage.setItem('image', data.image)
					localStorage.setItem('id', data.id)
					this.$store.commit('SEND_SUCCESS', 'Successfully signed in!')
          this.$router.push('/')
				})
				.catch(err => {
					this.$store.commit('SEND_ERROR', err.response.data)
				})
    },
    onSignInError (error) {
      this.$store.commit('SEND_ERROR', error)
    },
    toRegister() {
      this.$emit('to-register')
    },
    resetForm() {
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style>

</style>