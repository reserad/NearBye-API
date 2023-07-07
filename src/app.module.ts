import {
  Inject,
  MiddlewareConsumer,
  Module,
  OnModuleInit,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './middleware/logging.middleware';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloDriver,
  ApolloDriverConfig,
  AuthenticationError,
} from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { join } from 'path';
import { PostModule } from './modules/post/post.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AxiosError, AxiosResponse, HttpStatusCode } from 'axios';
import { GraphQLError } from 'graphql';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PostModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      sortSchema: true,
      context: ({ req }) => ({ req }),
    }),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly httpService: HttpService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
  onModuleInit() {
    const axios = this.httpService.axiosRef;
    axios.interceptors.response.use(
      function (response: AxiosResponse) {
        return response;
      },
      function (err: AxiosError) {
        if (err.response && err.response.status) {
          switch (err.response.status) {
            case HttpStatusCode.Unauthorized:
              throw new AuthenticationError('Invalid JWT', {
                originalError: err,
                extensions: {
                  code: 'UNAUTHENTICATED',
                  statusCode: HttpStatusCode.Unauthorized,
                },
              });
            case HttpStatusCode.NotFound:
              throw new GraphQLError('err.message', {
                originalError: err,
                extensions: {
                  code: 'NOTFOUND',
                  statusCode: HttpStatusCode.NotFound,
                },
              });
            default:
              return err;
          }
        }
        return err;
      },
    );
  }
}
