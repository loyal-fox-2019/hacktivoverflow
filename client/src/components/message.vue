<template>
    <sui-message id="message" v-if="visible" @dismiss="dismiss" dismissable>
        <sui-header>{{ header }}</sui-header>
        {{ message }}
    </sui-message>
</template>

<script>
    export default {
        name: "message",
        props: {
            visible: Boolean,
            header: String,
            message: String
        },
        methods: {
            dismiss(){
                // this.visible = false
                this.$emit('dismiss')
            }
        }
    }
</script>

<style scoped>
    #message{
        /*padding: 15px;*/
        /*text-align: center;*/
        /*border: none;*/
        /*!*background-color: #698474 !important;*!*/
        /*color: white;*/
    }
</style>