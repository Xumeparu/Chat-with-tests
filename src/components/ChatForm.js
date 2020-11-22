import React from 'react';
import PropTypes from 'prop-types';

class ChatForm extends React.Component {
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
                <h3>Create and edit chat</h3>
                <form className="chat-form" onSubmit={(e) => this.handleSubmit(e)}>
                    <div>
                        {errorMessage && <span style={{ color: '#9d2043' }}>{errorMessage}</span>}
                    </div>
                    <div>
                        <label>
                            Chat title:
                            <input
                                value={title}
                                name="chat-title"
                                onChange={(event) => this.setState({ title: event.target.value })}
                            />
                        </label>
                    </div>
                    <button type="submit">Save</button>
                </form>
            </>
        );
    }
}

ChatForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

export default ChatForm;
