// 角色管理
import {requestRoleList} from "../../util/request"

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
        requestRoleList().then(res=>{
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