const express = require("express");
const router = express.Router();
const Item = require('./models/Item.js');

//This route retrieves all the item objects from the items collection
router.get("/items", async (req, res) => {
    const items = await Item.find();
    res.send(items);
});

//This route saves an item object to the items collection
router.post("/items", async (req, res) => {
    console.log(req.body);
    const item = new Item({
        name: req.body.name,
        expiration: req.body.expiration,
        total: req.body.total,
    });
    await item.save();
    res.send(item);
});

//This changes an item object's value(s) and overwrites the old version of the item in the items collection
router.patch("/items/:id", async (req, res) => {
    try {
        const item = await Item.findOne({ _id: req.params.id });

        if (req.body.name) {
            item.name = req.body.name;
        }

        if (req.body.expiration) {
            item.expiration = req.body.expiration;
        }

        if (req.body.total) {
            item.total = req.body.total;
        }

        await item.save();
        res.send(item);
    } catch {
        res.status(404);
        res.send({ error: "Item doesn't exist!" });
    }
});

//This route deletes an item object from the items collection
router.delete("/items/:id", async (req, res) => {
    try {
        await Item.deleteOne({ _id: req.params.id });
        res.status(204).send();
    } catch {
        res.status(404);
        res.send({ error: "Item doesn't exist!" });
    }
});

module.exports = router;