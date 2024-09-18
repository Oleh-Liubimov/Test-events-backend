import { IsDate, IsEmail, IsEnum, IsString } from 'class-validator';

export enum HowYouFindUs {
  SOCIAL_MEDIA = 'social media',
  FRIENDS = 'friends',
  FOUND_MYSELF = 'found myself',
}

export class RegisterUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsDate()
  birthDate: Date;

  @IsEnum(HowYouFindUs)
  howDidYouFindUs: HowYouFindUs;
}
