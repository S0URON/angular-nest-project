import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types as MongooseTypes } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      let user = await this.userModel.findOne({ email: createUserDto.email });

      if (user) {
        throw new ConflictException('email already exists');
      }
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(createUserDto.password, salt);
      user = new this.userModel({
        ...createUserDto,
        password: passwordHash,
        role: 'USER',
      });
      await user.save();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const users = this.userModel.find({});
      return users;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  findOne(id: string) {
    try {
      const user = this.userModel.findById(new MongooseTypes.ObjectId(id));
      return user;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userModel.findOne({ email });
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userModel.findById(
        new MongooseTypes.ObjectId(id),
      );

      if (!user) {
        throw new NotFoundException('user does not exists');
      }
      Object.keys(updateUserDto)
        .filter((key) => ['username', 'email'].includes(key))
        .forEach((key) => {
          user[key] = updateUserDto[key];
        });
      await user.save();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      await this.userModel.findByIdAndDelete(new MongooseTypes.ObjectId(id));
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
