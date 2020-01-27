<template>
    <div id="detail">
        <nav-bar/>
        <detail-question/>
    </div>
</template>

<script>
    import detailQuestion from "../components/question/detailQuestion";
    import navBar from "../components/header/navBar";

    export default {
        name: "Detail",
        components: {
            detailQuestion,
            navBar
        }
    }
</script>

<style scoped>
    #detail {
        padding: 100px;
    }
</style>