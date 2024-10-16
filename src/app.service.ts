import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

const filePath = path.join(__dirname, '..', 'data.json');

@Injectable()
export class AppService {
  private readData() {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  }

  private writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }

  findAll() {
    return this.readData();
  }

  create(item) {
    const items = this.readData();
    const newItem = { id: Date.now(), ...item };
    items.push(newItem);
    this.writeData(items);
    return newItem;
  }

  update(id: number, updateData) {
    const items = this.readData();
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) throw new Error('Item not found');

    items[index] = { ...items[index], ...updateData };
    this.writeData(items);
    return items[index];
  }

  remove(id: number) {
    let items = this.readData();
    items = items.filter((item) => item.id !== id);
    this.writeData(items);
  }
}
