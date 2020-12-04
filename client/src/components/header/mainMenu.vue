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
                <router-link to="/">{{ getCurrentUser.name }}</router-link>
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
    import {mapGetters} from "vuex";

    export default {
        name: "mainMenu",
        data() {
            return {
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
                this.$store.dispatch('getCurrentUser');
            },
            setOpenModal() {
                if (this.modalOpen === true) {
                    this.modalOpen = false
                } else {
                    this.modalOpen = true
                }
            }
        },
        computed: {
            ...mapGetters([
                'getCurrentUser'
            ]),
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