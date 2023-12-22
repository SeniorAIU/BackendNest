import { Inject, Injectable } from '@nestjs/common';
import { Comments } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { CommentsDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('COMMENTS_REPOSITORY')
    private commentRepository: Repository<Comments>,
  ) {}

  async getComment() {
    const result = await this.commentRepository.find();
    return result;
  }

  async createComment(data: CommentsDto) {
    const user = await this.commentRepository.save(data);
    return user;
  }

  async findOne(id: string) {
    const result = await this.commentRepository.findOneBy({ id });
    console.log(result);
    return result;
  }

  findOneby(data: any) {
    return this.commentRepository.findBy(data);
  }

  delete(id: string) {
    return this.commentRepository.delete(id);
  }
}
