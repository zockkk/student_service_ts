const studentRepo = require("../repositories/students.repo")
const groupsRepo = require("../repositories/groups.repo")
const departamentRepo = require("../repositories/departament.repo")

export class EducationMainService {

    constructor(studentRepoIn, groupsRepoIn, departamentRepoIn){
        this.studentRepo = studentRepoIn
        this.groupsRepo = groupsRepoIn
        this.departamentRepo = departamentRepoIn
    }

    async getInfoStudents(idGroup) {
        const students = await this.studentRepo.getInfoStudents(idGroup)
        return students
    }

    async getInfoGroup(idDepartment) {
        const groups = await groupRepo.getGroupsByDep(idDepartment)
        return groups
    }

    async getInfoDep() {
        const dep = await departamentRepo.getDepartament()
        return dep
    }

    async getGroupsReportData(idDepartment){
        // Dep info
        const departamentInfo = await departamentRepo.getDepartament(idDepartment)
        const groups = await groupRepo.getGroupsByDep(departamentInfo.id)
        const groupsRes = []
        for (let group of groups){
            const students = await studentRepo.getStudentsByGroup(group.id)
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