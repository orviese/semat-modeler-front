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
    },
    fetchAllPractices() {
        return this.execute('get', '/practices', null, {});
    },
    addAlphaPractice(data) {
        return this.execute('post', '/practices/owned-element/alpha', data, {});
    },
    removeAlphaPractice(practice, alpha) {
        return this.execute('delete',
            `/practices/${practice}/owned-element/alpha/${alpha}`, null, {});
    },
    addPracticeWorkProduct(practice, workProduct) {
        return this.execute('post',
            `/practices/${practice}/work-product`, workProduct, {});
    },
    updatePracticeWorkProduct(workProduct) {
        return this.execute('put',
            `/practices/work-product`, workProduct, {});
    }
}