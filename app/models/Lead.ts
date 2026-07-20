import mongoose, { Model, Schema } from "mongoose";

export const leadStatuses = [
  "New",
  "Researching",
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
  "Do Not Contact",
] as const;

export const leadPriorities = ["A", "B", "C"] as const;

export const employeeRanges = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "500+",
] as const;

export const projectSizes = [
  "< £5k",
  "£5k - £20k",
  "£20k - £100k",
  "£100k+",
] as const;

export type LeadStatus = (typeof leadStatuses)[number];
export type LeadPriority = (typeof leadPriorities)[number];
export type EmployeeRange = (typeof employeeRanges)[number];
export type ProjectSize = (typeof projectSizes)[number];

export interface ILead {
  company: string;
  contact: string;
  email: string;

  website?: string;
  linkedin?: string;

  country?: string;
  industry?: string;

  employees?: EmployeeRange;

  service?: string;

  status: LeadStatus;

  priority?: LeadPriority;

  outsourceScore?: number;

  projectSize?: ProjectSize;

  source?: string;

  techStack?: string;

  followUp?: Date | null;

  lastContacted?: Date | null;

  notes?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    company: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    contact: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 150,
      default: "",
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    website: {
      type: String,
      trim: true,
      default: "",
    },

    linkedin: {
      type: String,
      trim: true,
      default: "",
    },

    country: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },

    industry: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },

    employees: {
      type: String,
      enum: employeeRanges,
      default: "11-50",
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
    },

    priority: {
      type: String,
      enum: leadPriorities,
      default: "B",
    },

    outsourceScore: {
      type: Number,
      min: 1,
      max: 10,
      default: 5,
    },

    projectSize: {
      type: String,
      enum: projectSizes,
      default: "£5k - £20k",
    },

    source: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },

    techStack: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    followUp: {
      type: Date,
      default: null,
    },

    lastContacted: {
      type: Date,
      default: null,
    },

    notes: {
      type: String,
      trim: true,
      maxlength: 5000,
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