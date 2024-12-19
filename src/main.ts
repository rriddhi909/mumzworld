import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const rateLimiter = new RateLimiterMemory({
    points: 10,
    duration: 1,
  });

  app.use(async (req, res, next) => {
    try {
      await rateLimiter.consume(req.ip);
      next();
    } catch (rejRes) {
      res.status(429).send('Too Many Requests.');
    }
  });

  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));

  await app.listen(3000);
}
bootstrap();