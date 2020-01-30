import axios from 'axios'

const state = {
    myQuestion : []
}
const mutations = {
  fillItem(state,payload){
      state.myQuestion = payload
  }  
}
const actions = {
  fetchAction(context) {
    axios({
        url: `http://18.136.105.19:3000/questions/myQuestion`,
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
    getmyQuestion : (state) => {
      return  state.myQuestion
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}