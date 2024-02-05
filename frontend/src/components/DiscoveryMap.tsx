import { APIProvider, Map, AdvancedMarker, AdvancedMarkerRef, Pin } from '@vis.gl/react-google-maps';
import { Coordinate, EventListing } from '../util';


type MapWindowProps =  {
  center: Coordinate
  events: EventListing[]
}
const MapWindow: React.FC<MapWindowProps> = ({center, events}: MapWindowProps) => {
  const apiUrl = import.meta.env.VITE_GMAPS_KEY;
  const mapId = import.meta.env.VITE_GMAPS_MAPID;

  return (
    <div className="h-60vh w-80vh rounded">
      <APIProvider apiKey={apiUrl}>
        <Map
        className="h-full w-full rounded-xl"
          zoom={16}
          center={center}
          mapId={mapId}
          gestureHandling={'greedy'}
          disableDefaultUI={false}>          
          {/* <AdvancedMarker
            position={position}
            draggable={true}
            onDragEnd={handleDragEnd}
          >
          <Pin />
          </AdvancedMarker>
          */}
            
        </Map>
      </APIProvider>
    </div>
  )
};

export default MapWindow;