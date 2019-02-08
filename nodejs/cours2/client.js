const http = require("http");
const N = 10;


for (let i = 0; i < N; i++) {
    let url = `http://localhost:8080/user/signup?nom=test_nom_${i}&prenom=test_prenom_${i}&email=test@test.com_${i}&mdp=test_mdp_${i}&tel=06767987_${i}`
    console.log(url);
    http.get(url, (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        console.log(data);
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });

}

