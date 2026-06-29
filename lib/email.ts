import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function notifyAdmin({email, slug,}: { email: string; slug: string; }) {
    try {
        await resend.emails.send({
            from: process.env.FROM_EMAIL!,
            to: process.env.ADMIN_EMAIL!,
            subject: "New Event Booking",

            html: `
                <h2>${email} booked your event!</h2>

                <p><strong>Event:</strong> ${slug}</p>

                <p><strong>User Email:</strong> ${email}</p>
            `,
        });
    } catch (err) {
        console.error(err);
    }
}