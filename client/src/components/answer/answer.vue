<template>
    <sui-list-item>
        <sui-list-icon name="user" color="yellow"/>
        <sui-list-content>
            <sui-label basic pointing="left" color="yellow">
                <sui-list-description class="descriptionAnswer" v-html="answer.description">
                    {{ answer.description }}
                </sui-list-description>
            </sui-label>
            <like-unlike-answer :data="answer" align="right"/>
        </sui-list-content>
    </sui-list-item>
</template>

<script>
    import likeUnlikeAnswer from "./likeUnlikeAnswer";

    export default {
        name: "answer",
        props: {
            answer: Object
        },
        components: {
            likeUnlikeAnswer
        }
    }
</script>

<style scoped>
    .descriptionAnswer{
        padding: 5px;
        font-size: 14px !important;
        font-weight: normal !important;
    }
</style>