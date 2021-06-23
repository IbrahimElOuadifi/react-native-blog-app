import api from './base';

class PostAPI {

    static getAll = (async (callback)  => {
        try {
            const res = await api.get('post/');
            callback(res.data);
        } catch (err) {
            console.error(err.message);
        }
    });

    static getByUserId = (async (creator, callback)  => {
        try {
            const res = await api.get('post/', { params: { creator } });
            callback(res.data);
        } catch (err) {
            console.error(err.message);
        }
    });

    static create = (async (data, callback)  => {
        try {
            const res = await api.post('post/', data);
            console.log(res.data);
            callback();
        } catch (err) {
            console.error(err.message);
        }
    });

    static update = (async ({ _id, title, img }, callback)  => {
        try {
            const res = await api.put(`post/${_id}/`, { title, img });
            console.log(res.data);
            callback();
        } catch (err) {
            console.error(err.message);
        }
    });

    static delete = (async (id, callback)  => {
        try {
            const res = await api.delete(`post/${id}/`);
            console.log(res.data);
            callback();
        } catch (err) {
            console.error(err.message);
        }
    });
}

export default PostAPI;