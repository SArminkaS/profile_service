import { Controller, Get } from '@nestjs/common';

@Controller('student')
export class StudentController {
    @Get('list')
    list()
    {
        return []
    }
}
