<template>
    <div style="width:100vw">
        <form style="width:50vw;margin:auto" @submit.prevent="updateUser">
        <h1>Manage account</h1>
            <div class="form-group">
                Watched Tags (separated with spaces, comma or semicolon)
                <b-form-tags
                    v-model="tags"
                    separator=" ,;"
                    remove-on-delete
                    placeholder="Enter new tags separated by space, comma or semicolon"
                    no-add-on-enter
                    class="mb-2"
                    ></b-form-tags>
            </div>
            <button class="btn btn-primary" type="submit">Save changes</button>
        </form>
    </div>
</template>

<script>
    import axiosReq from "../config/axios.js";
    export default {
        name: "ManageAccountPage",
        data() {
            return {
                tags: []
            }
        },
        created() {
            axiosReq({
                url: "/users/tags",
                method: "get",
                headers: {
                    token: this.$cookies.get('token')
                }
            })
            .then(({data}) => {
                this.tags = data.tags
            })
        },
        methods: {
            updateUser() {
                axiosReq({
                    url: "/users/tags",
                    method: "patch",
                    headers: {
                        token: this.$cookies.get('token')
                    },
                    data: {
                        
                        watched_tags: this.tags
                    }
                })
                .then(() => {
                    this.$router.push({path: "/"})
                })
            }
        }
    }
</script>

<style scoped>

</style>