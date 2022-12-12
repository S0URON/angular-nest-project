import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/modules/user/entities/user.entity';

@Schema()
export class Article extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: false,
    ref: User.name,
  })
  sender: MongooseSchema.Types.ObjectId;

  @Prop({ type: String })
  title: string;
  @Prop({ type: String })
  content: string;

  @Prop({ type: String })
  backgoundColor: string;

  @Prop({ type: String })
  textColor: string;

  @Prop({ type: String })
  textFont: string;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ required: true, enum: ['APPROVED', 'DECLINED', 'PENDING'] })
  status: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
