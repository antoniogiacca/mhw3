var veicoli=0;
for(let elemento of CONTENTS){
    if(elemento.id!==''){
        veicoli++;
    }
}

if(veicoli===0){
    document.querySelector("section#veicoli").classList.add("hide");
    document.querySelector("section#veicoli").classList.remove("show");
} else{
    document.querySelector("section#veicoli").classList.remove("hide");
    document.querySelector("section#veicoli").classList.add("show");
}

for(let elemento of CONTENTS){
    var sezione;
    if(elemento.id!==''){
         sezione=document.querySelector("section#veicoli div.show-case");
    }
    create_slot(sezione,elemento,true);
}


function create_slot(sezione,elemento,preferiti){
    if(preferiti===true){
        pref_='preferiti';
        img_='add.png';
    } else{
        pref_='rimuovi';
        img_='rem.png';
    }
    const slot=document.createElement("div");
    slot.classList.add("card");
    const immagine=document.createElement("img");
    immagine.src=elemento.immagine;
    immagine.classList.add("image");
    const about=document.createElement("div");
    const titolo=document.createElement("h3");
    titolo.textContent=elemento.titolo;
    const prezzo=document.createElement("p");
    prezzo.textContent=elemento.prezzo;
    const descrizione=document.createElement("p");
    descrizione.textContent=elemento.descrizione;
    descrizione.classList.add("hide");
    descrizione.classList.add("description");
    const plus=document.createElement("img");
    const info=document.createElement("img");
    plus.src=img_;
    plus.dataset.codice=elemento.id;
    info.src="details.png";
    info.dataset.codice=elemento.id;
    plus.classList.add(pref_);
    info.classList.add("info");
    about.appendChild(titolo);
    about.appendChild(prezzo);
    about.appendChild(descrizione);
    about.appendChild(plus);
    about.appendChild(info);
    slot.appendChild(immagine);
    slot.appendChild(about);
    slot.dataset.codice=elemento.id;
    sezione.appendChild(slot);
    const no_preferito=document.querySelectorAll("div.card div img.rimuovi");
    for(pulsante of no_preferito){
        pulsante.addEventListener("click",remPreferiti);
    }
    const preferito=document.querySelectorAll("div.card div img.preferiti");
    for(pulsante of preferito){
        pulsante.addEventListener("click",addPreferiti);
    }
    const info_button=document.querySelectorAll("div.card div img.info");
    for(button of info_button){
        button.addEventListener("click",visualizzaDettagli);
    }
} 


const preferiti=[];
const ricerca=[];

function addPreferiti(event){
    const id=event.currentTarget.dataset.codice;
    if(preferiti.length===0){
        document.querySelector("section#preferiti").classList.add("show");
        document.querySelector("section#preferiti").classList.remove("hide");
    }
    for(elemento of CONTENTS){
        if(elemento.id==id){
            if(preferiti.indexOf(elemento)===-1){
                preferiti.push(elemento);
                sezione=document.querySelector("section#preferiti div.show-case");
                create_slot(sezione,elemento,false);
            }
        }
    }
}

function remPreferiti(event){
    const id=event.currentTarget.dataset.codice;
    const cards=document.querySelectorAll("section#preferiti div.card");
    const sezione=document.querySelector("section#preferiti div");
    for(let card of cards){
        if(card.dataset.codice==id){
            sezione.removeChild(card);
        }
    }
    for(let like of preferiti){
        if(like.id===id){
            preferiti.splice(preferiti.indexOf(like),1);
        }
    }
    if(preferiti.length===0){
        document.querySelector("section#preferiti").classList.add("hide");
        document.querySelector("section#preferiti").classList.remove("show");
    }
}


function visualizzaDettagli(event){
    const button=event.currentTarget;
    const cards=document.querySelectorAll("div.card");
    for(let card of cards){
        if(card.dataset.codice === button.dataset.codice){
            const descrizione = card.querySelector("p.hide");
            if(descrizione !== null){
                descrizione.classList.add("show");
                descrizione.classList.remove("hide");
            }
            else{
                const descrizione=card.querySelector("p.description");
                descrizione.classList.add("hide");
                descrizione.classList.remove("show");
            }
        }
    }
}


const info_button=document.querySelectorAll("div.card div img.info");
for(let button of info_button){
    button.addEventListener("click",visualizzaDettagli);
}

const favourites_button=document.querySelectorAll("div.card div img.preferiti");
for(let button of favourites_button){
    button.addEventListener("click",addPreferiti);
}


function ricercaElemento(){
    ricerca.splice(0,ricerca.length);
    const barra_di_ricerca=document.querySelector("#search input");
    testo=barra_di_ricerca.value;
    const sezione_ricerca=document.querySelector("section#ricerca div.show-case");
    while(sezione_ricerca.firstChild){
        sezione_ricerca.removeChild(sezione_ricerca.firstChild);
    }
    if(testo!==""){
        for(let content of CONTENTS){
            if(content.titolo.toLowerCase().search(testo.toLowerCase())!==-1){
                ricerca.push(content);
                create_slot(sezione_ricerca,content,true);
            }
        }
        if(ricerca.length!==0){
            showsearch();
        } else{
            hidesearch();
        }
    }else{
        hidesearch();
    }
}

const barra_di_ricerca=document.querySelector("#search input");
barra_di_ricerca.addEventListener("keyup",ricercaElemento);


function hidesearch(){
    document.querySelector("section#ricerca").classList.add("hide");
    document.querySelector("section#ricerca").classList.remove("show");
    document.querySelector("section#veicoli").classList.remove("hide");
    document.querySelector("section#veicoli").classList.add("show");
    if(preferiti.length!==0){
    document.querySelector("section#preferiti").classList.remove("hide");
    document.querySelector("section#preferiti").classList.add("show");
    }
}

function showsearch(){
    document.querySelector("section#ricerca").classList.add("show");
    document.querySelector("section#ricerca").classList.remove("hide");
    document.querySelector("section#veicoli").classList.remove("show");
    document.querySelector("section#veicoli").classList.add("hide");
    document.querySelector("section#preferiti").classList.remove("show");
    document.querySelector("section#preferiti").classList.add("hide");
}


