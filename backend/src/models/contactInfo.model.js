// models/ContactInfo.js
import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const ContactInfo = sequelize.define("ContactInfo", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  type: {
    type: DataTypes.ENUM('office', 'email', 'phone'),
    allowNull: false,
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.TEXT,
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
  tableName: "ContactInfo",
  schema: "codeentra",
  timestamps: true,
  createdAt: "createdAt",
  updatedAt: "updatedAt",
});

// Hook to auto-generate ID like cont001, cont002...
ContactInfo.beforeCreate(async (contactInfo) => {
  if (!contactInfo.id) {
    const contacts = await ContactInfo.findAll({ attributes: ["id"] });

    const numbers = contacts
      .map((c) => parseInt(c.id?.replace("cont", "")))
      .filter((num) => !isNaN(num));

    const maxId = numbers.length ? Math.max(...numbers) : 0;
    const newId = `cont${String(maxId + 1).padStart(3, "0")}`;

    contactInfo.id = newId;
  }
});

export default ContactInfo;
