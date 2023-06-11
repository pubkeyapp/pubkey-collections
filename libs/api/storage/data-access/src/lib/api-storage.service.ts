import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-collections/api/core/data-access'
import { InjectS3, S3 } from 'nestjs-s3'

@Injectable()
export class ApiStorageService implements OnModuleInit {
  private readonly logger = new Logger(ApiStorageService.name)

  constructor(@InjectS3() private readonly s3: S3, private readonly core: ApiCoreService) {}

  async onModuleInit() {
    this.s3
      .listBuckets({})
      .then((res) => {
        if (!res?.Buckets?.length) {
          this.logger.warn('No S3 Buckets found')
          return
        }
        const found = res.Buckets.find((bucket) => bucket.Name === this.core.config.storageBucket)

        if (!found) {
          this.logger.error(`S3 Bucket ${this.core.config.storageBucket} not found...`)
          this.logger.error('Exiting...')
          process.exit(1)
        }

        this.logger.verbose(`S3 Bucket ${this.core.config.storageBucket} found...`)
      })
      .catch((err) => {
        this.logger.error('S3 Error: ' + JSON.stringify(err))
      })
  }
}
