import * as React from 'react'
import * as FORMIK from 'formik'
import * as MUI from '@material-ui/core'
import styled from 'styled-components'

import * as ASPEN from '../'
import { IChild } from '../../index.d'

export interface IFormProps {
  defaults: {
    [key: string]: any
  }
  submit?: boolean
  title: string
  children: Array<IChild>
}

export function Form (props: IFormProps): JSX.Element {
  const Wrapper = styled.div`
    margin: .5em;
  `
  return (
    <FORMIK.Formik
      initialValues={props.defaults}
      onSubmit={(values) => {
        setTimeout(() => {
          console.log(values)
        }, 2000)
      }}
    >
      <FORMIK.Form>
        <MUI.Typography
          gutterBottom
          variant='display3'
          style={{
            margin: '.25em'
          }}
        >
          {props.title}
        </MUI.Typography>
        {props.children.map((
          child: IChild,
          i
        ) => {
          return (
            <ASPEN.Picker
              key={`ASP-Form_${child.props.name}:${i}`}
              {...child}
            />
          )
        })}
        {props.submit && (
          <Wrapper>
            <MUI.Button
              variant='raised'
              color='primary'
              type='submit'
            >
              submit
            </MUI.Button>
          </Wrapper>
        )}
      </FORMIK.Form>
    </FORMIK.Formik>
  )
}