import * as React from 'react'

export default class Autocomplete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
      movies: []
    }

    this.autocompleteService = this.props.autocompleteService
    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    const searchValue = event.target.value
    let movies;
    if(searchValue.length == 0) {
      movies = []
    } else {
      movies = this.autocompleteService.startsWith(searchValue)
    }
    this.setState({searchValue, movies})
  }

  render() {
    const options = this.state.movies.map((option) => {
      return <div data-test="option" key={option}>{option}</div>
    })

    return (
      <div>
        <input data-test="search-input"
          onChange={this.onChange}
          value={this.state.searchValue}
        />
        {options}
      </div>
    )
  }
}