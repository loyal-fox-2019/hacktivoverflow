<template>
    <form>
        <div class="form-group mb-4" 
        v-if="this.$router.app._route.name === 'register' || this.$router.app._route.name ==='login'">
            <input type="email" 
            class="form-control"
            v-model="email" 
            placeholder="Enter you email">
        </div>
        <div class="form-group mb-4" v-if="this.$router.app._route.name === 'register'">
            <input type="text" 
            class="form-control" 
            v-model="name" 
            placeholder="Enter you name">
        </div>
        <div class="form-group" 
        v-if="this.$router.app._route.name === 'register' || this.$router.app._route.name === 'login'">
            <input type="password" 
            class="form-control" 
            v-model="password" 
            placeholder="Enter your password">
        </div>
        <div class="form-group" 
        v-if="this.$router.app._route.name === 'create-question'">
            <input type="text" 
            class="form-control" 
            v-model="title" 
            placeholder="Enter your question title">
        </div>
        <wysiwyg v-model="description" 
        v-if="this.$router.app._route.name === 'create-question'"></wysiwyg>
        <div class="form-group" 
        v-if="this.$router.app._route.name === 'update-question'">
            <input type="text" 
            class="form-control" 
            v-model="getQuestion.title" 
            placeholder="Enter your question title">
        </div>
        <wysiwyg v-model="getQuestion.description" 
        v-if="this.$router.app._route.name === 'update-question'"></wysiwyg>
        <div class="form-group" 
        v-if="this.$router.app._route.name === 'update-answer'">
            <input type="text" 
            class="form-control" 
            v-model="getAnswer.title" 
            placeholder="Enter your question title">
        </div>
        <wysiwyg v-model="getAnswer.description" 
        v-if="this.$router.app._route.name === 'update-answer'"></wysiwyg>
        <div class="button-container mt-4">
            <button type="submit" 
            class="btn btn-dark btn-lg" 
            v-if="this.$router.app._route.name === 'login'"
            style="width: 100%; font-weight: 600"
            v-on:click.prevent="login()">Login</button>
            <button type="submit" 
            class="btn btn-dark btn-lg" 
            v-if="this.$router.app._route.name === 'register'" 
            style="width: 100%; font-weight: 600"
            v-on:click.prevent="register()">Register</button>
            <button type="submit" 
            class="btn btn-dark btn-lg" 
            v-if="this.$router.app._route.name === 'create-question'" 
            style="width: 100%; font-weight: 600"
            v-on:click.prevent="createQuestion()">Submit</button>
            <button type="submit" 
            class="btn btn-dark btn-lg" 
            v-if="this.$router.app._route.name === 'update-question'" 
            style="width: 100%; font-weight: 600"
            v-on:click.prevent="updateQuestion()">Submit</button>
            <button type="submit" 
            class="btn btn-dark btn-lg" 
            v-if="this.$router.app._route.name === 'update-answer'" 
            style="width: 100%; font-weight: 600"
            v-on:click.prevent="updateAnswer()">Submit</button>
        </div>
    </form>
</template>

<script>
export default {
    name: 'Form',
    data() {
        return {
            email: '',
            name: '',
            password: '',
            title: '',
            description: ''
        }
    },
    created() {
        if(this.$router.app._route.name === 'update-question') {
            this.$store.dispatch('getDetailQuestion', this.$route.params.id);
        } else if(this.$router.app._route.name === 'update-answer') {
            this.$store.dispatch('getAnswer', this.$route.params.id);
        }
    },
    computed: {
        getPage() {
            return this.$store.state.page;
        },
        getQuestion() {
            return {title: this.$store.state.question.title, description: this.$store.state.question.description}
        },
        getAnswer() {
            return {title: this.$store.state.answer.title, description: this.$store.state.answer.description}
        }
    },
    methods: {
        register: function() {
            this.$store.dispatch('register', {email: this.email, name: this.name, password: this.password});
        },
        login: function() {
            this.$store.dispatch('login', {email: this.email, password: this.password});
        },
        createQuestion: function() {
            this.$store.dispatch('createQuestion', {title: this.title, description: this.description});
        },
        updateQuestion: function() {
            this.$store.dispatch('updateQuestion', {id: this.$route.params.id, 
            title: this.getQuestion.title, 
            description: this.getQuestion.description})
        },
        updateAnswer: function() {
            this.$store.dispatch('updateAnswer', {
                id: this.$route.params.id, 
                title: this.getAnswer.title,
                description: this.getAnswer.description
            })
        }
    }
}
</script>

<style scoped>

</style>