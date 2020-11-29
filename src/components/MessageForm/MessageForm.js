import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

class MessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };
    }

    handleSend(event) {
        event.preventDefault();
        if (this.state.content === '') {
            alert('Enter your message, please');
        } else {
            this.props.sendMessage({
                content: this.state.content
            });

            this.setState({
                content: ''
            });
        }
    }

    render() {
        const { content } = this.state;

        return (
            <form className="message-form" onSubmit={(event) => this.handleSend(event)}>
                <textarea
                    value={content}
                    name="content"
                    className={styles.content}
                    placeholder="Enter your message"
                    onChange={(e) => this.setState({ content: e.target.value })}
                />
                <br />
                <button type="submit" className={styles.button}>
                    Send
                </button>
            </form>
        );
    }
}

MessageForm.propTypes = {
    sendMessage: PropTypes.func
};

export default MessageForm;