import * as React from 'react';
import { create } from 'react-test-renderer';

import { _SPLTProps } from './types.d';
import * as ASPEN from '../';

const test = (props?: _SPLTProps) => {
  if (props) {
    return create(<ASPEN.Split {...props} />)
  } else {
    return create(
      <ASPEN.Split
        primary={{
          type: 'div',
          props: {
            className: 'top'
          },
          children: ['top']
        }}
        secondary={{
          type: 'div',
          props: {
            className: 'bottom'
          },
          children: ['bottom']
        }}
        split={50}
        direction='-'
      />)
  }
}

describe('<Split />', () => {
  it('should render', () => {
    expect((test()))
  })

  it('should render correct props', () => {
    const tested = test().toJSON().children

    expect(tested.length).toBe(2)
    expect(tested[0].children[0].children[0]).toBe('top')
    expect(tested[1].children[0].children[0]).toBe('bottom')
  })
})