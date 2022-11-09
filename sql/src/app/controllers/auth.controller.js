import Boom from '@hapi/boom';
import utils from '../utils/index.js';

const { hashPassword } = utils;

const AuthController = fastify => {
  const { auth, usersService, rolesService } = fastify;
  
  return {
    signIn: async (req, res) => {
      const { email, password } = req.body;

      const user = await usersService.getByEmail(email);

      if(user.dataValues){
        const passwordIsMatch = await auth.onVerifyPassword(
          password,
          user.dataValues.password
        );

        if (!passwordIsMatch) 
          return "Password does not match";
  
        const token = await auth.generateToken(user.dataValues);
  
        res.send({ success: true, token: `Bearer ${token}` });

      }else{
        res.send({ success: false, message: 'User does not exist' });
      }
    },

    signUp: async (req, res) => {
      const { email, password, userRole } = req.body;

      const user = await usersService.getByEmail(email);

      if(!user.dataValues){
        const hashed = await hashPassword(password);

        const role = await rolesService.getByKey({name: userRole});

        if(!role.dataValues)
            return "No roles";

        const userCreated = await usersService.add({ ...req.body, role: role.dataValues.id, password: hashed });

        if(!userCreated.dataValues)
            return "User cannot created";

        const token = await auth.generateToken(userCreated.dataValues);

        res.send({ success: true, token: `Bearer ${token}` });

      }else{
        res.send({ success: false, message: 'Email already exists' });
      }
      
    },
    update: async (req, res) => {
      const result = await usersService.update(req.params.id, req.body);
      res.send(result);
  },
  };
};

export default AuthController;
