import * as React from 'react'
import * as MUI from '@material-ui/core'
import * as FORMIK from 'formik'

import * as ASPEN from '../'
import { IChild } from '../../index.d'

export function Picker (child: IChild): JSX.Element {
  const Type = ASPEN[child.type] || FORMIK[child.type] || MUI[child.type] || child.type

  if (!Type) {
    throw new Error(`cannot find compnent of type ${child.type}`)
  }

  return (
    <Type {...child.props}>
      {child.children && child.children.map((c, i) => {
        if (typeof c === 'string') {
          return c
        } else {
          return (
            <Picker {...c} key={`ASP-${c.type}-0${i}`} />
          )
        }
      })}
    </Type>
  )
}