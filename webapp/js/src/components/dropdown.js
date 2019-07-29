import * as React from 'react'

const dropdownStyles = {
  fontSize: '16px',
  fontFamily: "'Source Sans Pro', sans-serif",
  color: '#526173',
  lineHeight: '1.3',
  cursor: 'pointer',
  padding: '4px 16px',
  boxShadow: '0 4px 8px 0 rgba(82, 97, 115, 0.18), 0 4px 8px 0 rgba(82, 97, 115, 0.18)',
  border: 'none',
}

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props)

    this.options = this.options.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    this.props.selectOption(event.target.value);
  }

  render() {
    if(this.props.options.length === 0) return null

    return (
      <select data-test={'location-dropdown'}
              style={dropdownStyles}
              onChange={this.onChange}>
        <option value="" disabled selected>Select Location</option>
        {this.options()}
      </select>
    )
  }

  options() {
    return this.props.options.map((option, index) => {
      return (
        <option data-test={'location-option'}
                key={index}
                value={option}
                className="background-white cursor-pointer pv-4 ph-8 light-blue-on-hover">
          {option}
        </option>
      )
    })
  }
}
