import mongoose, { Model, Types } from 'mongoose';

import ObjectId = mongoose.Schema.Types.ObjectId;

export type IComment = {
  content?: string;
  post: Types.ObjectId;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
} & { _id: Types.ObjectId };

const CommentSchema = new mongoose.Schema<IComment>(
  {
    content: {
      type: String,
      required: true,
    },
    post: {
      type: ObjectId,
      ref: 'Post',
      required: true,
      index: true,
    },
    author: {
      type: ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'Comment',
  }
);

const CommentModel: Model<IComment> =
  mongoose.models.Comment || mongoose.model('Comment', CommentSchema);

export default CommentModel;
