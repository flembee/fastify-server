import utils from '../utils/index.js';

const { customQuery, hashPassword } = utils;

const UsersController = (fastify) => {
    const { auth, usersService, rolesService } = fastify;
    return {
        get: async (req, res) => {
            const result = await usersService.get(req.params.id);
            res.send(result);
        },
        search: async (req, res) => {
            const query = customQuery(req.query);
            const result = await usersService.search(query);
            res.send(result);
        },
        add: async (req, res) => {
            const hashed = await hashPassword(req.body.password);
            const role = await rolesService.search(customQuery({name: 'User'}));

            if(!role[0].id)
                return "";

            const result = await usersService.add({ ...req.body, role: role[0].id, password: hashed });

            res.send(result);
        },
        update: async (req, res) => {
            await usersService.update(req.params.id, req.body);

            const query = customQuery(req.query);
            const result = await usersService.search(query);

            res.send(result);
        },
        updatePassword: async (req, res) => {
            const { oldPassword, newPassword } = req.body;

            const user = await usersService.get(req.params.id);

            if (!user)
                res.send("No data");

            const passwordIsMatch = await auth.onVerifyPassword(
                oldPassword,
                user.dataValues.password
            );

            if (!passwordIsMatch) 
                res.send("Password not match");

            const passwordHashed = await hashPassword(newPassword);

            const result = await usersService.updatePassword(req.params.id, passwordHashed);

            res.send(result);
        },
        delete: async (req, res) => {
            await usersService.delete(req.body);

            const query = customQuery(req.query);
            const result = await usersService.search(query);

            res.send({ result, message: 'Deleted roles successfully' });
        },
    };
};

export default UsersController;
