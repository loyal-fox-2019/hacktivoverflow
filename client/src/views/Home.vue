<template>
    <div class="home">
        <home-page/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import homePage from "../components/homePage";

    export default {
        name: 'home',
        components: {
            homePage
        }
    }
</script>
