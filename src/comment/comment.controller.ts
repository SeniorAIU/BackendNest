import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentsDto } from './dto/comment.dto';
import { CommentsService } from './comment.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  getcampaign() {
    return this.commentsService.getComment();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Get('/comment/search')
  findOneBy(@Body() data: any) {
    return this.commentsService.findOneby(data);
  }

  @Post()
  createComment(@Body() data: CommentsDto): any {
    return this.commentsService.createComment(data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.commentsService.delete(id);
  }
}
