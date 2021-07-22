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
    nuxtServerInit({ commit }, { req }) {

    }
}