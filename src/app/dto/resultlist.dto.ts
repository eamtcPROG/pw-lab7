import { Injectable } from '@nestjs/common';
import Idto from '../interfaces/idto.interface';
import { MessageDto } from './message.dto';
import { ApiProperty } from '@nestjs/swagger';
import RequestListDTO from './requestlist.dto';
import ResultMetaDTO from 'src/app/dto/resultmeta.dto';

@Injectable()
export default class ResultListDTO {
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
    description: 'Specific Object DTO List',
    type: Idto,
    isArray: true,
  })
  objects?: Idto[];

  @ApiProperty({
    description: 'Request Infos',
    type: RequestListDTO,
    isArray: false,
  })
  requestinfo?: RequestListDTO;

  @ApiProperty({
    description: 'Total Objects',
    type: 'number',
  })
  total?: number;

  @ApiProperty({
    description: 'Total pages',
    type: 'number',
  })
  totalpages?: number;

  @ApiProperty({
    description: 'Meta dto',
    type: ResultMetaDTO,
  })
  meta?: ResultMetaDTO;
}
