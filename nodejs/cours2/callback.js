function caller(param1, param2, callback) {
    callback(param1, param2)
}

function display(param1, param2){
    console.log(param1);
    console.log(param2);
}

/*
caller("param1_value", "param2_Value", display);

caller("param1_Value", "param2_value", function (toto, tata) {
    console.log(toto);
    console.log(tata);

});*/


caller(1000, 2000, function (v1, v2) {
    let v3 = v1 + v2;
    console.log(v3)
});