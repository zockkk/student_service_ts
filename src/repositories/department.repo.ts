import { Knex } from "knex"

export class DepartmentRepo{

    private connection: Knex

    constructor(connectionInstance: Knex){
        this.connection = connectionInstance
    }

    async getDepartment(idDepartment: number) {
        const result: {
            id: number,
            name: string
        } = await this.connection('pers.Departments as dep')
            .select([
                'dep.id as id', 'dep.name_department as name'
            ])
            .where('dep.id', idDepartment)
            .first()
        return result
    }
}