import { IsEmail, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';


export class UpdateStudentDto {
    @IsUUID(4,{message:'Nem megfelelő UUID4 formátum!'})
    @IsNotEmpty({message:'Egy azonosítót meg kell adnod!'})
    id: string

    @IsOptional()
    name: string;

    @IsEmail({},{message:'Nem megfelelő email formátum!'})
    @IsOptional()
    email: string;
}