import React from 'react'
import CountdownTimer from './CountDown'
import { useNavigate } from 'react-router-dom';

const EventDetailsCard = ({event}) => {

    const navigate = useNavigate();
  return (
    <div className="hero-content text-center text-neutral-content bg-base-100 rounded-2xl p-10">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl p-3 font-bold">{event.title}</h1>

            <p className="mb-5 text-xl">{event.description}</p>
            <CountdownTimer targetDate={event.startTime} />


            <h2 className="my-6 text-xl">Price: {event.price} SEK</h2>
            <p>{event.address}</p>
            <button
              className="btn btn-primary m-5 p-5"
              onClick={() => navigate("purchase/")}
            >
              Purchase
            </button>
          </div>
        </div>
  )
}

export default EventDetailsCard