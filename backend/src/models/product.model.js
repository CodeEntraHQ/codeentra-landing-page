import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING(500),
    allowNull: false,
    validate: {
      isUrl: true,
    },
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Sparkles",
  },
  features: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: [],
    comment: "Array of feature strings",
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
  tableName: "Products",
  schema: "codeentra",
  indexes: [
    { fields: ['is_active'], name: 'idx_products_is_active' },
    { fields: ['order_index'], name: 'idx_products_order_index' }
  ]
});

// Hook to auto-generate ID like prod001, prod002...
Product.beforeCreate(async (product) => {
  // Only generate ID if not already provided
  if (product.id) {
    return;
  }

  const products = await Product.findAll({ attributes: ["id"] });

  const numbers = products
    .map((p) => parseInt(p.id?.replace("prod", "")))
    .filter((num) => !isNaN(num));

  const maxId = numbers.length ? Math.max(...numbers) : 0;
  const newId = `prod${String(maxId + 1).padStart(3, "0")}`;

  product.id = newId;
});

export default Product;
