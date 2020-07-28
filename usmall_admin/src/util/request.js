import axios from "axios"
import qs from "qs"

//响应拦截
axios.interceptors.response.use(res => {
    console.group("本次路径：" + res.config.url)
    console.log(res)
    console.groupEnd()
    return res;
})

const baseUrl = "/api"

//菜单添加
export const requestMenuAdd = (params) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(params)
    })
}
//菜单列表
export const requestMenuList = (params) => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: params
    })
}

//菜单某一个条数据
export const requestMenuDetail = params => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params
    })
}
//菜单修改
export const requestMenuUpdate = params => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(params)
    })
}

//菜单删除
export const requestMenuDelete = params => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify(params)
    })
}

// 角色添加
export const requestRoleAdd = params => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(params)
    })
}
// 角色列表
export const requestRoleList=()=>{
    return axios({
        url:baseUrl+"/api/rolelist",
        method:"get"
    })
}
// 角色获取一条数据
export const requestRoleDetail=params=>{
    return axios({
        url:baseUrl+"/api/roleinfo",
        method:"get",
        params
    })
}
// 角色修改
export const requestRoleUpdate=(params)=>{
    return axios({
        url:baseUrl+"/api/roleedit",
        method:"post",
        data:qs.stringify(params)
    })
}
// 角色删除
export const requestRoleDelete=(params)=>{
    return axios({
        url:baseUrl+"/api/roledelete",
        method:"post",
        data:qs.stringify(params)
    })
}
// 管理员添加
export const requestManageAdd=(params)=>{
    return axios({
        url:baseUrl+"/api/useradd",
        method:"post",
        data:qs.stringify(params)
    })
}
// 管理员列表
export const requestManageList=(params)=>{
    return axios({
        url:baseUrl+"/api/userlist",
        method:"get",
        params
    })
}
// 管理员总数
export const requestManageSum=()=>{
    return axios({
        url:baseUrl+"/api/usercount",
        method:"get"
    })
}
// 管理员获取一条
export const requestManageDetail=(params)=>{
    return axios({
        url:baseUrl+"/api/userinfo",
        method:"get",
        params
    })
}
//管理员修改
export const requestManageUpdate=(params)=>{
    return axios({
        url:baseUrl+"/api/useredit",
        method:"post",
        data:qs.stringify(params)
    })
}
// 管理员删除
export const requestManageDelete=(params)=>{
    return axios({
        url:baseUrl+"/api/userdelete",
        method:"post",
        data:qs.stringify(params)
    })
}
// 管理员登录
export const requestManageLogin=(params)=>{
    return axios({
        url:baseUrl+"/api/userlogin",
        method:"post",
        data:qs.stringify(params)
    })
}

// 商品分类添加
export const requestCateAdd = params => {
     //如果data中含有文件
       var form=new FormData();
       for(var i in params){
           form.append(i,params[i])
       }
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data:form
    })
}
// 商品分类列表
export const requestCateList=(params)=>{
    return axios({
        url:baseUrl+"/api/catelist",
        method:"get",
        params
    })
}
// 商品分类获取一条数据
export const requestCateDetail=params=>{
    return axios({
        url:baseUrl+"/api/cateinfo",
        method:"get",
        params
    })
}
// 商品分类修改
export const requestCateUpdate=(params)=>{
    //如果data中含有文件
       var form=new FormData();
       for(var i in params){
           form.append(i,params[i])
       }
    return axios({
        url:baseUrl+"/api/cateedit",
        method:"post",
        data:form
    })
}
// 商品分类删除
export const requestCateDelete=(params)=>{
    return axios({
        url:baseUrl+"/api/catedelete",
        method:"post",
        data:qs.stringify(params)
    })
}


// 商品规格添加
export const requestSpecAdd = params => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data:params
    })
}
// 商品规格总数
export const requestSpecSum=()=>{
    return axios({
        url:baseUrl+"/api/specscount",
        method:"get",
        
    })
}

// 商品规格列表
export const requestSpecList=(params)=>{
    return axios({
        url:baseUrl+"/api/specslist",
        method:"get",
        params
    })
}
// 商品规格获取一条数据
export const requestSpecDetail=params=>{
    return axios({
        url:baseUrl+"/api/specsinfo",
        method:"get",
        params
    })
}
// 商品规格修改
export const requestSpecUpdate=(params)=>{
    return axios({
        url:baseUrl+"/api/specsedit",
        method:"post",
        data:params
    })
}
// 商品规格删除
export const requestSpecDelete=(params)=>{
    return axios({
        url:baseUrl+"/api/specsdelete",
        method:"post",
        data:qs.stringify(params)
    })
}









// 会员列表
export const requestMemberList=()=>{
    return axios({
        url:baseUrl+"/api/memberlist",
        method:"get"
    })
}
// 会员获取一条
export const requestMemberDetail=(params)=>{
    return axios({
        url:baseUrl+"/api/memberinfo",
        method:"get",
        params
    })
}
// 会员修改
export const requestMemberUpdate=(params)=>{
    return axios({
        url:baseUrl+"/api/memberedit",
        method:"post",
        data:qs.stringify(params)
    })
}

//轮播图添加
export const requestBannerAdd = params => {
     //如果data中含有文件
       var form=new FormData();
       for(var i in params){
           form.append(i,params[i])
       }
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data:form
    })
}
//轮播图列表
export const requestBannerList=()=>{
    return axios({
        url:baseUrl+"/api/bannerlist",
        method:"get",
        
    })
}
//轮播图获取一条数据
export const requestBannerDetail=params=>{
    return axios({
        url:baseUrl+"/api/bannerinfo",
        method:"get",
        params
    })
}
//轮播图修改
export const requestBannerUpdate=(params)=>{
    //如果data中含有文件
       var form=new FormData();
       for(var i in params){
           form.append(i,params[i])
       }
    return axios({
        url:baseUrl+"/api/banneredit",
        method:"post",
        data:form
    })
}
//轮播图删除
export const requestBannerDelete=(params)=>{
    return axios({
        url:baseUrl+"/api/bannerdelete",
        method:"post",
        data:qs.stringify(params)
    })
}



//秒杀活动添加
export const requestSeckillAdd = (params) => {
    return axios({
        url: baseUrl + "/api/seckadd",
        method: "post",
        data: qs.stringify(params)
    })
}
//秒杀活动列表
export const requestSeckillList = () => {
    return axios({
        url: baseUrl + "/api/secklist",
        method: "get",
      
    })
}

//秒杀活动某一个条数据
export const requestSeckillDetail = params => {
    return axios({
        url: baseUrl + "/api/seckinfo",
        method: "get",
        params
    })
}
//秒杀活动修改
export const requestSeckillUpdate = params => {
    return axios({
        url: baseUrl + "/api/seckedit",
        method: "post",
        data: qs.stringify(params)
    })
}

//秒杀活动删除
export const requestSeckillDelete = params => {
    return axios({
        url: baseUrl + "/api/seckdelete",
        method: "post",
        data: qs.stringify(params)
    })
}

