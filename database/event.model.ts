import mongoose, { Schema, model, InferSchemaType, Model } from "mongoose";

// Type for a document from the Event collection
export type IEvent = InferSchemaType<typeof EventSchema>;

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    overview: {
      type: String,
      required: [true, "Overview is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
      trim: true,
    },
    venue: {
      type: String,
      required: [true, "Venue is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Date is required"],
      trim: true,
    },
    time: {
      type: String,
      required: [true, "Time is required"],
      trim: true,
    },
    mode: {
      type: String,
      required: [true, "Mode is required"],
      trim: true,
      enum: ["online", "offline", "hybrid"],
    },
    audience: {
      type: String,
      required: [true, "Audience is required"],
      trim: true,
    },
    agenda: {
      type: [String],
      required: [true, "Agenda is required"],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: "Agenda must contain at least one item",
      },
    },
    organizer: {
      type: String,
      required: [true, "Organizer is required"],
      trim: true,
    },
    tags: {
      type: [String],
      required: [true, "Tags are required"],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: "Tags must contain at least one item",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Helper: convert title into a URL-friendly slug
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")  // remove non-word chars (except spaces & hyphens)
    .replace(/\s+/g, "-")      // collapse whitespace into hyphens
    .replace(/-+/g, "-");      // collapse consecutive hyphens
}

// Pre-save: generate slug, normalize date/time, validate required strings
EventSchema.pre("save", function () {
  // Only regenerate slug when title is new or modified
  if (this.isModified("title") || !this.slug) {
    this.slug = slugify(this.title);
  }

  // Normalize date to ISO format (YYYY-MM-DD)
  if (this.isModified("date")) {
    const parsed = new Date(this.date);
    if (isNaN(parsed.getTime())) {
      throw new Error(`Invalid date format: "${this.date}"`);
    }
    this.date = parsed.toISOString().split("T")[0];
  }

  // Normalize time to HH:MM (24-hour) format
  if (this.isModified("time")) {
    const trimmed = this.time.trim();
    // Accept "HH:MM" or "HH:MM AM/PM"
    const match24 = trimmed.match(/^(\d{1,2}):(\d{2})$/);
    const match12 = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

    if (match24) {
      const h = Number(match24[1]);
      const m = match24[2];
      this.time = `${String(h).padStart(2, "0")}:${m}`;
    } else if (match12) {
      let h = Number(match12[1]);
      const m = match12[2];
      const period = match12[3].toUpperCase();
      if (period === "PM" && h !== 12) h += 12;
      if (period === "AM" && h === 12) h = 0;
      this.time = `${String(h).padStart(2, "0")}:${m}`;
    } else {
      throw new Error(`Invalid time format: "${this.time}"`);
    }
  }
});

export const Event: Model<IEvent> =
  (mongoose.models.Event as Model<IEvent>) ?? model<IEvent>("Event", EventSchema);
