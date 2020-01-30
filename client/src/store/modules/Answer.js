import axios from '../../helpers/axios'

export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        postAnswer({dispatch,rootState},payload) {
            axios({
                method: 'post',
                url: '/answer',
                data: {
                    description: payload.description,
                    questionId: payload.questionId
                },
                headers: {token: localStorage.getItem('token')}
            })
                .then( () => {
                    rootState.success = true
                    rootState.successMessage = 'Answer submitted'
                    dispatch('question/getDetail',payload.questionId)
                })
                .catch( err => {
                    rootState.fail = true
                    rootState.failMessage = err.response.data.errors
                } )
        },
        upvote({dispatch,rootState},payload) {
            axios({
                method: 'patch',
                url: `/answer/${payload.answerId}`,
                headers: {token: localStorage.getItem('token')},
                data: {
                    vote:1
                }
            })
                .then( () => {
                    dispatch('question/getDetail',payload.questionId,{root: true})
                })
                .catch( err => {
                    rootState.fail = true
                    rootState.failMessage = err.response.data.errors
                })
        },
        downvote({dispatch,rootState},payload) {
            axios({
                method: 'patch',
                url: `/answer/${payload.answerId}`,
                headers: {token: localStorage.getItem('token')},
                data: {
                    vote:-1
                }
            })
                .then( () => {
                    dispatch('question/getDetail',payload.questionId,{root: true})
                })
                .catch( err => {
                    rootState.fail = true
                    rootState.failMessage = err.response.data.errors
                })
        }
    },
}