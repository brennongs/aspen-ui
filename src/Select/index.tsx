import * as React from 'react'
import { Field } from 'formik'
import * as MUI from '@material-ui/core'
import styled from 'styled-components'

export interface ISelectProps {
  name: string
  options: Array<string>
}

export function Select (props: ISelectProps) {
  const Wrapper = styled.div`
    margin: .5em;
    display: inline-block;
  `
  return (
    <Wrapper>
      <Field
        name={props.name}
        render={({ field }) => {
          return (
            <MUI.Select
              {...field}
              name={props.name}
            >
              {props.options.map((opt: string, i: number) => (
                <MUI.MenuItem
                  value={opt}
                  name={opt}
                  key={`ASP-Form_SLCT_opt-0${i}-${opt}`}
                >
                  {`${opt[0].toUpperCase()}${opt[1] && opt.slice(1)}`}
                </MUI.MenuItem>
              )
              )}
            </MUI.Select>
          )
        }}
      />
    </Wrapper>
  )
}