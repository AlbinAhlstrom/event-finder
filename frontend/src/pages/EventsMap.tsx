import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DistanceSlider from "../components/DistanceSlider";
import DiscoveryMap from "../components/DiscoveryMap"

const EventsMap: React.FC = () => {
  const [userLocation, setUserLocation] = React.useState<{
    lat: number;
    lng: number;
   } | null>(null);
  const [distanceFilter, setDistanceFilter] = useState(2);
  const navigate = useNavigate();

  const [data, setData] = useState<Event[]>();

  const endTime = new Date();
  endTime.setHours(23, 59, 59);
  const endTimeISOString =
    endTime.toISOString().slice(0, -5) + "Z";
  const ticketMasterAPI = `https://app.ticketmaster.com/discovery/v2/events.json?size=50&unit=km&geoPoint=u6scd&radius=10&endDateTime=${endTimeISOString}&sort=date,asc&apikey=${ticketmasterKey}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(ticketMasterAPI);
        const result = await res.json();

        if (result._embedded && result._embedded.events) {
          setData(result._embedded.events);
        } else {
          console.error("No TicketMaster events today.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [ticketMasterAPI]);

  const ticketEvents: Event[] = [];

  if (data) {
    data.forEach((event) => {
      if (
        "_embedded" in event &&
        "priceRanges" in event &&
        "name" in event &&
        "dates" in event
      ) {
        const ticketmasterEvent = event as {
          _embedded: {
            venues: {
              address: {
                line1: string;
              };
              location: {
                latitude: string;
                longitude: string;
              };
            }[];
          };
          priceRanges: {
            min: number;
          }[];
          name: string;
          dates: {
            start: {
              dateTime: string;
            };
          };
        };

        const venue = ticketmasterEvent._embedded?.venues[0];
        const priceRange = ticketmasterEvent.priceRanges?.[0];

        ticketEvents.push({
          id: event.id,
          title: ticketmasterEvent.name || "Unknown Event",
          description: "Ticketmaster event",
          startTime: new Date(
            ticketmasterEvent.dates?.start?.dateTime || ""
          ),
          address: venue?.address?.line1 || "No address available",
          latitude: parseFloat(venue?.location?.latitude || "0") || 0,
          longitude: parseFloat(venue?.location?.longitude || "0") || 0,
          price: priceRange?.min || 0,
          venue: "",
          category: "Music",
          endTime: "null",
        });
      } else {
        ticketEvents.push(event);
      }
    });
  }

  const handleSliderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const sliderValue = Number(event.target.value);
    setDistanceFilter(sliderValue);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  return (
    <div className="flex flex-col">
      <DistanceSlider
        value={distanceFilter}
        onChange={handleSliderChange}
      />
      <div className="flex justify-center items-center flex-wrap gap-10 mt-4">
        <DiscoveryMap center={userLocation} distanceFilter={distanceFilter} circleRadius={() => 1000*distanceFilter}/>
      </div>
      <button
        className="btn btn-primary self-center fixed bottom-2 mt-auto w-40 z-50 max-md:w-5/6"
        onClick={() => navigate("/categories")}
      >
        Back to Categories
      </button>
    </div>
  );
};

export default EventsMap;