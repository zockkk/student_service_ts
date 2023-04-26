import { Knex } from "knex"

export class GroupsRepo{
    private connection: Knex

    constructor(connectionInstance: Knex){
        this.connection = connectionInstance
    }

    async getGroupsDyDep(idDepartment: number) {
        const result: {
            id: number,
            name:string
        }[] = await this.connection('education.study_groups as group')
            .select([
                'group.id as id',
                'group.nickname as name'
            ]).where('group.id_faculty', idDepartment)
        return result
    }
}