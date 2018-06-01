import * as React from 'react'
import { Route } from 'react-router-dom'

import { Picker } from '../'

export default function RouteBuilder (props) {
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
      <Picker child={{...child}}/>
    )}
    </Route>
  )
}