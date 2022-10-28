import { Model } from 'sequelize';

const RolesSchema = (sequelize, DataTypes) => {

  class Roles extends Model {
    static associate({User}) {
      this.belongsTo(User, {foreignKey: 'userId', as: 'users' })
    }
  };

  Roles.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
  },{
    sequelize,
    tableName: 'roles',
    modelName: 'Roles',
  });

  return Roles;
};

export default RolesSchema;