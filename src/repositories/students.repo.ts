import { Knex } from "knex";

export class StudentRepo {
    private connection: Knex

    constructor(connectionInstance: Knex){
        this.connection = connectionInstance
    }

    async getAllStudents() {
        const result: {
            name: string
        }[] = await this.connection('education.students as student')
        .select([
            'student.firstname as name'
        ])
        return result
    }

    async insertStudent(payload: {firstname: string, lastname: string, birthday: string, gender: string, middlename?: string}) {
        return this.connection.insert(payload)
        .into('education.students')
    }

    async getStudentsByGroup(idGroup: number) {
        const result: {
            firstname: string,
            middlename: string,
            lastname: string
        }[] = await this.connection('education.students as student')
            .select([
                'student.firstname',
                'student.middlename',
                'student.lastname'
            ])
            .where('student.id', idGroup)
        return result
    }
}