import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Testimonial = sequelize.define("Testimonial", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  quote: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 5,
    validate: {
      min: 1,
      max: 5,
    },
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
  tableName: "Testimonials",
  schema: "codeentra",
  indexes: [
    { fields: ['is_active'], name: 'idx_testimonials_is_active' },
    { fields: ['order_index'], name: 'idx_testimonials_order_index' }
  ]
});

// Hook to auto-generate ID like tst001, tst002...
Testimonial.beforeCreate(async (testimonial) => {
  // Only generate ID if not already provided
  if (testimonial.id) {
    return;
  }

  const testimonials = await Testimonial.findAll({ attributes: ["id"] });

  const numbers = testimonials
    .map((t) => parseInt(t.id?.replace("tst", "")))
    .filter((num) => !isNaN(num));

  const maxId = numbers.length ? Math.max(...numbers) : 0;
  const newId = `tst${String(maxId + 1).padStart(3, "0")}`;

  testimonial.id = newId;
});

export default Testimonial;
