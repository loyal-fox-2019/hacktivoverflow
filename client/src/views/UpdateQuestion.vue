<template>
    <div id="UpdateQuestion">
        <div class="container-fluid">
            <div class="row justify-content-center" style="padding-top: 100px;">
                <div class="col-lg-6">
                    <div class="form-card">
                        <h3 style="text-align: center;" class="mb-3">UPDATE YOUR QUESTION</h3>
                        <UpdateQuestionForm></UpdateQuestionForm>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UpdateQuestionForm from '@/components/Form.vue'

export default {
    name: 'UpdateQuestion',
    components: {
        UpdateQuestionForm
    }
}
</script>

<style scoped>
.form-card {
    box-shadow: 0 0 5px black;
    padding: 20px 40px 30px 40px; 
}
</style>