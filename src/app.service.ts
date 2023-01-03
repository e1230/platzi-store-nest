import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    @Inject('TASKS') private tasks: any[],
    private config: ConfigService,
  ) {}
  getHello(): string {
    const apiKey = this.config.get('API_KEY');
    const db = this.config.get('DATABASE_NAME');
    // console.log(this.tasks);
    return `Hola mundo uwu! ${apiKey} y ${db}`;
  }
}
