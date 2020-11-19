import React from 'react';
import PropTypes from 'prop-types';

class MessageForm extends React.Component {
    constructor() {
        super();
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
            <form onSubmit={(event) => this.handleSend(event)}>
                <input
                    value={content}
                    type="text"
                    className="message"
                    placeholder="Enter your message"
                    onChange={(e) => this.setState({ content: e.target.value })}
                />
                <br />
                <button type="submit" className="button">
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
