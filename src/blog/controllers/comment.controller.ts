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
import { PostCommentDto, CommentDto } from 'src/blog/dto/comment.dto';
import { ToolsGenerateResponse } from 'src/app/tools/toolsgenerateresponse';
import { MessageTypes } from 'src/app/tools/messagetypes';
import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';

import { CommentService } from '../services/comment.service';
import ResultListDTO from 'src/app/dto/resultlist.dto';
import { ParseParamsList } from 'src/app/interceptors/parseparamslist.interceptor';
import Idto from 'src/app/interfaces/idto.interface';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @ApiOperation({ summary: 'Add comment ' })
  @ApiConsumes('application/json')
  @ApiBody({ type: PostCommentDto })
  @ApiOkResponse({
    type: ResultObjectDTO,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'Comment not found',
  })
  @Post('/')
  @UseInterceptors(new PrepareObjectBody(PostCommentDto))
  public async add(
    @Res() res: Response,
    @Body() body: Idto,
  ): Promise<ResultObjectDTO> {
    const obj = await this.commentService.save(body);

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }

    return ToolsGenerateResponse.getOkObject(res, obj);
  }

  @ApiOperation({ summary: 'Get Comment list' })
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
    const obj = await this.commentService.getAll(req.requestList);

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }
    const totalObjects = await this.commentService.getCount(req.requestList);
    return await ToolsGenerateResponse.getOkList(
      res,
      obj,
      req.requestList,
      totalObjects,
    );
  }

  @ApiOperation({ summary: 'Get Comment by ID' })
  @ApiParam({ name: 'id', description: 'Comment id', required: true })
  @ApiOkResponse({
    type: CommentDto,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'Comment not found',
  })
  @Get('/:id')
  public async get(
    @Res() res: Response,
    @Param() params: any,
  ): Promise<ResultObjectDTO> {
    const obj = await this.commentService.getById(params.id);
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

  @ApiOperation({ summary: 'Delete Comment by ID' })
  @ApiParam({ name: 'id', description: 'Comment id', required: true })
  @ApiOkResponse({
    type: ResultObjectDTO,
    description: 'Delete success',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'Comment not found',
  })
  @Delete('/:id')
  public async delete(
    @Res() res: Response,
    @Param() params: any,
  ): Promise<ResultObjectDTO> {
    const obj = await this.commentService.delete(params.id);
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

  @ApiOperation({ summary: 'Update comment by ID' })
  @ApiParam({ name: 'id', description: 'Comment id', required: true })
  @ApiBody({ type: CommentDto })
  @ApiConsumes('application/json')
  @ApiOkResponse({
    type: CommentDto,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'Comment not found',
  })
  @Put('/:id')
  @UseInterceptors(new PrepareObjectBody(CommentDto))
  public async update(
    @Res() res: Response,
    @Param() params: any,
    @Body() body: Idto,
  ): Promise<ResultObjectDTO> {
    const obj = await this.commentService.save(body, params.id);

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
