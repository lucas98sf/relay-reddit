import bcrypt from 'bcryptjs';
import mongoose, { Document, Model, Types } from 'mongoose';

export type IUser = {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  authenticate: (plainTextPassword: string) => boolean;
  encryptPassword: (password: string | undefined) => string;
  createdAt: Date;
  updatedAt: Date;
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
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
    collection: 'User',
  }
);

UserSchema.pre<IUser & Document>('save', function encryptPasswordHook(next) {
  if (this.isModified('password')) {
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

const UserModel: Model<IUser & Document> =
  mongoose.models.User || mongoose.model('User', UserSchema);

export default UserModel;
