import React, { useState } from 'react';
import SearchChatForm from '../../components/SearchChatForm';
import ChatList from '../../components/ChatList/ChatList';
import apiServices from '../../apiServices';
import PropTypes from 'prop-types';
//import styles from './styles.module.css';

export default function SearchChatsView({ user, history }) {
    const [title, setTitle] = useState('');
    const [foundChats, setFoundChats] = useState([]);

    function getChatList() {
        apiServices.chat.search(title).then((foundChats) => setFoundChats(foundChats));
    }

    function handleChatSearch({ title }) {
        setTitle(title);
        apiServices.chat.search(title).then((foundChats) => setFoundChats(foundChats));
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
            <SearchChatForm handleSubmit={(data) => handleChatSearch(data)} />
            <ChatList
                userId={user.id}
                list={foundChats}
                goHandler={(id) => goHandler(id)}
                joinHandler={(id) => joinHandler(id)}
                deleteHandler={(id) => deleteHandler(id)}
            />
        </>
    );
}

SearchChatsView.propTypes = {
    history: PropTypes.object,
    user: PropTypes.object
};
