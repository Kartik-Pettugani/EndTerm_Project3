import { useState, useEffect, useRef } from 'react';

function MapRouteView({ locations = [], waypoints = [] }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAofnZ11UXQ2A2TqULauvFTZ9QGE4tgMB8&libraries=places,directions`;
    script.async = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initializeMap = () => {
    try {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        zoom: 7,
        center: { lat: 0, lng: 0 },
        styles: [
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#7c93a3" }]
          },
          {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [{ visibility: "off" }]
          }
        ]
      });

      const directionsServiceInstance = new window.google.maps.DirectionsService();
      const directionsRendererInstance = new window.google.maps.DirectionsRenderer({
        map: mapInstance,
        suppressMarkers: false,
        polylineOptions: {
          strokeColor: '#4285F4',
          strokeWeight: 5
        }
      });

      setMap(mapInstance);
      setDirectionsService(directionsServiceInstance);
      setDirectionsRenderer(directionsRendererInstance);
    } catch (error) {
      console.error('Error initializing map:', error);
      setError('Failed to initialize map. Please try again later.');
    }
  };

  useEffect(() => {
    if (!map || !directionsService || !directionsRenderer || locations.length < 2) return;

    const calculateAndDisplayRoute = async () => {
      try {
        const origin = locations[0];
        const destination = locations[locations.length - 1];
        const waypointsList = locations.slice(1, -1).map(location => ({
          location: location,
          stopover: true
        }));

        const request = {
          origin: origin,
          destination: destination,
          waypoints: waypointsList,
          travelMode: window.google.maps.TravelMode.DRIVING,
          optimizeWaypoints: true
        };

        const result = await directionsService.route(request);
        directionsRenderer.setDirections(result);

        const bounds = new window.google.maps.LatLngBounds();
        result.routes[0].bounds.extend(bounds);
        map.fitBounds(bounds);

        locations.forEach((location, index) => {
          new window.google.maps.Marker({
            position: location,
            map: map,
            label: {
              text: (index + 1).toString(),
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold'
            },
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#4285F4',
              fillOpacity: 1,
              strokeColor: 'white',
              strokeWeight: 2
            }
          });
        });

      } catch (error) {
        console.error('Error calculating route:', error);
        setError('Failed to calculate route. Please check your locations and try again.');
      }
    };

    calculateAndDisplayRoute();
  }, [map, directionsService, directionsRenderer, locations]);

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden shadow-lg">
      {error && (
        <div className="absolute top-4 left-4 right-4 z-10 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />
      <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md z-10">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Route Summary</h3>
        <div className="space-y-2">
          {locations.map((location, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm">
                {index + 1}
              </span>
              <span className="text-gray-600 dark:text-gray-300">
                {location.formatted_address || `Location ${index + 1}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MapRouteView; 
