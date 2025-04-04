import { Injectable } from '@nestjs/common';
import { Student } from 'src/models/student.model';

@Injectable()
export class StudentService {
    async getAll(currentPage:number, perPage:number)
    {
        return await Student.findAndCountAll({offset:(currentPage - 1)*perPage,limit:perPage})
    }
    async addOne(student: Student)
    {
        return await student.save()
    }
    async updateOne(data)
    {
        const id = data.id1
        delete data.id1
        return await Student.update(data,{where:{id1:id}})
    }

    async deleteOne(id)
    {
        return await Student.destroy({where:{id1:id}})
    }
}
