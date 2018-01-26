require('dotenv').config()
const crypto = require(`crypto`)
const { MongoClient } = require('mongodb');

const url = process.env.DB_URL;

exports.sourceNodes = async ({ boundActionCreators }) => {
  const { createNode } = boundActionCreators;

  console.log('connecting to db');
  const client = await MongoClient.connect(url);
  console.log('connected to db');
  const db = client.db('brewmap');

  const breweriesDB = db.collection('Brewery');
  let breweries = await breweriesDB.find().toArray();

  breweries = breweries.map((brewery) =>{
    const id = brewery._id.toString()
    brewery.id = id;
    delete brewery._id;
    return brewery;
  });

  boundActionCreators.createNode({
    breweries, 
    id: 'breweries',
    parent: null,
    children: [],
    internal: {
      type: `mongo`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(breweries))
        .digest(`hex`),
    }
  });

  // breweries.forEach((brewery) =>{
  //   const id = brewery._id.toString()
  //   delete brewery._id

  //   const node = {
  //     // Data for the node.
  //     ...brewery,
  //     id: `${id}`,
  //     parent: `__Brewery__`,
  //     children: [],
  //     internal: {
  //       type: `mongodbBrewmapBrewery`,
  //       content: JSON.stringify(brewery),
  //       contentDigest: crypto
  //         .createHash(`md5`)
  //         .update(JSON.stringify(brewery))
  //         .digest(`hex`),
  //     },
  //   }

  //   boundActionCreators.createNode(node);
  // });

  // We're done, return.
  return;
};
