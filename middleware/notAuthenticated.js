/* 
 **已登录状态无法访问的中间件  
 **跳转首页
 */
export default function({ store, redirect }) {
    // If the user is not authenticated
    if (store.state.user) {
        return redirect('/')
    }
}