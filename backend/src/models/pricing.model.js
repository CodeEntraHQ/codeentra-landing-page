// models/Pricing.js
import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Pricing = sequelize.define("Pricing", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "Duration in months (1, 2, 3, 4, 5, 6)",
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: "Price in INR",
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: "is_active",
  },
}, {
  tableName: "Pricings",
  schema: "codeentra",
  indexes: [
    {
      unique: true,
      fields: ['duration'],
      name: 'unique_duration'
    }
  ]
});

// Hook to auto-generate ID like prc001, prc002...
Pricing.beforeCreate(async (pricing) => {
  const pricings = await Pricing.findAll({ attributes: ["id"] });

  const numbers = pricings
    .map((p) => parseInt(p.id?.replace("prc", "")))
    .filter((num) => !isNaN(num));

  const maxId = numbers.length ? Math.max(...numbers) : 0;
  const newId = `prc${String(maxId + 1).padStart(3, "0")}`;

  pricing.id = newId;
});

export default Pricing;
