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
    addAlphaPractice(practice, alpha) {
        return this.execute('post', `/practices/${practice}/owned-element/alpha/${alpha}`,
            null, {});
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
    },
    fetchAllPracticeWorkProductManifests(practiceId) {
        return this.execute('get',
            `/practices/${practiceId}/work-product-manifest`, null, {});
    },
    addPracticeWorkProductManifest(practiceId, data) {
        return this.execute('post',
            `/practices/${practiceId}/work-product-manifest`, data, {});
    },
    removePracticeWorkProductManifest(practiceId, wpmId) {
        return this.execute('delete',
            `/practices/${practiceId}/work-product-manifest/${wpmId}`, null, {});
    },
    addActivitySpaceToPractice(practice, activitySpace) {
        return this.execute('post',
            `/practices/${practice}/owned-element/activity-space/${activitySpace}`,
            null, {});
    }
}