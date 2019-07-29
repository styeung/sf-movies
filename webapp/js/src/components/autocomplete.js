import * as React from 'react'
import MovieOption from 'movieOption'
import Dropdown from 'dropdown'

export default class Autocomplete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
      movies: [],
      selectedMovie: null
    }

    this.mapsService = new this.props.mapsServiceClass(this.props.googleMaps)

    this.autocompleteService = this.props.autocompleteService
    this.onChange = this.onChange.bind(this)
    this.chooseOption = this.chooseOption.bind(this)
    this.chooseLocation = this.chooseLocation.bind(this)
  }

  chooseOption(movie) {
    this.setState({selectedMovie: movie, movies: []})
    this.mapsService.drawMarkers(movie)
  }

  chooseLocation(locationTitle) {
    this.mapsService.zoomOnMarker(locationTitle)
  }

  onChange(event) {
    const searchValue = event.target.value
    let movies;
    if(searchValue.length === 0) {
      movies = []
    } else {
      movies = this.autocompleteService.startsWith(searchValue)
    }
    this.setState({searchValue, movies})
  }

  render() {
    const {movies, selectedMovie, searchValue} = this.state
    const chooseOption = this.chooseOption
    const options = movies.map((option) => {
      return <MovieOption key={option.name} option={option} chooseOption={chooseOption}/>
    })

    return (
      <div>
        <input data-test="search-input"
          onChange={this.onChange}
          value={searchValue}
        />
        <div data-test="options-container">
          {options}
        </div>
        <Dropdown options={selectedMovie !== null ? selectedMovie.locations : []} selectOption={this.chooseLocation}/>
      </div>
    )
  }
}