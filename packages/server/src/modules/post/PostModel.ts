import mongoose, { Document, Model, Types } from 'mongoose';

import ObjectId = mongoose.Schema.Types.ObjectId;

export type IPost = {
  title: string;
  content?: string;
  image?: string;
  url?: string;
  author: Types.ObjectId;
  community: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
} & { _id: Types.ObjectId };

const PostSchema = new mongoose.Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    image: {
      type: String,
    },
    url: {
      type: String,
    },
    author: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    community: {
      type: ObjectId,
      ref: 'Community',
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'Post',
  }
);

const PostModel: Model<IPost & Document> =
  mongoose.models.Post || mongoose.model('Post', PostSchema);

export default PostModel;
