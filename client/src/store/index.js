import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        questions: [],
        user: {}
    },
    mutations: {
        listOfQuestions(state, payload) {
            state.questions = payload
        },
        setCurrentUser(state, payload) {
            state.user.name = payload.name;
            state.user.email = payload.email;
        },
        setClearCurrentUser(state){
            state.user = {}
        },
        addListQuestions(state, payload){
            state.questions.unshift(payload)
        }
    },
    actions: {
        listOfQuestions(context, payload) {
            context.commit(
                'listOfQuestions',
                payload
            )
        },
        setCurrentUser(context, payload) {
            context.commit(
                'setCurrentUser',
                payload
            )
        },
        setClearCurrentUser(context){
            context.commit(
                'setClearCurrentUser'
            )
        },
        addListQuestions(context, payload){
            context.commit(
                'addListQuestions',
                payload
            )
        }
    },
    modules: {},
    getters: {
        questionsNumber: state => {
            return state.questions.length
        },
        questionsList: state => {
            return state.questions
        },
        getCurrentUser: state => {
            return state.user
        }
    }
})
