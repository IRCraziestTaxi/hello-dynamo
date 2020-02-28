import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

@Exclude()
export class AddAccountCommand {
    @Expose()
    @ApiProperty()
    @IsEmail()
    public email: string;

    @Expose()
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public username: string;
}
