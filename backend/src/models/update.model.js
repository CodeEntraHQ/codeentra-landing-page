// models/Update.js
import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Update = sequelize.define("Update", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "Update title",
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: "Update description/content",
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "announcement",
    comment: "Type: announcement, news, update, feature",
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: "is_active",
  },
}, {
  tableName: "Updates",
  schema: "codeentra",
});

// Hook to auto-generate ID like upd001, upd002...
Update.beforeCreate(async (update) => {
  const updates = await Update.findAll({ attributes: ["id"] });

  const numbers = updates
    .map((u) => parseInt(u.id?.replace("upd", "")))
    .filter((num) => !isNaN(num));

  const maxId = numbers.length ? Math.max(...numbers) : 0;
  const newId = `upd${String(maxId + 1).padStart(3, "0")}`;

  update.id = newId;
});

export default Update;
