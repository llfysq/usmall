import {requestSeckillList} from "../../util/request"
// 秒杀活动

const state={
    list:[]
}
const mutations={
    changeList(state,arr){
        state.list=arr
    }
}
const actions={
    requestList(context){
        requestSeckillList().then(res=>{
            context.commit("changeList",res.data.list)
        })
    }
}
const getters={
    list(state){
        return state.list
    }
}
export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}