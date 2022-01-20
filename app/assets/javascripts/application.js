/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()

  if (document.URL.includes('display')) {
    const params = (new URL(document.location)).searchParams;
    const vrn = params.get('vehicle-registration');
    const green = true;

    const trees = 30;

    if (green) {
      $('#vrn').text(`${vrn}`);
      for (let i = 0; i < trees; i++) {
        $('#tree-container').prepend(`
      <img
        src="/public/images/tree.png"
        alt="Tree"
        width="70"
        height="70"
        class="tree"
      />
      `);
      }
    } else {
      $('#vrn').text(`${vrn}`);
      $('#result').text("You're killing the planet!");
      $('#background').css('background-color', 'burlywood');
      for (let i = 0; i < trees; i++) {
        $('#tree-container').prepend(`
      <img
        src="/public/images/forest-fire.png"
        alt="Tree"
        width="70"
        height="70"
        class="tree"
      />
      `);
      }
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



