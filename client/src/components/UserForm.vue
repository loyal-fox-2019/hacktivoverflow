<template>
    <div style="">
        <!-- <h2>@components/userForm.vue</h2> -->
        <div class="form-group text-sm-left">
            <label for="email" class="col-form-label"><b>Email</b></label>
            <input type="email" class="form-control" id="email" v-model="inputEmail" required>
        </div>
        
        <div class="form-group text-sm-left">
            <label for="password" class="col-form-label"><b>Password</b></label>
            <input type="password" class="form-control" id="password" v-model="inputPassword" required>
        </div>

    </div>
</template>

<script>
export default {
    
    computed:{
        inputEmail:{
            get(){
                return this.$store.state.inputEmail
            },
            set(value){
                this.$store.commit('UPDATE_EMAIL', value)
            }
        },
        inputPassword:{
            get(){
                return this.$store.state.inputPassword
            },
            set(value){
                this.$store.commit('UPDATE_PASSWORD', value)
            }
        }
    }


}
</script>

<style>



</style>