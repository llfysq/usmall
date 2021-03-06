// 商品规格
import {requestSpecList,requestSpecSum} from "../../util/request"

// 数据
const state={
      //列表数据
      list:[],
      //一页放多少条
      size:2,
      //数据总数量
      total:0,
      //当前的页码,默认第一页
      page:1
}
// 修改
const mutations={
    //列表数据
    changeList(state,arr){
        arr.forEach(i => {
            i.attrs=JSON.parse(i.attrs)
        });
        state.list=arr
    },
    // 数据总数量
    changeTotal(state,num){
        state.total=num
    },
    // 修改页面页码
    changePage(state,page){
        state.page=page
    },
}
// 方法
const actions={
     //列表数据
     //调用这个action,如果要分页，就不用传参；如果要取所有的数据，就传递一个true
    requestList(context,bool){
        // add页面传过来一个bool值ture,请求所有的规格属性，是ture的时候就不走分页的，走分页就只能获取到一部分数据而已
        var params={}
        if(bool){
            params={}//空对象可以取到所有的数据
        }else{
            params={
            page:context.state.page,
            size:context.state.size
        }
        }
       
        requestSpecList(params).then(res=>{
             //没有取到数据
             if(res.data.list.length==0&&context.state.page>1){
                context.commit("changePage",context.state.page-1);
                context.dispatch("requestList")
                return;
            }
            context.commit("changeList",res.data.list)
        })
    },
    // 数据总数量
    requestTotal(context){
        requestSpecSum().then(res=>{
            context.commit("changeTotal",res.data.list[0].total)
        })
    },
    //页面修改页码
    requestChangePage(context,page){
            context.commit("changePage",page)
    },

}

const getters={
    list(state){
        return state.list
    },
    total(state){
        return state.total
    },
    size(state){
        return state.size
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}