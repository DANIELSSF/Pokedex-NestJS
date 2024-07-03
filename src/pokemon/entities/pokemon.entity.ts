import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Pokemon extends Document {

    //id string: mongo lo crea

    @Prop({
        unique: true,
        index: true,
    })
    name: string;

    @Prop({
        unique: true,
        index: true,
    })
    no: number;

    @Prop({
        unique: true,
        index: true,
    })
    url:string;

    @Prop({ default: true })
    isActive: boolean;

}


export const PokemonSchema = SchemaFactory.createForClass(Pokemon);