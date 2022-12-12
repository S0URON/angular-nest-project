import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types as MongooseTypes } from 'mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import {
  UpdateArticleDto,
  UpdateArticleStatusDto,
} from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private readonly ArticleModel: Model<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    try {
      const article = new this.ArticleModel({
        sender: createArticleDto.sender,
        title: createArticleDto.title,
        content: createArticleDto.content,
        textColor: createArticleDto.textColor,
        textFont: createArticleDto.textFont,
        backgoundColor: createArticleDto.backgoundColor,
        status: 'PENDING',
      });
      const response = await article.save();
      if (!response) {
        throw new BadRequestException('Article not created');
      }
      return article;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    let articles = [];
    try {
      articles = await this.ArticleModel.aggregate([
        {
          $match: {
            status: 'APPROVED',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'sender',
            pipeline: [
              {
                $project: {
                  username: 1,
                  email: 1,
                },
              },
            ],
            foreignField: '_id',
            as: 'sender',
          },
        },
        {
          $unwind: '$sender',
        },
      ]);

      return articles;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async findPending() {
    let articles = [];
    try {
      articles = await this.ArticleModel.aggregate([
        {
          $match: {
            status: 'PENDING',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'sender',
            pipeline: [
              {
                $project: {
                  username: 1,
                  email: 1,
                },
              },
            ],
            foreignField: '_id',
            as: 'sender',
          },
        },
        {
          $unwind: '$sender',
        },
      ]);

      return articles;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      const article = await this.ArticleModel.aggregate([
        {
          $match: {
            _id: new MongooseTypes.ObjectId(id),
            status: 'APPROVED',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'sender',
            pipeline: [
              {
                $project: {
                  username: 1,
                  email: 1,
                },
              },
            ],
            foreignField: '_id',
            as: 'sender',
          },
        },
        {
          $unwind: '$sender',
        },
      ]);
      return article[0];
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findBySender(id: string) {
    try {
      const article = await this.ArticleModel.aggregate([
        {
          $match: {
            sender: new MongooseTypes.ObjectId(id),
            status: 'APPROVED',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'sender',
            pipeline: [
              {
                $project: {
                  username: 1,
                  email: 1,
                },
              },
            ],
            foreignField: '_id',
            as: 'sender',
          },
        },
        {
          $unwind: '$sender',
        },
      ]);
      return article;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    try {
      console.log(id);
      const article = await this.ArticleModel.findById(
        new MongooseTypes.ObjectId(id),
      );

      if (!article) {
        throw new NotFoundException('article does not exists');
      }

      Object.keys(updateArticleDto)
        .filter((key) =>
          [
            'title',
            'content',
            'backgroundColor',
            'textColor',
            'textFont',
          ].includes(key),
        )
        .forEach((key) => {
          article[key] = updateArticleDto[key];
        });
      await article.save();
      return article;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async updateArticleStatus(
    id: string,
    updateArticleStatus: UpdateArticleStatusDto,
  ) {
    const actualDate = new Date();
    actualDate.toUTCString();

    let article;
    try {
      article = await this.ArticleModel.findOneAndUpdate(
        { _id: id },
        updateArticleStatus,
        {
          new: true,
        },
      ).exec();

      if (!article) {
        throw new ConflictException('Error trying to update article');
      }

      return this.findPending();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      await this.ArticleModel.findByIdAndDelete(new MongooseTypes.ObjectId(id));
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
