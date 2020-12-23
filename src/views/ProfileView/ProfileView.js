import React, { useState, useEffect } from 'react';
import apiServices from '../../apiServices';
import ChatForm from '../../components/ChatForm/ChatForm';
import ChatList from '../../components/ChatList/ChatList';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default function ProfileView({ user, history }) {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        getChatList();
    }, []);

    function handleChatCreate(params) {
        apiServices.chat.create(params).then(() => getChatList());
    }

    function getChatList() {
        apiServices.chat.getMyChats(user.id).then((chats) => setChats(chats));
    }

    function goHandler(id) {
        history.push(`/chat/${id}`);
    }

    function joinHandler(id) {
        if (!confirm('Do you want to join this chat?')) return;

        apiServices.chat.join(id).then(() => getChatList());
    }

    function deleteHandler(id) {
        if (!confirm('Do you want to delete this chat?')) return;

        apiServices.chat.delete(id).then(() => getChatList());
    }

    return (
        <>
            <div className={styles.info}>Nickname: {user.nickname}</div>
            <div className={styles.info}>Created: {new Date(user.createdAt).toLocaleString()}</div>
            <h3>My chats</h3>
            <ChatList
                userId={user.id}
                list={chats}
                goHandler={(id) => goHandler(id)}
                joinHandler={(id) => joinHandler(id)}
                deleteHandler={(id) => deleteHandler(id)}
            />
            <ChatForm handleSubmit={(data) => handleChatCreate(data)} />
        </>
    );
}

ProfileView.propTypes = {
    history: PropTypes.object,
    user: PropTypes.object
};
