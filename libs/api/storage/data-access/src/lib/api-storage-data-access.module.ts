import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule, ApiCoreService } from '@pubkey-collections/api/core/data-access'
import { S3Module } from 'nestjs-s3'
import { ApiStorageService } from './api-storage.service'

@Module({
  imports: [
    ApiCoreDataAccessModule,
    S3Module.forRootAsync({
      imports: [ApiCoreDataAccessModule],
      inject: [ApiCoreService],
      useFactory: (args: ApiCoreService) => args.config.storage,
    }),
  ],
  providers: [ApiStorageService],
  exports: [ApiStorageService],
})
export class ApiStorageDataAccessModule {}
