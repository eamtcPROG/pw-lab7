import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

import { Document } from 'mongoose';
import Ischema from 'src/app/interfaces/ischema.interface';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment extends Document implements Ischema {
  @Prop()
  id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Post' })
  idpost: string;

  @Prop()
  content: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  iduser: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
