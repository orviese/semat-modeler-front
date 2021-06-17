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
    createPractice(practiceData){
        return this.execute('post', '/practices', practiceData, {});
    },
    updatePractice(practiceData){
        return this.execute('patch', '/practices', practiceData, {})
    }
}