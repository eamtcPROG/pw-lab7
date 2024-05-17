import {
  Controller,
  Get,
  HttpStatus,
  //   Param,
  Res,
  UseInterceptors,
  Body,
  //   Req,
  // UseGuards,
  Post,
  UseGuards,
  //   Delete,
  //   Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  //   ApiParam,
  //   ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import ResultObjectDTO from 'src/app/dto/resultobject.dto';

import { ToolsGenerateResponse } from 'src/app/tools/toolsgenerateresponse';
import { MessageTypes } from 'src/app/tools/messagetypes';

import { AuthService } from '../services/auth.service';

import ResultSignInDTO from '../dto/resultsignin.dto';
import { AccessTokenDto } from '../dto/accesstoken.dto';
import { LoginDto } from 'src/user/dto/user.dto';
import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';
import { AccessTokenGuard } from 'src/app/guards/accessToken.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Get jwt token' })
  @ApiOkResponse({
    type: AccessTokenDto,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'Auth not found',
  })
  @Get('/token')
  public async token(@Res() res: Response): Promise<ResultObjectDTO> {
    const obj = await this.authService.getToken({} as ResultSignInDTO);
    // ---------------------

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }

    return await ToolsGenerateResponse.getOkObject(res, obj);
  }

  @ApiOperation({ summary: 'Add comment ' })
  @ApiConsumes('application/json')
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    type: ResultObjectDTO,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'Comment not found',
  })
  @Post('/login')
  @UseGuards(new AccessTokenGuard())
  @UseInterceptors(new PrepareObjectBody(LoginDto))
  public async login(
    @Res() res: Response,
    @Body() body: LoginDto,
  ): Promise<ResultObjectDTO> {
    const obj = await this.authService.login(body);

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_ERROR_LOGIN,
      );
    }

    return ToolsGenerateResponse.getOkObject(res, obj);
  }
}
