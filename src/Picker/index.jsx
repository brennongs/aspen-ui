import * as React from 'react'
import { Typography } from '@material-ui/core'

import {
  Form,
  Input,
  Select,
  List,
  RouteBuilder,
  Split
} from '../'

const types = {
  Form,
  Input,
  Select,
  List,
  RouteBuilder,
  Split,
  Typography
}

export default function Picker(props) {
  const { child } = props
  const Type = types[child.type] ||
    child.type

  if (!Type) {
    throw new Error(
      `cannot find component of type ${child.type}`
    )
  }

  return (
    <Type {...child.props}>
      {child.children &&
        child.children.map((c, i) => {
          if (typeof c === 'string') {
            return c
          } else {
            return (
              <Picker child={{...c}} key={`ASP-${c.type}-0${i}`} />
            )
          }
        })}
    </Type>
  )
}