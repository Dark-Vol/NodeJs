const { Student } = require('../models/models');

class StudentsController {
    static async getAll(req, resp) {
        const students = await Student.findAll();
        return resp.status(200).json(students);
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

    static async update(req, resp) {
        const { id, name, age } = req.body;
        const student = await Student.findByPk(id);
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
        const { id } = req.body;
        const student = await Student.findByPk(id);
        if (student) {
            await student.destroy();
            return resp.status(200).json({ message: "Student deleted" });
        } else {
            return resp.status(404).json({ message: "Student not found" });
        }
    }
}

module.exports = StudentsController;