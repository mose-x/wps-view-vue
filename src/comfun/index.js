// 定义的公共方法
export default {
    install(Vue) {
        Vue.prototype.showErrMeg = function (msg) {
            this.$message({
                showClose: true,
                message: msg,
                type: 'error'
            });
        };
        Vue.prototype.showSuccessMeg = function (msg) {
            this.$message({
                showClose: true,
                message: msg,
                type: 'success'
            });
        };
    }
}
// 调用示例： this.showErrMeg(xxx)
