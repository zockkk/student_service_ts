const { mainConnection } = require("../databaseConnection");

export class GroupsRepo{

    constructor(connectionInstance){
        this.connection = connectionInstance
    }

    getGroupsDyDep = async (idDepartament) => {
        return this.connection('education.study_groups as group')
        .select([
            'group.id as id',
            'group.nickname'
        ]).where('group.id_faculty', idDepartment)
    }
}