import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

import { Document } from 'mongoose';
import Ischema from 'src/app/interfaces/ischema.interface';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post extends Document implements Ischema {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  iduser: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
