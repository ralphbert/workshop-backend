import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

@Controller('echo')
export class EchoController {
  @Get()
  getRoute() {
    return 'get request';
  }

  @Post()
  post(@Body() body: any) {
    return body;
  }

  @Patch(':id')
  patch(@Body() body: any) {
    return body;
  }

  @Put(':id')
  put(@Body() body: any) {
    return body;
  }

  @Delete(':id')
  deleteRoute(@Param('id') id: string) {
    return 'deleting id ' + id;
  }
}
