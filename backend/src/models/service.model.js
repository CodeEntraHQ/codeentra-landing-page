import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Service = sequelize.define("Service", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fullDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: "full_description",
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "code",
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: "is_active",
  },
  orderIndex: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: "order_index",
  },
}, {
  tableName: "Services",
  schema: "codeentra",
  indexes: [
    { fields: ['is_active'], name: 'idx_services_is_active' },
    { fields: ['order_index'], name: 'idx_services_order_index' }
  ]
});

// Hook to auto-generate ID like srv001, srv002...
Service.beforeCreate(async (service) => {
  // Only generate ID if not already provided
  if (service.id) {
    return;
  }

  const services = await Service.findAll({ attributes: ["id"] });

  const numbers = services
    .map((s) => parseInt(s.id?.replace("srv", "")))
    .filter((num) => !isNaN(num));

  const maxId = numbers.length ? Math.max(...numbers) : 0;
  const newId = `srv${String(maxId + 1).padStart(3, "0")}`;

  service.id = newId;
});

export default Service;
