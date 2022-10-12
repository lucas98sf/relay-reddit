import mongoose, { Model, Types } from 'mongoose';

import ObjectId = mongoose.Schema.Types.ObjectId;

export interface IVote {
  type: 'UPVOTE' | 'DOWNVOTE';
  post?: Types.ObjectId;
  comment?: Types.ObjectId;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

interface VoteModel extends Model<IVote> {
  countVotes: (target: { post: ObjectId } | { comment: ObjectId }) => Promise<{
    upvotes: number;
    downvotes: number;
  }>;
}

const VoteSchema = new mongoose.Schema<IVote, VoteModel>(
  {
    type: {
      type: String,
      enum: ['UPVOTE', 'DOWNVOTE'],
      required: true,
      index: true,
    },
    post: {
      type: ObjectId,
      ref: 'Post',
      index: true,
    },
    comment: {
      type: ObjectId,
      ref: 'Comment',
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
    collection: 'Vote',
  }
);

VoteSchema.static(
  'countVotes',
  async function countVotes(target: { post: ObjectId } | { comment: ObjectId }) {
    const votes: Array<IVote> = await this.find(target);

    const upvotes = votes.filter(vote => vote.type === 'UPVOTE').length;
    const downvotes = votes.filter(vote => vote.type === 'DOWNVOTE').length;

    return {
      upvotes,
      downvotes,
      total: upvotes - downvotes,
    };
  }
);

const Vote = mongoose.models.Vote || mongoose.model<IVote, VoteModel>('Vote', VoteSchema);

export default Vote;
