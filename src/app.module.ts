import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AccountModule } from "./modules/account/account.module";
import { ArtMediaModule } from "./modules/art-media/art-media.module";
import { ArtPieceModule } from "./modules/art-piece/art-piece.module";
import { ArtReviewHistoryModule } from "./modules/art-review-history/art-review-history.module";
import { ArtReviewModule } from "./modules/art-review/art-review.module";
import { ArtistModule } from "./modules/artist/artist.module";
import { ConnoisseurModule } from "./modules/connoisseur/connoisseur.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        // hello-dynamo modules.
        AccountModule,
        ArtMediaModule,
        ArtPieceModule,
        ArtReviewModule,
        ArtReviewHistoryModule,
        ArtistModule,
        ConnoisseurModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
