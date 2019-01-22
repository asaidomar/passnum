'use strict';

// Declaration des valeurs constantes
const  NBPERSONS = 100000;
const  NBFILMS = 10000;
const  NBACTOR = 10000;
const  NBREAL = 10000;
const  NBAGENT = 1000;
const  NBCASTING = 10;
const  NBROLE = 100;
const  NBSPECIALITE = 10;
const  SALAIREMAX = 1000000;


function loop(start, end) {
    for (let i=start; i<end; i++){
        console.log(i);
    }

}

let loop2 = function(start, end){
    for (let i=start; i<end; i++){
        console.log(i);
    }
};

/**
 * joins all elements of tab by sep
 * @param {array} tab, array to be join
 * @param {string} sep, join element
 * @returns {string}, concatenated string
 */
function join(tab, sep){
    // console.log(tab.join(sep));
    return tab.join(sep);
}

function join3(tab, sep){
    let result = "";
    for (let i = 0; i < tab.length; i++) {
        if (i === tab.length - 1){
            result = result + tab[i]
        }else{
            result = result + tab[i] + sep
        }
        // result += tab[i] + sep
    }
    return result
}



/**
 * return a random int between start and end
 * @param start
 * @param end
 */
function randint(start, end){
    let r = Math.random();
    let t = r * (end - start) + start;
    return Math.floor(t)
}


/**
 * generate randomly a film
 * FILM (NUMF,TITRE, GENRE, ANNEE, DUREE, BUDGET, REALISATEUR, SALAIRE REAL)
 * NUMF {1..}
 * TITRE {"TITRE_<i>"}
 * GENRE {"GENRE_<i>"}
 * ANNEE {1930...2019}
 * DUREE {60..180}
 * BUDGET {100_000..100_000_000}
 * REALISATEUR {1..}
 * SALAIRE REAL {10_000...10_000_000}
 * Example:
 *        "1,TITRE_1,GENRE_1,1930,60,100000,1,10000"
 */
function generate_one_film(numf, realisateur){
    let N = 1000;
    let row_tab = [numf,
        "TITRE_" + randint(1, N),
        "GENRE_" + randint(1, N),
        randint(1930, 2019),
        randint(60, 180),
        randint(100000, 100000000),
        realisateur,
        randint(10000, 10000000)
    ];
    return join(row_tab, ",")
}

/**
 * call generate_one_film Nbfilm time with Nbrealisateur number of REALISATEUR
 * @param Nbfilms
 * @param Nbrealisateur
 */
function generate_films(Nbfilms, Nbrealisateur){
    console.log('-- liste des entrees de films');
    for (let i = 1; i < Nbfilms ; i++) {
        let i_real = randint(1, Nbrealisateur);
        let line = generate_one_film(i, i_real);
        console.log(line)
    }
    console.log("--EOF-FILM");
}

/**
 * NUMF{}
 * generate line like 1,1,ROLE_1,1000, one actor per film for role "ROLE_<i>".
 * @param numf, film id
 * @param numa, actor id
 */
function generate_one_casting(numf, numa) {
    let tab_casting = [
        numf,
        numa,
        "ROLE_" + randint(1, NBROLE),
        randint(1, SALAIREMAX)
    ];
    return join(tab_casting, ",")

}

/**
 * generate nb lines according to the param nbcasting
 * each line, will be generate by, generate_one_casting
 * @param numf, id of film
 * @param nbcasting, nb actor per film
 */
function generate_casting_per_film(numf, nbcasting){
    let result = [];
    for (let i = 0; i < nbcasting; i++) {
        let numa = randint(1, NBACTOR);
        result.push(generate_one_casting(numf, numa))
    }
    return join(result, "\n")

}

function generate_distribution(Nbfilms){
    for (let i = 0; i < Nbfilms; i++) {
        let nb_casting = randint(5, NBCASTING);
        let disrib_film = generate_casting_per_film(i, nb_casting);
        console.log(disrib_film);
    }
    console.log("--EOF-DISTRIBUTION");

}

/**
 * generate randomly a person
 * NUMP {1..}
 * PRENOM {"PRENOM_<i>_<j>"}
 * NOM {"NOM_<i>_<j>"}
 * DATENAIS {1930, 2015}
 * Example:
 *  1,prenom_1_2,nom_2_4,1955
 * @param nump
 */
function generate_personne(nump){
    let prenom = "PRENOM_" + randint(1, NBPERSONS) + "_" + randint(1, NBPERSONS);
    let nom = `NOM_${randint(1, NBPERSONS)}_${randint(1, NBPERSONS)}`;
    let datenais = randint(1930, 2015);
    let tab_p = [nump, prenom, nom, datenais];
    return join(tab_p, ",")

}

/**
 * return one line corresponding to one actor
 * @param numa,
 * @returns {string}
 */
function generate_one_actor(numa){
    let tab_a = [
        numa,
        randint(1, NBAGENT),
        "SPECIALITE_" + randint(1, NBSPECIALITE),
        randint(90, 220), // cm
        randint(40, 150), // kg
    ];
    return join(tab_a, ",")

}

/**
 * Calls Nbactors time generate_one_actor to print to the console the result.
 * @param Nbactors
 */
function generate_actors(Nbactors){
    for (let i = 0; i < Nbactors; i++) {
        let actor_line = generate_one_actor(i);
        console.log(actor_line);
    }
    console.log("--EOF-ACTORS");
}


/**
 * Calls Nbperson generate_personne
 */
function generate_personnes(Nbperson){
    for (let i = 0; i < Nbperson; i++) {
        let p_line = generate_personne(i);
        console.log(p_line);
    }
    console.log("--EOF-PERSONNES");
}



generate_films(10000, 100);
generate_personnes(NBPERSONS);
generate_actors(NBPERSONS);
generate_distribution(NBFILMS);