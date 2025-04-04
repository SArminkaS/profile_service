import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from 'src/models/student.model';

@Controller('student')
export class StudentController {
    constructor(private studentService: StudentService){}
    @Get('list')
    async list(@Query('currentPage') currentPage: number, @Query('perPage') perPage: number)
    {
        const data = await this.studentService.getAll(currentPage,perPage)
        return {
            data:data.rows,
            numberOfPages:data.count,
            currentPage:currentPage,
            perPage:perPage
        }
    }
    @Post('addOne')
    async addOneStudent(@Body() student)
    {
        student = await this.studentService.addOne(Student.build(student))
        return {message:'Sucesfully added student with id ' + student.id1,
            data:student
        }
    }
    @Put('updateOne')
    async updateOneStudent(@Body() data)
    {
        return {
            message:'Successfully updated student with id '+ data.id1,
            data:await this.studentService.updateOne(data)}
    }
    @Delete('deleteOne/:id1')
    async deleteOne(@Param() param)
    {
        const deleted = await this.studentService.deleteOne(param.id1)
        if(deleted > 0)
        {
            return {
                message:'Sucessfully deleted student with id',
                data:param.id1
            }
        }
        else if(deleted == 0)
        {
            throw new HttpException('Cannot find student with id '+param.id1, HttpStatus.NOT_FOUND)
        }
    }
}
