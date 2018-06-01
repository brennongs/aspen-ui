import * as React from 'react'
import styled from 'styled-components'

import { Picker } from '../'

/** @todo create a tabbed version for mobile */

export default class Split extends React.Component {
  state = { ...this.props.state }
  render() {
    const { direction } = this.props
    const flexDirection = direction === 'horizontal'
      ? 'column'
      : 'row'
    const primHeight = direction === 'horizontal'
      ? `${this.props.split}%`
      : '100%'
    const primWidth = direction === 'vertical'
      ? `${this.props.split}%`
      : '100%'
    const secHeight = direction === 'horizontal'
      ? `calc(100% - ${this.props.split}%)`
      : '100%'
    const secWidth = direction === 'vertical'
      ? `calc(100% - ${this.props.split}%)`
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
      <Main className={`ASP-Split_${this.props.direction}`}>
        <Primary>
          <Picker child={{ ...this.props.primary }} />
        </Primary>
        <Secondary>
          <Picker child={{ ...this.props.secondary }} />
        </Secondary>
      </Main>
    )
  }
}