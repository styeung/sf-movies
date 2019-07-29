import * as React from 'react'

export default class MovieOption extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {option, chooseOption} = this.props

    return (
      <div data-test="option" onClick={() => chooseOption(option)}>{option.name}</div>
    )
  }
}