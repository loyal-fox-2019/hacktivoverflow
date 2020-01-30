<template>
    <div class="add-qn-page">        
        <form id="add-form" @submit.prevent="addQuestion">
        <button class="btn btn-primary" id="add-qn-btn" type="submit">Submit question</button>
            <h3>Ask a question</h3>
            <div class="form-group">
                Title*
                <input type="text" class="form-control" v-model="title" required>
            </div>
            <!-- <div class="form-group">
                Image
                <input type="file" class="form-control" name="file" ref="file" @change="handleFile">
            </div> -->
            <div class="form-group">
                Tags* (separated with spaces)
                <b-form-tags
                    v-model="tags"
                    separator=" ,;"
                    remove-on-delete
                    placeholder="Enter new tags separated by space, comma or semicolon"
                    no-add-on-enter
                    class="mb-2"
                    ></b-form-tags>
            </div>
            <div class="form-group">
                Description*
                <!-- <textarea class="form-control" v-model="description" required></textarea> -->

                <quill-editor v-model="description" ref="myQuillEditor" :options="editorOption" style="height:500px" required>
                </quill-editor>
            </div>
            
            
        </form>
    </div>
</template>

<script>
    import axiosReq from "../config/axios";
    export default {
        name: "NewQuestion",
        data() {
            return {
                title: "",
                tags: [],
                description: "",
                file: "",
                editorOption: {
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{ 'header': 1 }, { 'header': 2 }],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            [{ 'script': 'sub' }, { 'script': 'super' }],
                            [{ 'indent': '-1' }, { 'indent': '+1' }],
                            [{ 'direction': 'rtl' }],
                            [{ 'size': ['small', false, 'large', 'huge'] }],
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            [{ 'font': [] }],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'align': [] }],
                            ['clean']
                        ]
                    }
                }
            }
        },
        methods: {
            addQuestion() {
                let newQn;
                axiosReq({
                    url: "/questions",
                    method: "post",
                    headers: {
                        token: this.$cookies.get('token')
                    },
                    data: {
                        title: this.title,
                        description: this.description,
                        tags: this.tags
                    }
                })
                .then(({data}) => {
                    this.title = "";
                    this.tags = [];
                    this.description = "";
                    this.$store.dispatch('getAllQuestions')
                    this.$store.dispatch('getMyQuestions')
                    newQn = data;
                })
                .finally(() => {
                    this.$router.push({path: `/question/${newQn._id}`})
                })
            },
            handleFile() {
                this.file = this.$refs.file.files[0];
            },
        },
        components: {
            
        }
    }
</script>

<style scoped>
#add-form {
    padding-left: 15px;
    padding-top: 15px;
    width: 50vw;
    text-align: left;
    margin-left: auto;
    margin-right: auto;
}
.add-qn-page {
    width: 100vw!important;
}
#add-qn-btn {
    float:right;
    position: sticky;
    top: 65px
}
</style>