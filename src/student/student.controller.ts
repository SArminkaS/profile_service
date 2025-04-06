import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from 'src/models/student.model';
import { AddStudentDto } from './dto_classes/add_student.dto';
import { UpdateStudentDto } from './dto_classes/update_student.dto';

@Controller('student')
export class StudentController {
    constructor(private studentService: StudentService){}
    @Get('list')
    async list(@Query('currentPage') currentPage = 1, @Query('perPage') perPage = 10)
    {
        const data = await this.studentService.getAll(currentPage,perPage)
        return {
            data:data.rows,
            numberOfPages:Math.ceil(data.count / perPage),
            currentPage:currentPage,
            perPage:perPage
        }
    }
    @Post('addOne')
    async addOneStudent(@Body() student: AddStudentDto)
    {
        const new_student = Student.build()
        new_student.email = student.email
        new_student.name = student.name
        student = await this.studentService.addOne(new_student)
        return {message:'Sucesfully added student with id ' + new_student.id1,
            data:new_student
        }
    }
    @Put('updateOne')
    async updateOneStudent(@Body() data:UpdateStudentDto)
    {
        const id = data.id1
        const updated = await this.studentService.updateOne(data)
        if(updated[0] > 0)
        return {
            message:'Successfully updated student with id '+ id,
            data:updated}
        else if (updated[0] == 0)
        {
            throw new HttpException('Cannot find student with id '+id, HttpStatus.NOT_FOUND)
        }
    }
    @Delete('deleteOne/:id')
    async deleteOne(@Param('id') id: string)
    {
        const deleted = await this.studentService.deleteOne(id)
        if(deleted > 0)
        {
            return {
                message:'Sucessfully deleted student with id',
                data:id
            }
        }
        else if(deleted == 0)
        {
            throw new HttpException('Cannot find student with id '+id, HttpStatus.NOT_FOUND)
        }
    }
}
