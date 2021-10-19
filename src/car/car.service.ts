import { Injectable, HttpException } from '@nestjs/common';
import { CARS } from './cars.mock';

@Injectable()
export class CarService {
  private cars = CARS;
  public getCars() {
    return this.cars;
  }

  public postCar(car) {
    return this.cars.push(car);
  }

  public getCarById(id: number): Promise<any> {
    const carId = Number(id);
    return new Promise((resolve) => {
      const car = this.cars.find((car) => car.id === carId);
      if (!car) {
        throw new HttpException('Not Found', 404);
      }
      return resolve(car);
    });
  }

  public deleteCarById(id: number): Promise<any> {
    const carId = Number(id);
    return new Promise((resolve) => {
      const carIndex = this.cars.findIndex((car) => car.id === carId);
      const car = this.cars[carIndex];
      if (!car) {
        throw new HttpException('Not Found', 404);
      }
      this.cars.splice(carIndex, 1);
      return resolve(this.cars);
    });
  }

  public putCarById(
    id: number,
    properyName: string,
    propertyValue: string,
  ): Promise<any> {
    const carId = Number(id);
    return new Promise((resolve) => {
      const carIndex = this.cars.findIndex((car) => car.id === carId);
      const car = this.cars[carIndex];
      if (!car) {
        throw new HttpException('Not Found', 404);
      }
      this.cars[carIndex][properyName] = propertyValue;
      return resolve(car);
    });
  }
}
