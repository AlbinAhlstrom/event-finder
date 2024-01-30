import React, { useState, useEffect } from "react";
import { EventListing, defaultEventListing } from "../util";
import PrimaryButton from "./PrimaryButton";
import MapWindow from "./MapWindow";

interface EventFormProps {
  postEvent: (event: EventListing) => Promise<void>;
}

const AddEventForm: React.FC<EventFormProps> = ({ postEvent }) => {
  const [position, setPosition] = useState({lat: 59.34676644462517, lng: 18.055573862709853});
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

  const [EventListing, setEventListing] =
    useState<EventListing>(defaultEventListing);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setEventListing({ ...EventListing, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await postEvent({
      ...EventListing,
    });
    // Reset form after submission
    setEventListing(defaultEventListing);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <section className="flex flex-col items-center">
      <h1>Create new event:</h1>
      <div>
        <label>
          <div className="label">
            <span className="label-text">Title:</span>
          </div>
          <input
            type="text"
            name="title"
            className="input input-bordered input-ghost"
            value={EventListing.title}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          <div className="label">
            <span className="label-text">Description:</span>
          </div>
          <textarea
            name="description"
            className="textarea textarea-bordered"
            value={EventListing.description}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          <div className="label">
            <span className="label-text">Venue:</span>
          </div>
          <input
            type="text"
            name="venue"
            className="input input-bordered input-ghost"
            value={EventListing.venue}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          <div className="label">
            <span className="label-text">Address:</span>
          </div>
          <input
            type="text"
            name="address"
            className="input input-bordered input-ghost"
            value={EventListing.address}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Price:</span>
          </div>
          <input
            type="number"
            name="price"
            className="input input-bordered"
            value={EventListing.price.toString()}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Category:</span>
          </div>
          <input
            type="text"
            name="category"
            className="input input-bordered"
            value={EventListing.category}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <PrimaryButton text="Submit" onClick={() => handleSubmit} />
      </div>
      </section>
      <section className="w-40vh h 40-vh">
      <MapWindow position={position}/>
      </section>
    </form>
  );
};

export default AddEventForm;
