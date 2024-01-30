import React, { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, AdvancedMarkerRef, Pin } from '@vis.gl/react-google-maps';
import { Coordinate } from '../util';


type MapWindowProps =  {
  position: Coordinate
  setPosition: ({lat, lng}:Coordinate) => void
  pins?: AdvancedMarkerRef[]
}
const MapWindow: React.FC<MapWindowProps> = ({position, setPosition}: MapWindowProps) => {
  const apiUrl = import.meta.env.VITE_GMAPS_KEY;
  const mapId = import.meta.env.VITE_GMAPS_MAPID;

  const handleDragEnd = (event: google.maps.MapMouseEvent) => {
    const newPos = event.latLng;
    if (newPos) {
      setPosition({lat: newPos.lat(), lng: newPos.lng()});
    }
  };

  

  return (
    <div className="h-40vh">
      <APIProvider apiKey={apiUrl}>
        <Map
          zoom={16}
          center={position}
          mapId={mapId}
          gestureHandling={'none'}
          disableDefaultUI={true}>          
          <AdvancedMarker
            position={position}
            draggable={true}
            onDragEnd={handleDragEnd}
          >
            <Pin />
          </AdvancedMarker>
        </Map>
      </APIProvider>
    </div>
  )
};

export default MapWindow;