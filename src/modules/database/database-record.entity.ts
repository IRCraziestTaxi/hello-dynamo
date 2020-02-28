import { attribute, hashKey, rangeKey, table } from "@aws/dynamodb-data-mapper-annotations";
import { TABLE_NAME_DATABASE_RECORDS } from "@domain/constants/entity.constants";
import { GSI_ARTPIECE_BY_ARTIST_LOOKUP, GSI_ARTREVIEW_BY_ARTPIECE_LOOKUP, GSI_ARTREVIEW_BY_CONNOISSEUR_LOOKUP } from "@domain/constants/index.constants";
import { IAccount, IArtist, IArtMedia, IArtPiece, IArtReview, IArtReviewHistory, IConnoisseur } from "@domain/interfaces";
import { MapFrom, MapProp } from "ts-simple-automapper";
import { AddAccountCommand } from "../account/commands/add-account/add-account.command";
import { AddArtistCommand } from "../account/commands/add-artist/add-artist.command";

/**
 * Uses the single table pattern.
 */
@table(TABLE_NAME_DATABASE_RECORDS)
export class DatabaseRecord implements
    IAccount,
    IArtist,
    IArtMedia,
    IArtPiece,
    IArtReview,
    IArtReviewHistory,
    IConnoisseur {
    /*
     * Primary keys.
     */

    @hashKey()
    @MapFrom(() => AddAccountCommand, {
        mapFrom: c => c.email
    })
    @MapFrom(() => AddArtistCommand)
    public primaryId: string;

    @rangeKey()
    public secondaryId: string;

    /*
     * GSI keys.
     */

    @attribute({
        indexKeyConfigurations: {
            [GSI_ARTPIECE_BY_ARTIST_LOOKUP]: "HASH"
        }
    })
    @MapProp()
    public artistId: string;

    @attribute({
        indexKeyConfigurations: {
            [GSI_ARTREVIEW_BY_ARTPIECE_LOOKUP]: "HASH"
        }
    })
    @MapProp()
    public artpieceId: string;

    @attribute({
        indexKeyConfigurations: {
            [GSI_ARTREVIEW_BY_CONNOISSEUR_LOOKUP]: "HASH"
        }
    })
    @MapProp()
    public connoisseurId: string;

    /*
     * Account attributes.
     */

    @attribute()
    @MapProp()
    public username: string;

    /*
     * Artist and Connoisseur attributes.
     */

    @attribute()
    @MapProp()
    public nickname: string;

    @attribute()
    @MapProp()
    public started: Date;

    /*
     * Artmedia attributes.
     */

    @attribute()
    @MapProp()
    public name: string;

    /*
     * Artpiece attributes.
     */

    @attribute({
        indexKeyConfigurations: {
            [GSI_ARTPIECE_BY_ARTIST_LOOKUP]: "RANGE"
        }
    })
    @MapProp()
    public completed: Date;

    /*
     * Artreview attributes.
     */

    @attribute()
    @MapProp()
    public authored: Date;

    @attribute()
    @MapProp()
    public notes: string;

    @attribute({
        indexKeyConfigurations: {
            [GSI_ARTREVIEW_BY_ARTPIECE_LOOKUP]: "RANGE",
            [GSI_ARTREVIEW_BY_CONNOISSEUR_LOOKUP]: "RANGE"
        }
    })
    @MapProp()
    public rating: number;

    /*
     * Attributes shared by Artpiece and Artreview.
     */

    @attribute()
    @MapProp()
    public title: string;

    /*
     * Attributes shared by Artmedia and Artpiece.
     */

    @attribute()
    @MapProp()
    public description: string;
}
