import { Controller, Post, Delete, Put} from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createRoute(): any {
    return this.appService.create('');
  }
  @Put()
  updateItem() : any {
    return this.appService.updateItem('');
  }
  @Delete()
  deleteItem() {
    return this.appService.deleteItem('');
  }
}



