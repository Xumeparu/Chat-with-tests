import React from 'react';
import apiServices from '../../apiServices';
import ChatForm from '../../components/ChatForm/ChatForm';
import ChatList from '../../components/ChatList/ChatList';
import SearchChatForm from '../../components/SearchChatForm/SearchChatForm';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            foundChats: []
        };
    }

    componentDidMount() {
        this.getChatList();
    }

    handleChatCreate(params) {
        apiServices.chat.create(params).then(() => this.getChatList());
    }

    getChatList() {
        apiServices.chat
            .getMyChats(this.props.user.id)
            .then((response) => response.data)
            .then((chats) => this.setState({ chats }));
    }

    goHandler(id) {
        this.props.history.push(`/chat/${id}`);
    }

    joinHandler(id) {
        if (!confirm('Do you want to join this chat?')) return;

        apiServices.chat.join(id).then(() => this.getChatList());
    }

    deleteHandler(id) {
        if (!confirm('Do you want to delete this chat?')) return;

        apiServices.chat.delete(id).then(() => this.getChatList());
    }

    handleChatSearch({ title }) {
        apiServices.chat
            .search(title)
            .then((response) => response.data)
            .then((foundChats) => this.setState({ foundChats }));
    }

    render() {
        const { chats, foundChats } = this.state;
        const { user } = this.props;

        return (
            <>
                <h1>Profile</h1>
                <div className={styles.info}>Nickname: {user.nickname}</div>
                <div className={styles.info}>
                    Created: {new Date(user.createdAt).toLocaleString()}
                </div>
                <h3>My chats</h3>
                <ChatList
                    userId={user.id}
                    list={chats}
                    goHandler={(id) => this.goHandler(id)}
                    joinHandler={(id) => this.joinHandler(id)}
                    deleteHandler={(id) => this.deleteHandler(id)}
                />
                <ChatForm handleSubmit={(data) => this.handleChatCreate(data)} />

                <SearchChatForm handleSubmit={(data) => this.handleChatSearch(data)} />
                <ChatList
                    userId={user.id}
                    list={foundChats}
                    goHandler={(id) => this.goHandler(id)}
                    joinHandler={(id) => this.joinHandler(id)}
                    deleteHandler={(id) => this.deleteHandler(id)}
                />
            </>
        );
    }
}

ProfileView.propTypes = {
    history: PropTypes.object,
    user: PropTypes.object
};
