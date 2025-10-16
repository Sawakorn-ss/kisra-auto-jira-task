import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class TaskDto {
  @IsString()
  id!: string;

  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  definitionOfDone?: string;
}

export class StoryDto {
  @IsString()
  id!: string;

  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TaskDto)
  tasks!: TaskDto[];
}

export class EpicDto {
  @IsString()
  id!: string;

  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StoryDto)
  stories!: StoryDto[];
}

export class BreakdownTree {
  @IsOptional()
  @IsString()
  productVision?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  goals?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  scopeIn?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  scopeOut?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EpicDto)
  epics!: EpicDto[];
}
