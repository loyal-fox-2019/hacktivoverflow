<template>
    <router-link to="/" width="100%" style="text-align: center" id="logo">
        <h1>HackOverFlow</h1>
    </router-link>
</template>

<script>
    import router from "../router";

    export default {
        name: "logo"
    }
</script>

<style scoped>
    #logo {
        padding: 10px;
    }
</style>