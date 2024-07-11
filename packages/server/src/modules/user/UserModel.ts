import bcrypt from "bcryptjs";
import mongoose, { Document, Model, Types } from "mongoose";

import ObjectId = mongoose.Schema.Types.ObjectId;

export type IUser = {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  communities: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  authenticate: (plainTextPassword: string) => boolean;
  encryptPassword: (password: string | undefined) => string;
} & { _id: Types.ObjectId };

const UserSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: false,
      index: true,
      unique: true,
    },
    password: {
      type: String,
      hidden: true,
    },
    avatar: {
      type: String,
    },
    communities: {
      type: [ObjectId],
      ref: "Community",
      default: [],
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
    collection: "User",
  }
);

UserSchema.pre<IUser & Document>("save", function encryptPasswordHook(next) {
  if (this.isModified("password")) {
    this.password = this.encryptPassword(this.password);
  }

  return next();
});

UserSchema.methods = {
  authenticate(plainTextPassword: string) {
    return bcrypt.compareSync(plainTextPassword, this.password);
  },
  encryptPassword(password: string) {
    return bcrypt.hashSync(password, 8);
  },
};

const UserModel: Model<IUser> = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;
