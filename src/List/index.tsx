import * as React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

export interface IListProps {
  data: Array<IListDatum>
  keysDisplayed?: Array<string>
  label: string
}

export interface IListDatum {
  label: string
  [key: string]: any
}

export function List (props: IListProps) {
  class Displayed {
    constructor(datum: IListDatum) {
      Object.entries(datum)
        .filter(entry => keys.indexOf(entry[0]) !== -1)
        .forEach(entry => this[entry[0]] = entry[1])
    }
  }
  
  const { data, label } = props
  const keys = ['label']
  
  if (props.keysDisplayed) {
    keys.push(...props.keysDisplayed)
  }

  const displayed = keys && (
    data.map(datum => new Displayed(datum))
  )

  const Main = styled.div`
  position: absolute;
  width: 100%;`
  const Label = styled.header`
  position: sticky;
  top: 0;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;`
  const Line = styled.hr`
  width: 50%;`



  return (
    <Main>
      <Label>
        <Typography
          variant='display4'
          gutterBottom
        >{label}</Typography>
        <Line />
      </Label>
      {props.data.map(datum => new Displayed(datum))}
    </Main>
  )
}