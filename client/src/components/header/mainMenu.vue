<template>
    <div>
        <sui-breadcrumb v-if="!isLogin">
            <sui-breadcrumb-section link>
                <router-link to="/login">Login</router-link>
            </sui-breadcrumb-section>
            <sui-breadcrumb-divider>/</sui-breadcrumb-divider>
            <sui-breadcrumb-section link>
                <router-link to="/register">Sign Up</router-link>
            </sui-breadcrumb-section>
        </sui-breadcrumb>
        <modal-new-question :open="modalOpen" @click="setOpenModal"/>
        <sui-breadcrumb v-if="isLogin">
            <sui-breadcrumb-section link>
                <router-link to="/">{{ userName }}</router-link>
            </sui-breadcrumb-section>
            <sui-breadcrumb-divider>/</sui-breadcrumb-divider>
            <sui-breadcrumb-section link @click="setOpenModal">
                New Question
            </sui-breadcrumb-section>
            <sui-breadcrumb-divider>/</sui-breadcrumb-divider>
            <sui-breadcrumb-section link @click="logout">
                Logout
            </sui-breadcrumb-section>
        </sui-breadcrumb>
    </div>
</template>

<script>
    import modalNewQuestion from "../question/modalNewQuestion";

    export default {
        name: "mainMenu",
        data() {
            return {
                userName: null,
                modalOpen: false
            }
        },
        methods: {
            logout() {
                this.$cookies.remove('token');
                location.reload();
            },
            fetchUserData() {
                if (!this.$cookies.isKey('token')) {
                    this.$store.dispatch('setClearCurrentUser');
                    return;
                }

                this.$axios({
                    method: 'get',
                    url: '/users/',
                    headers: {
                        Authorization: 'token ' + this.$cookies.get('token')
                    }
                }).then(response => {
                    console.log(response.data.data);
                    this.$store.dispatch('setCurrentUser', response.data.data);
                    this.userName = this.$store.getters.getCurrentUser.name;
                }).catch(err => [
                    console.log(err.response)
                ])
            },
            setOpenModal(){
                if (this.modalOpen ===  true){
                    this.modalOpen = false
                } else {
                    this.modalOpen = true
                }
            }
        },
        computed: {
            isLogin() {
                return this.$cookies.isKey('token')
            }
        },
        mounted() {
            this.fetchUserData()
        },
        components: {
            modalNewQuestion
        }
    }
</script>

<style scoped>

</style>