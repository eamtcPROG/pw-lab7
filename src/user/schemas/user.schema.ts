import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { Document } from 'mongoose';
import Ischema from 'src/app/interfaces/ischema.interface';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Document implements Ischema {
  @Prop()
  id: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
