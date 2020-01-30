<template>
    <div id="CreateQuestion">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="form-card" v-animate-css="'lightSpeedIn'">
                    <h2 class="pt-4 mb-4" 
                    style="text-align: center;">SUBMIT YOUR QUESTION</h2>
                    <CreateQuestionForm></CreateQuestionForm>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CreateQuestionForm from '@/components/Form.vue';

export default {
    name: 'CreateQuestion',
    components: {
        CreateQuestionForm
    }
}
</script>

<style scoped>
.form-card {
    margin-top: 100px;
    box-shadow: 0 0 5px black;
    width: 50%;
    padding: 10px 30px 30px 30px;
}
</style>