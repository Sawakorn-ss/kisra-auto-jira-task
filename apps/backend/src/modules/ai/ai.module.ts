import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AIModuleController } from './ai.controller';
import { AIService } from './ai.service';

@Module({
  imports: [ConfigModule],
  providers: [AIService],
  controllers: [AIModuleController],
  exports: [AIService]
})
export class AIModule {}
