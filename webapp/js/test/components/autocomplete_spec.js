import React from 'react'
import {render, cleanup, configure, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Autocomplete from 'autocomplete'
import AutocompleteService from 'autocomplete_service'

configure({testIdAttribute: 'data-test'})

describe('Autocomplete', () => {
  let component, autocompleteService, movies, drawMarkersSpy, zoomOnMarkerSpy, resetMapSpy, firstMovie

  beforeEach(() => {
    firstMovie = {name: 'aardvark', locations: ['Golden Gate Bridge', '11 Polk Street']}

    movies = [
      firstMovie,
      {name: 'alpha', locations: ['Chinatown']},
      {name: 'bravo', location: ['Moscone West']}
    ]
    autocompleteService = new AutocompleteService(movies)
    drawMarkersSpy = jasmine.createSpy('drawMarkers')
    zoomOnMarkerSpy = jasmine.createSpy('zoomOnMarker')
    resetMapSpy = jasmine.createSpy('resetMap')
    const FakeMapsService = class {
      drawMarkers(items) {
        drawMarkersSpy(items)
      }

      resetMap() {
        resetMapSpy()
      }

      zoomOnMarker(markerTitle) {
        zoomOnMarkerSpy(markerTitle)
      }
    }
    component = render(<Autocomplete autocompleteService={autocompleteService} mapsServiceClass={FakeMapsService}/>)
  })

  afterEach(cleanup)

  describe('when I type a letter', () => {
    beforeEach(() => {
      const input = component.getByTestId('search-input')
      userEvent.type(input, 'a')
    })

    it('returns options starting with the letter', () => {
      const options = component.getAllByTestId('option')
      expect(options.length).toEqual(2)
      expect(options.map((option) => option.textContent)).toEqual(['aardvark', 'alpha'])
    })

    it('resets the map', () => {
      expect(resetMapSpy).toHaveBeenCalled()
    })

    describe('when I then click on a movie', () => {
      beforeEach(() => {
        const firstOption = component.getAllByTestId('option')[0]
        userEvent.click(firstOption)
      })

      it('draws markers with the movie locations', () => {
        expect(drawMarkersSpy).toHaveBeenCalledWith(firstMovie)
      })

      it('hides the autocomplete options', () => {
        const options = component.queryAllByTestId('option')
        expect(options.length).toEqual(0)
      })

      it('populates the dropdown with the locations at which the movie was filmed', () => {
        const locationOptions = component.queryAllByTestId('location-option')
        const locationNames = locationOptions.map((location) => location.value)
        expect(locationNames).toEqual(firstMovie.locations)
      })

      describe('when I then select a location', () => {
        let selectedLocation

        beforeEach(() => {
          const dropdown = component.getByTestId('location-dropdown')
          selectedLocation = firstMovie.locations[1]
          fireEvent.change(dropdown, {target: {value: selectedLocation}})
        })

        it('zooms in on its marker', () => {
          expect(zoomOnMarkerSpy).toHaveBeenCalledWith(selectedLocation)
        })
      })
    })
  })

  describe('when I type multiple letters', () => {
    it('filters options down with each letter', (done) => {
      const input = component.getByTestId('search-input')
      userEvent.type(input, 'aa')

      setTimeout(() => {
        const options = component.getAllByTestId('option')
        expect(options.length).toEqual(1)
        expect(options.map((option) => option.textContent)).toEqual(['aardvark'])
        done()
      }, 100)
    })
  })

  describe('when a letter is deleted', () => {
    it('filters using the leftover string', (done) => {
      const input = component.getByTestId('search-input')
      userEvent.type(input, 'a')

      let options = component.getAllByTestId('option')
      expect(options.length).toEqual(2)
      expect(options.map((option) => option.textContent)).toEqual(['aardvark', 'alpha'])

      fireEvent.change(input, {target: {value: ''}})

      setTimeout(() => {
        options = component.queryAllByTestId('option')
        expect(options.length).toEqual(0)
        done()
      }, 100)
    })
  })
})
