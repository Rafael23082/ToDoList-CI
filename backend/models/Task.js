module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("Task", {
        taskName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        isCompleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Task;
}