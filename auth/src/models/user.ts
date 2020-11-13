import mongoose from 'mongoose';
import { Password } from '../services/password';

// interface that describe attrbutes that creating user need
interface UserAttrs {
  email: string;
  password: string;
}

//interface that describe a method that User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//interface that a single user document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
      versionKey: false,
    },
  }
);

//.pre is a middleware function built in mongoose, in here every time we want to save a user
//we will exeute the async function first,
//mongoose is nott fully support async await,in order to let mongoose know we are done for the work
//we need to pass done argument in ,and manually use done() right after we finish
//we use function function here instead of arrow function ,because in pre method we get this as a document
//but if we use arrow function  keyword this will be overwritten to the context of this file
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    //get mongoose model method
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
