const { mainConnection } = require("../databaseConnection");

export class DepartamentRepo{

    constructor(connectionInstance){
        this.connection = connectionInstance
    }

    getDepartament = (idDepartment) => {
        return this.connection('pers.Departments as dep')
        .select([
            'dep.id as id', 'dep.name_department as name'
        ])
        .where('dep.id', idDepartment)
        .first()
    }
}