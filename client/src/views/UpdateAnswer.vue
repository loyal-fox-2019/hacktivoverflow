<template>
    <div id="UpdateAnswer">
        <div class="container-fluid">
            <div class="row justify-content-center" style="padding-top: 80px;">
                <div class="col-lg-6">
                    <div class="form-card">
                        <h3 class="mb-4" style="text-align: center">UPDATE YOUR ANSWER</h3>
                        <UpdaAnswerForm></UpdaAnswerForm>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UpdaAnswerForm from '@/components/Form.vue'

export default {
    name: 'UpdateAnswer',
    components: {
        UpdaAnswerForm
    },
}
</script>

<style scoped>
.form-card {
    box-shadow: 0 0 5px black;
    padding: 20px 40px 30px 40px;
}
</style>