import { ApiInviteAdminService } from '@pubkey-collections/api/invite/data-access'
import { Controller } from '@nestjs/common'

@Controller('invite')
export class ApiInviteController {
  constructor(private readonly service: ApiInviteAdminService) {}
}
