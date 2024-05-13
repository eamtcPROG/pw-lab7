import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class MessageDto implements Idto {
  @ApiProperty({ example: '100', description: 'Message Code', type: 'string' })
  code: string;

  @ApiProperty({
    example: 'User Not Found',
    description: 'Message Value',
    type: 'string',
  })
  message: string;

  @ApiProperty({
    example: '3',
    description: 'Type of Message: 1 - Succes, 2 - Warning, 3 - Error',
    type: 'number',
  })
  mestype: number;
}
