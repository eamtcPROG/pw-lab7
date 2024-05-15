import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Res,
  UseInterceptors,
  Body,
  Req,
  // UseGuards,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import ResultObjectDTO from 'src/app/dto/resultobject.dto';
import { PostUserDto, UserDto } from 'src/user/dto/user.dto';
import { ToolsGenerateResponse } from 'src/app/tools/toolsgenerateresponse';
import { MessageTypes } from 'src/app/tools/messagetypes';
import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';

import { UserService } from '../services/user.service';
import ResultListDTO from 'src/app/dto/resultlist.dto';
import { ParseParamsList } from 'src/app/interceptors/parseparamslist.interceptor';
import Idto from 'src/app/interfaces/idto.interface';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Add user ' })
  @ApiConsumes('application/json')
  @ApiBody({ type: PostUserDto })
  @ApiOkResponse({
    type: ResultObjectDTO,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'User not found',
  })
  @Post('/')
  @UseInterceptors(new PrepareObjectBody(PostUserDto))
  public async add(
    @Res() res: Response,
    @Body() body: Idto,
  ): Promise<ResultObjectDTO> {
    const obj = await this.userService.save(body);

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }

    return ToolsGenerateResponse.getOkObject(res, obj);
  }

  @ApiOperation({ summary: 'Get User list' })
  @ApiOkResponse({
    type: ResultListDTO,
    description: 'Result List in type: ResultListDTO',
  })
  @ApiQuery({
    name: 'page',
    type: 'integer',
    description: 'Page number, default: 1',
    required: false,
  })
  @ApiQuery({
    name: 'onpage',
    type: 'integer',
    description: 'Elements on page',
    required: false,
  })
  @ApiQuery({
    name: 'filters',
    type: 'string',
    description: 'Filters',
    required: false,
  })
  @ApiQuery({
    name: 'order',
    type: 'string',
    description: 'Field for ordering',
    required: false,
  })
  @Get('/')
  @UseInterceptors(ParseParamsList)
  public async getList(
    @Res() res: Response,
    @Req() req: any,
  ): Promise<ResultListDTO> {
    const obj = await this.userService.getAll(req.requestList);

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }
    const totalObjects = await this.userService.getCount(req.requestList);
    return await ToolsGenerateResponse.getOkList(
      res,
      obj,
      req.requestList,
      totalObjects,
    );
  }

  @ApiOperation({ summary: 'Get User by ID' })
  @ApiParam({ name: 'id', description: 'User id', required: true })
  @ApiOkResponse({
    type: UserDto,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'User not found',
  })
  @Get('/:id')
  public async get(
    @Res() res: Response,
    @Param() params: any,
  ): Promise<ResultObjectDTO> {
    const obj = await this.userService.getById(params.id);
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

  @ApiOperation({ summary: 'Delete User by ID' })
  @ApiParam({ name: 'id', description: 'User id', required: true })
  @ApiOkResponse({
    type: ResultObjectDTO,
    description: 'Delete success',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'User not found',
  })
  @Delete('/:id')
  public async delete(
    @Res() res: Response,
    @Param() params: any,
  ): Promise<ResultObjectDTO> {
    const obj = await this.userService.delete(params.id);
    if (obj.deleted === false) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }

    return await ToolsGenerateResponse.getSuccessObject(
      res,
      HttpStatus.OK,
      MessageTypes.OBJECT_DELETE_SUCCESS,
    );
  }

  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', description: 'User id', required: true })
  @ApiBody({ type: UserDto })
  @ApiConsumes('application/json')
  @ApiOkResponse({
    type: UserDto,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'User not found',
  })
  @Put('/:id')
  @UseInterceptors(new PrepareObjectBody(UserDto))
  public async update(
    @Res() res: Response,
    @Param() params: any,
    @Body() body: Idto,
  ): Promise<ResultObjectDTO> {
    const obj = await this.userService.save(body, params.id);

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }

    return await ToolsGenerateResponse.getOkObject(res, obj);
  }
}
