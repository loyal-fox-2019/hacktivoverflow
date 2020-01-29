<template>
    <div>
        <b-navbar type="dark" variant="dark" class="justify-content-between d-flex">
            <div>
                <router-link to="/"><b-navbar-brand>HacktivOverflow</b-navbar-brand></router-link>
            </div>
            <div>
                <b-nav-form>
                    <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="search"></b-form-input>
                    <b-button size="sm" class="my-2 my-sm-0" @click="filter">Search</b-button>
                </b-nav-form>
            </div>
            <div>
                <b-navbar-nav class="ml-auto">
                    <div v-if="!$store.state.isLogin">
                        <b-button size="sm" class ="my-2 mx-2 my-sm-0" variant="light" v-b-modal.modal-login>Log in</b-button>
                        <b-button size="sm" class ="my-2 my-sm-0" variant="primary" v-b-modal.modal-register>Sign up</b-button>
                    </div>

                    <b-nav-item-dropdown right v-if="$store.state.isLogin">
                        <template v-slot:button-content>
                            <em>{{username}}</em>
                        </template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </div>
        </b-navbar>
        <!-- modal register -->
        <b-modal id="modal-register" title="Register" header-bg-variant="primary" header-text-variant="light" hide-footer>
            <b-form-group label="Name:" label-for="register-name">
                <b-form-input
                id="register-name"
                v-model="registerName"
                required
                placeholder="Enter name"
                ></b-form-input>
            </b-form-group>
            <b-form-group label="Email:" label-for="register-email">
                <b-form-input
                id="register-email"
                v-model="registerEmail"
                type="email"
                required
                placeholder="Enter email"
                ></b-form-input>
            </b-form-group>
            <b-form-group label="Password:" label-for="register-password">
                <b-form-input
                id="register-password"
                v-model="registerPassword"
                type="password"
                required
                ></b-form-input>
                <b-form-text id="password-help-block">
                    Minimum password length 6 characters
                </b-form-text>
            </b-form-group>
            <div class="d-flex justify-content-end">
                <b-button variant="primary" v-on:click.prevent="register" @click="$bvModal.hide('modal-register')">Submit</b-button>
            </div>
        </b-modal>
        <!-- modal login -->
        <b-modal id="modal-login" title="Login" header-bg-variant="success" header-text-variant="light" hide-footer>
            <b-form-group label="Email:" label-for="login-email">
                <b-form-input
                id="login-email"
                v-model="loginEmail"
                type="email"
                required
                placeholder="Enter email"
                ></b-form-input>
            </b-form-group>
            <b-form-group label="Password:" label-for="login-password">
                <b-form-input
                id="login-password"
                v-model="loginPassword"
                type="password"
                required
                ></b-form-input>
                <b-form-text id="password-help-block">
                    Minimum password length 6 characters
                </b-form-text>
            </b-form-group>
            <div class="d-flex justify-content-end">
                <b-button variant="success" v-on:click.prevent="login" @click="$bvModal.hide('modal-login')">Login</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
    name: "navbar",
    data(){
        return {
            registerName: '',
            registerEmail: '',
            registerPassword: '',
            loginEmail: '',
            loginPassword: '',
            search: ''
        }
    },
    computed: {
        username(){
            return this.$store.state.username
        }
    },
    methods: {
        filter(){
            this.$router.push('/')
            this.$store.dispatch('search', this.search)
        },
        register(){
            let registerData = {
                name: this.registerName,
                email: this.registerEmail,
                password: this.registerPassword
            }
            this.$store.dispatch('register', registerData)
        },
        login(){
            let loginData = {
                email: this.loginEmail,
                password: this.loginPassword
            }
            this.$store.dispatch('login', loginData)
        },
        logout(){
            localStorage.clear()
            this.registerName = '',
            this.registerEmail = '',
            this.registerPassword = '',
            this.loginEmail = '',
            this.loginPassword = '',
            this.search = ''
            this.$store.commit('SET_ISLOGIN_FALSE')
            Swal.fire({
                icon: 'success',
                title: 'Logout success',
                timer: 1500,
                showConfirmButton: false
            })
        }
    }
}
</script>

<style>

</style>