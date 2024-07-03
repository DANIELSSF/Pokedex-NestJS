import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{
      name: Pokemon.name,
      schema: PokemonSchema,
    }]),
  ],
  exports: [MongooseModule],
})
export class PokemonModule {}
