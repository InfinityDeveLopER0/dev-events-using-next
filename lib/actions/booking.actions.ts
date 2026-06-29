'use server';

import connectDB from "@/lib/mongodb";
import {Booking} from "@/database";
import {notifyAdmin} from "@/lib/email";

export const createBooking = async ({eventId, slug, email } : { eventId: string; slug: string; email: string; }) => {
    try{
        await connectDB();
        await Booking.create({ eventId, slug, email });

        await notifyAdmin({email, slug,});
        return { success: true };
    }
    catch(e){
        console.error('create booking failed', e);
        return{ success: false };
    }
}