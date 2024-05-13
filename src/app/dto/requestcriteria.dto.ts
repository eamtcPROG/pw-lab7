import { Injectable } from '@nestjs/common';
import Idto from '../interfaces/idto.interface';

import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export default class RequestCriteriaDTO implements Idto {
  @ApiProperty({ description: 'field key', type: 'string', required: true })
  id: string;

  @ApiProperty({
    description: 'values list',
    type: 'string',
    isArray: true,
    required: true,
  })
  values: string[];
}
