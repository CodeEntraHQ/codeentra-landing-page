import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const ConversationFlow = sequelize.define("ConversationFlow", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  options: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: [],
    comment: "Array of objects: [{option: text, answer: text, nextQuestionId: id or null}]",
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: "is_active",
  },
  isInitial: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: "is_initial",
  },
  orderIndex: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: "order_index",
  },
}, {
  tableName: "ConversationFlow",
  schema: "codeentra",
  indexes: [
    {
      fields: ['is_active'],
      name: 'idx_conversation_is_active'
    },
    {
      fields: ['is_initial'],
      name: 'idx_conversation_is_initial'
    },
    {
      fields: ['order_index'],
      name: 'idx_conversation_order'
    }
  ]
});

// Hook to auto-generate ID like conv001, conv002...
ConversationFlow.beforeCreate(async (conversation) => {
  const conversations = await ConversationFlow.findAll({ attributes: ["id"] });

  const numbers = conversations
    .map((c) => parseInt(c.id?.replace("conv", "")))
    .filter((num) => !isNaN(num));

  const maxId = numbers.length ? Math.max(...numbers) : 0;
  const newId = `conv${String(maxId + 1).padStart(3, "0")}`;

  conversation.id = newId;
});

export default ConversationFlow;
