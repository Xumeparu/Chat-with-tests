import React from 'react';
import apiServices from '../../apiServices';
import styles from './styles.module.css';

export default class UserSearchView extends React.Component {
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
                .then((response) => response.data)
                .then((foundUsers) => this.setState({ foundUsers, nickname: '' }))
                .catch((error) =>
                    this.setState({ errorMessage: 'Error: ' + error.response.data.error })
                );
        }
    }

    render() {
        const { nickname, errorMessage, foundUsers } = this.state;

        return (
            <>
                <h3>Users search</h3>
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
                    {foundUsers.map(user => (
                        <li key={user.id}>{user.nickname}</li>
                    ))}
                </ul>
            </>
        );
    }
}
