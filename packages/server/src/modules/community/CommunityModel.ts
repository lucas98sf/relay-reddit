import mongoose, { Document, Model, Types } from 'mongoose';

import ObjectId = mongoose.Schema.Types.ObjectId;

export type ICommunity = {
  name: string;
  title: string;
  about: string;
  owner: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
} & { _id: Types.ObjectId };

const CommunitySchema = new mongoose.Schema<ICommunity>(
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

const CommunityModel: Model<ICommunity & Document> =
  mongoose.models.Community || mongoose.model('Community', CommunitySchema);

export default CommunityModel;
