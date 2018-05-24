import * as React from 'react'
import {
  Formik as FRMKFormik,
  Form as FRMKForm
} from 'formik'
import { 
  Typography, 
  Button
} from '@material-ui/core'
import styled from 'styled-components'

import { Picker } from '../'
import { IChild } from '../../index.d'

export interface IFormProps {
  defaults: {
    [key: string]: string | number | boolean
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
    <FRMKFormik
      initialValues={props.defaults}
      onSubmit={(values) => {
        setTimeout(() => {
          console.log(values)
        }, 2000)
      }}
    >
      <FRMKForm>
        <Typography
          gutterBottom
          variant='display3'
          style={{
            margin: '.25em'
          }}
        >
          {props.title}
        </Typography>
        {props.children.map((
          child: IChild,
          i
        ) => {
          return (
            <Picker
              key={`ASP-Form_${child.props.name}:${i}`}
              {...child}
            />
          )
        })}
        {props.submit && (
          <Wrapper>
            <Button
              variant='raised'
              color='primary'
              type='submit'
            >
              submit
            </Button>
          </Wrapper>
        )}
      </FRMKForm>
    </FRMKFormik>
  )
}