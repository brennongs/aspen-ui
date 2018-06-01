import * as React from 'react'
import styled from 'styled-components'
import { Typography as MUITypography } from '@material-ui/core'


export default function List(props) {
  function Displayed(datum) {
    return Object.entries(datum)
      .filter(entry => keys.indexOf(entry[0]) !== -1)
      .map(entry => <div key={entry[0]}>entry[1]</div>)
  }

  const { data, label } = props
  const keys = ['label']

  if (props.keysDisplayed) {
    keys.push(...props.keysDisplayed)
  }

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
  const Datum = styled.div`
  padding: 1em;
  margin: 1em;
  border: solid 1px grey;
  border-radius: 1em;`
  const ListItems = keys && (
    data.map(datum => Displayed(datum))
      .map((displayed, index) => (
        <Datum>
          <span>{index + 1}: </span>
          {...displayed}
        </Datum>
      ))
  )


  return (
    <Main>
      <Label>
        <MUITypography
          variant='display4'
          gutterBottom
        >{label}</MUITypography>
        <Line />
      </Label>
      {ListItems}
    </Main>
  )
}