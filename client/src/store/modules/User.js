import axios from '../../helpers/axios'

export default {
    namespaced: true,
    state: {
        tags: []
    },
    mutations: {
        SET_TAGS(state,payload) {
            state.tags = payload
            console.log(state.tags)
        },
        ADD_TAG(state,payload) {
            state.tags.push(payload)
        },
        REMOVE_TAG(state,payload) {
            let temp = state.tags
            state.tags = temp.filter( tag => {
                return tag !== payload
            })
        }
    },
    actions: {
        getTags({commit,rootState}) {
            axios({
                method: 'get',
                url: '/user/tag',
                headers: {token: localStorage.getItem('token')}
            })
                .then( ({data}) => {
                    commit('SET_TAGS',data)
                })
                .catch( err => {
                    rootState.fail = true
                    rootState.failMessage = err.response.data.errors
                })
        }
    }
}