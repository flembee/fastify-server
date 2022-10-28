class UsersService {
    constructor(db) {
        this.db = db;
    }

    async search() {
        const users = await this.db.User.findAll({include:'roles'});

        if (!users)
            return "No data"

        return users;
    }

    async get(id) {
        const user = await this.db.User.findOne({
            where: {id},
            include:'roles'
        });

        if (!user)
            return "No data"

        return user;
    }

    async getByEmail(email) {
        const user = await this.db.User.findOne({
            where: {email},
            include:'roles'
        });

        if (!user)
            return "No data"

        return user;
    }
    
    async add(data) {
        const { name, email, role } = data

        const user = await this.db.User.create({name, email, role});

        if (!user)
            return "No data"

        return user;
    }

    async delete(id) {
        const user = await this.db.User.findOne({
            where: {id}
        });

        if (!user)
            return "No data"

        await user.destroy();

        return user;
    }

    async update(id, data) {
        const { name, email, role } = data

        const user = await this.db.User.findOne({
            where: {id}
        });

        if (!user)
            return "No data"

        const userUpdated = {
            ...user, 
            name: name,
            email: email,
            role: role,
        };

        await userUpdated.save();

        return userUpdated;
    }
}

export default UsersService;
