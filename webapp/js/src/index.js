import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Autocomplete from 'autocomplete'
import AutocompleteService from 'autocomplete_service'

const autocompleteService = new AutocompleteService(['aardvark', 'alpha', 'bravo', 'cookie'])

ReactDOM.render(
<Autocomplete autocompleteService={autocompleteService}/>,
document.getElementById("root")
)
