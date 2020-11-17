import React from 'react';
import apiServices from '../apiServices';
import ChatForm from '../components/ChatForm';
import ChatList from '../components/ChatList';
import PropTypes from 'prop-types';

export default class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            errorMessage: '',
            chats: []
        };
    }

    componentDidMount() {
        apiServices.user
            .getProfile()
            .then((response) => response.data)
            .then((user) => this.setState({ user }))
            .then(() => this.getChatList())
            .catch((error) =>
                this.setState({ errorMessage: 'Error! ' + error.response.data.error })
            );
    }

    handleChatCreate({ title }) {
        apiServices.chat.create({ title }).then(() => this.getChatList());
    }

    getChatList() {
        apiServices.chat
            .getMyChats(this.state.user.id)
            .then((response) => response.data)
            .then((chats) => this.setState({ chats }));
    }

    handleChatClick(id) {
        this.props.history.push(`/chat/${id}`);
    }

    render() {
        const { user, errorMessage, chats } = this.state;
        return (
            <>
                <h1>Profile</h1>
                {user && (
                    <>
                        <div className="profile">ID: {user.id}</div>
                        <div className="profile">Nickname: {user.nickname}</div>
                        <div className="profile">
                            Created: {new Date(user.createdAt).toLocaleString()}
                        </div>
                    </>
                )}
                {errorMessage}
                <ChatList list={chats} clickHandle={(id) => this.handleChatClick(id)} />
                <ChatForm handleSubmit={(data) => this.handleChatCreate(data)} />
            </>
        );
    }
}

ProfileView.propTypes = {
    history: PropTypes.object
};
