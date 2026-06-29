'use client';

import React from "react";
import {useState, FormEvent} from "react";
import {createBooking} from "@/lib/actions/booking.actions";


const BookEvent = ({ eventId, slug }: { eventId: string, slug: string}) => {

    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent)=> {

        /* const { success } = await createBooking({ eventId, slug, email})

        if (success) {
            setSubmitted(true);
        } else {
            console.error("Booking Creation Failed");
        } */

        e.preventDefault();

        setTimeout( () =>{
            setSubmitted(true);
        }, 1000)

    }

    return (
        <div id="book-event">
            {submitted ? (
                <p className="text-sm"> Thank you for Signing up!</p>
            ): (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            placeholder="Enter your email address"
                        />
                    </div>

                    <button type="submit" className="button-submit">Submit</button>
                </form>
            )}
        </div>
    )
}
export default BookEvent
