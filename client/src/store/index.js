import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import router from "../router";

Vue.use(Vuex);

const server = 'http://35.226.139.9';
// const server = 'http://localhost:3000';

const base = axios.create({
    baseURL: server
});

export default new Vuex.Store({
    state: {
        questionsList: "",
        questionData: {},
        user: {},
        tags: [],
        message: ""
    },
    mutations: {
        listOfQuestions(state, payload) {
            state.questionsList = payload
        },
        setCurrentQuestions(state, payload) {
            state.questionData = payload;
        },
        setCurrentUser(state, payload) {
            state.user = payload;
        },
        setClearCurrentUser(state) {
            state.user = {}
        },
        setTags(state, payload) {
            if (state.tags.indexOf(payload) <= -1) {
                state.tags.push(payload)
            }
        },
        clearTags(state, payload) {
            state.tags = []
        }
    },
    actions: {
        postQuestion(context, payload) {
            base({
                method: 'post',
                url: '/questions/create',
                data: payload,
                headers: {
                    Authorization: "token " + Vue.$cookies.get('token')
                }
            }).then(response => {
                console.log(response.data);
                this.state.message = {
                    title: 'success',
                    message: response.data.message
                };
            }).catch(err => {
                console.log(err.response.data.error);
                this.state.message = {
                    title: 'error',
                    message: err.response.data.error
                };
            });
        },
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
                    if (listTag.tags.length > 0) {
                        listTag.tags.forEach(tag => {
                            context.commit('setTags', tag);
                        })
                    }
                })
            }).catch(err => [
                console.log(err.response)
            ])
        },
        addWatchTags(context, payload) {
            base({
                method: 'patch',
                url: '/users/watchTags',
                headers: {
                    Authorization: "token " + Vue.$cookies.get('token')
                },
                data: {
                    watchTags: payload
                }
            }).then(response => {
                console.log(response.data)
            }).catch(err => [
                console.log(err.response)
            ])
        },
        getCurrentUser(context, payload) {
            base({
                method: 'get',
                url: '/users',
                headers: {
                    Authorization: "token " + Vue.$cookies.get('token')
                }
            }).then(response => {
                context.commit(
                    'setCurrentUser',
                    response.data.data
                );
            }).catch(err => [
                console.log(err.response)
            ])
        },
        getCurrentQuestion(context, payload) {
            base({
                method: 'get',
                url: '/questions/' + payload,
                headers: {
                    Authorization: 'token ' + Vue.$cookies.get('token')
                }
            }).then(response => {
                context.commit('setCurrentQuestions', response.data)
            }).catch(err => {
                console.log(err.response);
            })
        },
        removeQuestion(context, payload) {
            base({
                method: 'delete',
                url: '/questions/' + payload,
                headers: {
                    Authorization: "token " + Vue.$cookies.get('token')
                }
            }).then(response => {
                console.log(response.data);
                router.push("/")
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
    },
    modules: {},
    getters: {
        questionsList: state => {
            return state.questionsList
        },
        questionData: state => {
            return state.questionData
        },
        getCurrentUser: state => {
            return state.user
        },
        tags: state => {
            return state.tags
        },
        message: state => {
            return state.message
        }
    }
})
