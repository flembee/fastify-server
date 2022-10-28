import { Model } from 'sequelize';

const UserSchema = (sequelize, DataTypes) => {

  class User extends Model {
    static associate({Roles}) {
      this.hasMany(Roles, {foreignKey: 'userId',  as: 'roles' })
    }
  };

  User.init({
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
    modelName: 'User',
  });

  return User;
};

export default UserSchema;