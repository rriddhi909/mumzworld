import { Module } from '@nestjs/common';
// import { GraphQLModule } from '@nestjs/graphql';
// import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { WeatherModule } from './weather/weather.module';
import { FavouriteLocationModule } from './favourite-location/favourite-location.module';
import { ConfigModule } from '@nestjs/config';
import { ExternalApiModule } from './external-api/external-api.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: '',
      password: '',
      database: 'weather_app',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    ExternalApiModule,
    WeatherModule,
    FavouriteLocationModule,
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: true,
    //   playground: true,
    // }),
  ],
})
export class AppModule {}