import React from 'react';
import apiServices from '../../apiServices';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

export default class UsersSearchView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nickname: '',
            errorMessage: '',
            foundUsers: []
        };
    }

    validate() {
        this.setState({
            errorMessage: ''
        });
        if (this.state.nickname.length === 0) {
            this.setState({
                errorMessage: 'Enter nickname, please'
            });
            return false;
        }
        return true;
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.validate()) {
            apiServices.user
                .find(this.state.nickname)
                .then((foundUsers) => this.setState({ foundUsers, nickname: '' }))
                .catch((error) =>
                    this.setState({ errorMessage: 'Error: ' + error.response.data.error })
                );
        }
    }

    handleStartDialogue(userId) {
        const redirectToChat = (chatId) => {
            this.props.history.push(`/chat/${chatId}`);
        };

        apiServices.chat
            .create({
                isDialogue: true,
                participants: [userId]
            })
            .then((chat) => redirectToChat(chat.id))
            .catch((error) => {
                if (error.response.status === 303) {
                    return error.response.data;
                }
            })
            .then((chat) => (chat ? redirectToChat(chat.id) : null));
    }

    render() {
        const { nickname, errorMessage, foundUsers } = this.state;

        return (
            <>
                <form className="userSearch-form" onSubmit={(e) => this.handleSubmit(e)}>
                    {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
                    <div className={styles.userSearch}>
                        <label>
                            Nickname:&nbsp;
                            <input
                                type="text"
                                value={nickname}
                                name="chat-title"
                                className={styles.inputUserSearch}
                                onChange={(event) =>
                                    this.setState({ nickname: event.target.value })
                                }
                            />
                        </label>
                        <button type="submit" className={styles.button}>
                            Search
                        </button>
                    </div>
                </form>
                <ul>
                    {foundUsers.map((user) => (
                        <li key={user.id}>
                            {user.nickname}&nbsp;
                            {user.id !== this.props.user.id && (
                                <button
                                    className={styles.buttonStartDialogue}
                                    onClick={() => this.handleStartDialogue(user.id)}
                                >
                                    Start dialogue
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </>
        );
    }
}

UsersSearchView.propTypes = {
    history: PropTypes.object,
    user: PropTypes.object
};
