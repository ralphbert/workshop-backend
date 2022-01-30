import { ApiProperty } from '@nestjs/swagger';

export class CheckEmailDto {
  @ApiProperty()
  available: boolean;
}
