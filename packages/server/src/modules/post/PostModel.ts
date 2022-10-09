import mongoose, { Document, Model, Types } from 'mongoose';

import ObjectId = mongoose.Schema.Types.ObjectId;

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    author: {
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
    collection: 'Post',
  }
);

export interface IPost extends Document {
  title: string;
  content: string;
  image?: string;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PostModel: Model<IPost> = mongoose.models.Post || mongoose.model('Post', PostSchema);

export default PostModel;
