<template>
    <sui-form>
        <sui-form-fields id="sui-form-fields">
            <sui-dropdown
                    multiple
                    id="question-tags"
                    :options="tagList"
                    v-model="tags"
                    placeholder="Watch Tags"
                    search
                    selection
                    allow-additions/>
            <sui-button id="sui-button" content="add" color="primary"/>
        </sui-form-fields>
    </sui-form>
</template>

<script>
    export default {
        name: "watchTags",
        data() {
            return {
                tags: [],
                tagList: []
            }
        },
        props: {
            data: Array
        },
        mounted() {
            this.data.forEach(tag => {
                this.tagList.push({
                    value: tag,
                    key: tag,
                    text: tag
                })
            });
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