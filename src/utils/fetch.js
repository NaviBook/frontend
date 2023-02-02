import axios from 'axios';

export const getAPI = async (url,param = {}) => {
    try{
        const response = await axios.get(url, param);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const postAPI = async (url, param = {}) => {
    try{
        const response = await axios.post(url, param);
        return response;
    } catch (error) {
        return error.response;
    }
};