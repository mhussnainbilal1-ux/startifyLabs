import mongoose, { Model, Schema } from "mongoose";

export const leadStatuses = [
    "New",
    "Contacted",
    "Follow Up 1",
    "No-Reply F-1",
    "Follow Up 2",
    "No-Reply F-2",
    "Replied",
    "Meeting",
    "Proposal",
    "Won",
    "Lost",
] as const;

export type LeadStatus = (typeof leadStatuses)[number];

export interface ILead {
  company: string;
  contact: string;
  email: string;
  country?: string;
  service?: string;
  status: LeadStatus;
  followUp?: Date | null;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    company: {
      type: String,
      required: [true, "Company is required"],
      trim: true,
      maxlength: 150,
    },

    contact: {
      type: String,
      required: [true, "Contact person is required"],
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      maxlength: 150,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    country: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },

    service: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },

    status: {
      type: String,
      enum: leadStatuses,
      default: "New",
      required: true,
    },

    followUp: {
      type: Date,
      default: null,
    },

    notes: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;