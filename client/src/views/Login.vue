<template>
    <div class="container">
        <form>
            <div class="form-group d-block mx-auto text-center">
                <label for="inputEmail">Email address</label>
                <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" v-model="email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group d-block mx-auto text-center">
                <label for="inputPassword">Password</label>
                <input type="password" class="form-control" id="inputPassword" v-model="password">
            </div>
            <div class="">
            <router-link to="/"><button type="submit" class="btn btn-danger mt-3 mr-2 mb-3">cancel</button></router-link>
            <button type="submit" class="btn btn-warning mt-3 mb-3" v-on:click.prevent="toLogin">login</button>
            </div>
        </form>
        <div class="alert alert-danger mt-5" role="alert" v-if="isError">
            {{ error }}
        </div>

    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            isError: false,
            error: '',

        }
    },
    methods: {
        toLogin() {
            axios({
                url: 'http://localhost:3000/login',
                method: 'post',
                data: {
                    email: this.email,
                    password: this.password,
                }
            })
            .then(({ data }) => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', data.email);
                localStorage.setItem('id', data._id);
                this.email = '';
                this.password = '';
                this.isError = false;
                this.$store.commit('setIsLogin');
                this.$router.push('/');
            })
            .catch(err => {
                console.log(err)
                this.isError = true;
                this.error = err.response.data.error;
            })
        },
    },

}
</script>

<style scoped>
.container {
    margin-top: 100px;
    border: 1px solid rgb(221, 221, 221);
    border-radius: 5px;
    width: 400px;
    height: 400px;
    box-shadow: 5px 5px 10px;
    padding-top: 10px;
}
.form-control {
    border-color: rgb(4, 110, 110);
}
</style>