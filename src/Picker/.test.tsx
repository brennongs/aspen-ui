import * as React from 'react';
import { create } from 'react-test-renderer';
import { Form, Field } from 'formik';

import { _Child } from './types';
import { Picker } from '../';

const test = (props?: _Child) => {
  if (props) {
    return create(<Picker {...props} />)
  } else {
    return create(
      <Picker
        type='Split'
        props={{
          primary: {
            type: 'div',
            props: { className: 'left' },
            children: ['left']
          },
          secondary: {
            type: 'div',
            props: { className: 'right' },
            children: ['right']
          },
          split: 50,
          direction: '|'
        }}
      />)
  }
}

describe("<Picker />", () => {
  it('should render', () => {
    expect(test())
  })

  it('should render correct type', () => {
    expect(test().root.findAllByProps({ className: 'ASP-Split_|' }).length).toBe(1)
  })

  it('should render depending on props', () => {

    expect(test({
      type: 'Split',
      props: {
        primary: {
          type: 'div',
          props: { className: 'top' },
          children: ['top']
        },
        secondary: {
          type: 'div',
          props: { className: 'bottom' },
          children: ['bottom']
        },
        split: 50,
        direction: '-'
      }
    }).root.findAllByProps({ className: 'ASP-Split_-' }).length).toBe(1)

    expect(test({
      type: 'TextField',
      props: {
        className: 'TF'
      }
    }).root.findAllByProps({ className: 'TF' }).length).toBeGreaterThanOrEqual(1)
  })
  it('should render a <Form />', () => {
    const rendered = test({
      type: 'Form',
      props: {
        defaults: {
          email: '',
          name: ''
        }
      },
      children: [{
        type: 'Field',
        props: {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        }
      }, {
        type: 'Field',
        props: {
          name: 'name',
          type: 'text',
          placeholder: 'Name'
        }
      }]
    })
    expect(rendered
      .root
      .findAllByType(Form).length).toBe(1)
    expect(rendered
      .root
      .findAllByType(Field).length).toBe(2)
  })
})