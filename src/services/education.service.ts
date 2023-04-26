import { GroupsRepo } from "../repositories/groups.repo"
import { StudentRepo } from "../repositories/students.repo"
import { DepartmentRepo } from "../repositories/department.repo"

export interface IEducationMainService {
    insertStudent(payload: {
        firstname: string;
        lastname: string;
        birthday: string;
        gender: string;
        middlename?: string;
    }): Promise<void>

    getInfoStudents(idGroup: number): Promise<{
        name: string;
    }[]>

    getInfoGroup(idDepartment: number): Promise<{
        id: number;
        name: string;
    }[]>

    getInfoDep(idDepartment: number): Promise<{
        id: number;
        name: string;
    }>

    getGroupsReportData(idDepartment: number): Promise<{
        departament: {
            id: number;
            name: string;
        };
        groups: {
            group: {
                id: number;
                name: string;
            };
            students: {
                firstname: string;
                middlename: string;
                lastname: string;
            }[];
        }[];
    }>
} 

export class EducationMainService implements IEducationMainService {
    private studentRepo: StudentRepo
    private groupRepo: GroupsRepo
    private departmentRepo: DepartmentRepo

    constructor(studentRepoIn: StudentRepo, groupsRepoIn:GroupsRepo, departmentRepoIn: DepartmentRepo){
        this.studentRepo = studentRepoIn
        this.groupRepo = groupsRepoIn
        this.departmentRepo = departmentRepoIn
    }

    async insertStudent(payload: {firstname: string, lastname: string, birthday: string, gender: string, middlename?: string}){
        this.studentRepo.insertStudent(payload)
    }

    async getInfoStudents(idGroup: number) {
        const students = await this.studentRepo.getAllStudents()
        return students
    }

    async getInfoGroup(idDepartment: number) {
        const groups = await this.groupRepo.getGroupsDyDep(idDepartment)
        return groups
    }

    async getInfoDep(idDepartment: number) {
        const dep = await this.departmentRepo.getDepartment(idDepartment)
        return dep
    }

    async getGroupsReportData(idDepartment: number){
        // Dep info
        const departamentInfo = await this.departmentRepo.getDepartment(idDepartment)
        if (!departamentInfo) throw new Error("не найден департамент")
        const groups = await this.groupRepo.getGroupsDyDep(departamentInfo.id)
        const groupsRes: { 
            group:{
                id: number,
                name:string
            },
            students: {
                firstname: string,
                middlename: string,
                lastname: string
            }[]
        }[] = []
        for (let group of groups){
            const students = await this.studentRepo.getStudentsByGroup(group.id)
            groupsRes.push({
                "group": group,
                "students": students
            })
        }
        return {
            departament: departamentInfo,
            groups: groupsRes
        }
    }
}