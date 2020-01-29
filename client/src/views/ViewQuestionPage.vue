<template>
    <div class="view-qn">
        <div class="view-qn-content qn-content">
            <h3>{{this.$store.state.currentQuestion.title}}</h3>
            <div v-html="this.$store.state.currentQuestion.description"></div>
            <div style="float:right">Asked by {{this.$store.state.currentQuestion.user.username}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "viewquestion",
        created() {
            this.$store.dispatch('getOneQuestion',this.$route.params.id)
        }
    }
</script>

<style scoped>
.view-qn {  
    width: 100vw!important; 
}
.view-qn-content {
    width: 50vw;
    text-align: left;
    margin-left: auto;
    margin-right: auto;
    
}
.qn-content {
    border:1px solid black;
    padding: 20px
}
</style>