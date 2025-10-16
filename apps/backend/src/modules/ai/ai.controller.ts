import { Body, Controller, Post } from '@nestjs/common';
import { IsString } from 'class-validator';
import { AIService } from './ai.service';

class RefineRequestDto {
  @IsString()
  text!: string;
}

@Controller('ai')
export class AIModuleController {
  constructor(private readonly aiService: AIService) {}

  @Post('refine')
  refine(@Body() body: RefineRequestDto) {
    return this.aiService.refineRequirement(body.text);
  }

  @Post('breakdown')
  breakdown(@Body() body: RefineRequestDto) {
    return this.aiService.generateBreakdown(body.text);
  }
}
