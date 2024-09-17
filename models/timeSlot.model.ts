
import { DataTypes } from "sequelize";
import sequelize from "../service/db.service";

const TimeSlot = sequelize.define(
  "time_slot",
  {
    startTime: {
        type: DataTypes.TIME,
        allowNull: false,
        unique: true,
      },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

export default TimeSlot;
