class TeachersController {
    static async getAll(req, resp) {
        return resp.status(200).json({ message: "GET all teachers" });
    }

    static async create(req, resp) {
        console.log(req.body);
        return resp.status(201).json({ message: "Teacher created" });
    }
    static async update(req, resp) {
        console.log(req.body);
        return resp.status(200).json({ message: "Teacher updated" });
    }

    static async delete(req, resp) {
        return resp.status(200).json({ message: "Teacher deleted" });
    }
}

module.exports = TeachersController;
