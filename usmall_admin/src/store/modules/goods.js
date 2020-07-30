//管理员管理
import { requestGoogsList, requestGoogsSum } from "../../util/request"

// 数据
const state = {
    //列表数据
    list: [],
    //一页放多少条
    size: 2,
    //数据总数量
    total: 0,
    //当前的页码,默认第一页
    page: 1
}
// 修改
const mutations = {
    //列表数据
    changeList(state, arr) {
        state.list = arr
    },
    // 数据总数量
    changeTotal(state, num) {
        state.total = num
    },
    // 修改页面页码
    changePage(state, page) {
        state.page = page
    },
}
// 方法
const actions = {
    //列表数据
    requestList(context) {
        const params = {
            page: context.state.page,
            size: context.state.size
        }
        requestGoogsList(params).then(res => {
            // console.log(res)
            //没有取到数据
            //判断一页中是否还有数据， 如果这一页没有数据了并且页数是大于1的（页数最少有一页），就将页数减去1
            if (res.data.list.length == 0 && context.state.page > 1) {
                context.commit("changePage", context.state.page - 1);
                context.dispatch("requestList")
                return;
            }
            context.commit("changeList", res.data.list)
        })
    },
    // 数据总数量
    requestTotal(context) {
        requestGoogsSum().then(res => {
            context.commit("changeTotal", res.data.list[0].total)
        })
    },
    //页面修改页码
    requestChangePage(context, page) {
        context.commit("changePage", page)
    },

}

const getters = {
    list(state) {
        return state.list
    },
    total(state) {
        return state.total
    },
    size(state) {
        return state.size
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}