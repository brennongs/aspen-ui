import * as React from 'react'
import { Route } from 'react-router-dom'

import { IChild } from '../../index.d'
import { Picker } from '../'

export interface IRouteBuilderProps {
  child: IChild
}

export default function RouteBuilder (props: IRouteBuilderProps): JSX.Element {
  const { child } = props
  const path = child.type === 'Landing'
    ? `/`
    : `/${child.type.toLowerCase()}`

  return(
    <Route 
      exact
      path={path}
    >
    {() => (
      <Picker {...child}/>
    )}
    </Route>
  )
}