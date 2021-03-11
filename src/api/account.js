import axios from "axios";

const client = axios.create({
    baseURL: (process.env.NODE_ENV === 'prod' ? ''
        : 'http://localhost:3000'),
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
        return this.execute('patch', '/account', data,
            {withCredentials: true})
    }
}