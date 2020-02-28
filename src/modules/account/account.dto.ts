import { ArtistDto, ConnoisseurDto } from "@domain/DTOs";
import { MapProp } from "ts-simple-automapper";

export class AccountDto {
    public artist: ArtistDto;

    public connoisseur: ConnoisseurDto;

    @MapProp()
    public primaryId: string;

    @MapProp()
    public username: string;
}
