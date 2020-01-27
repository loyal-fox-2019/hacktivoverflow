<template>
    <sui-form @submit.prevent="postAnswer">
        <message :header="msgHeader" :message="msgMessage"
                 :visible="msgVisible" @dismiss="msgDismiss"/>
        <sui-form-field>
            <label>Answer : </label>
            <vue-editor v-model="content"></vue-editor>
<!--            <textarea maxlength="500" v-model="description"-->
<!--                      required class="input" tranparent-->
<!--                      rows="5" cols="10"/>-->
            <small>Max 500 Character</small>
        </sui-form-field>
        <sui-form-field align="right">
            <sui-button primary icon="comment">Answer</sui-button>
        </sui-form-field>
    </sui-form>
</template>

<script>
    import message from "../message";
    import { VueEditor, Quill } from 'vue2-editor'

    export default {
        name: "addNewAnswer",
        data() {
            return {
                description: null,
                msgHeader: null,
                msgMessage: null,
                msgVisible: false,
                content: ""
            }
        },
        props: {
            answerId: String
        },
        methods: {
            postAnswer() {
                this.$axios({
                    method: 'post',
                    url: '/answers/create',
                    data: {
                        question: this.answerId,
                        description: this.content
                    },
                    headers: {
                        Authorization: "token " + this.$cookies.get('token')
                    }
                }).then(response => {
                    console.log(response.data);
                    this.msgVisible = true;
                    // this.msgHeader = "Success";
                    if (/successfully/.test(response.data.message)){
                        this.msgMessage = "Nice Hacker, " +
                            "thank you for giving a great shoot";
                    }
                    // this.msgMessage = response.data.message;
                    this.$emit('updateAnswers');

                }).catch(err => {
                    console.log(err.response.data.error);
                    this.msgVisible = true;
                    // this.msgHeader = "Error";
                    if (/registered/.test(err.response.data.error)){
                        this.msgMessage = "oh No !!!, " +
                            "this answer already taken, think Again";
                    }
                })
            },
            msgDismiss() {
                this.msgVisible = false
            }
        },
        components: {
            message,
            VueEditor
        }
    }
</script>

<style scoped>

</style>