const mongoose = require('mongoose');

const _ = require('lodash');

const { Schema } = mongoose;

const mongoSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  expiration: String,
});

class ItemClass {
  static publicFields() {
    return ['name', 'expiration'];
  }

  static async addNewItem({ name, expiration }) {
    const addNewItem = await this.create({
      name,
      expiration,
    });
    return _.pick(addNewItem, ItemClass.publicFields());
  }
}

mongoSchema.loadClass(ItemClass);

const Item = mongoose.model('Item', mongoSchema);

//const new_item = new Item({name: 'TEST4',
  //expiration: 'TEST5'})

/*async function addNewItem({name, expiration}) {
    const addNewItem = await this.create({
      name,
      expiration,
    });

    return addNewItem;
  }*/

//ItemClass.addNewItem('TEST5', 'TEST6');
/*function create_new_item (inputName, inputExpiration) {
   new_item = new Item({name: inputName, expiration: inputExpiration});
  new_item.save(function () {});
}*/

module.exports = Item;