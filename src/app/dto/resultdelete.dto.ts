import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export default class ResultDeleteDTO {
  @ApiProperty({
    description: 'Specific Object DTO',
    type: 'boolean',
  })
  deleted: boolean;
}
