import { IsEmail, IsNotEmpty } from 'class-validator';


export class AddStudentDto {
    @IsNotEmpty({message:'Adj meg egy nevet!'})
    name: string;

    @IsEmail({},{message:'Az email nem megfelelő formátumú!'})
    @IsNotEmpty({message:'Adj meg egy emailt!'})
    email: string;
}