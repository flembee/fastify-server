class RolesService {
    constructor(db) {
        this.db = db;
    }

    async search() {
        const roles = await this.db.Roles.findAll();

        if (!roles)
            return "No data"

        return roles;
    }

    async get(id) {
        const role = await this.db.Roles.findOne({
            where: {id},
        });

        if (!role)
            return "No data"

        return role;
    }

    async add(data) {
        const { name } = data

        const role = await this.db.Roles.create({name});

        if (!role)
            return "No data"

        return role;
    }

    async delete(ids) {
        const role = await this.db.Roles.destroy({
            where: {id: ids}
        });

        if (!role)
            return "No data"

        return role;
    }

    async update(id, data) {
        const { name } = data

        const role = await this.db.Roles.findOne({
            where: {id}
        });

        if (!role)
            return "No data"

        role.name = name;

        await role.save();

        return role.dataValues;
    }
}

export default RolesService;