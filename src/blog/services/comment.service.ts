import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommentRepository } from '../repositories/comment.repository';
import { CommentDto } from 'src/blog/dto/comment.dto';

import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';

@Injectable()
export class CommentService
  extends GeneralService<CommentRepository, null>
  implements IService
{
  constructor(
    private readonly commentRepository: CommentRepository,
    protected readonly configService: ConfigService,
  ) {
    super(commentRepository);
  }

  getKeys(): any[] {
    const rez: string[] = [];

    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new CommentDto();

    rez.id = this.commentRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('iduser') && obj.iduser)
      rez.iduser = this.commentRepository.getParsedIdStr(obj.iduser);
    if (obj.hasOwnProperty('idpost') && obj.idpost)
      rez.idpost = this.commentRepository.getParsedIdStr(obj.idpost);
    if (obj.hasOwnProperty('content')) rez.content = obj.content;
    return rez;
  }

  async parseForSave(postObj: any): Promise<Idto> {
    const obj: CommentDto = new CommentDto();

    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('iduser')) obj.iduser = postObj.iduser;
    if (postObj.hasOwnProperty('idpost')) obj.idpost = postObj.idpost;
    if (postObj.hasOwnProperty('content')) obj.content = postObj.content;

    return obj;
  }
}
