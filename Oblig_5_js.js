
var navnEl = document.querySelector("#navn");
var epostEl = document.querySelector("#epost");

var reisestedEl = document.querySelector("#reisested");

var antall_voksneEl = document.querySelector("#antall_voksne");
var antall_barnEl = document.querySelector("#antall_barn");

var forsikring_jaEl = document.querySelector("#forsikring_ja");
var forsikring_neiEl = document.querySelector("#forsikring_nei");

var knappEl = document.querySelector("#knapp");

var feil_svarEl = document.querySelectorAll("p");

var svarEl = document.querySelector("#svar");


var reisepriser = [
    {
        sted: "New York",
        pris_voksne: 2000,
        pris_barn: 1500,
    },
    {
        sted: "Ankara",
        pris_voksne: 1600,
        pris_barn: 1200,
    },
    {
        sted: "Tokyo",
        pris_voksne: 6000,
        pris_barn: 4000,
    },
    {
        sted: "London",
        pris_voksne: 3000,
        pris_barn: 2100,
    },
    {
        sted: "Kairo",
        pris_voksne: 2600,
        pris_barn: 1800,
    }
];


var bokstaver = /^[a-zA-Z][a-zA-Z\s]*$/;
var gyldig_epostadresse = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


knappEl.addEventListener("click", test_bestilling); 


function test_bestilling () {

    navnEl.classList.remove("feil");


    var check = [];
    var har_feil;

    failtest(check);

    for(i = 0; i < check.length; i++) {
        if(check[i] == "fail") {
            har_feil = true;
        }
    }

    if(har_feil != true) {  
        bestill();
    }

}

function bestill() {

    var reisested;

    var voksen_pris;
    var barne_pris;
    var forsikring_pris;

    var TOTpris;

    for(i = 0; i < reisepriser.length; i++) {

        if(reisestedEl.value == reisepriser[i].sted) {
            reisested = reisepriser[i].sted;

            voksen_pris = reisepriser[i].pris_voksne;
            barne_pris = reisepriser[i].pris_barn;
        } 
        
    }

    if(forsikring_jaEl.checked) {
        forsikring_pris = 300;
    } else {
        forsikring_pris = 0;
    }

    TOTpris = (voksen_pris*antall_voksneEl.value) + (barne_pris*antall_barnEl.value) + forsikring_pris;

    if(((forsikring_jaEl.checked) && (antall_voksneEl.value > 1)) || ((forsikring_jaEl.checked) && (antall_voksneEl.value == 0))) {
        svarEl.innerHTML = "Du har nå bestilt tur til " + reisested + " for " + antall_voksneEl.value + " voksne og " + antall_barnEl.value + " barn. Turen står i navnet til " + navnEl.value + " og bestillingen blir sendt til " + epostEl.value + ". Med reiseforsikring blir den totale prisen på " + TOTpris + "kr";

    } else if ((forsikring_jaEl.checked) && (antall_voksneEl.value == 1)) {
        svarEl.innerHTML = "Du har nå bestilt tur til " + reisested + " for " + antall_voksneEl.value + " voksen og " + antall_barnEl.value + " barn. Turen står i navnet til " + navnEl.value + " og bestillingen blir sendt til " + epostEl.value + ". Med reiseforsikring blir den totale prisen på " + TOTpris + "kr";

    } else if ((!forsikring_jaEl.checked) && (antall_voksneEl.value == 1)) {
        svarEl.innerHTML = "Du har nå bestilt tur til " + reisested + " for " + antall_voksneEl.value + " voksen og " + antall_barnEl.value + " barn. Turen står i navnet til " + navnEl.value + " og bestillingen blir sendt til " + epostEl.value + ". Uten reiseforsikring blir den totale prisen på " + TOTpris + "kr";

    } else if (((!forsikring_jaEl.checked) && (antall_voksneEl.value > 1)) || ((!forsikring_jaEl.checked) && (antall_voksneEl.value == 0))) {
        svarEl.innerHTML = "Du har nå bestilt tur til " + reisested + " for " + antall_voksneEl.value + " voksne og " + antall_barnEl.value + " barn. Turen står i navnet til " + navnEl.value + " og bestillingen blir sendt til " + epostEl.value + ". Uten reiseforsikring blir den totale prisen på " + TOTpris + "kr";
    }

}

function failtest(check) {

    feil_svarEl[0].innerHTML = "";
    navnEl.classList.remove("feil");

    feil_svarEl[1].innerHTML = "";
    epostEl.classList.remove("feil");
    
    feil_svarEl[2].innerHTML = "";
    reisestedEl.classList.remove("feil");
    
    feil_svarEl[3].innerHTML = "";
    antall_voksneEl.classList.remove("feil");
    
    feil_svarEl[4].innerHTML = "";
    antall_barnEl.classList.remove("feil");
    console.log("Denne skal endre");

    feil_svarEl[5].innerHTML = "";
    forsikring_jaEl.className += "feil";



    if(!navnEl.value.match(bokstaver)) {
        check.push("fail");
        feil_svarEl[0].innerHTML = "Vennligs skriv inn med bare bokstaver A-Z";
        navnEl.className += "feil";

    } 

    if(!epostEl.value.match(gyldig_epostadresse)) {
        check.push("fail");
        feil_svarEl[1].innerHTML = "Skriv inn en ekte epostadresse (Example@example.com)";
        epostEl.className += "feil";
    } 

    if(reisestedEl.value == " ") {
        check.push("fail");
        feil_svarEl[2].innerHTML = "Velg et sted å reise";
        reisestedEl.className += "feil";

    } 

    if((antall_voksneEl.value < 0) || (antall_voksneEl.value > 20)) {   
        check.push("fail");
        feil_svarEl[3].innerHTML = "Kan kunn velge mellom 0 og 20 voksne";
        antall_voksneEl.className += "feil";
    } 

    if((antall_voksneEl.value == 0) && (antall_barnEl.value == 0)) {
        check.push("fail");
        feil_svarEl[4].innerHTML = "Du må velge minst 1 reisende";
        antall_voksneEl.className += "feil";
        antall_barnEl.className += "feil";
    }

    if((antall_barnEl.value < 0) || (antall_barnEl.value > 20)) {
        check.push("fail");
        feil_svarEl[4].innerHTML = "Kan kunn velge mellom 0 og 20 barn";
        antall_barnEl.className += "feil";
        console.log("hei");
    }

    if((!forsikring_jaEl.checked) && (!forsikring_neiEl.checked)) {
        check.push("fail");
        feil_svarEl[5].innerHTML = "Du må svare enten Ja eller nei";

    } 
}


