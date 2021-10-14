const getter = {
    isMobile: (state: any) => {
        return navigator.userAgent.match(
            /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        );
    },
    userInfo: (state: any) => state.user.userInfo,
    haveLogin: (state: any) => Object.keys(state.user.userInfo).length > 0,
}
export default getter;
