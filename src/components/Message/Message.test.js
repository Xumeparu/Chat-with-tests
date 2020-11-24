import React from 'react';
import { shallow } from 'enzyme';
import Message from './Message';
import renderer from 'react-test-renderer';

describe('Message component', () => {
    test('Message shows nick and message', () => {
        const nick = 'test';
        const message = 'test';
        const component = shallow(<Message nick={nick} message={message} />);
        expect(component.text()).toContain(nick);
        expect(component.text()).toContain(message);
    });

    test('Message snapshot', () => {
        const nick = 'test';
        const message = 'test';
        const component = renderer.create(<Message nick={nick} message={message} />);
        expect(component.toJSON()).toMatchInlineSnapshot(`
      <li>
        <b>
          test
          :
        </b>
        test
      </li>
    `);
    });
});
