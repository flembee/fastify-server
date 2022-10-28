class RolesService {
    constructor(db) {
        this.db = db;
    }

    async search() {
        this.db.query("SELECT * FROM roles", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });
    }

    async get(id) {
        this.db.query("SELECT * FROM roles", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });
    }

    async add(data) {
        this.db.query("SELECT * FROM roles", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });
    }

    async delete(nodeData) {
        this.db.query("SELECT * FROM roles", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });
    }

    async update(id, data) {
        this.db.query("SELECT * FROM roles", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });
    }
}

export default RolesService;