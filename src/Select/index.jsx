import * as React from 'react'
import { Field as FRMKField } from 'formik'
import {
  Select as MUISelect,
  MenuItem as MUIMenuItem
} from '@material-ui/core'
import styled from 'styled-components'

export default function Select (props) {
  const Wrapper = styled.div`
    margin: .5em;
    display: inline-block;
  `
  return (
    <Wrapper>
      <FRMKField
        name={props.name}
        render={({ field }) => {
          return (
            <MUISelect
              {...field}
              name={props.name}
            >
              {props.options.map((opt: string, i: number) => (
                <MUIMenuItem
                  value={opt}
                  name={opt}
                  key={`${i}-${opt}`}
                >
                  {`${opt[0].toUpperCase()}${opt[1] && opt.slice(1)}`}
                </MUIMenuItem>
              )
              )}
            </MUISelect>
          )
        }}
      />
    </Wrapper>
  )
}