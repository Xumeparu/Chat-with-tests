import React from 'react';
import MessageForm from '../../components/MessageForm/MessageForm';
import MessagesList from '../../components/MessageList/MessagesList';
import Index from '../../components/PainCat';
import apiServices from '../../apiServices';
import PropTypes from 'prop-types';

class ChatView extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [],
            user: []
        };

        this.timer = null;
    }

    componentDidMount() {
        this.setState({ users: [], messages: [] });
        this.timer = setInterval(this.getMessages.bind(this), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    sendMessage({ content }) {
        apiServices.message
            .create({ content, chatId: this.props.match.params.id })
            .then(() => this.getMessages());
    }

    getMessages() {
        apiServices.message
            .getMessages(this.props.match.params.id)
            .then((response) => response.data)
            .then((messages) => this.setState({ messages }))
            .then(() => this.getUsers())
            .then(() => {
                const newMessages = this.state.messages.map((message) => {
                    const user = this.state.users.find((user) => user.id === message.userId);
                    message.nickname = user.nickname;
                    return message;
                });
                this.setState({ messages: newMessages });
            });
    }

    getUsers() {
        const oldUsers = this.state.users;
        const oldUsersIds = oldUsers.map((user) => user.id);
        const newUsersIds = [...new Set(this.state.messages.map((message) => message.userId))];
        const toLoad = newUsersIds.filter((id) => !oldUsersIds.includes(id));

        if (!toLoad.length) return;

        return Promise.all(toLoad.map((id) => apiServices.user.getById(id)))
            .then((response) => response.map((response) => response.data))
            .then((newUsers) => this.setState({ users: [...oldUsers, ...newUsers] }));
    }

    render() {
        const { messages } = this.state;

        return (
            <>
                <h1>Chat</h1>
                <Index />
                <MessageForm sendMessage={(data) => this.sendMessage(data)} />
                <MessagesList messages={messages} />
            </>
        );
    }
}

ChatView.propTypes = {
    match: PropTypes.object
};

export default ChatView;
