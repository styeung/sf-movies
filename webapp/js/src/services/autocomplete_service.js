import matchSorter from 'match-sorter'

export default class AutocompleteService {
  constructor(items) {
    this.items = items;
  }

  startsWith(searchTerm) {
    return matchSorter(this.items, searchTerm, {keys: ['name'], threshold: matchSorter.rankings.STARTS_WITH})
  }
}
