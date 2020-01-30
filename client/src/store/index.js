import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex);

// const server = 'http://35.226.139.9';
const server = 'http://localhost:3000';

const base = axios.create({
    baseURL: server
});

export default new Vuex.Store({
    state: {
        questionsList: "",
        user: {},
        tags: []
    },
    mutations: {
        listOfQuestions(state, payload) {
            state.questionsList = payload
        },
        setCurrentUser(state, payload) {
            state.user.name = payload.name;
            state.user.email = payload.email;
        },
        setClearCurrentUser(state) {
            state.user = {}
        },
        setTags(state, payload) {
            state.tags.push(payload)
        },
        clearTags(state, payload){
            state.tags = []
        }
        // addListQuestions(state, payload) {
        //     state.questions.unshift(payload)
        // }
    },
    actions: {
        listOfQuestions(context, payload) {
            base({
                method: 'get',
                url: '/questions/',
            }).then(response => {
                context.commit(
                    'listOfQuestions',
                    response.data.data.reverse()
                );

                context.commit("clearTags");

                response.data.data.forEach(listTag => {
                    listTag.tags.forEach(tag => {
                        context.commit('setTags', tag);
                    })
                })
            }).catch(err => [
                console.log(err.response)
            ])
        },
        setCurrentUser(context, payload) {
            context.commit(
                'setCurrentUser',
                payload
            )
        },
        setClearCurrentUser(context) {
            context.commit(
                'setClearCurrentUser'
            )
        },
        // addListQuestions(context, payload) {
        //     context.commit(
        //         'addListQuestions',
        //         payload
        //     )
        // }
    },
    modules: {},
    getters: {
        // questionsNumber: state => {
        //     return state.questions.length
        // },
        questionsList: state => {
            return state.questionsList
        },
        getCurrentUser: state => {
            return state.user
        },
        tags: state => {
            return state.tags
        }
    }
})
