import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigService } from './config/config.service';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (configService: AppConfigService) => ({
        uri: configService.mongoUri,
      }),
      inject: [AppConfigService],
    }),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
