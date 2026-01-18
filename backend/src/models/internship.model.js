// models/Internship.js
import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Internship = sequelize.define("Internship", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "full_name",
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  college: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  course: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "Duration in months (1-6)",
  },
  skills: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resume: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true,
    },
  },
  coverLetter: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: "cover_letter",
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: "Price paid for the selected duration",
  },
}, {
  tableName: "Internships",
  schema: "codeentra",
});

// Hook to auto-generate ID like int001, int002...
Internship.beforeCreate(async (internship) => {
  const internships = await Internship.findAll({ attributes: ["id"] });

  const numbers = internships
    .map((int) => parseInt(int.id?.replace("int", "")))
    .filter((num) => !isNaN(num));

  const maxId = numbers.length ? Math.max(...numbers) : 0;
  const newId = `int${String(maxId + 1).padStart(3, "0")}`;

  internship.id = newId;
});

export default Internship;
