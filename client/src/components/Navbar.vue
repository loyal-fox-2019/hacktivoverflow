<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a @click="goToHome" class="navbar-brand">
            <img src="http://lmsotfy.com/so.png" height="40rem" class="d-inline-block align-top" alt="">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
            <li class="nav-item btn mr-3">
                <a @click="goToHome" class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item btn mr-3">
                <a @click="goToAsk" class="nav-link" href="#">Ask A Question</a>
            </li>
            </ul>
        </div>
        <form class="form-inline">
            <button @click="logOut" class="btn btn-outline-dark my-2 my-sm-0" type="submit">Logout</button>
        </form>
    </nav>
</template>

<script>
import router from '../router/index'
export default {
    methods : {
        goToAsk(){
            router.push('/home/ask')
        },
        goToHome(){
            router.push('/home')
        },
        logOut(){
            console.log('ini logout di navbar')
            this.$store.dispatch('logout')
        }
    }
}
</script>

<style scoped>
.navbar{
    box-shadow:
    12px 12px 12px 0 rgba(0, 0, 0, .03),
    -12px -12px 12px 0 rgba(255, 255, 255, 1);
    position: relative;
}
.btn:hover{
    box-shadow:
    12px 12px 12px 0 rgba(0, 0, 0, .04),
    -12px -12px 12px 0 rgba(255, 255, 255, 1);
}
</style>