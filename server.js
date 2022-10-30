var express = require('express');
var app = express();
app.use(express.static('assets'))

const port = process.env.PORT || 5000;

app.listen(port,);
app.set('view engine', 'ejs');

var fs = require("firebase-admin");
let serviceAccount;
if (process.env.GOOGLE_CREDENTIALS != null) {
    serviceAccount = JSON.parse(process.env.GOOGLE_CREDENTIALS)
    
}
else {
    serviceAccount = require("./music-instruments-3fc5b-firebase-adminsdk-op690-73de824ac8.json");
}
fs.initializeApp({
    credential: fs.credential.cert(serviceAccount)
});

const db = fs.firestore();
const ingColl = db.collection('items');

app.get('/', async function (req, res) {
    const items = await ingColl.get();
    let data = {
        url: req.url,
        itemData: items.docs,
    }
    res.render('index', data);
});

app.get('/item/:itemid', async function (req, res) {
    try {
        console.log(req.params.itemid);

    } catch (e) {
    }
    const item_id = req.params.itemid;
    const item_ref = ingColl.doc(item_id);
    const doc = await item_ref.get();
    if (!doc.exists) {
        console.log('No such document!');
    } else {
        console.log('Document data:', doc.data());
    }
    // const items = await ingColl.get();
    let data = {
        url: req.url,
        itemData: doc.data(),
    }
    res.render('item', data);
});

app.get('/back', async function (req, res) {
    const items = await ingColl.get();
    let data = {
        url: req.url,
        itemData: items.docs,
    }
    res.render('index', data);
});