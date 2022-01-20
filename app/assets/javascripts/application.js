/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

function callBackend(vrn1, vrn2) {
  var toReturn = {};
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
   var raw = JSON.stringify({
  "registrationNumber": vrn1
  });
  var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
  };
  // fetch("https://uat.driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles", requestOptions)
  // .then(response => response.json())
  // .then(data => console.log(data))
  // .catch(error => console.log('error', error));
  
//  .then(response => response.json()
  // const res = await fetch('https://kfqkh8lclf.execute-api.us-east-1.amazonaws.com/emissions', requestOptions);
  // .then(response => response.json())
  // .then(data => {
  //   console.log(data); // JSON data parsed by `data.json()` call
  //   if(data.hasOwnProperty('errorMessage')){
  //     console.log('eeee');
  //     toReturn = {'co2': 104, 'make': 'VOLVO', 'colour': 'GREY', 'averageKilometersYear': 25653, 'convertCo2': {'trees': 26, 'avocado': 14, 'steaks': 6, 'cheese': 8}}
  //   }
  // })
  // .catch(error => console.log('error', error));

  toReturn = {'co2': 104, 'make': 'VOLVO', 'colour': 'GREY', 'averageKilometersYear': 25653, 'convertCo2': {'trees': 26, 'avocado': 14, 'steaks': 6, 'cheese': 8}}
  return toReturn;
}

function displayValues(results) {
  for (const property in results.convertCo2) {
    console.log(`${property}: ${results.convertCo2[property]}`);
    for (let i = 0; i < results.convertCo2[property]; i++) {
      $('#tree-container').prepend(`
    <img
      src="/public/images/${property}.png"
      alt="Tree"
      width="70"
      height="70"
      class="tree"
    />
    `);
    }
  }
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()

  if (document.URL.includes('display')) {
    const params = (new URL(document.location)).searchParams;
    const vrn = params.get('vehicle-reg1');
    const green = true;

    const trees = 30;
    const results = callBackend(vrn, 'bob')
    displayValues(results)
    if (green) {
      $('#vrn').text(`${results.colour} ${results.make}`);
      $('#details').text(`Average KM per year: ${results.averageKilometersYear}`);
    } else {
      $('#vrn').text(`${vrn}`);
      $('#result').text("You're killing the planet!");
      $('#background').css('background-color', 'burlywood');
    }

    // var myHeaders = new Headers();
    // myHeaders.append("x-api-key", "SpFtsuKeqN5BvHtPWzmvn4p03yHJadKV2Ihpn8Uq");
    // myHeaders.append("Content-Type", "application/json");
    // var raw = JSON.stringify({
    //   "registrationNumber": vrn
    // });
    // var requestOptions = {
    //   method: 'POST',
    //   // mode: 'no-cors',
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: 'follow'
    // };
    // fetch("https://uat.driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));
  }

})



