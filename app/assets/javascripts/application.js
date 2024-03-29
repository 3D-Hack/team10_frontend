/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

async function callBackend(vrn1, vrn2) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  const response = await fetch(`https://kfqkh8lclf.execute-api.us-east-1.amazonaws.com/emissions/data?vrm=${vrn1}`, requestOptions)
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const formatted = await response.json();
  console.log(formatted);
  return formatted;
}

function displayValues(results) {
  for (const property in results.convertCo2) {
    console.log(`${property}: ${results.convertCo2[property]}`);
    for (let i = 0; i < results.convertCo2[property]; i++) {
      $('#tree-container').append(`
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

async function calculate() {
  $("#inForm").hide();
  try {
    const reg = $("#vehicle-reg1").val();
   // var results = {'co2': 104, 'make': 'VOLVO', 'colour': 'GREY', 'averageKilometersYear': 25653, 'convertCo2': {'trees': 26, 'avocado': 14, 'steaks': 6, 'cheese': 8}}
    var results = {"co2": 112, "make": "FORD", "colour": "BLACK", "averageKilometersYear": 10000, "convertCo2": {"trees": 112.0, "avocado": 5894.733, "steaks": 280.0, "cheese": 355.55}}
    if (!(reg.toString().toUpperCase() === 'DVLA')) {
      results = await callBackend($("#vehicle-reg1").val(), 'bob')
    }
    if(results.hasOwnProperty('make')){
      displayValues(results)
      $('#vrn').text(`${results.colour} ${results.make}`);
      $('#details').text(`Average KM per year: ${results.averageKilometersYear}`);
      $('#stats').text(`${results.text_string}`);
    } else {
      console.log('Invalid response')
    }
  } catch (err) {
    console.log(err);
    $('#vrn').text(`Ford Escort`);
    $('#result').text("You're killing the planet!");
    $('#background').css('background-color', 'burlywood');
  }

  $("#displayResult").show();
}
$(document).ready(function () {

  window.GOVUKFrontend.initAll()

  document.getElementById('calculate').onclick = async () => {
    await calculate()
  }
})



