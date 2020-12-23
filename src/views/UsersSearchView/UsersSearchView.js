import React, { useState } from 'react';
import apiServices from '../../apiServices';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

export default function UsersSearchView(props) {
    const [nickname, setNickname] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [foundUsers, setFoundUsers] = useState([]);

    function validate() {
        setErrorMessage(null);
        if (nickname.length === 0) {
            setErrorMessage('Enter nickname, please');
            return false;
        }
        return true;
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (validate()) {
            apiServices.user
                .find(nickname)
                .then((foundUsers) => {
                    setFoundUsers(foundUsers);
                    setNickname('');
                })
                .catch((error) => setErrorMessage('Error: ' + error.response.data.error));
        }
    }

    function handleStartDialogue(userId) {
        const redirectToChat = (chatId) => {
            props.history.push(`/chat/${chatId}`);
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

    return (
        <>
            <form className="userSearch-form" onSubmit={(e) => handleSubmit(e)}>
                {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
                <div className={styles.userSearch}>
                    <label>
                        Nickname:&nbsp;
                        <input
                            type="text"
                            value={nickname}
                            name="chat-title"
                            className={styles.inputUserSearch}
                            onChange={(event) => setNickname(event.target.value)}
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
                        {user.id !== props.user.id && (
                            <button
                                className={styles.buttonStartDialogue}
                                onClick={() => handleStartDialogue(user.id)}
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

UsersSearchView.propTypes = {
    history: PropTypes.object,
    user: PropTypes.object
};
