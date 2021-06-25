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
    createAreaOfConcern(data){
        return this.execute('post', '/areas-of-concern', data, {});
    },
    updateAreaOfConcern(data){
        return this.execute('put', '/areas-of-concern', data, {})
    },
    fetchAllAreasOfConcern() {
        return this.execute('get', '/areas-of-concern', null, {});
    },
    removeAreasOfConcern(id) {
        return this.execute('delete', `/areas-of-concern/${id}`, null, {});
    }
}