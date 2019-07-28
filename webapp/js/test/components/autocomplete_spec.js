import React from 'react'
import {render, cleanup, configure, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Autocomplete from 'autocomplete'
import AutocompleteService from 'autocomplete_service'

configure({testIdAttribute: 'data-test'})

describe('Autocomplete', () => {
  let component, autocompleteService, movies;
  beforeEach(() => {
    movies = [{name: 'aardvark'}, {name: 'alpha'}, {name: 'bravo'}]
    autocompleteService = new AutocompleteService(movies)
    const FakeMapsService = class {
      drawMarkers() {}
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
