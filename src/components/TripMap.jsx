import { useState, useEffect, useRef } from 'react';

function TripMap({ destination, places = [] }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const markersRef = useRef([]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAofnZ11UXQ2A2TqULauvFTZ9QGE4tgMB8&libraries=places`;
    script.async = true;
    script.onload = initializeMap;
    script.onerror = () => {
      setError('Failed to load Google Maps. Please check your internet connection.');
      setLoading(false);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
     
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, []);

  const initializeMap = () => {
    try {
      if (!mapRef.current) {
        setError('Map container not found');
        setLoading(false);
        return;
      }

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        zoom: 2,
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

      setMap(mapInstance);
      setLoading(false);
    } catch (error) {
      console.error('Error initializing map:', error);
      setError('Failed to initialize map. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!map || !destination) return;

    const geocoder = new window.google.maps.Geocoder();
    
    
    geocoder.geocode({ address: destination }, (results, status) => {
      if (status === 'OK' && results[0]) {
        handleGeocodeSuccess(results[0]);
      } else {
       
        const formattedAddress = destination.includes(',') 
          ? destination 
          : `${destination}, ${destination}`;
        
        geocoder.geocode({ address: formattedAddress }, (results, status) => {
          if (status === 'OK' && results[0]) {
            handleGeocodeSuccess(results[0]);
          } else {
            console.error('Geocoding failed:', status);
            setError(`Could not find location: ${destination}. Please try a different location or check your spelling.`);
          }
        });
      }
    });

    const handleGeocodeSuccess = (result) => {
      const location = result.geometry.location;
      const bounds = new window.google.maps.LatLngBounds();
      
      
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

     
      const destinationMarker = new window.google.maps.Marker({
        position: location,
        map: map,
        title: destination,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#4285F4',
          fillOpacity: 1,
          strokeColor: 'white',
          strokeWeight: 2
        }
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div class="p-2">
          <h3 class="font-semibold">${destination}</h3>
          <p class="text-sm text-gray-600">Your destination</p>
        </div>`
      });

      destinationMarker.addListener('click', () => {
        infoWindow.open(map, destinationMarker);
      });

      markersRef.current.push(destinationMarker);
      bounds.extend(location);

      
      places.forEach(place => {
        if (place.lat && place.lng) {
          const position = { lat: place.lat, lng: place.lng };
          const marker = new window.google.maps.Marker({
            position: position,
            map: map,
            title: place.name,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: '#EA4335',
              fillOpacity: 1,
              strokeColor: 'white',
              strokeWeight: 2
            }
          });

          const placeInfoWindow = new window.google.maps.InfoWindow({
            content: `<div class="p-2">
              <h3 class="font-semibold">${place.name}</h3>
              <p class="text-sm text-gray-600">${place.category || 'Point of Interest'}</p>
              ${place.address ? `<p class="text-sm text-gray-500">${place.address}</p>` : ''}
            </div>`
          });

          marker.addListener('click', () => {
            placeInfoWindow.open(map, marker);
          });

          markersRef.current.push(marker);
          bounds.extend(position);
        }
      });

      map.fitBounds(bounds);
      
      const padding = 50;
      map.padding = padding;
    };
  }, [map, destination, places]);

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden shadow-lg">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-700">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {error && (
        <div className="absolute top-4 left-4 right-4 z-10 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}

export default TripMap; 
