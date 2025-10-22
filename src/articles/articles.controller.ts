import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ArticlesService } from './articles.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('articles')
@UseGuards(AuthGuard('jwt'))
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Patch('reorder')
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  reorder(@Body() body: { articles: { id: string; position: number }[] }) {
    return this.articlesService.reorder(body.articles);
  }
}
