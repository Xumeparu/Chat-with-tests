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
    userId: '1',
    list: [
        {
            id: '1',
            createdAt: '2020-11-17T17:16:28.123Z',
            title: 'My chat',
            userId: '1',
            participants: ['1', '2']
        },
        {
            id: '2',
            createdAt: '2020-11-17T17:16:28.1231Z',
            title: 'My second chat',
            userId: '2',
            participants: ['1', '2']
        },
        {
            id: '3',
            createdAt: '2020-11-17T17:16:28.1232Z',
            title: 'My third chat',
            userId: '2',
            participants: ['2', '3']
        }
    ],
    goHandler: action('Go'),
    joinHandler: action('Join'),
    deleteHandler: action('Delete')
};
