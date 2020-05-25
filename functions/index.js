const functions = require('firebase-functions');
const stripe = require('stripe')('sk_test_Zq9esukDHuFGiCNgFgbseeI600MAmmCi6o');
const cors = require('cors')({origin: true});
const admin = require('firebase-admin');

admin.initializeApp();

exports.CheckoutSession = functions.https.onRequest((request, response) => {

  cors(request, response, async() => {

    let myProducts = request.query.products;
    myProducts = Object.entries(JSON.parse(myProducts));

    const productsArray = [];

    myProducts.forEach(item => {
      const p = admin.firestore().doc(`products/${item[0]}`).get();

      productsArray.push(p);
    });

    const all = await Promise.all(productsArray);

    const results = [];

    all.forEach(item => {
      const data = {};
      data.amount = parseFloat(item.data().price * 100);
      data.currency = "aud";
      data.description = item.data().description;
      data.name = item.data().name;

      myProducts.forEach(q => {
        if (item.id === q[0]) {
          data.quantity = q[1];
        }
      })

      results.push(data);
    })

    stripe.checkout.sessions.create(
      {
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
        payment_method_types: ['card'],
        line_items: results,
      },
      function(err, session) {
        response.send(session);
      }
    );
  });

});