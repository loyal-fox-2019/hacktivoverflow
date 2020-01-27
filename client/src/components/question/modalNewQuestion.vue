<template>
    <sui-form @submit.prevent="postQuestion">
        <sui-modal v-model="open">
            <sui-modal-header>
                New Question
                <sui-icon name="write"/>
            </sui-modal-header>
            <sui-modal-content>
                <message :header="msgHeader" :message="msgMessage"
                         :visible="msgVisible" @dismiss="msgDismiss"/>
                <sui-form-field>
                    <label>Title</label>
                    <sui-input v-model="title" maxlength="75" required class="input" transparent/>
                    <small>Max 75 Character</small>
                </sui-form-field>

                <sui-form-field>
                    <label>Tags</label>
                    <sui-dropdown
                            multiple
                            id="question-tags"
                            :options="tagList"
                            v-model="tags"
                            placeholder="Tags"
                            search
                            selection
                            allow-additions
                            required/>
                </sui-form-field>

                <sui-form-field>
                    <label>Description</label>
                    <vue-editor v-model="content"></vue-editor>
                    <!--                    <textarea maxlength="500" v-model="description" required class="input" tranparent/>-->
                    <small>Max 500 Character</small>
                </sui-form-field>
            </sui-modal-content>
            <sui-modal-actions>
                <sui-form-field>
                    <sui-button primary icon="save">Post</sui-button>
                    <sui-button negative @click.native="toggle" icon="cancel">
                        Close
                    </sui-button>
                </sui-form-field>
            </sui-modal-actions>
        </sui-modal>
    </sui-form>
</template>

<script>
    import message from "../message";
    import {VueEditor, Quill} from 'vue2-editor'

    export default {
        name: "modalNewQuestion",
        data() {
            return {
                title: null,
                description: null,
                msgHeader: "msgHeader",
                msgMessage: "msgMessage",
                msgVisible: false,
                content: "",
                tags: null,
                tagList: [],
            }
        },
        props: {
            open: Boolean
        },
        methods: {
            toggle() {
                this.$emit('click')
            },
            postQuestion() {
                this.$axios({
                    method: 'post',
                    url: '/questions/create',
                    data: {
                        title: this.title,
                        tags: this.tags,
                        description: this.content
                    },
                    headers: {
                        Authorization: "token " + this.$cookies.get('token')
                    }
                }).then(response => {
                    console.log(response.data);
                    this.msgVisible = true;
                    this.msgHeader = "Success";
                    this.msgMessage = response.data.message;
                    this.$store.dispatch('addListQuestions', response.data.data);
                }).catch(err => {
                    console.log(err.response.data.error);
                    this.msgVisible = true;
                    this.msgHeader = "Error";
                    this.msgMessage = err.response.data.error;
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
    .input {
        background-color: #f1f2f6 !important;
        padding: 7px 15px;
        border: #dfe4ea 1px solid;
        margin: 5px 0px;
    }
</style>