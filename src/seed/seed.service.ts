import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { IPokemonCreateSeed } from './interfaces/pokemon-seed-create-interface';
import { PokeResponse } from './interfaces/poke-resp-interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';


@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name) // 👈 inject the model mongoDB
    private readonly pokemonModel: Model<Pokemon>,
    private readonly Http: AxiosAdapter,
  ) { }

  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const data = await this.Http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    const pokemosToInsert: IPokemonCreateSeed[] = [];

    data.results.map(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      pokemosToInsert.push({ no, name, url, isActive: true });
    });

    await this.pokemonModel.insertMany(pokemosToInsert);

    return 'Pokemons created successfully';
  }
}
