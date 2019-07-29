import * as React from 'react'

export default class MovieOption extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {option, chooseOption} = this.props

    return (
      <div data-test="option"
           className="border-bottom-gray border-left-gray border-right-gray pa-8 background-white cursor-pointer"
           onClick={() => chooseOption(option)}>{option.name}</div>
    )
  }
}