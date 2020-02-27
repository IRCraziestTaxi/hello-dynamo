import { attribute, hashKey, rangeKey, table } from "@aws/dynamodb-data-mapper-annotations";
import { GSI_ARTPIECE_BY_ARTIST_LOOKUP, GSI_ARTREVIEW_BY_ARTPIECE_LOOKUP, GSI_ARTREVIEW_BY_CONNOISSEUR_LOOKUP } from "@domain/constants/index.constants";
import { IAccount, IArtist, IArtMedia, IArtPiece, IArtReview, IArtReviewHistory, IConnoisseur } from "@domain/interfaces";
import { TABLE_NAME_DATABASE_RECORDS } from "@domain/constants/entity.constants";

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
    public artistId: string;

    @attribute({
        indexKeyConfigurations: {
            [GSI_ARTREVIEW_BY_ARTPIECE_LOOKUP]: "HASH"
        }
    })
    public artpieceId: string;

    @attribute({
        indexKeyConfigurations: {
            [GSI_ARTREVIEW_BY_CONNOISSEUR_LOOKUP]: "HASH"
        }
    })
    public connoisseurId: string;

    /*
     * Account attributes.
     */

    @attribute()
    public username: string;

    /*
     * Artist and Connoisseur attributes.
     */

    @attribute()
    public nickname: string;

    @attribute()
    public started: Date;

    /*
     * Artmedia attributes.
     */

    @attribute()
    public name: string;

    /*
     * Artpiece attributes.
     */

    @attribute({
        indexKeyConfigurations: {
            [GSI_ARTPIECE_BY_ARTIST_LOOKUP]: "RANGE"
        }
    })
    public completed: Date;

    /*
     * Artreview attributes.
     */

    @attribute()
    public authored: Date;

    @attribute()
    public notes: string;

    @attribute({
        indexKeyConfigurations: {
            [GSI_ARTREVIEW_BY_ARTPIECE_LOOKUP]: "RANGE",
            [GSI_ARTREVIEW_BY_CONNOISSEUR_LOOKUP]: "RANGE"
        }
    })
    public rating: number;

    /*
     * Attributes shared by Artpiece and Artreview.
     */

    @attribute()
    public title: string;

    /*
     * Attributes shared by Artmedia and Artpiece.
     */

    @attribute()
    public description: string;
}
