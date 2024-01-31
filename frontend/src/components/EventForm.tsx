import React, { useState, useEffect } from "react";
import { EventListing } from "../util";
import MapWindow from "./MapWindow";
import TextInput from "./inputs/TextInput";
import DateTimeInput from "./inputs/DateTimeInput";
import TextArea from "./inputs/TextArea";

interface EventFormProps {
  event: EventListing
  onFormSubmit: (event: EventListing) => void
}

const EventForm: React.FC<EventFormProps> = ({ event, onFormSubmit}) => {
  const [position, setPosition] = useState({
    lat: event.latitude,
    lng: event.longitude
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  const [eventState, setEventState] = useState<EventListing>(event);

  useEffect(() => {
    setEventState((listing) => ({
      ...listing,
      latitude: position.lat,
      longitude: position.lng,
    }))
    console.log("position updated")
  }, [position]);

  const handleChange = (
    changeEvent: 
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
    const { name, value } = changeEvent.target;
    setEventState({ ...eventState, [name]: value });
  };

  const handleSubmit = async (submitEvent: React.FormEvent) => {
    submitEvent.preventDefault();
    await onFormSubmit(eventState);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center h-80vh">
      <section className="flex flex-col items-center h-full">
        <div className="card w-96 bg-neutral text-neutral-content">
          <div className="card-body">
            <h2 className="card-title">Create new event:</h2>
            <TextInput
              title="Title:"
              name="title"
              value={eventState.title}
              onChange={handleChange}
            />

            <TextArea
              title="Description"
              name="description"
              value={eventState.description}
              onChange={handleChange}
            />
            <DateTimeInput
              title="Start time:"
              name="startTime"
              value={eventState.startTime}
              onChange={handleChange}
            />
            <DateTimeInput
              title="End time:"
              name="endTime"
              value={eventState.endTime}
              onChange={handleChange}
            />
            <TextInput
              title="Latitude:"
              name="latitude"
              value={eventState.latitude}
              onChange={handleChange}
              hidden={true}
            />
            <TextInput
              title="Longitude:"
              name="longitude"
              value={eventState.longitude}
              onChange={handleChange}
              hidden={true}
            />
            <TextInput
              title="Price:"
              name="price"
              value={eventState.price}
              onChange={handleChange}
            />
            <TextInput
              title="Category:"
              name="category"
              value={eventState.category}
              onChange={handleChange}
            />
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={() => handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-40vh h-40vh">
        <MapWindow position={position} setPosition={setPosition} />
      </section>
      <button onClick={() => console.log("eventState:", eventState)}>show event state</button>
    </form>
  );
};

export default EventForm;
