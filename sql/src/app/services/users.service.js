class UsersService {
    constructor(db) {
        this.db = db;
    }

    async search() {
        const users = await this.db.Users.findAll({include:'roles'});

        if (!users)
            return "No data"

        return users;
    }

    async get(id) {
        const user = await this.db.Users.findOne({
            where: {id},
            include:'roles'
        });

        if (!user)
            return "No data"

        return user;
    }

    async getByEmail(email) {
        const user = await this.db.Users.findOne({
            where: {email},
            include:'roles'
        });

        if (!user)
            return "No data"

        return user;
    }
    
    async add(data) {
        const { name, email, role, password } = data

        const user = await this.db.Users.create({name, email, role, password});

        if (!user)
            return "No data"

        return user;
    }

    async delete(ids) {
        const user = await this.db.Users.destroy({
            where: {id: ids}
        });

        if (!user)
            return "No data"

        return user;
    }

    async update(id, data) {
        const { name, email, role } = data

        const user = await this.db.Users.findOne({
            where: {id}
        });

        if (!user)
            return "No data"

        user.name = name;
        user.email = email;
        user.role = role;

        await user.save();

        return user;
    }

    async updatePassword(id, password) {

        const user = await this.db.Users.findOne({
            where: {id}
        });

        if (!user)
            return "No data"

        user.password = password;

        await user.save();

        return user;
    }
}

export default UsersService;
