import React from 'react';
import Chat from '../components/Chat/Chat';
import { action } from '@storybook/addon-actions';

export default {
    title: 'Chat',
    component: Chat
};

const Template = (args) => <Chat {...args} />;

const chat = {
    id: '5d6b3335925ea',
    createdAt: '2020-11-17T17:16:28.123Z',
    title: 'chat01',
    userId: '1',
    participants: ['1', '2'],
    isPrivate: false
};

export const Owner = Template.bind({});
Owner.args = {
    userId: '1',
    chat,
    goHandler: action('Go'),
    joinHandler: action('Join'),
    deleteHandler: action('Delete')
};

export const Participant = Template.bind({});
Participant.args = {
    userId: '2',
    chat,
    goHandler: action('Go'),
    joinHandler: action('Join'),
    deleteHandler: action('Delete')
};

export const NotParticipant = Template.bind({});
NotParticipant.args = {
    userId: '3',
    chat,
    goHandler: action('Go'),
    joinHandler: action('Join'),
    deleteHandler: action('Delete')
};
