// models/Notification.js
import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Notification = sequelize.define("Notification", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "internship or contact",
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  referenceId: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "reference_id",
    comment: "ID of the internship or contact record",
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: "is_read",
  },
}, {
  tableName: "Notifications",
  schema: "codeentra",
});

// Hook to auto-generate ID like not001, not002...
Notification.beforeCreate(async (notification) => {
  const notifications = await Notification.findAll({ attributes: ["id"] });

  const numbers = notifications
    .map((n) => parseInt(n.id?.replace("not", "")))
    .filter((num) => !isNaN(num));

  const maxId = numbers.length ? Math.max(...numbers) : 0;
  const newId = `not${String(maxId + 1).padStart(3, "0")}`;

  notification.id = newId;
});

export default Notification;
