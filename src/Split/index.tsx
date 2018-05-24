import * as React from 'react'
import styled from 'styled-components'

import { Picker as ASPENPicker } from '../'
import { IChild } from '../../index.d'

/** @todo create a tabbed version for mobile */

export interface ISplitProps {
  primary: IChild
  secondary: IChild
  split: number
  direction: 'horizontal' | 'vertical'
}

export function Split (props: ISplitProps) {
  const { direction } = props
  const flexDirection = direction === 'horizontal'
    ? 'column'
    : 'row'
  const primHeight = direction === 'horizontal'
    ? `${props.split}%`
    : '100%'
  const primWidth = direction === 'vertical'
    ? `${props.split}%`
    : '100%'
  const secHeight = direction === 'horizontal'
    ? `calc(100% - ${props.split}%)`
    : '100%'
  const secWidth = direction === 'vertical'
    ? `calc(100% - ${props.split}%)`
    : '100%'

  const Main = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: center;
  align-items: center;`
  const Primary = styled.div`
  height: ${primHeight};
  width: ${primWidth};
  overflow: scroll;
  position: relative;`
  const Secondary = styled.div`
  height: ${secHeight};
  width: ${secWidth};
  overflow: scroll;
  position: relative;`

  return (
    <Main className={`ASP-Split_${props.direction}`}>
      <Primary>
        <ASPENPicker {...props.primary} />
      </Primary>
      <Secondary>
        <ASPENPicker {...props.secondary} />
      </Secondary>
    </Main>
  )
}