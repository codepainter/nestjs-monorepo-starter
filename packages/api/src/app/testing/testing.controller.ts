import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { ISeedDataResponseDto, SeedDataBodyDto } from './dtos/seed-data.dto';
import { SeedData } from './usecases/seed-data/seed-data.usecase';
import { SeedDataCommand } from './usecases/seed-data/seed-data.command';

@Controller('/testing')
export class TestingController {

  constructor(
    private seedDataUsecase: SeedData
  ) {

  }

  @Post('/seed')
  async seedData(@Body() body: SeedDataBodyDto): Promise<ISeedDataResponseDto> {
    if (process.env.NODE_ENV !== 'test') throw new NotFoundException();
    const command = SeedDataCommand.create({});

    return await this.seedDataUsecase.execute(command);
  }
}
