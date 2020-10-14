import React from 'react';
import Form from './components/Form';
import MessagesList from "./components/MessagesList";

const URL = 'http://localhost:3000';

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            serverMessages:[]
        };

        setInterval(this.getMessages.bind(this), 1000);
    }

    sendMessage(newMessage){
        if(nick.value === '' || message.value === '')
            alert('Заполните поля, пожалуйста :с');
        else{
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
            <Form sendMessage={(newMessage) => this.sendMessage(newMessage)}/>
            <MessagesList messages={serverMessages}/>
        </>
    }
}

export default App;