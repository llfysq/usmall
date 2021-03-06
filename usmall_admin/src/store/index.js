import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import {state,mutations,getters} from "./mutations"
import actions from "./actions"
import menu from "./modules/menu"
import role from "./modules/role"
import manage from "./modules/manage"
import cate from "./modules/cate"
import member from "./modules/member"
import seckill from "./modules/seckill"
import spec from "./modules/spec"
import banner from "./modules/banner"
import goods from "./modules/goods"

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules:{
        menu,
        role,
        manage,
        cate,
        member,
        seckill,
        spec,
        banner,
        goods
    }
})