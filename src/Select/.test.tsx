import * as React from 'react';
import { create } from 'react-test-renderer';

import * as ASPEN from '../';
import * as FORM from 'formik'
import { ISelectProps } from './';

function makeTest(props: ISelectProps = {
  name: 'plan',
  options: [
    'free',
    'premium',
    'enterprise'
  ]
}) {
    return create(
      <FORM.Formik
        initialValues={{
          plan: 'free'
        }}
        onSubmit={(values) => {
          setTimeout(() => {
            console.log(values)
          }, 1000)
        }}
      >
        <FORM.Form>
          <ASPEN.Select {...props} />
        </FORM.Form>
      </FORM.Formik>
    )
}

describe('<Select />', () => {
  it('should render', () => {
    expect(makeTest())
  })

  it('should render dynamically', () => {
    const test = makeTest({
      name: 'plan',
      options: [
        'free',
        'premium',
        'ultra',
        'enterprise'
      ]
    })

    // console.log(test.toJSON())
    // expect(test.toJSON().children[0].children.length).toBe(4)
    // expect(test.toJSON().children[0].children[0].props.name).toBe('donation')
    console.log(test.root)
  })
})