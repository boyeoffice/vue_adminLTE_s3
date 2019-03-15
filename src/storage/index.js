export default {
    state: {
        access_token: null,
        expires_in: null
    },
    initialize(){
        this.access_token = localStorage.getItem('boye_portal_access')
        this.expires_in = localStorage.getItem('boye_portal_expires')
    },
    set(access_token, expires_in){
        localStorage.setItem('boye_portal_access', access_token)
        localStorage.setItem('boye_portal_expires', expires_in)
        this.initialize()
    },
    getToken(){
        var access_token = localStorage.getItem('boye_portal_access')
        return access_token
    },
    remove(){
        localStorage.removeItem('boye_portal_access')
        localStorage.removeItem('boye_portal_expires')
    }
}