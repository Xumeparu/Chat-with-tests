import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            nick: '',
            message: ''
        };
    }

    handleSend() {
        if (this.state.nick === '' || this.state.message === '') {
            alert('Пожалуйста, заполните поля.');
        } else {
            this.props.sendMessage({
                nick: this.state.nick,
                message: this.state.message
            });

            this.setState({
                message: ''
            });
        }
    }

    render() {
        const { nick, message } = this.state;

        return (
            <form>
                <input
                    value={nick}
                    type="text"
                    className="nick"
                    placeholder="Enter nickname"
                    onChange={(e) => this.setState({ nick: e.target.value })}
                />
                <br />
                <textarea
                    value={message}
                    className="message"
                    placeholder="Enter your message"
                    onChange={(e) => this.setState({ message: e.target.value })}
                ></textarea>
                <br />
                <input
                    type="button"
                    className="button"
                    value="Send"
                    onClick={() => this.handleSend()}
                />
            </form>
        );
    }
}

Form.propTypes = {
    sendMessage: PropTypes.func
};

export default Form;
