import axios from "axios";

const client = axios.create({
    baseURL: process.env.VUE_APP_SEMAT_API_ENDPOINT,
    json: true,
    withCredentials: true
});

export default {
    async execute(method, resource, data, headers){
        return client({
            method,
            url: resource,
            data,
            headers
        })
    },
    register(data){
        return this.execute('post', '/account/signup', data, {});
    },
    signIn(data){
        return this.execute('post', '/account/signin', data,{});
    },
    updateProfile(data){
        return this.execute('patch', '/account', data, {})
    },
    signOut() {
        return this.execute('post', '/account/signout', {}, {});
    }
}