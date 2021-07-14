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
    async execute(method, resource, data, headers) {
        return client({
            method,
            url: resource,
            data,
            headers
        })
    },
    createCompetency(data) {
        return this.execute('post', '/competencies', data, {});
    },
    updateCompetency(data) {
        return this.execute('put', '/competencies', data, {})
    },
    fetchAllCompetencies() {
        return this.execute('get', '/competencies', null, {});
    },
    fetchPracticeCompetencies(id) {
        return this.execute('get', `/competencies/practice/${id}`, null, {});
    },
    removeCompetency(id) {
        return this.execute('delete', `/competencies/${id}`, null, {});
    }
}