import mongoose, { Document, Model, Types } from 'mongoose';

import ObjectId = mongoose.Schema.Types.ObjectId;

const CommunitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    owner: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'Community',
  }
);

export interface ICommunity extends Document {
  name: string;
  title: string;
  about: string;
  owner: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CommunityModel: Model<ICommunity> =
  mongoose.models.Community || mongoose.model('Community', CommunitySchema);

export default CommunityModel;
