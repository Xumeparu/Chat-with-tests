import React from 'react';
import Form from '../components/Form';
import MessagesList from "../components/MessagesList";
import Index from "../components/PainCat";

const URL = 'http://localhost:3000';

class ChatView extends React.Component{
    constructor(){
        super();
        this.state = {
            serverMessages:[]
        };

        this.timer = null;
    }

    componentDidMount() {
        this.timer = setInterval(this.getMessages.bind(this), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    sendMessage(newMessage){
        let xhr = new XMLHttpRequest();
        xhr.open('POST', URL);
        xhr.send(JSON.stringify(newMessage));

        xhr.onload = () => {
            if (xhr.status !== 200) {
                console.error('Ошибка!');
            } else {
                this.parseMessages(xhr.response);
            }
        };

        xhr.onerror = function () {
            console.log('Запрос не удался');
        };
    }

    getMessages(){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', URL);
        xhr.send();
        xhr.onload = () => {
            if (xhr.status !== 200) {
                console.error('Ошибка!');
            } else {
                this.parseMessages(xhr.response);
            }
        };
    }

    parseMessages(response){
        const newServerMessages = JSON.parse(response);
        this.setState({
            serverMessages: newServerMessages
        });
    }

    render(){
        const {serverMessages} = this.state;

        return <>
            <h1>Chat</h1>
            <Index/>
            <Form sendMessage={(newMessage) => this.sendMessage(newMessage)}/>
            <MessagesList messages={serverMessages}/>
        </>
    }
}

export default ChatView;