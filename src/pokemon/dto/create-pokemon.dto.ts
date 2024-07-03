import {
    IsBoolean,
    IsInt,
    IsOptional,
    IsPositive,
    IsString,
    IsUrl,
    Min,
    MinLength,
} from 'class-validator';

export class CreatePokemonDto {

    @IsString()
    @MinLength(2)
    name: string;

    @IsInt()
    @IsPositive()
    @Min(1)
    no: number;

    @IsString()
    @IsUrl()
    url:string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
