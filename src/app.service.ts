import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor(
    @Inject('PG') private clientPg: Client,
    @Inject('TASKS') private tasks: any[],
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    const apiKey = this.configService.apiKey;
    const db = this.configService.database.name;
    // console.log(this.tasks);
    return `Hola mundo uwu! ${apiKey} y ${db}`;
  }
  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, resp) => {
        if (err) {
          reject(err);
        }
        resolve(resp.rows);
      });
    });
  }
}
