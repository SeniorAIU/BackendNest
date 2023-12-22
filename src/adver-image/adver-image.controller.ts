import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AdverImageService } from './adver-image.service';

@Controller('adver-image')
export class AdverImageController {
  constructor(private readonly adverImageService: AdverImageService) {}

  @Get()
  getcampaign() {
    return this.adverImageService.getAdverImage();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adverImageService.findOne(id);
  }

  @Get('/adver-image/search')
  findOneBy(@Body() data: any) {
    return this.adverImageService.findOneby(data);
  }

  @Post()
  createComment(@Body() data: any): any {
    return this.adverImageService.createAdverImage(data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.adverImageService.delete(id);
  }
}
