import { Module, Global } from '@nestjs/common';
import { HttpService, HttpModule } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Client } from 'pg';

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'my_db',
  password: '123456',
  port: 5432,
});
client.connect();

@Global()
@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const tasks = await http.get(
          'https://jsonplaceholder.typicode.com/todos',
          {
            headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
          },
        );
        return (await firstValueFrom(tasks)).data;
      },
      inject: [HttpService],
    },
    {
      provide: 'PG',
      useValue: client,
    },
  ],
  exports: ['TASKS', 'PG'],
})
export class DatabaseModule {}
