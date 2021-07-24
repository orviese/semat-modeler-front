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
    getAllPracticeValidationCriteriaSummary(owner){
        return this.execute('get', `/practice-validations/${owner}/summary`, null, {})
    },
    createPracticeValidationResult(results){
        return this.execute('put', `/practice-validations`, results, {})
    },
    deletePracticeValidationCriterion(id) {
        return this.execute('delete', `/practice-validations/${id}`, null, {});
    },
    deleteValidationsFromCriterion(criterion) {
        return this.execute('delete', `/practice-validations/validations/${criterion}`, null, {});
    },
    createNewPublicPracticeValidation(practice, data) {
        return this.execute('post', `/practice-validations/${practice}/public`, data, {});
    },
    getAllPublicPracticeValidation(practice) {
        return this.execute('get', `/practice-validations/${practice}/public`, null, {});
    },
    getPublicPracticeValidation(validationId) {
        return this.execute('get', `/practice-validations/public/${validationId}`, null, {});
    },
    saveAndClosePublicPracticeValidation(validationId, data) {
        return this.execute('put', `/practice-validations/public/${validationId}`, data, {});
    }
}