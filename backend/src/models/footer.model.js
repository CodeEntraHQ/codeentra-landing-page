// models/Footer.js
import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Footer = sequelize.define("Footer", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  section: {
    type: DataTypes.ENUM('company', 'services', 'companyLinks', 'social', 'copyright'),
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  url: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  icon: {
    type: DataTypes.STRING(50),
    allowNull: true,
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
  tableName: "Footer",
  schema: "codeentra",
  timestamps: true,
  createdAt: "createdAt",
  updatedAt: "updatedAt",
});

// Hook to auto-generate ID like foot001, foot002...
Footer.beforeCreate(async (footer) => {
  if (!footer.id) {
    const footers = await Footer.findAll({ attributes: ["id"] });

    const numbers = footers
      .map((f) => parseInt(f.id?.replace("foot", "")))
      .filter((num) => !isNaN(num));

    const maxId = numbers.length ? Math.max(...numbers) : 0;
    const newId = `foot${String(maxId + 1).padStart(3, "0")}`;

    footer.id = newId;
  }
});

export default Footer;
