module.exports = (sequelize, DataTypes) => {
  const StaffMember = sequelize.define('StaffMember', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  }, {
    freezeTableName: true,
  });
  StaffMember.associate = (models) => { // eslint-disable-line no-unused-vars
    StaffMember.hasMany(models.Client, {
      foreignKey: 'caseManagerId',
      as: 'clients',
    });
    StaffMember.belongsToMany(models.Role, {
      through: 'StaffMemberRole',
      foreignKey: 'staffMemberId',
      otherKey: 'roleId',
    });
  };

  return StaffMember;
};
