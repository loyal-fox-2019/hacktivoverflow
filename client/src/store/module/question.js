import axios from 'axios'

const state = {
    question : []
}
const mutations = {
  fillItem(state,payload){
      state.question = payload
  }  
}
const actions = {
  fetchAction(context) {
      axios.get('http://18.136.105.19:3000/questions')
      .then(({data})=>{
          context.commit('fillItem',data)
      })
      .catch(err=>{
          console.log(err)
      })
  }
}
const getters = {
    getquestion : (state) => {
      return  state.question
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}