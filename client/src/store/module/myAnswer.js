import axios from 'axios'

const state = {
    myAnswer : []
}
const mutations = {
  fillItem(state,payload){
      state.myAnswer = payload
  }  
}
const actions = {
  fetchAction(context) {
    axios({
        url: `http://18.136.105.19:3000/answers`,
        method: 'get',
        headers:{
            token : localStorage.getItem('token')
        }
        })
      .then(({data})=>{
          context.commit('fillItem',data)
      })
      .catch(err=>{
          console.log(err)
      })
  }
}
const getters = {
    getmyAnswer : (state) => {
      return  state.myAnswer
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}