const sf = {lat: 37.757, lng: -122.472}

export default class MapsService {
  constructor(googleMaps) {
    this.googleMaps = googleMaps
    const mapDiv = document.createElement('div')
    mapDiv.classList.add('map')
    document.body.appendChild(mapDiv)

    this.map = new googleMaps.Map(mapDiv, {
      center: sf,
      zoom: 12
    })

    this.placesService = new googleMaps.places.PlacesService(this.map)
    this.createMarker = this.createMarker.bind(this)
    this.drawMarkers = this.drawMarkers.bind(this)
  }

  createMarker(locationName, latLong) {
    const marker = new this.googleMaps.Marker({
      position: latLong,
      title: locationName
    })

    marker.setMap(this.map)
  }
  
  drawMarkers(locations) {
    const {map, createMarker, googleMaps } = this
    locations.forEach((location) => {
      const request = {
        query: location,
        fields: ['name', 'geometry'],
        locationBias: sf,
      }

      this.placesService.findPlaceFromQuery(request, function(results, status) {
        if (status === googleMaps.places.PlacesServiceStatus.OK) {
          createMarker(location, results[0].geometry.location);
          map.setCenter(results[0].geometry.location);
        }
      });
    })
  }
}