import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class CommentDto implements Idto {
  @ApiProperty({
    example: '123423412341234123',
    description: 'Unique ID',
    type: 'string',
  })
  id: string;

  @ApiProperty({
    example: '12312342314',
    description: 'Unique ID of post',
    type: 'string',
  })
  idpost: string;

  @ApiProperty({
    example: 'Text',
    description: 'Comment content',
    type: 'string',
  })
  content: string;

  @ApiProperty({
    example: '12312342314',
    description: 'Unique ID of user who created post',
    type: 'string',
  })
  iduser: string;
}

export class PostCommentDto implements Idto {
  @ApiProperty({
    example: '12312342314',
    description: 'Unique ID of post',
    type: 'string',
  })
  idpost: string;

  @ApiProperty({
    example: 'Text',
    description: 'Comment content',
    type: 'string',
  })
  content: string;

  @ApiProperty({
    example: '12312342314',
    description: 'Unique ID of user who created post',
    type: 'string',
  })
  iduser: string;
}
