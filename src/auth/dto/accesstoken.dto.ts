import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class AccessTokenDto implements Idto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    description: 'Access JWT Token',
    type: 'string',
  })
  accesstoken: string;

  @ApiProperty({
    example: 'bearer',
    description: 'token type',
    type: 'string',
  })
  tokentype: string;

  @ApiProperty({
    example: 600,
    description: 'Expiration time',
    type: 'number',
  })
  expiresin: number;

  @ApiProperty({
    example: 1683385200,
    description: 'valid until timestamp',
    type: 'number',
  })
  untildate: number;
}
