// /*!
//     * Start Bootstrap - SB Admin v7.0.5 (https://startbootstrap.com/template/sb-admin)
//     * Copyright 2013-2022 Start Bootstrap
//     * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
//     */
//     // 
// // Scripts
// // 

// window.addEventListener('DOMContentLoaded', event => {

//     // Toggle the side navigation
//     const sidebarToggle = document.body.querySelector('#sidebarToggle');
//     if (sidebarToggle) {
//         // Uncomment Below to persist sidebar toggle between refreshes
//         // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
//         //     document.body.classList.toggle('sb-sidenav-toggled');
//         // }
//         sidebarToggle.addEventListener('click', event => {
//             event.preventDefault();
//             document.body.classList.toggle('sb-sidenav-toggled');
//             localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
//         });
//     }

// });

// window.addEventListener('DOMContentLoaded', event => {

//   // Toggle the side navigation
//   const sidebarToggle = document.body.querySelector('#sidebarToggle');
//   if (sidebarToggle) {
//       // Uncomment Below to persist sidebar toggle between refreshes
//       // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
//       //     document.body.classList.toggle('sb-sidenav-toggled');
//       // }
//       sidebarToggle.addEventListener('click', event => {
//           event.preventDefault();
//           document.body.classList.toggle('sb-sidenav-toggled');
//           localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
//       });
//   }

// });

function senderForm() {
var form = false;
var length = document.forms.length;
let user = {
  "blog": "maryCargoExpress",
  "trackingId": "5e40d4d2-4081-4607-b8d5-02018287e45a",
  "senderType": "sender"
}
for(var i = 0; i < length; i++) {
  if(document.forms[i].id === "senderForm") {
    form = document.forms[i];
  }
}
for (let index = 0; index < form.length; index++) {
  const element = form[index];
  if(element.id === 'firstName' && element.value !== '') {
    user['firstName'] = element.value.trim();
  } else if(element.id === 'lastName' && element.value !== '') {
    user['lastName'] = element.value.trim();
  } else if(element.id === 'phoneNumber' && element.value !== '') {
    user['phoneNumber'] = element.value.trim();
  } else if(element.id === 'email') {
    user['email'] = element.value.trim();
  } else if(element.id === 'address1') {
    user['address1'] = element.value.trim();
  } else if(element.id === 'address2') {
    user['address2'] = element.value.trim();
  } else if(element.id === 'country' && element.value !== '') {
    user['country'] = element.value.trim();
  } else if(element.id === 'state') {
    user['state'] = element.value.trim();
  } else if(element.id === 'zipCode') {
    user['zipCode'] = element.value.trim();
  }
}
return user;
}

function receiverForm() {
var form = false;
var length = document.forms.length;
let user = {
  "blog": "maryCargoExpress",
  "trackingId": "5e40d4d2-4081-4607-b8d5-02018287e45a",
  "clientType": "receiver"
}
for(var i = 0; i < length; i++) {
  if(document.forms[i].id === "receiverForm") {
    form = document.forms[i];
  }
}
for (let index = 0; index < form.length; index++) {
  const element = form[index];
  if(element.id === 'firstName' && element.value !== '') {
    user['firstName'] = element.value.trim();
  } else if(element.id === 'lastName' && element.value !== '') {
    user['lastName'] = element.value.trim();
  } else if(element.id === 'phoneNumber' && element.value !== '') {
    user['phoneNumber'] = element.value.trim();
  } else if(element.id === 'email') {
    user['email'] = element.value.trim();
  } else if(element.id === 'address1') {
    user['address1'] = element.value.trim();
  } else if(element.id === 'address2') {
    user['address2'] = element.value.trim();
  } else if(element.id === 'country' && element.value !== '') {
    user['country'] = element.value.trim();
  } else if(element.id === 'state') {
    user['state'] = element.value.trim();
  } else if(element.id === 'zipCode') {
    user['zipCode'] = element.value.trim();
  }
}
return user;
}


function registrationFormData() {
postData('/api/CreateSubscriber', senderForm()).then((data)=>{
  let receiverObj = receiverForm();
  receiverObj.senderRowKey = data.RowKey
  postData('/api/CreateSubscriber', receiverObj).then((yy)=>{
    document.getElementById("receiverForm").reset();
    document.getElementById("senderForm").reset();
    window.location = '/tables.html';  
  });
});
}

// Example POST method implementation:
async function postData(url, data) {
// Default options are marked with *
const response = await fetch(url, {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json'
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  redirect: 'follow', // manual, *follow, error
  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  body: JSON.stringify(data) // body data type must match "Content-Type" header
});
return response.json(); // parses JSON response into native JavaScript objects
}

async function getUsers() {
 // Default options are marked with *
 const response = await fetch('/api/GetSubscribers/maryCargoExpress');
 const results = await response.json();
 let arrayTableResults = []; 
 let myTable = document.getElementById('datatablesSimple');
 let dataTable = new simpleDatatables.DataTable(myTable);

  for (let index = 0; index < results.value.length; index++) {
    const client = results.value[index];
    let tempObj = {}

    tempObj['Name'] = `${client.firstName} ${client.lastName}`;
    tempObj['Phone Number'] = `${client.phoneNumber}`;
    tempObj['Date'] = `${client.Timestamp}`;
    tempObj['Address'] = `${client.address1}`;
    
    arrayTableResults.push(tempObj);
  }

  dataTable.insert(arrayTableResults)
}
getUsers();