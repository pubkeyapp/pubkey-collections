import { Module } from '@nestjs/common'
import { ApiStorageDataAccessModule } from '@pubkey-collections/api/storage/data-access'

@Module({
  imports: [ApiStorageDataAccessModule],
  providers: [],
  exports: [],
})
export class ApiStorageFeatureModule {}
