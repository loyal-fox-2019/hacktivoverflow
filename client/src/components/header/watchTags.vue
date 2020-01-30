<template>
    <div>
        <sui-form @submit.prevent="addWatchTags" class="container-watch-tags">
            <sui-form-fields id="sui-form-fields">
                <sui-dropdown
                        multiple
                        id="question-tags"
                        :options="tagList"
                        v-model="tags"
                        placeholder="Watch Tags"
                        search
                        :max-selections="8"
                        selection
                        allow-additions/>
                <sui-button id="sui-button" content="save" primary/>
            </sui-form-fields>
        </sui-form>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "watchTags",
        data() {
            return {
                tags: [],
                tagList: [],
                addTag: false
            }
        },
        props: {
            data: Array,
            dataUser: Object
        },
        watch: {
            data(a, b) {
                this.data.forEach(tag => {
                    this.tagList.push({
                        value: tag,
                        key: tag,
                        text: tag
                    })
                });
            },
            dataUser(a, b){
                if (this.addTag === false) {
                    this.tags = this.dataUser.watchTags;
                    this.addTag = true;
                }
            },
            getCurrentUser(a, b){
                this.addWatchTags()
            }
        },
        methods: {
            addWatchTags() {
                this.$store.dispatch('addWatchTags', this.tags);
                this.$store.dispatch('listOfQuestions');
            },
        },
        computed: {
            ...mapGetters([
                'questionsList',
                'tags',
                'getCurrentUser'
            ]),
        }
    }
</script>

<style scoped>
    #sui-button {
        margin-left: 3px;
    }

    #sui-form-fields {
        padding: 0;
        margin: 0;
    }

    .container-watch-tags{
        display: inline-block;
        margin: 10px;
    }
</style>