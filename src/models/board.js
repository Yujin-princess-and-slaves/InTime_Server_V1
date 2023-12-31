module.exports = (sequelize, DataTypes) => {
    const Board = sequelize.define(
        "board",
        {
            boardId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING(2500),
                allowNull: false,
            },
            date: {
                type: DataTypes.STRING,
            },
        },
        {
            tableName: "board",
            timestamps: false,
        }
    );

    return Board;
};
