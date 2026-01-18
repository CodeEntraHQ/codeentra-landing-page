// models/Admin.js
import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";
import bcrypt from "bcrypt";

const Admin = sequelize.define("Admin", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profilePhoto: {
    type: DataTypes.STRING(500),
    allowNull: true,
    field: "profilePhoto", // Explicitly set field name to match database
  },
}, {
  tableName: "Admin",
  schema: "codeentra",
  timestamps: true,
  createdAt: "createdAt",
  updatedAt: "updatedAt",
});

// Hook to auto-generate ID like admin001, admin002...
Admin.beforeCreate(async (admin) => {
  if (!admin.id) {
    const admins = await Admin.findAll({ attributes: ["id"] });

    const numbers = admins
      .map((a) => parseInt(a.id?.replace("admin", "")))
      .filter((num) => !isNaN(num));

    const maxId = numbers.length ? Math.max(...numbers) : 0;
    const newId = `admin${String(maxId + 1).padStart(3, "0")}`;

    admin.id = newId;
  }

  // Hash password before saving
  if (admin.changed('password')) {
    const saltRounds = 10;
    admin.password = await bcrypt.hash(admin.password, saltRounds);
  }
});

// Hook to hash password before update
Admin.beforeUpdate(async (admin) => {
  if (admin.changed('password')) {
    const saltRounds = 10;
    admin.password = await bcrypt.hash(admin.password, saltRounds);
  }
});

export default Admin;
