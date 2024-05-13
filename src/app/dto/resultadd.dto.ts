import { Injectable } from '@nestjs/common';

import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export default class ResultAddDTO {
  @ApiProperty({
    description: 'Specific Object DTO',
    type: 'boolean',
  })
  added: boolean;
}
