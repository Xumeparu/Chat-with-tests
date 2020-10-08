import React from 'react';
import {shallow} from 'enzyme';
import MessagesList from './MessagesList';
import Message from "./Message";

test('MessagesList shows messages', () => {
    const nick = "test";
    const message = 'test';
    const component = shallow(<Message nick={message.nick} message={message.message} key={index}/>);
    expect(component.text()).toContain(nick);
    expect(component.text()).toContain(message);
});