<template> 
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link class="navbar-brand mr-3" to="/" 
        style="font-family: 'Oswald', sans-serif; 
        font-size: 29px !important; color: #f48024;
        padding-top: 0 !important;">HACKTIV <span style="color: #000;">OVERFLOW</span></router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link class="nav-link" to="/post">Question List</router-link>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0 ml-auto">
                <input class="form-control mr-sm-2" style="width: 100%;" type="search" placeholder="Search" aria-label="Search">
            </form>
            <div class="navbar-right-container ml-2">
                <button class="btn btn-dark btn-login" v-on:click.prevent="toLogin()" v-if="!getIsLoggedIn">Login</button>
                <button class="btn btn-primary btn-register ml-2" v-on:click.prevent="toRegister()" v-if="!getIsLoggedIn">Register</button>
                <router-link to="/create-question" class="btn btn-primary ml-2" v-if="getIsLoggedIn">Post Question</router-link>
                <button class="btn btn-danger btn-register ml-2" v-on:click.prevent="logout()" v-if="getIsLoggedIn">Logout</button>
            </div>
        </div>
    </nav>
</template>

<script>
import swal from 'sweetalert2';

export default {
    name: 'Navbar',
    computed: {
        getIsLoggedIn: function() {
            return this.$store.state.isLoggedIn
        }
    },  
    methods: {
        toLogin: function() {
            this.$router.push({path: '/login'});
        },
        toRegister: function() {
            this.$router.push({path: '/register'});
        },
        logout: function() {
            swal.fire({
                icon: 'success',
                title: 'Logout Successful'
            })
            localStorage.clear();
            this.$store.commit('CHANGE_IS_LOGGED_IN', false);
            this.$router.push({path: '/login'})
        }
    }
}
</script>

<style scoped>
.navbar {
    padding: 0 70px !important;
    box-shadow: 0 0 2px black;
    height: 60px;
}
.nav-item {
    padding: 0 10px;
    border-radius: 50px;
}
.nav-item:hover {
    background-color: #f48024;
}
.nav-link {
    font-size: 18px;
    padding: 3px 15px 3px 15px !important;
}
.nav-link:hover {
    color: #ffffff !important;
}
.btn-register {
    box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.4);
}
</style>