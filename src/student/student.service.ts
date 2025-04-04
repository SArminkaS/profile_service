import { Injectable } from '@nestjs/common';
import { Student } from 'src/models/student.model';

@Injectable()
export class StudentService {
    async getAll(currentPage:number, perPage:number)
    {
        return await Student.findAll({offset:(currentPage - 1)*perPage,limit:perPage})
    }
    async addOne(student: {id1:any,name:string,email:string})
    {
        return await Student.create(student)
    }
    async updateOne(id:any, fields: {name:string,email:string})
    {
        return await Student.update(fields,{where:{id1:id}})
    }

    async deleteOne(id:any)
    {
        return await Student.destroy({where:{id1:id}})
    }
}
