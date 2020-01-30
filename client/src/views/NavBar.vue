<template>
<div class="container-fluid">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <a href="" class="navbar-brand" v-on:click.prevent="$router.push('/')">Hacktiv-OverFlow</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav" v-if="!isLogin">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link btn" v-on:click.prevent="$router.push('/login')">login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link btn" v-on:click.prevent="$router.push('/register')">register</a>
                </li>
            </ul>
        </div>
        <div class="afterLogin ml-auto" v-if="isLogin">
            <div class="row">
                <div class="col-4">
                    <button class="btn btn-success" v-on:click.prevent="addQue">add Que</button>
                </div>
                <div class="col-3">
                    <button class="btn btn-warning" v-on:click.prevent="logout">logout</button>
                </div>
                <div class="col-5">
                    <p class="text-white ml-3 mr-3 mt-1 mb-0">{{ user }}</p>
                </div>
            </div>
        </div>
    </nav>
</div>
</template>

<script>
export default {
    name: 'NavBar',
    data() {
        return {
            user: localStorage.getItem('user'),
        }
    },
    computed: {
        isLogin() {
            return this.$store.state.isLogin;
        },
    },
    methods: {
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('id');
            this.$router.push('/');
            this.$store.commit('setIsLogout');
        },
        addQue() {
            this.$router.push('/question');
        }
    }
}
</script>

<style scoped>
.row button {
    height: 35px;
}
</style>