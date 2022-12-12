import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role-auth.guard';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import {
  UpdateArticleDto,
  UpdateArticleStatusDto,
} from './dto/update-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @SetMetadata('roles', ['ADMIN'])
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('requests')
  findPendingArticles() {
    return this.articleService.findPending();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('myarticles/:id')
  findBySender(@Param('id') id: string) {
    return this.articleService.findBySender(id);
  }

  //@UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(id, updateArticleDto);
  }

  @SetMetadata('roles', ['ADMIN'])
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch('status/:id')
  updateArticleStatus(
    @Param('id') id: string,
    @Body() updateArticleStatusDto: UpdateArticleStatusDto,
  ) {
    return this.articleService.updateArticleStatus(id, updateArticleStatusDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(id);
  }
}
