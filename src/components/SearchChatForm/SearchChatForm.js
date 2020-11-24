import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

class SearchChatForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            errorMessage: ''
        };
    }

    validate() {
        this.setState({
            errorMessage: ''
        });
        if (this.state.title.length === 0) {
            this.setState({
                errorMessage: 'Enter the title of the chat, please'
            });
            return false;
        }
        return true;
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.validate()) {
            this.props.handleSubmit({ title: this.state.title });
            this.setState({ title: '' });
        }
    }

    render() {
        const { title, errorMessage } = this.state;

        return (
            <>
                <h3>Search chat</h3>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
                    <div className={styles.searchChat}>
                        <label>
                            Chat title:&nbsp;
                            <input
                                value={title}
                                className={styles.inputChatTitle}
                                onChange={(event) => this.setState({ title: event.target.value })}
                            />
                        </label>
                        <button type="submit" className={styles.button}>
                            Search
                        </button>
                    </div>
                </form>
            </>
        );
    }
}

SearchChatForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

export default SearchChatForm;
