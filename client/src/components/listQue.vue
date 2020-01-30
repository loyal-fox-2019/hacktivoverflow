<template>
<!-- <div class="container"> -->
    <div class="row">
        <div class="col-1">
            <img src="../assets/upload.png" width="25">
            <img src="../assets/download.png" width="25">
        </div>
        <div class="col-11">
            <div class="card text-center">
                <div class="card-header">
                    Header
                </div>
                <div class="card-body">
                    <h5 class="card-title">{{ question.title }}</h5>
                    <p class="card-text" v-html="question.description"></p>
                    <div class="row d-flex justify-content-around">
                        <a href="" class="btn btn-primary">Detail</a>
                        <a href="" class="btn btn-info" v-on:click.prevent="updateQue">Update</a>
                        <a href="" class="btn btn-danger" v-on:click.prevent="deleteOne">Delete</a>
                    </div>
                </div>
                <div class="card-footer text-muted">
                    Footer
                </div>
            </div>
        </div>
    </div>
<!-- </div> -->
</template>

<script>
export default {
    name: 'ListQue',
    props: { question: Object },
    methods: {
        updateQue() {
            // this.$store.dispatch('findOneQue', this.question);
            this.$router.push('/edit-question')
        },
        deleteOne() {
            this.$tore.dispatch('deleteQue', this.question);
        }
    }
}
</script>

<style scoped>

</style>