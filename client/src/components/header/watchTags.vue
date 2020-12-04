<template>
    <div>
        <sui-form @submit.prevent="addWatchTags" class="container-watch-tags">
            <sui-form-fields id="sui-form-fields">
                <sui-dropdown
                        multiple
                        id="question-tags"
                        :options="tagList"
                        v-model="newTags"
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
                newTags: [],
                tagList: [],
            }
        },
        props: {
            data: Array,
            dataUser: Object
        },
        watch: {
            data(a, b) {
                this.listCurrentTags();
            },
            dataUser(a, b) {
                this.listWatchTags()
            }
        },
        methods: {
            addWatchTags() {
                this.$store.dispatch('addWatchTags', this.newTags);
                this.$store.dispatch('getCurrentUser');
                this.$store.dispatch('listOfQuestions');
                console.log(this.getCurrentUser);
            },
            listWatchTags() {
                this.newTags = this.dataUser.watchTags;
                this.addTag = true;
            },
            listCurrentTags() {
                this.tagList = [];
                this.data.forEach(tag => {
                    this.tagList.push({
                        value: tag,
                        key: tag,
                        text: tag
                    })
                });
            }
        },
        computed: {
            ...mapGetters([
                'questionsList',
                'tags',
                'getCurrentUser'
            ]),
        },
        mounted() {
            this.listWatchTags();
            this.listCurrentTags();
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
</style>