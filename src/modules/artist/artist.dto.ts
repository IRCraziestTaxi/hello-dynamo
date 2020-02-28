import { DatabaseRecord } from "@domain/entities";
import { MapFrom, MapProp } from "ts-simple-automapper";

export class ArtistDto {
    @MapProp()
    public nickname: string;

    // We get the artist's primaryId from the account partition's secondaryId representing the profile.
    @MapFrom(() => DatabaseRecord, {
        mapFrom: r => r.secondaryId
    })
    public primaryId: string;

    @MapProp()
    public started: Date;
}
