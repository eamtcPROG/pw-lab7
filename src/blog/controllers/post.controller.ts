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
  UseGuards,
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
import { PostPostDto, PostDto } from 'src/blog/dto/post.dto';
import { ToolsGenerateResponse } from 'src/app/tools/toolsgenerateresponse';
import { MessageTypes } from 'src/app/tools/messagetypes';
import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';

import { PostService } from '../services/post.service';
import ResultListDTO from 'src/app/dto/resultlist.dto';
import { ParseParamsList } from 'src/app/interceptors/parseparamslist.interceptor';
import Idto from 'src/app/interfaces/idto.interface';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import { AccessTokenGuard } from 'src/app/guards/accessToken.guard';
import { Role } from 'src/app/tools/role';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @ApiOperation({ summary: 'Add post ' })
  @ApiConsumes('application/json')
  @ApiBody({ type: PostPostDto })
  @ApiOkResponse({
    type: ResultObjectDTO,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'Post not found',
  })
  @Post('/')
  @UseGuards(new AccessTokenGuard([Role.BASIC, Role.ADMIN]))
  @UseInterceptors(new PrepareObjectBody(PostPostDto))
  public async add(
    @Res() res: Response,
    @Body() body: Idto,
  ): Promise<ResultObjectDTO> {
    const obj = await this.postService.save(body);

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }

    const totalObjects = await this.postService.getCount(new RequestListDTO());

    return ToolsGenerateResponse.getOkObject(res, {
      obj,
      totalpages: Math.ceil(totalObjects / 10),
    });
  }

  @ApiOperation({ summary: 'Get Post list' })
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
  @UseGuards(new AccessTokenGuard([Role.BASIC, Role.ADMIN]))
  @UseInterceptors(ParseParamsList)
  public async getList(
    @Res() res: Response,
    @Req() req: any,
  ): Promise<ResultListDTO> {
    const obj = await this.postService.getAll(req.requestList);

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }
    const totalObjects = await this.postService.getCount(req.requestList);
    return await ToolsGenerateResponse.getOkList(
      res,
      obj,
      req.requestList,
      totalObjects,
    );
  }

  @ApiOperation({ summary: 'Get Post by ID' })
  @ApiParam({ name: 'id', description: 'Post id', required: true })
  @ApiOkResponse({
    type: PostDto,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'Post not found',
  })
  @UseGuards(new AccessTokenGuard([Role.BASIC, Role.ADMIN]))
  @Get('/:id')
  public async get(
    @Res() res: Response,
    @Param() params: any,
  ): Promise<ResultObjectDTO> {
    const obj = await this.postService.getById(params.id);
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

  @ApiOperation({ summary: 'Delete Post by ID' })
  @ApiParam({ name: 'id', description: 'Post id', required: true })
  @ApiOkResponse({
    type: ResultObjectDTO,
    description: 'Delete success',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'Post not found',
  })
  @UseGuards(new AccessTokenGuard([Role.ADMIN]))
  @Delete('/:id')
  public async delete(
    @Res() res: Response,
    @Param() params: any,
  ): Promise<ResultObjectDTO> {
    const obj = await this.postService.delete(params.id);
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

  @ApiOperation({ summary: 'Update post by ID' })
  @ApiParam({ name: 'id', description: 'Post id', required: true })
  @ApiBody({ type: PostDto })
  @ApiConsumes('application/json')
  @ApiOkResponse({
    type: PostDto,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'Post not found',
  })
  @UseGuards(new AccessTokenGuard([Role.BASIC, Role.ADMIN]))
  @Put('/:id')
  @UseInterceptors(new PrepareObjectBody(PostDto))
  public async update(
    @Res() res: Response,
    @Param() params: any,
    @Body() body: Idto,
  ): Promise<ResultObjectDTO> {
    const obj = await this.postService.save(body, params.id);

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
