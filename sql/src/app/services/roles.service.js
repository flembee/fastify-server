class RolesService {
    constructor(db) {
        this.db = db;
    }

    async search() {
        const roles = await this.db.Role.findAll();

        if (!roles)
            return "No data"

        return roles;
    }

    async get(id) {
        const role = await this.db.Role.findOne({
            where: {id},
        });

        if (!role)
            return "No data"

        return role;
    }

    async add(data) {
        const { name } = data

        const role = await this.db.Role.create({name});

        if (!role)
            return "No data"

        return role;
    }

    async delete(id) {
        const role = await this.db.Role.findOne({
            where: {id}
        });

        if (!role)
            return "No data"

        await role.destroy();

        return role;
    }

    async update(id, data) {
        const { name } = data

        const role = await this.db.Role.findOne({
            where: {id}
        });

        if (!role)
            return "No data"

        const roleUpdated = {
            ...role, 
            name: name,
        };

        await roleUpdated.save();

        return roleUpdated;
    }
}

export default RolesService;