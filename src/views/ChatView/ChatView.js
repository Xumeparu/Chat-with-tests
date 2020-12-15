import React from 'react';
import MessageForm from '../../components/MessageForm/MessageForm';
import MessagesList from '../../components/MessagesList/MessagesList';
import Index from '../../components/PainCat';
import apiServices from '../../apiServices';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

class ChatView extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [],
            users: []
        };

        this.timer = null;
    }

    componentDidMount() {
        let firstTime = true;
        this.setState({ users: [], messages: [] });
        this.timer = setInterval(async () => {
            await this.getMessages();
            if (firstTime) {
                this.scrollToBottom();
            }
            firstTime = false;
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    sendMessage({ content }) {
        apiServices.message
            .create({ content, chatId: this.props.match.params.id })
            .then(async () => {
                await this.getMessages();
                this.scrollToBottom();
            });
    }

    async getMessages() {
        function getMessageIds(messages) {
            return messages.map((message) => message.id);
        }

        function getOnlyNewMessages(serverMessages, stateMessages) {
            const serverIds = getMessageIds(serverMessages);
            const stateIds = getMessageIds(stateMessages);
            const newIds = serverIds.filter((id) => !stateIds.includes(id));
            return serverMessages.filter((message) => newIds.includes(message.id));
        }

        const serverMessages = await apiServices.message.getMessages(this.props.match.params.id);
        let newMessages = getOnlyNewMessages(serverMessages, this.state.messages);
        await this.getUsers(newMessages);
        newMessages = newMessages.map((message) => {
            const user = this.state.users.find((user) => user.id === message.userId);
            message.nickname = user.nickname;
            return message;
        });
        this.setState({ messages: [...this.state.messages, ...newMessages] });
    }

    async getUsers(newMessages) {
        const oldUsers = this.state.users;
        const oldUsersIds = oldUsers.map((user) => user.id);
        const newUsersIds = [...new Set(newMessages.map((message) => message.userId))];
        const toLoad = newUsersIds.filter((id) => !oldUsersIds.includes(id));

        if (!toLoad.length) return;

        const newUsers = [];
        for (let id of toLoad) {
            const user = await apiServices.user.getById(id);
            newUsers.push(user);
        }
        this.setState({ users: [...oldUsers, ...newUsers] });
    }

    scrollToBottom() {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }

    render() {
        const { messages } = this.state;

        return (
            <div className="chat-view">
                <div className={styles.chatView}>
                    <Index />
                    <div className={styles.messages}>
                        <MessagesList messages={messages}/>
                        <div className={styles.forScroll}
                            ref={(element) => {
                                this.messagesEnd = element;
                            }}>
                        </div>
                    </div>
                </div>
                <div className={styles.form}>
                    <MessageForm sendMessage={(data) => this.sendMessage(data)} />
                </div>
            </div>
        );
    }
}

ChatView.propTypes = {
    match: PropTypes.object
};

export default ChatView;
