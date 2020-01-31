import axios from '../../helpers/axios'
import router from '../../router'

export default {
    namespaced: true,
    state: {
        questions: [],
        filtered: [],
        detail: {},
        updateData: {
            name: 'Loading',
            description: 'Loading',
            tags: 'Loading',
            questionId: 'Loading'
        }
    },
    mutations: {
        SET_QUESTIONS(state,payload) {
            state.questions = payload
        },
        SET_DETAIL(state,payload) {
            state.detail = payload
        },
        REMOVE_QUESTION(state,payload) {
            let temp = state.questions
            state.questions = temp.filter(question => {
                return question._id !== payload
            })
        },
        SET_UPDATE_DATA(state,payload) {
            state.updateData = {
                name: payload.name,
                description: payload.description,
                tags: payload.tags,
                questionId: payload.questionId
            }
        },
        SET_FILTERED(state,payload) {
            state.filtered = payload
        }
    },
    actions: {
        updateQuestion ({rootState},payload) {
            axios({
                method: 'put',
                url: `/question/${payload.questionId}`,
                data: {
                    name: payload.name,
                    description: payload.description,
                    tags: payload.tags
                },
                headers: {token: localStorage.getItem('token')}
            })
                .then( () => {
                    rootState.success = true
                    rootState.successMessage = 'Question updated'
                    router.push({path:'/user-question'})
                })
                .catch( err => {
                    rootState.fail = true
                    rootState.failMessage = err.response.data.errors
                })
        },
        deleteQuestion ({commit,rootState},payload) {
            axios({
                method: 'delete',
                url: `/question/${payload}`,
                headers: {token: localStorage.getItem('token')}
            })
                .then( () => {
                    commit('REMOVE_QUESTION',payload)
                    rootState.success = true
                    rootState.successMessage = 'Question deleted'
                })
                .catch( err => {
                    rootState.fail = true
                    rootState.failMessage = err.response.data.errors
                })
        },
        addQuestion({commit,rootState},payload) {
            axios({
                method: 'post',
                url: '/question',
                data: {
                    name: payload.name,
                    description: payload.description,
                    tags: payload.tags
                },
                headers: {token: localStorage.getItem('token')}
            })
                .then( ({data}) => {
                    commit('SET_DETAIL',data)
                    rootState.success = true
                    rootState.successMessage = 'Question added'
                    router.push({path:`/question/${data._id}`})
                })
                .catch( err => {
                    rootState.fail = true
                    rootState.failMessage = err.response.data.errors
                })
        },
        getUserQuestions({commit,rootState}) {
            axios({
                method: 'get',
                url: '/question/user',
                headers: {token: localStorage.getItem('token')}
            })
                .then( ({data}) => {
                    commit('SET_QUESTIONS',data)})
                .catch( err => {
                    rootState.fail = true
                    rootState.failMessage = err.response.data.errors
                })
        },
        getTaggedQuestions({commit,rootState},tag) {
            axios({
                method: 'get',
                url: `/question?tag=${tag}`,
                headers: {token: localStorage.getItem('token')}
            })
                .then(({data}) => {
                    router.push({path: '/filter'})
                    commit('SET_FILTERED',data)
                })
                .catch( err => {
                    rootState.fail = true
                    rootState.failMessage = err.response.data.errors
                })
        },
        getQuestions({commit}) {
            axios({
                method: 'get',
                url: '/question'
            })
                .then( ({data}) => {
                    commit('SET_QUESTIONS',data)
                })
        },
        getDetail({commit,rootState},payload) {
            axios({
                method: 'get',
                url: `/question/${payload}`,
                headers: {token: localStorage.getItem('token')}
            })
                .then( ({data}) => commit('SET_DETAIL',data))
                .catch( err => {
                    rootState.fail = true
                    rootState.failMessage = err.response.data.errors
                })
        },
        upvote({rootState,dispatch},payload) {
            axios({
                method: 'patch',
                url: `question/${payload}`,
                data: {vote:1},
                headers: {token:localStorage.getItem('token')}
            })
                .then( () => {
                    dispatch('getDetail',payload)
                })
                .catch( () => {
                    rootState.fail = true
                    rootState.failMessage = 'Upvote failed'
                })
        },
        downvote({rootState,dispatch},payload) {
            axios({
                method: 'patch',
                url: `question/${payload}`,
                data: {vote:-1},
                headers: {token: localStorage.getItem('token')}
            })
                .then( () => {
                    dispatch('getDetail',payload)
                })
                .catch( () => {
                    rootState.fail = true
                    rootState.failMessage = 'Downvote failed'
                })
        }
    },
}