const { Student } = require('../models/models');

class StudentsController {
    static async getAll(req, resp) {
        console.log(req.query)
        if (req.query.age) {
            const students = await Student.findAll({
                where: {
                    age: req.query.age
                }
            });
            return resp.status(200).json(students);
        } else {
            const students = await Student.findAll();
            return resp.status(200).json(students);
        }
    }

    static async getOne(reg, resp){
        const student = await Student.findByPk(reg.params.id);
        if(student){
            return resp.status(200).json(student);
        } else {
            return resp.status(404).json({ message: "Student not found" });
        }
        // return resp.status(200).json(student);
    }

    static async create(req, resp) {
        const student = await Student.create(
            {
                name: req.body.name,
                age: req.body.age
            }
        );
        return resp.status(201).json(student);
    }

    static async updateForKey(req, resp) {
        const { name, age } = req.body;
        const student = await Student.findByPk(req.params.id);
        if (student) {
            student.name = name;
            student.age = age;
            await student.save();
            return resp.status(200).json(student);
        } else {
            return resp.status(404).json({ message: "Student not found" });
        }
    }


    static async updateForQuery(req,resp) {
        const { name, age } = req.body;
        const student = await Student.findOne({
            where: {
                name: req.query.name
            }
        });
        if (student) {
            student.name = name;
            student.age = age;
            await student.save();
            return resp.status(200).json(student);
        } else {
            return resp.status(404).json({ message: "Student not found" });
        }
    }

    static async delete(req, resp) {
        const student = await Student.findByPk(req.params.id);
        if (student) {
            await student.destroy();
            return resp.status(200).json({ message: "Student deleted" });
        } else {
            return resp.status(404).json({ message: "Student not found" });
        }
    }
}

module.exports = StudentsController;