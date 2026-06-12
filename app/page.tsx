import Explorebtn from "@/components/explorebtn";
import EventCard from "@/components/EventCard";
import  {events} from "@/lib/constants";

const Page = () => {
    return (
        <section>
            <h1 className= "text-center"> The Hub for every Dev</h1>
            <p className= "text-center mt-5"> Hackthons, Meetups, and Conferences at One place</p>

            <Explorebtn />

            <div className="mt-20 spcae-y-7">
                <h3> Featured Events</h3>

                <div className="events">
                    {events.map((event)=>(
                        <EventCard key={event.title} {...event} />
                    ))}
                </div>
            </div>
        </section>
    )
}
export default Page
