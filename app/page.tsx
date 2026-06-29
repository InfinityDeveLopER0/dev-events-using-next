import Explorebtn from "@/components/explorebtn";
import EventCard from "@/components/EventCard";
import {IEvent} from "@/database";
import {cacheLife} from "next/cache";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Page = async () => {
    /* 'use cache';
    cacheLife('hours'); */

    const response = await fetch (`${BASE_URL}/api/events`);
    const { events } = await response.json()

    return (
        <section>
            <h1 className= "text-center"> The Hub for every Dev <br/> Event You Can't Miss</h1>
            <p className= "text-center mt-5"> Hackathons, Meetups, and Conferences at One place</p>

            <Explorebtn />

            <div className="mt-20 space-y-7">
                <h3> Featured Events</h3>

                <div className="events">
                    {events && events.length > 0 && events.map((event: IEvent) =>(
                        <EventCard key={event.title} {...event} />
                    ))}
                </div>
            </div>
        </section>
    )
}
export default Page
