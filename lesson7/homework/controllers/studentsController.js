class StudentsController {
    static async getAll(req, resp) {
        return resp.status(200).json({ message: "GET all students" });
    }

    static async create(req, resp) {
        console.log(req.body);
        return resp.status(201).json({ message: "Student created" });
    }

    static async update(req, resp) {
        console.log(req.body);
        return resp.status(200).json({ message: "Student updated" });
    }

    static async delete(req, resp) {
        return resp.status(200).json({ message: "Student deleted" });
    }
}

module.exports = StudentsController;
