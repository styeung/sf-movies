import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Autocomplete from 'autocomplete'
import AutocompleteService from 'autocomplete_service'
import axios from 'axios'
import MapsService from 'maps_service'

axios.get('/movies').then((response) => {
  const autocompleteService = new AutocompleteService(response.data)

  ReactDOM.render(
    <Autocomplete autocompleteService={autocompleteService} mapsServiceClass={MapsService} googleMaps={window.google.maps}/>,
    document.getElementById("root")
  )
})