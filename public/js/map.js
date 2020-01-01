mapboxgl.accessToken = 'pk.eyJ1IjoicmljaGFyZC1sdWR3aWciLCJhIjoiY2szNmp1NDBoMDJnczNjbzZ6NHVzNmZ3YiJ9.vMclN33YpA-zqy5VmDUxWw';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
zoom: 10,
center: [-79.4163000, 43.7001100]
});

// Zoom levels
map.addControl(new mapboxgl.NavigationControl());

// Driving directions
map.addControl(
  new MapboxDirections({
  accessToken: mapboxgl.accessToken
  }),
  'top-left'
  );

// User Geolocation
// Add geolocate control to the map.
map.addControl(
  new mapboxgl.GeolocateControl({
  positionOptions: {
  enableHighAccuracy: true
  },
  trackUserLocation: true
  })
  );

// Fetch reports from API
async function getReports() {
  const res = await fetch('/api/v1/reports');
  const data = await res.json();

  const reports = data.data.map(report => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          report.location.coordinates[0],
          report.location.coordinates[1]
        ]
      },
      properties: {
        crime: report.crime,
        date: report.date,
        time: report.time,
        address: report.location.formattedAddress,
        message: report.message,
        icon: 'embassy'
      }
    }
  });

  loadMap(reports);
}

// load map with reports
function loadMap(reports) {
  map.on('load', function() {
    map.addLayer({
      id: 'points',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: reports
        }
      },
      layout: {
        'icon-image': '{icon}-15',
        'icon-size': 2,
        'text-field': '{crime}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.9],
        'text-anchor': 'top'
      }
    });
  });
}

getReports();