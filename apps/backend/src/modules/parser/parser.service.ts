import { Injectable } from '@nestjs/common';
import type { BreakdownTree } from './dto/breakdown-tree.dto';

@Injectable()
export class ParserService {
  parse(text: string): BreakdownTree {
    return {
      productVision: text.split('\n')[0] ?? 'Vision placeholder',
      goals: [],
      scopeIn: [],
      scopeOut: [],
      epics: []
    };
  }
}
