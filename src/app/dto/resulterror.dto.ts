import { Injectable } from '@nestjs/common';
import Idto from '../interfaces/idto.interface';
import { MessageDto } from './message.dto';
import { ApiProperty } from '@nestjs/swagger';
import ResultMetaDTO from 'src/app/dto/resultmeta.dto';

@Injectable()
export default class ResultErrorDTO implements Idto {
  @ApiProperty({
    example: true,
    description: 'Exist or no Error',
    type: 'boolean',
  })
  err: boolean;

  @ApiProperty({
    description: 'Message List',
    type: MessageDto,
    isArray: true,
  })
  messages?: MessageDto[];

  @ApiProperty({
    description: 'Meta dto',
    type: ResultMetaDTO,
  })
  meta?: ResultMetaDTO;
}
