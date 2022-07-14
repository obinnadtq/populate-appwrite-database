const sdk = require('node-appwrite');
const axios = require('axios');

const client = new sdk.Client();

client
    .setEndpoint('http://localhost/v1') // Your API Endpoint
    .setProject('62cfd79665a5474f17f8') // Your project ID
    .setKey('e1a71c0616404ff0a63e86d34dd913a812c37a0adef6e2407a43c115c526ed9c80d9187a4f2203a9dcd1d9292c733bf47304661fce47412765af0cd011472eb5a5f35a7d0a432b96db18c479a72ef1e8692bb361440ed8bf75c411507344e3311c750a3e4df65887f37b8a36fee4445a5bbfb641b14d4c50c98e0f592ad5f283')

const database = new sdk.Databases(client, '62cfdb9aac8ee3e726eb');

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
            await database.createDocument('62d0536ac6b5c5beee2f', 'unique()', {'comments': element});
        });
    }catch(e){
        console.log(e.message);
    }
    
}
     
populateDatabase();