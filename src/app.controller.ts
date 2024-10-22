import { Controller, Post, Delete, Get, Put} from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findOne(): any {
    // return this.usersService.findOne(+id);
  }

  @Post()
  createRoute(): any {
    return this.appService.create('');
  }
  @Put()
  updateItem() : any {
    // return this.appService.updateItem('');
  }
  @Delete()
  deleteItem() {
    // return this.appService.deleteItem('');
  }
}



