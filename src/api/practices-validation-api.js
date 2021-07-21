import axios from "axios";
import router from "@/router";

const client = axios.create({
    baseURL: process.env.VUE_APP_SEMAT_API_ENDPOINT,
    json: true,
    withCredentials: true
});

client.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        if (err.response.status === 401) {
            await router.push('/signin');
        } else {
            return Promise.reject(err);
        }
    }
);

export default {
    async execute(method, resource, data, headers){
        return client({
            method,
            url: resource,
            data,
            headers
        })
    },
    fetchAllPractices() {
        return this.execute('get', '/practices', null, {});
    },
    createPracticeValidationCriterion(criterionData){
        return this.execute('post', '/practice-validations', criterionData, {});
    },
    getAllPracticeValidationCriteria(owner){
        return this.execute('get', `/practice-validations/${owner}`, null, {})
    },
    deletePracticeValidationCriterion(id) {
        return this.execute('delete', `/practice-validations/${id}`, null, {});
    }
}