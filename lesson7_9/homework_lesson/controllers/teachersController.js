const { Teacher } = require('../models/models');

class TeachersController {
    static async getAll(req, resp) {
        const teachers = await Teacher.findAll();
        return resp.status(200).json(teachers);
    }

    static async create(req, resp) {
        const teacher = await Teacher.create({
            name: req.body.name,
            subject: req.body.subject
        });
        return resp.status(201).json(teacher);
    }

    static async update(req, resp) {
        const { id, name, subject } = req.body;
        const teacher = await Teacher.findByPk(id);
        if (teacher) {
            teacher.name = name;
            teacher.subject = subject;
            await teacher.save();
            return resp.status(200).json(teacher);
        } else {
            return resp.status(404).json({ message: "Teacher not found" });
        }
    }

    static async delete(req, resp) {
        const { id } = req.body;
        const teacher = await Teacher.findByPk(id);
        if (teacher) {
            await teacher.destroy();
            return resp.status(200).json({ message: "Teacher deleted" });
        } else {
            return resp.status(404).json({ message: "Teacher not found" });
        }
    }
}

module.exports = TeachersController;
