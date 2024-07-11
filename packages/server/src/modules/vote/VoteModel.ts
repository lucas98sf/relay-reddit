import mongoose, { Document, Model, Types } from "mongoose";

import ObjectId = mongoose.Schema.Types.ObjectId;

export type IVote = {
  type: "UPVOTE" | "DOWNVOTE";
  post?: Types.ObjectId;
  comment?: Types.ObjectId;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
} & { _id: Types.ObjectId };

const VoteSchema = new mongoose.Schema<IVote>(
  {
    type: {
      type: String,
      enum: ["UPVOTE", "DOWNVOTE"],
      required: true,
      index: true,
    },
    post: {
      type: ObjectId,
      ref: "Post",
      index: true,
    },
    comment: {
      type: ObjectId,
      ref: "Comment",
      index: true,
    },
    author: {
      type: ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    collection: "Vote",
  }
);

VoteSchema.static(
  "countVotes",
  async function countVotes(target: { post: Types.ObjectId } | { comment: Types.ObjectId }) {
    const upvotes: number = await this.countDocuments({
      ...target,
      type: "UPVOTE",
    });
    const downvotes: number = await this.countDocuments({
      ...target,
      type: "DOWNVOTE",
    });
    return { upvotes, downvotes, total: upvotes - downvotes };
  }
);

interface IVoteModel extends Model<IVote> {
  countVotes: (target: { post: Types.ObjectId } | { comment: Types.ObjectId }) => Promise<{
    upvotes: number;
    downvotes: number;
    total: number;
  }>;
}

const VoteModel: IVoteModel =
  (mongoose.models.Vote as IVoteModel) || mongoose.model<IVote, IVoteModel>("Vote", VoteSchema);

export default VoteModel;
