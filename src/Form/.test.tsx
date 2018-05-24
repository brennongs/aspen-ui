import * as React from 'react';
import { Form } from '../';
import { create } from 'react-test-renderer';

import { _FProps } from './types.d';

function makeTest(props?: _FProps) {
  if(props){
  return create(<Form {...props} />)
  } else {
    return create(
      <Form
        defaults={{
          email: '',
          name: ''
        }}
        children={[
          {
            type: 'Field',
            props: {
              name: 'email',
              type: 'email'
            }
          }, {
            type: 'Field',
            props: {
              name: 'name',
              type: 'text'
            }
          }
        ]}
      />
    )
  }
}
describe('<Form />', () => {
  it('should render', () => {
    expect(makeTest())
  })

  it('should correctly render a select', () => {
    const rendered = makeTest({
      defaults: {
        plan: 'premium'
      },
      children: [{
        type: 'Field',
        props: {
          component: 'select',
          name: 'plan',
          options: [
            'free',
            'premium',
            'enterprise'
          ]
        }
      }]
    })
    expect(rendered.toJSON().children[0].props.value).toBe('premium')
    expect(rendered
      .root
      .findAllByType(Form).length).toBe(1)
    expect(rendered
      .root
      .findByType('select'))
  })
})