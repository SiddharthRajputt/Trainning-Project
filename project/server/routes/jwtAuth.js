const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//register

router.post("/register", validInfo, async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check if user exiists
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email
        ]);

        if (user.rows.length !== 0) {
            return res.status(401).send("user already exists")
        }

        //bcrypt the user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        // enter the new user inside databasse

        const newUser = await pool.query("INSERT INTO users(user_name,user_email,user_password) VALUES($1,$2,$3) RETURNING *", [name, email, bcryptPassword]);




        // generating our jwt token

        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({ token });


    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

//login route

router.post("/login", validInfo, async (req, res) => {
    try {
        //1. destructure the req.body
        const { email, password } = req.body;
        //2. check if user doesnt exist
        const user = await pool.query("SELECT * FROM users WHERE user_email=$1", [email
        ]);

        if (user.rows.length === 0) {
            return res.status(401).json("password or email is inccorrect");
        }
        //3. check if incoming password is same as the database password
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if (!validPassword) {
            return res.status(401).json("password or email is inccorrect")
        }

        //4. give them jwt token

        const token = jwtGenerator(user.rows[0].user_id);

        res.json(token);

    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.get("/is-verify", authorization, async (req, res) => {
    try {

        res.json(true);

    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

//getEmployee
router.get("/users", async (req, res) => {
    try {
        const query = await pool.query(`SELECT * FROM users`);
        res.json(query.rows)

    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

});


//getproducts

router.get("/products", async (req, res) => {
    try {
        const query = await pool.query(`SELECT * FROM products`);
        res.json(query.rows)

    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

});

//Addproducts

router.post("/products", async (req, res) => {
    try {
        const {pro_name, description, cat_id, is_active, created_by, created_at } = req.body;
        const query = await pool.query("INSERT INTO products(pro_name, description, cat_id, is_active, created_by, created_at) VALUES($1,$2,$3,$4,$5,$6) RETURNING *", [pro_name, description, cat_id, is_active, created_by, created_at]);
        res.json(query.rows)

    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

});

//deleteproducts
router.delete("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query(`DELETE from products where pro_id=$1`, [id]);
        res.json({ message: "Product deleted" })
    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server error");

    }
});

//updateproducts
router.put("/products/:pro_id", async (req, res) => {
    try {
        const { pro_id } = req.params;
        const { pro_name, description, cat_id, is_active, created_by, created_at } = req.body;
        const user = await pool.query("UPDATE products SET pro_name= $1, description= $2, cat_id=$3, is_active=$4, created_by = $5, created_at = $6 where pro_id=$7", [pro_name, description, cat_id, is_active, created_by, created_at, pro_id]);
        res.json({ message: "Product Updated" })
    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server error");

    }
});

// deleteEmployee
router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query(`delete from users where user_id=$1`, [id]);
        res.json({ message: "user Deleted" })
    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server error");

    }
});
// update employee
router.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { name, email, password } = req.body
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);
        const user = await pool.query("UPDATE users SET user_name=$1, user_email=$2, user_password=$3 where user_id=$4", [name, email, bcryptPassword, id]);
        res.json({ message: "user Updated" })
    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// category
router.get("/category", async (req, res) => {
    try {
        const query = await pool.query(`SELECT * FROM category`);
        res.json(query.rows)

    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

});

//Addcategory

router.post("/category", async (req, res) => {
    try {
        const { cat_name, created_by, created_at } = req.body;
        const query = await pool.query("INSERT INTO category(cat_name, created_by, created_at) VALUES($1,$2,$3)", [cat_name, created_by, created_at]);
        res.json(query.rows)

    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

});

//deletecategory
router.delete("/category/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const query = await pool.query(`DELETE from category where cat_id=$1`, [id]);
        res.json({ message: "category deleted" })
    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server error");

    }
});

//updatecategory
router.put("/category/:cat_id", async (req, res) => {
    try {
        const { cat_id } = req.params;
        const { cat_name, created_by, created_at } = req.body;
        const query = await pool.query("UPDATE category SET cat_name=$1, created_by=$2, created_at=$3 where cat_id=$4", [cat_name, created_by, created_at, cat_id]);
        res.json({ message: "category Updated" })
    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server error");

    }
});

module.exports = router;