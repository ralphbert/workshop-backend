import { Controller, Get } from '@nestjs/common';
import { CoinsService } from './coins.service';

@Controller('coins')
export class CoinsController {
  constructor(private coinsService: CoinsService) {}

  @Get('')
  getAll() {
    return this.coinsService.getCoins();
  }
}
