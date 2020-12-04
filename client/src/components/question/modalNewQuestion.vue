<template>
    <div>
        <sui-modal v-model="open">
            <sui-modal-header align="right">
                <sui-button negative @click="toggle" icon="cancel"/>
            </sui-modal-header>
            <sui-modal-content>
                <message :header="msgHeader" :message="msgMessage"
                         :visible="msgVisible" @dismiss="msgDismiss"/>

                <sui-form @submit.prevent="postQuestion">
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
                        <small>Max 500 Character</small>
                    </sui-form-field>
                    <sui-form-field align="right">
                        <sui-button primary icon="save">Post</sui-button>
                    </sui-form-field>
                </sui-form>
            </sui-modal-content>
        </sui-modal>
    </div>
</template>

<script>
    import message from "../message";
    import {VueEditor, Quill} from 'vue2-editor'
    import {mapGetters} from "vuex";

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
        computed: {
            ...mapGetters([
                "message",
                "questionsList"
            ])
        },
        watch: {
            message(a, b) {
                this.$toast[this.message.title](this.message)
                if (this.message.title === 'success'){
                    this.$store.dispatch('listOfQuestions');
                    this.toggle()
                }
            },
        },
        methods: {
            toggle() {
                this.$emit('click')
            },
            postQuestion() {
                this.$store.dispatch('postQuestion', {
                    title: this.title,
                    tags: this.tags,
                    description: this.content
                });
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