import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
  private defaultLimit: number;

  constructor(
    @InjectModel(Pokemon.name) // 👈 inject the model mongoDB
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit');
  }


  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    createPokemonDto = { ...createPokemonDto, isActive: true };

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto); // 👈 insert pokemon to DB
      return pokemon;
    } catch (error) {
      this.handleExceptions(error)
    }
  }


  async findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;

    try {
      const pokemons: Pokemon[] = await this.pokemonModel.find({ isActive: true })
        .limit(limit)
        .skip(offset)
        .sort({ no: 1 })
        .select('-__v')
        .exec();
      return pokemons;

    } catch (error) {
      console.log(error)
    }
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    if (!isNaN(+term))
      pokemon = await this.pokemonModel.findOne({ no: term });

    if (!pokemon && isValidObjectId(term))
      pokemon = await this.pokemonModel.findById(term);

    if (!pokemon)
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() });

    if (!pokemon) throw new NotFoundException(`Pokemon with ${term} not found`)

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    if ('isActive' in updatePokemonDto) throw new UnauthorizedException('isActive can not be updated');

    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name) updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try {
      await pokemon.updateOne(updatePokemonDto);
      const updatePokemon = { ...pokemon.toObject(), ...updatePokemonDto };
      return updatePokemon;

    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async toogleIsActivePokemon(id: string) {

    const { modifiedCount } = await this.pokemonModel.updateOne(
      { _id: id },
      [{ $set: { isActive: { $eq: [false, "$isActive"] } } }]);

    if (modifiedCount === 0) throw new NotFoundException(`Pokemon with id: ${id}, not found`)

    return { msg: `Pokemon with id: ${id}, has changed its availability status.` }
  }


  private handleExceptions(error: any) {
    if (error.code === 11000)
      throw new BadRequestException(`Pokemon exist in DB ${JSON.stringify(error.keyValue)}`);
    console.log(error);
    throw new InternalServerErrorException(`Can't create or update pokemon - check server logs`);
  }
}
