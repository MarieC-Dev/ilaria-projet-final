const express = require("express");
const db = require("../middlewares/db_connection");

exports.getAllTags = async (req, res) => {
    try {
        const [tagsRows] = await db.query('SELECT * FROM TagList');
        res.status(200).json(tagsRows);
    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong : ' + error });
    }
};