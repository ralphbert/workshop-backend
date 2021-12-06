import { Controller, Get } from '@nestjs/common';
import { CoinsService } from './coins.service';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('Coins')
@Controller('coins')
export class CoinsController {
  constructor(private coinsService: CoinsService) {}

  @Get('')
  getAll() {
    return this.coinsService.getCoins();
  }
}
