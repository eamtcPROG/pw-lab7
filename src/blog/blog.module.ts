import { Module, forwardRef } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { AppModule } from 'src/app/app.module';
import { CommonTools } from 'src/app/tools/commontools';

import { CommentRepository } from 'src/blog/repositories/comment.repository';

import { CommentSchema } from 'src/blog/schemas/comment.schema';

import { CommentService } from 'src/blog/services/comment.service';

import { CommentController } from 'src/blog/controllers/comment.controller';

import { HttpModule } from '@nestjs/axios';
import { PostRepository } from './repositories/post.repository';
import { PostService } from './services/post.service';
import { PostController } from './controllers/post.controller';
import { PostSchema } from './schemas/post.schema';

@Module({
  imports: [
    forwardRef(() => AppModule),

    HttpModule.register({}),

    MongooseModule.forFeature([
      { name: 'Post', schema: PostSchema },
      { name: 'Comment', schema: CommentSchema },
    ]),
  ],
  controllers: [CommentController, PostController],
  providers: [
    CommentRepository,
    CommentService,
    PostRepository,
    PostService,
    CommonTools,
  ],
  exports: [],
})
export default class BlogModule {}
