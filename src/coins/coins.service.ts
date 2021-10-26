import { Injectable } from '@nestjs/common';
import { makeNoise2D } from 'fast-simplex-noise';
import { roundTo } from '../lib/helpers';

const coins: {
  name: string;
  symbol: string;
}[] = [
  {
    name: 'Kentucky Fried Coin',
    symbol: 'KFC',
  },
  {
    name: 'Coin of Mayonaise-Kuchen',
    symbol: 'CMYK',
  },
  {
    name: 'Alternating Coin / Direct Coin',
    symbol: 'AC/DC',
  },
  {
    name: 'Yell-My-Coin-Anthem',
    symbol: 'YMCA',
  },
  {
    name: 'International Coin-Quest',
    symbol: 'ICQ',
  },
];

export interface Coin {
  name: string;
  symbol: string;
}

export interface CoinValue extends Coin {
  value: number;
  date: string;
}

@Injectable()
export class CoinsService {
  lastCall = Date.now();
  random = makeNoise2D();
  randomWeights = coins.map(() => Math.pow(10, Math.round(Math.random() * 5)));

  getCoins(): CoinValue[] {
    const date = new Date();

    const dt = (date.getTime() - this.lastCall) / 10000;
    this.lastCall = date.getTime();

    return coins.map((coin, index) => {
      return {
        ...coin,
        date: date.toISOString(),
        value: roundTo(
          (this.random(index + 1, dt) + 1) * (this.randomWeights[index] + 1),
          2,
        ),
      };
    });
  }
}
