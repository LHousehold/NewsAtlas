import React, { useState, useEffect, useCallback, useRef } from 'react';
import mapStyles from './mapStyles.json';

const Map = ({setCountry}) => {
  const [map, setMap] = useState(null);
  const [geo, setGeo] = useState(null);

  const mapRef = useRef(null);

  const findCountry = useCallback((latLng) => {
    geo.geocode({latLng: latLng}, (results, status) => {
      try {
        results.forEach(r => {
          if(r.types.includes('country')) {
            const country = r.formatted_address;
            setCountry(country);
          }
        });
      } catch(e) {
        console.error(e);
      }
    });
  }, [geo, setCountry]);

  useEffect(() => {
    const mapDefaults = { 
      options: { 
        center: {
          lat: 10.336211, 
          lng: 23.315261 
        },
        zoom: 3, 
        minZoom: 3, 
        maxZoom: 11, 
        styles: mapStyles, 
        fullscreenControl: false, 
        zoomControl: false, 
        streetViewControl: false, 
        mapTypeControl: false, 
      } 
    };

  const setup = setInterval(() => {
      if(window.google && !map) {
        clearInterval(setup);
        setMap(new window.google.maps.Map(mapRef.current, mapDefaults));
        setGeo(new window.google.maps.Geocoder());
      }
    }, 100);
  }, [map]);

  useEffect(() => {
    if(map && geo) {
      map.addListener('click', e => {
        findCountry(e.latLng);
      });
    }
  }, [map, geo, findCountry]);

  const styles = {
    container: {
      height: '100vh',
    }
  };

  return ( 
    <div className="Map" style={styles.container} ref={mapRef} /> 
  );
};

export default Map;
