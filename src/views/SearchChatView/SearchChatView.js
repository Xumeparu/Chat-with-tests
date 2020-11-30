import React from 'react';
import SearchChatForm from '../../components/SearchChatForm';
import ChatList from '../../components/ChatList/ChatList';
import apiServices from '../../apiServices';
import PropTypes from 'prop-types';
//import styles from './styles.module.css';

export default class SearchChatView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            foundChats: []
        };
    }

    getChatList() {
        apiServices.chat
            .search(this.state.title)
            .then((response) => response.data)
            .then((foundChats) => this.setState({ foundChats }));
    }

    handleChatSearch({ title }) {
        this.setState({ title });
        apiServices.chat
            .search(title)
            .then((response) => response.data)
            .then((foundChats) => this.setState({ foundChats }));
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

    render() {
        const { foundChats } = this.state;
        const { user } = this.props;

        return (
            <>
                <h3>Search chat</h3>
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

SearchChatView.propTypes = {
    history: PropTypes.object,
    user: PropTypes.object
};
