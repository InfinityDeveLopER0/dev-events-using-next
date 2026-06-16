import mongoose, { Schema, model, InferSchemaType, Model, Types } from "mongoose";

// Type for a document from the Booking collection
export type IBooking = InferSchemaType<typeof BookingSchema>;

const BookingSchema = new Schema(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: (props: { value: string }) =>
          `${props.value} is not a valid email address`,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save: verify the referenced Event exists before allowing the booking
BookingSchema.pre("save", async function () {
  const eventExists = await mongoose.model("Event").exists({ _id: this.eventId });
  if (!eventExists) {
    throw new Error(`Event with id "${this.eventId}" does not exist`);
  }
});

export const Booking: Model<IBooking> =
  (mongoose.models.Booking as Model<IBooking>) ??
  model<IBooking>("Booking", BookingSchema);
