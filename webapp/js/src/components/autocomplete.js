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
    this.setState({selectedMovie: movie, movies: [], searchValue: movie.name})
    this.mapsService.drawMarkers(movie)
  }

  chooseLocation(locationTitle) {
    this.mapsService.zoomOnMarker(locationTitle)
  }

  onChange(event) {
    this.mapsService.resetMap()

    const searchValue = event.target.value
    let movies;
    if(searchValue.length === 0) {
      movies = []
    } else {
      movies = this.autocompleteService.startsWith(searchValue)
    }
    this.setState({searchValue, movies, selectedMovie: null})
  }

  render() {
    const {movies, selectedMovie, searchValue} = this.state
    const chooseOption = this.chooseOption
    const options = movies.map((option) => {
      return <MovieOption key={option.name} option={option} chooseOption={chooseOption}/>
    })

    return (
      <div>
        <div className="position-fixed left-40 top-40 z-index-top">
          <input data-test="search-input"
                 className="box-shadow-bottom border-none pv-14 ph-16 col-12 font-size-16 width-600"
                 onChange={this.onChange}
                 placeholder="Search Movies Filmed in San Francisco"
                 value={searchValue}
          />
          <div data-test="options-container col-12">
            {options}
          </div>
        </div>
        <div className="position-fixed left-700 top-40 z-index-top">
          <Dropdown options={selectedMovie !== null ? selectedMovie.locations : []} selectOption={this.chooseLocation}/>
        </div>
      </div>
    )
  }
}