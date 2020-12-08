import axios from 'axios';

const axiosInstance = axios.create({
    //baseURL: 'https://shielded-anchorage-94550.herokuapp.com',
    baseURL: 'http://localhost:3001',
    withCredentials: true
});

export default {
    auth: {
        login: ({ nickname, password }) => axiosInstance.post('/auth', { nickname, password }),
        logout: () => axiosInstance.delete('/auth'),
        check: () => axiosInstance.get('/auth')
    },
    user: {
        create: ({ nickname, password }) => axiosInstance.post('/user', { nickname, password }),
        getCurrent: () => axiosInstance.get('/user'),
        getById: (id) => axiosInstance.get(`/user/${id}`),
        find: (nickname) => axiosInstance.get(`/user/?nickname=${nickname}`)
    },
    chat: {
        create: (params) => axiosInstance.post('/chat', params),
        getMyChats: (userId) => axiosInstance.get(`/chat/?participantId=${userId}`),
        search: (title) => axiosInstance.get(`/chat/?title=${title}`),
        getInfo: (id) => axiosInstance.get(`/chat/${id}`),
        delete: (id) => axiosInstance.delete(`/chat/${id}`),
        join: (chatId) => axiosInstance.put(`/chat/${chatId}`)
    },
    message: {
        create: ({ content, chatId }) => axiosInstance.post('/message', { content, chatId }),
        getMessages: (chatId) => axiosInstance.get(`/message/?chatId=${chatId}`),
        delete: (id) => axiosInstance.delete(`/message/${id}`)
    }
};
