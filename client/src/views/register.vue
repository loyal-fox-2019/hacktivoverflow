<template>
  <form class="form-signin mx-auto" style="width: 30vw; height: 70vh;margin-top: 20vh;">
        <img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
        <h1 class="h3 mb-3 font-weight-normal">Please sign up</h1>
        <label for="inputUsername" class="sr-only">Username</label>
        <input v-model="username" type="text" id="inputUsername" class="form-control" placeholder="Username" required="" autofocus="">
        <label for="inputEmail" class="sr-only">Email address</label>
        <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
        <label for="inputPassword" class="sr-only">Password</label>
        <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
        <button class="btn btn-lg btn-primary btn-block" type="submit" v-on:click.prevent="register">Sign up</button>
        <p><router-link :to="`/login`">Login Here</router-link></p>
        <p>or</p>
        <!-- <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" ></GoogleLogin> -->
        <p class="mt-5 mb-3 text-muted">© 2020-2021</p>
    </form>
</template>

<script src="https://apis.google.com/js/platform.js" async defer></script>
<script>
export default {
    name: 'registration',
    data(){
        return{
            username: '',
            email: '',
            password:''
        }
    },
    components:{
    },
    methods:{
        register(){
            let payload = {
                username: this.username,
                email: this.email,
                password: this.password
            }
            this.$store.dispatch('registerUser', payload)
        },
        
    }
}
</script>

<style>
input{
  margin-top:2vh;
}
</style>