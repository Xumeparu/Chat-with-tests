import React from 'react';
import ChatList from '../components/ChatList';
import { action } from '@storybook/addon-actions';

export default {
    title: 'ChatList',
    component: ChatList
};

const Template = (args) => <ChatList {...args} />;

export const Common = Template.bind({});
Common.args = {
    list: [
        {
            id: '19',
            title: 'My chat'
        },
        {
            id: '4',
            title: 'My second chat'
        },
        {
            id: '26',
            title: 'My third chat'
        }
    ],
    clickHandle: action('Chat clicked')
};

export const EmptyList = Template.bind({});
EmptyList.args = {
    list: [],
    clickHandle: action('Chat clicked')
};
