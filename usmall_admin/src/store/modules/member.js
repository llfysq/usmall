// 会员管理
import {requestMemberList} from "../../util/request"

// 数据
const state={
    list:[]
}

// 修改
const mutations={
    changeList(state,arr){
        state.list=arr
    }
}

// 方法
const actions={
    requestList(context){
        requestMemberList().then(res=>{
            context.commit("changeList",res.data.list)
        })
    }
}

// 
const getters={
    list(state){
        return state.list
    }
}

// 
export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}