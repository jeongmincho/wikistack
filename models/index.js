const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false
});

const Page = db.define("pages", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM("open", "closed"),
    validate: {
      isIn: [["open", "closed"]]
    }
  }
});

const User = db.define("users", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

const slugGenerator = title => {
  // const slug = title.replace(/ /g, "_");
  // return slug;
  return title.replace(/\s+/g, "_").replace(/\W/g, "");
};

Page.beforeValidate(pageInstance => {
  // console.log("im setting the slug");
  pageInstance.slug = slugGenerator(pageInstance.title);
});

Page.belongsTo(User, { as: "author" });
User.hasMany(Page);

module.exports = {
  db,
  Page,
  User
};
