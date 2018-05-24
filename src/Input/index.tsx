import * as React from 'react'
import * as FORMIK from 'formik'
import * as MUI from '@material-ui/core'
import { Edit, Done } from '@material-ui/icons'
import styled from 'styled-components'
import { TextFieldProps } from '@material-ui/core/TextField'
import { SvgIconProps } from '@material-ui/core/SvgIcon'

// import MaskedInput from 'react-text-mask';

export interface IInputProps extends TextFieldProps {
  name: string
  label?: string
  mask?: 'email' | 'cc' | 'percent' | 'dollars' | 'phone'
}

export interface IInputState {
  edit: boolean
  editDisplay: React.ComponentType<SvgIconProps>
}

const initialState: IInputState = {
  edit: false,
  editDisplay: Edit
}

const Wrapper = styled.div`
  margin: .5em;
  display: inline-block;
`

export class Input extends React.Component<IInputProps, IInputState> {
  public state = initialState

  public handleEditClick = () => {
    const editDisplay = this.state.editDisplay === Edit
      ? Done
      : Edit

    this.setState({
      edit: !this.state.edit,
      editDisplay
    })
  }

  public render () {
    return (
      <FORMIK.Field
        name={this.props.name}
        render={({ field, form }) => {
          return (
            <Wrapper>
              <MUI.TextField
                {...this.props}
                {...field}
                disabled={!this.state.edit}
              />
              <MUI.IconButton onClick={this.handleEditClick}>
                <this.state.editDisplay />
              </MUI.IconButton>
            </Wrapper>
          )
        }}
      />
    )
  }
}