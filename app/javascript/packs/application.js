// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)
let fsAccount;
let fsProduct;

window.popupWebhookReceived = function(fsData) {
  fsAccount = fsData.account
  fsProduct = fsData.items[0].product
  
  let fsOrderId = fsData.id

  
  const fetchPromise = fetch(`/api/v1/charges/${fsOrderId}`, {
    method: 'POST'
  });
  fetchPromise.then(response => {
    console.log(response);
  });
};


window.popupClose = function(fsData) {
  if (fsProduct == "fastspring-premium-free") {
    window.location.href = `/${fsAccount}`;
  } else if (fsProduct == "fastspring-premium-free-trial") {
    window.location.href = `/trial/${fsAccount}`;
  } else {
    window.location.reload();
  }
};


window.fsAccountRedirect = function() {
  fetch(`/api/v1/accounts/${gon.account}`, {
    method: 'GET'
  })
  .then(response =>
    response.json()
  )
  .then(body =>
    window.open(`${body.url}#/subscriptions`, '_blank')
  )
};


window.fsSecure = function(email, first, last) {
  let fsPayload = {
    "contact": {
      "email": email,
      "firstName": first,
      "lastName": last
    },
    "items": [
      {
        "product": "fastspring-premium-standard",
        "quantity": 1
      }
    ]
  }

  fastspring.builder.secure(fsPayload);
  fastspring.builder.checkout();
};