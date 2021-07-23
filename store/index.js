const cookieParser = process.server ? require('cookieparser') : undefined
    //服务端渲染期间运行的都是一个实例
    //防止数据冲突， state定义成一个函数， 返回数据对象
export const state = () => {
    return {
        //当前用户登录状态
        user: null
    }
}

export const mutations = {
    setUser(state, data) {
        state.user = data
    }
}

export const actions = {
    // nuxt中特殊方法 仅在服务端渲染期间自动调用
    //作用： 初始化容器数据 传递数据给客户端
    nuxtServerInit({ commit }, { req }) {
        let user = null

        //如果请求头存在cookie
        if (req.headers.cookie) {
            // console.log("nuxtcokkie")
            const parsed = cookieParser.parse(req.headers.cookie)

            try {
                user = JSON.parse(parsed.user)
            } catch (err) {

            }
        }
        //提交mutation
        commit('setUser', user)
    }
}