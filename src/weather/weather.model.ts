import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Weather {
  @Field(() => Int)
  temperature: number;

  @Field()
  condition: string;

  @Field()
  city: string;
}

@ObjectType()
export class Forecast {
  @Field(() => [Weather])
  daily: Weather[];
}