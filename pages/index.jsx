import Head from 'next/head';

// This import pertains to google cloud login api
import withAuth from '../lib/withAuth';

import React, { useState } from 'react';
import Item from '../server/models/Item';

// eslint-disable-next-line react/prefer-stateless-function
function Index() {
  const Item = require('../server/models/Item');
  const [itemName, setItemName] = useState('');
  const [expireDate, setExpireDate] = useState('');

  const mongoose = require('mongoose');
  const { Schema } = mongoose;

  const mongoSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    expiration: String,
  });

  //const MONGO_URL = process.env.MONGO_URL;

  function addItem(newItemName, newExpireDate) {
    const Item = mongoose.model('Item', mongoSchema);
    
    const new_item = new Item({name: newItemName,expiration: newExpireDate});

    new_item.save(function () {});
  }

  return (
    <div>
      <Head>
        <title>Major Domo</title>
        <meta
          name="description"
          content="This is an inventory app that can be used for managing a pantry."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 style={{ fontSize: '90px', fontWeight: '700' }}>Major Domo</h1>
      <line-style>
        <main
          style={{
            border: 'solid',
            textAlign: 'center',
            margin: 'auto',
            fontSize: '44px',
            fontWeight: '400',
          }}
        >
         {
            <>
              <h3>Input an Item</h3>
              <input
                type="text"
                style={{ fontSize: '30px' }}
                placeholder="*Item Title*"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <input
                type="text"
                style={{ fontSize: '30px' }}
                placeholder="*Expiration Date*"
                value={expireDate}
                onChange={(e) => setExpireDate(e.target.value)}
              />
              <button
                type="button"
                style={{ fontSize: '30px' }}
                onClick={() => {
                  addItem(itemName, expireDate);
                }}
              >
                Submit
              </button>
            </>
          }
        </main>
      </line-style>
    </div>
  );
}

export default withAuth(Index);
