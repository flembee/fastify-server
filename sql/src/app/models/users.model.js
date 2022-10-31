import { Model } from 'sequelize';

const UserSchema = (sequelize, DataTypes) => {

  class Users extends Model {
    static associate({Roles}) {
      this.hasOne(Roles, {foreignKey: 'role',  as: 'roles' })
    }
  };

  Users.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name:{
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {msg: "Name is required"},
        notEmpty: {msg: "Name cannot be empty"},
      }
    },
    role: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    email:{
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail: {msg: "It must be a valid Email  address"},
      }
    },
  },
  {
    sequelize,
    tableName: 'users',
    modelName: 'Users',
  });

  return Users;
};

export default UserSchema;