import { Module, Global } from '@nestjs/common';
import { HttpService, HttpModule } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

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
  ],
  exports: ['TASKS'],
})
export class DatabaseModule {}
