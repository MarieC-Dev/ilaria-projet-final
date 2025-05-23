const db = require("../middlewares/db_connection");

exports.getAllUsers = async (req, res) => {
    //res.send('Hello World!');
    try {
        const [rows] = await db.query('SELECT * FROM User');
        console.log(rows);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong : ' + error });
    }
};

exports.createUser = async (req, res) => {
    let { imageName, imageData, username, email, password, created } = req.body;
    const queries = [imageName, imageData, username, email, password];
    created = Date.now();
    
    const querySql = 'INSERT INTO User (imageName, imageData, username, email, password) VALUES (?, ?, ?, ?, ?)';

    console.log(req.body);

    db.execute(querySql, queries, (err, result) => {
        if(err) {
            console.log('Error creating user');
            res.status(500).json({ msg: 'Error create user : ' + err });
        }

        return res.status(201).json(result);
    });
}