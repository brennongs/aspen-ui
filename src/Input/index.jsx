import * as React from 'react'
import { Field as FRMKField } from 'formik'
import { 
  TextField as MUITextField, 
  IconButton as MUIIconButton
} from '@material-ui/core'
import { Edit, Done } from '@material-ui/icons'
import styled from 'styled-components'

// import MaskedInput from 'react-text-mask';


const initialState = {
  edit: false,
  editDisplay: Edit
}

const Wrapper = styled.div`
  margin: .5em;
  display: inline-block;
`

export default class Input extends React.Component {
  state = initialState

  handleEditClick = () => {
    const editDisplay = this.state.editDisplay === Edit
      ? Done
      : Edit

    this.setState({
      edit: !this.state.edit,
      editDisplay
    })
  }

  render () {
    return (
      <FRMKField
        name={this.props.name}
        render={({ field, form }) => {
          return (
            <Wrapper>
              <MUITextField
                {...this.props}
                {...field}
                disabled={!this.state.edit}
              />
              <MUIIconButton onClick={this.handleEditClick}>
                <this.state.editDisplay />
              </MUIIconButton>
            </Wrapper>
          )
        }}
      />
    )
  }
}