const sdk = require('node-appwrite');
const axios = require('axios');

const client = new sdk.Client();

client
    .setEndpoint('http://localhost/v1') // Your API Endpoint
    .setProject('<project id>') // Your project ID
    .setKey('<api key>')

const database = new sdk.Databases(client, '<database id>');

async function getComments(){
    try{
        const response = await axios.get('https://dummyjson.com/comments?limit=340');
        return response.data.comments.map(x => x.body);
    }catch(e){
        console.log(e.message);
  }
};

async function populateDatabase(){
    try{
        const comments = await getComments();
        comments.forEach(async (element) => {
            await database.createDocument('<collection id>', 'unique()', {'comments': element});
        });
    }catch(e){
        console.log(e.message);
    }
    
}
     
populateDatabase();