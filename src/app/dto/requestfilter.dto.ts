import { Injectable } from '@nestjs/common';
import Idto from '../interfaces/idto.interface';

import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export default class RequestFilterDTO implements Idto {
  @ApiProperty({ description: 'field key', type: 'string', required: true })
  field: string;

  @ApiProperty({
    description: 'values list',
    type: 'string',
    isArray: true,
    required: true,
  })
  values: string[];
}
