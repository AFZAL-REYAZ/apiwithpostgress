const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sequelize = require("./db.js");
const User = require("./model/User.js");
const Address=require("./model/Address.js")
const Demographics=require("./model/Demographics.js")
const Role=require("./model/Role.js")
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");

const port = 3000;
app.use(bodyParser.json());

sequelize.sync();
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

Role.hasMany(User);
User.belongsTo(Role);

Address.hasOne(User);
User.belongsTo(Address);

app.post("/register", async (req, res) => {
  try {
    const { name, email, password, state, country,RoleId,AddressId} = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      state,
      country,
      RoleId,
      AddressId
    });
    res.json(newUser);

   
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({
      // order:[["id","DESC"]],


       // where: {
      //   name: {
      //     [Sequelize.Op.like]: "P%", // Users whose name starts with 'A'
      //   },
      // },



      // where: {
      //   id: {
      //     [Sequelize.Op.and]: [
      //       { [Sequelize.Op.gt]: 2 }, // Greater than 2
      //       { [Sequelize.Op.lt]: 4 }, // Less than 4
      //     ],
      //   },
      // },

      where: {
        [Sequelize.Op.or]: [
          {
            name: {
              [Sequelize.Op.like]: "P%", // Users whose name starts with 'P'
            },
          },
          {
            [Sequelize.Op.and]: [
              { id: { [Sequelize.Op.gt]: 1 } }, // Greater than 2
              { id: { [Sequelize.Op.lt]: 4 } }, // Less than 4
            ],
          },
        ],
      },


      include: [
        {
          model: Role,
          attributes: ["frontend", "backend"],
        },
        {
          model: Address,
          attributes: ["village", "district"],
        },
      ],
    }); // Assuming you've set up the association correctly

    if (!users || users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});



app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: user.id }, "your_secret_key", {
      expiresIn: "1h", // You can adjust the expiration time as needed
    });
    res.json({ token });
  } catch (err) {
    console.log(err, "error during login");
    return res.status(500).json({ err: "internal server error" });
  }
});

app.post("/address",async(req,res)=>{
  try{
    const {street_no, village, district, state, country}=req.body;

    const newAdress=await Address.create({
      street_no,
      village,
      district,
      state,
      country,
    });
    res.json(newAdress);
  }catch(err){
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

app.post("/demographics",async(req,res)=>{
  try{
    const {heigher_education, gender, religion, blodgroup}=req.body;

    const newDemographics=await Demographics.create({
      heigher_education,
      gender,
      religion,
      blodgroup,
    });
    res.json(newDemographics);
  }catch(err){
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

app.post("/role",async(req,res)=>{
  try{
    const {frontend, backend, fullstack, java}=req.body;

    const newRole=await Role.create({
      frontend,
      backend,
      fullstack,
      java,
    });
    res.json(newRole);
  }catch(err){
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});


