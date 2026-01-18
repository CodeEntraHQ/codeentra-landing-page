import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const FAQ = sequelize.define("FAQ", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "general", // e.g., 'services', 'internship', 'general', 'company'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: "is_active",
  },
}, {
  tableName: "FAQs",
  schema: "codeentra",
  indexes: [
    {
      fields: ['category'],
      name: 'idx_faqs_category'
    },
    {
      fields: ['is_active'],
      name: 'idx_faqs_is_active'
    },
    {
      fields: ['createdAt'],
      name: 'idx_faqs_created_at'
    }
  ]
});

// Hook to auto-generate ID like faq001, faq002...
FAQ.beforeCreate(async (faq) => {
  const faqs = await FAQ.findAll({ attributes: ["id"] });

  const numbers = faqs
    .map((f) => parseInt(f.id?.replace("faq", "")))
    .filter((num) => !isNaN(num));

  const maxId = numbers.length ? Math.max(...numbers) : 0;
  const newId = `faq${String(maxId + 1).padStart(3, "0")}`;

  faq.id = newId;
});

export default FAQ;
