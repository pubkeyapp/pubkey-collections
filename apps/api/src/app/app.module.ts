import { Module } from '@nestjs/common'
import { ApiCoreFeatureModule } from '@pubkey-collections/api/core/feature'

@Module({
  imports: [ApiCoreFeatureModule],
})
export class AppModule {}
