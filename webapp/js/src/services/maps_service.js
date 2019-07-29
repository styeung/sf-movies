const sf = {lat: 37.757, lng: -122.472}

export default class MapsService {
  constructor(googleMaps) {
    this.googleMaps = googleMaps
    const mapDiv = document.createElement('div')
    mapDiv.classList.add('map')
    document.body.appendChild(mapDiv)

    this.markers = []
    this.markerMapping = {}

    this.map = new googleMaps.Map(mapDiv, {
      center: sf,
      zoom: 12
    })

    this.placesService = new googleMaps.places.PlacesService(this.map)
    this.createMarker = this.createMarker.bind(this)
    this.drawMarkers = this.drawMarkers.bind(this)
    this.createMarker = this.createMarker.bind(this)
    this.zoomOnMarker = this.zoomOnMarker.bind(this)
  }

  createMarker(locationName, latLong) {
    const marker = new this.googleMaps.Marker({
      position: latLong,
      title: locationName
    })

    marker.setMap(this.map)
    this.markers.push(marker)
    this.markerMapping[locationName] = marker
  }

  removeExistingMarkers() {
    while(this.markers.length > 0) {
      let marker = this.markers.pop()
      marker.setMap(null)
      delete this.markerMapping[marker.getTitle()]
      marker = null
    }
  }

  zoomOnMarker(markerTitle) {
    const marker = this.markerMapping[markerTitle]
    this.map.setCenter(marker.getPosition());
    this.map.setZoom(16)
  }
  
  drawMarkers(movie) {
    this.removeExistingMarkers()

    const {map, createMarker, zoomOnMarker, googleMaps } = this
    movie.locations.forEach((location) => {
      const request = {
        query: location,
        fields: ['name', 'geometry'],
        locationBias: sf,
      }

      this.placesService.findPlaceFromQuery(request, function(results, status) {
        if (status === googleMaps.places.PlacesServiceStatus.OK) {
          createMarker(location, results[0].geometry.location);
        }
      });
    })

    map.setCenter(sf)
    map.setZoom(12)
  }
}