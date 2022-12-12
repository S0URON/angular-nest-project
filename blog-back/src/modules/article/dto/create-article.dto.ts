import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  sender: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  backgoundColor: string;
  @IsNotEmpty()
  textColor: string;
  @IsNotEmpty()
  textFont: string;
}
