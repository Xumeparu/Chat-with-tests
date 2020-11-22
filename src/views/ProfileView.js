import React from 'react';
import apiServices from '../apiServices';
import ChatForm from '../components/ChatForm';
import ChatList from '../components/ChatList';
import PropTypes from 'prop-types';
import SearchChatForm from '../components/SearchChatForm';

export default class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            errorMessage: '',
            chats: [],
            foundChats: []
        };
    }

    componentDidMount() {
        this.getChatList();
    }

    handleChatCreate({ title }) {
        apiServices.chat.create({ title }).then(() => this.getChatList());
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
        if (!confirm('Join this chat?')) return;

        apiServices.chat.join(id).then(() => this.getChatList());
    }

    deleteHandler(id) {
        if (!confirm('Delete this chat?')) return;

        apiServices.chat.delete(id).then(() => this.getChatList());
    }

    handleChatSearch({ title }) {
        apiServices.chat
            .search(title)
            .then((response) => response.data)
            .then((foundChats) => this.setState({ foundChats }));
    }

    render() {
        const { errorMessage, chats, foundChats } = this.state;
        const { user } = this.props;
        return (
            <>
                <h1>Profile</h1>
                {user && (
                    <>
                        <div className="profile">Nickname: {user.nickname}</div>
                        <div className="profile">
                            Created: {new Date(user.createdAt).toLocaleString()}
                        </div>
                    </>
                )}
                {errorMessage}
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
