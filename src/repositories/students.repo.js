const { mainConnection } = require("../databaseConnection");


export class StudentRepo {

    constructor(connectionInstance){
        this.connection = connectionInstance
    }

    getAllStudents = async () => {
        return this.connection('education.students as student')
        .select([
            'student.firstname'
        ])
    }

    insertStudent = async (firstname, lastname, birthday, gender, middlename) => {
        return this.connection.insert({firstname, lastname, birthday, gender, middlename})
        .into('education.students')
    }

    getStudentsByGroup = async (idGroup) => {
        return mainConnection('education.students as student')
        .select([
            'student.firstname',
            'student.middlename',
            'student.lastname'
        ])
        .where('student.id', idGroup)
    }
}