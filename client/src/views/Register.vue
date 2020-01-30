<template>
    <div id="register">
        <div class="container-fluid">
            <div class="row justify-content-center" style="padding-top: 50px;">
                <div class="col-lg-5">
                    <div class="form-card d-flex justify-content-center flex-column" v-animate-css="'slideInUp'">
                        <img src="../assets/images/logo-hacktiv.png" class="mx-auto mt-3" width="110" height="100"/>
                        <h2 class="mt-3 mb-4" style="text-align: center; 
                        color: white; letter-spacing: 4px;">REGISTER</h2>
                        <RegisterForm></RegisterForm>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RegisterForm from '@/components/Form.vue'

export default {
    name: 'Register',
    components: {
        RegisterForm
    }
}
</script>

<style scoped>
#register {
  background: linear-gradient(rgba(0, 0, 0, 0.6), 
  rgba(0, 0, 0, 0.6)), url('../assets/images/register.jpg') no-repeat center;
  min-width: 100%;
  min-height: 100%;
  height: 91.6vh;
  background-size: cover;
  position: relative;
}
.form-card {
    padding: 10px 60px 50px 60px;
    box-shadow: 0 0 50px black;
}
</style>