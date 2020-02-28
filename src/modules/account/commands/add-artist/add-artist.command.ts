import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

@Exclude()
export class AddArtistCommand {
    @Expose()
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public nickname: string;

    // Set this property in the controller.
    public primaryId: string;
}
