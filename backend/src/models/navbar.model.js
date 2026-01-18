// models/Navbar.js
import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Navbar = sequelize.define("Navbar", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  orderIndex: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: "orderIndex",
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: "isActive",
  },
}, {
  tableName: "Navbar",
  schema: "codeentra",
  timestamps: true,
  createdAt: "createdAt",
  updatedAt: "updatedAt",
});

// Hook to auto-generate ID like nav001, nav002...
Navbar.beforeCreate(async (navbar) => {
  if (!navbar.id) {
    const navbars = await Navbar.findAll({ attributes: ["id"] });

    const numbers = navbars
      .map((n) => parseInt(n.id?.replace("nav", "")))
      .filter((num) => !isNaN(num));

    const maxId = numbers.length ? Math.max(...numbers) : 0;
    const newId = `nav${String(maxId + 1).padStart(3, "0")}`;

    navbar.id = newId;
  }
});

export default Navbar;
