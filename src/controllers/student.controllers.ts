import { Request, Response } from "express"
import { IEducationMainService } from "../services/education.service"

export class EducationController {
    private educationService: IEducationMainService

    constructor(
        educationServiceIN: IEducationMainService
    ) {
        this.educationService = educationServiceIN
    }

    async getAllStudents(req: Request, res: Response){
        const idGroup = <string> req.query.idGroup
        if (!idGroup){
            res.status(400).json({
                error: "Не указан идентификатор департамента"
            })
            return
        }
        const pIdGroup = parseInt(idGroup)
        const students = await this.educationService.getInfoStudents(pIdGroup)
        res.json({students})
    }

    async getAllInfo(req: Request, res: Response){
        const idDepartment = <string> req.query.idDepartment
        if (!idDepartment){
            res.status(400).json({
                error: "Не указан идентификатор департамента"
            })
            return
        }
        const pIdDepartment = parseInt(idDepartment)
        const reportData = await this.educationService.getGroupsReportData(pIdDepartment)
        res.json(reportData)
    }

    async insertStudents(req: Request, res: Response){
        const data:{
            firstname:string,
            lastname: string,
            middlename?: string,
            birthday: string,
            gender:string
        } = req.body
        if (!data){
            res.status(400).json({
                error: "Нет тела запроса"
            })
            return
        }
        if (!data.firstname && typeof data.firstname !== "string"){
            res.status(400).json({
                error: "Не верно указано имя"
            })
            return
        }
        if (!data.lastname && typeof data.lastname !== "string"){
            res.status(400).json({
                error: "Не верно указана фамилия"
            })
            return
        }
        if (!data.birthday && typeof data.birthday !== "string"){
            res.status(400).json({
                error: "Не верно указана дата рождения"
            })
            return
        }
        if (!data.gender && typeof data.gender !== "string"){
            res.status(400).json({
                error: "Не верно указан пол"
            })
            return
        }

        try {
            await this.educationService.insertStudent(data)
            res.status(200).end()
        } catch(error){
            res.status(500).json({
                error: "Произошла ошибка: " + error
            })
        }
    }
}