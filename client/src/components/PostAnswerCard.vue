<template>
    <div class="card w-100">
        <div class="card-body">
            <div class="row justify-content-center">
                <div class="col-lg-10">
                    <h3 class="mb-3">Submit your answer here</h3>
                    <form>
                        <div class="form-group">
                            <input type="text" 
                            class="form-control" 
                            v-model="title" 
                            placeholder="Enter your answer title">
                        </div>
                        <wysiwyg v-model="description"></wysiwyg>
                        <button type="submit" 
                        class="btn btn-success mt-3 btn-lg" 
                        style="width: 100%; font-size: 24px;"
                        v-on:click.prevent="postAnswer()">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PostAnswerCard',
    data() {
        return {
            title: '',
            description: ''
        }
    },
    methods: {
        postAnswer: function() {
            this.$store.dispatch('postAnswer', {
                id: this.$route.params.id, 
                title: this.title, 
                description: this.description
            })
            this.title = '';
            this.description = '';
        }
    }
}
</script>

<style scoped>

</style>