import * as React from 'react'
import * as MUI from '@material-ui/core'
import Downshift from 'downshift'


function CustomInput(props) {
  const { InputProps, ref } = props

  return (
    <MUI.TextField
      style={{
        width: '75%'
      }}
      InputProps={{
        inputRef: ref,
        ...InputProps
      }}
    />
  )
}

function Suggestion(props) {
  const {
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem
  } = props
  const isHighlighted = highlightedIndex === index
  const isSelected = (selectedItem && selectedItem.getpartnumbers || '')
    .indexOf(suggestion.getpartnumbers)

  return (
    <MUI.MenuItem
      selected={isHighlighted}
      component='div'
      {...itemProps}
      key={suggestion.getpartnumbers}
      style={{ fontWeight: isSelected ? 500 : 300 }}
      onMouseDown={() => props.setSearch(suggestion.getpartnumbers)}
    >
      {suggestion.getpartnumbers}
    </MUI.MenuItem>
  )
}

const initialState = {
  value: '',
  selected: [],
  suggestions: []
}

class Autosuggest extends React.Component {
  state = initialState

  componentDidMount() {
    /*****
     * @todo implement gql mutation
     */
  }

  getSuggestions = (value) => {
    const { suggestions } = this.state
    let count = 0
    if (!suggestions[0]) {
      return []
    }

    return suggestions.filter((suggestion) => {
      const keep = (
        !value ||
        suggestion.getpartnumbers
          .toLowerCase()
          .indexOf(value.toLowerCase()) !== -1
      ) && count < 5

      if (keep) {
        count += 1
      }

      return keep
    })
  }

  render() {
    return (
      <Downshift>
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          selectedItem,
          highlightedIndex
        }) => {
          return (
            <div>
              <CustomInput
                InputProps={getInputProps({
                  placeholder: this.state.suggestions[0] &&
                    'eg. XYZ-D070-01' ||
                    'waiting for data...',
                  id: 'downshift',
                })}
                setSearch={this.props.setSearch}
              />
              {isOpen && (
                <MUI.Paper
                  style={{
                    overflow: 'scroll',
                    zIndex: 999,
                    position: 'absolute'
                  }}
                  square
                >
                  {this.getSuggestions(inputValue).map((
                    suggestion,
                    index
                  ) => {
                    return (
                      <Suggestion
                        suggestion={suggestion}
                        index={index}
                        key={index}
                        itemProps={getItemProps({ item: suggestion.getpartnumbers })}
                        highlightedIndex={highlightedIndex}
                        selectedItem={selectedItem}
                        setSearch={this.props.setSearch}
                      />
                    )
                  })}
                </MUI.Paper>
              )}
            </div>
          )
        }}
      </Downshift>
    )
  }
}

export default Autosuggest