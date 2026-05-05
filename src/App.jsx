import { useState } from "react";

const C = {
  navy:       "#1a3a5c",
  blue:       "#3B7FC4",
  blueMid:    "#2a6fad",
  blueLight:  "#d0e6f7",
  bluePale:   "#eef5fc",
  yellow:     "#E8B84B",
  yellowDark: "#8a620a",
  yellowPale: "#fdf3d8",
  white:      "#ffffff",
  cream:      "#FAF7F0",
  sand:       "#f5efe0",
  textDark:   "#1a2a3a",
  textMid:    "#3a5a7a",
  textLight:  "#6a8aaa",
  border:     "#c8dff0",
};

const LANGS = [
  { code:"en", label:"EN", name:"English",    flag:"🇬🇧" },
  { code:"it", label:"IT", name:"Italiano",   flag:"🇮🇹" },
  { code:"de", label:"DE", name:"Deutsch",    flag:"🇩🇪" },
  { code:"pl", label:"PL", name:"Polski",     flag:"🇵🇱" },
  { code:"sk", label:"SK", name:"Slovenčina", flag:"🇸🇰" },
  { code:"hu", label:"HU", name:"Magyar",     flag:"🇭🇺" },
];

const T = {
  en: {
    nav: { home:"Home", house:"The Apartment", guide:"Guest Guide", neighborhood:"Neighborhood", grado:"Grado", findus:"Find Us" },
    home: {
      badge:"Grado · Friuli Venezia Giulia",
      title:"Apartment\nL'Isola D'Oro",
      sub:"A bright, characterful apartment steps from the Adriatic sea. Perfect for families and couples seeking an authentic Italian seaside escape.",
      cta_house:"Explore the Apartment",
      cta_guide:"Guest Guide",
      book:"Book on Booking.com ↗",
      amenities:["Up to 5 guests","2 Bedrooms","1 Bathroom","Wi-Fi included","Air conditioning","Outdoor terrace","Private grill","5 min to beach"],
      cards:[
        { title:"The Apartment", text:"Two bedrooms, a fully equipped kitchen, and spaces full of character — vintage tiles, original artwork, colourful details." },
        { title:"Guest Guide", text:"Everything you need to know: check-in, the grill, TV remotes, appliances, and house rules — all in one place." },
        { title:"The Neighborhood", text:"Our favourite beaches, restaurants, bars, and shops — curated picks from people who know Grado well." },
        { title:"Grado", text:"The old town, the lagoon, the beaches. Day trips to Trieste and Aquileia. Seasonal events and local tips." },
      ],
    },
    house: {
      title:"The Apartment",
      sub:"Two bedrooms, a fully equipped kitchen, living area, bathroom, and a private outdoor terrace with grill. Space for up to 5 guests.",
      rooms:"Rooms",
      room_main:"Master Bedroom",
      room_main_desc:"Double bed, rattan headboard, olive green wardrobe, air conditioning, tiled floor.",
      room_kids:"Kids' Bedroom",
      room_kids_desc:"Bunk bed (double below, single above) plus pull-out single. Blue walls, built-in wardrobe.",
      room_living:"Living Room",
      room_living_desc:"Sofa, large TV, pellet stove, desk area, bookshelf with books and board games. Vintage Grado travel posters.",
      room_kitchen:"Kitchen",
      room_kitchen_desc:"Gas hob, oven, fridge-freezer, kettle, moka, toaster. Opens onto the terrace.",
      room_bath:"Bathroom",
      room_bath_desc:"Shower, toilet, bidet, washing machine. Window overlooking the pine garden.",
      room_terrace:"Outdoor Terrace",
      room_terrace_desc:"Shaded terrace with outdoor furniture and private charcoal grill. Perfect for summer evenings.",
      amenities_title:"What's included",
      amenities:["Wi-Fi (fast fibre)","Air conditioning (Mitsubishi)","Pellet stove (winter)","Smart door lock (code entry)","Washing machine","Outdoor grill","Beach towels","Highchair available"],
    },
    guide: {
      title:"Guest Guide",
      sub:"Everything you need for a smooth stay — from check-in to the grill. Bookmark this page on your phone.",
      sections:[
        { id:"checkin",   icon:"🔑", title:"Check-in & Check-out",   text:"The apartment has a smart keypad lock — no need to collect keys. Your personal code will be sent before arrival. Check-in from 15:00, check-out by 10:00." },
        { id:"wifi",      icon:"📶", title:"Wi-Fi & Internet",        text:"Network: IsolaOro_5G · Password: adriatico2024 — Fast fibre connection throughout the apartment." },
        { id:"aircon",    icon:"❄️",  title:"Air Conditioning",       text:"Mitsubishi unit in the bedroom corridor. Use the remote on the hallway shelf. Cool mode: press COOL, set temperature, press ON. Off: hold OFF button." },
        { id:"tv",        icon:"📺", title:"TV & Entertainment",      text:"Large Smart TV in the living room. Main remote on the TV stand. To switch source: press SOURCE and select HDMI or Smart TV apps (Netflix, Prime Video available)." },
        { id:"kitchen",   icon:"🍳", title:"Kitchen & Appliances",    text:"Gas hob: turn knob and press ignition button simultaneously. Oven below. Fridge-freezer on the left. Moka, kettle, and toaster on the counter. Coffee and basic pantry items provided." },
        { id:"grill",     icon:"🔥", title:"The Grill",               text:"Charcoal grill on the terrace. Charcoal and lighter in the box under the terrace bench. Light charcoal, wait ~20 min until white ash forms before cooking. Please clean grill after use." },
        { id:"stove",     icon:"🪵", title:"Pellet Stove",            text:"Remeha pellet stove in the living room — for use in winter/spring. Pellets stored in the white bag beside it. Press power button, wait 10 min for warm-up. Remote on shelf." },
        { id:"washing",   icon:"🫧", title:"Washing Machine",         text:"Located in the bathroom. Detergent under the sink. Standard 40° cycle: press Cotton, set 40°, press Start. Spin only: press Spin cycle button. Door opens when cycle complete." },
        { id:"rules",     icon:"📋", title:"House Rules",             text:"No smoking inside · Quiet hours 22:00–08:00 · Please sort recycling (bins outside) · Do not move furniture to other rooms · Report any damage immediately." },
        { id:"emergency", icon:"🆘", title:"Emergencies",             text:"Emergency: 112 · Host: +39 XXX XXX XXXX · Nearest hospital: Ospedale di Grado, Via Monfalcone 14 · Nearest pharmacy: Farmacia Centrale, Piazza Biagio Marin." },
      ],
    },
    neighborhood: {
      title:"The Neighborhood",
      sub:"Our favourite spots around the apartment — handpicked recommendations from people who know Grado.",
      categories:["All","Beach","Food & Drink","Shopping","Services"],
      places:[
        { cat:"Beach",        name:"Spiaggia di Grado",      text:"The main sandy beach, a 5-minute walk. Lido sections with sunbeds or free public areas." },
        { cat:"Beach",        name:"Spiaggia di Fossalon",   text:"Wilder, quieter beach south of town. Ideal for families who prefer less crowds." },
        { cat:"Food & Drink", name:"Trattoria de Toni",      text:"Legendary Grado restaurant. The fish soup is unmissable. Book ahead in summer." },
        { cat:"Food & Drink", name:"Bar Grado",              text:"Our local morning coffee spot. Perfect espresso, fresh pastries, friendly faces." },
        { cat:"Food & Drink", name:"Gelateria Al Porto",     text:"Best gelato in town. Try the 'Laguna' flavour — lagoon herbs and sea salt." },
        { cat:"Shopping",     name:"Mercato Coperto",        text:"Covered market with local fish, vegetables, and cheeses. Open mornings, closed Sunday." },
        { cat:"Shopping",     name:"Coop Supermarket",       text:"Main supermarket, 8-minute walk. Open daily 08:00–20:00." },
        { cat:"Services",     name:"Farmacia Centrale",      text:"Central pharmacy, Piazza Biagio Marin. Open Mon–Sat 08:30–12:30, 16:00–19:30." },
      ],
    },
    grado: {
      title:"Grado",
      sub:"Ancient island city on the Adriatic lagoon — known as the 'Island of the Sun'. Roman heritage, golden beaches, and a living fishing tradition.",
      sections:[
        { title:"Old Town (Città Vecchia)",  text:"The ancient heart of Grado: narrow cobblestone calli, the 6th-century Basilica di Santa Eufemia, and fishing boats in the small harbour. Perfect for an evening stroll." },
        { title:"The Lagoon",               text:"Grado sits on a sandbar surrounded by a shallow lagoon. Take a boat trip to the lagoon islands, spot herons and egrets, or join a traditional fishing tour." },
        { title:"The Beaches",              text:"Grado has some of the finest sandy beaches on the Adriatic — calm, shallow waters make them ideal for children. The main beach stretches for kilometres westward." },
        { title:"Day Trips",                text:"Aquileia (10 min): UNESCO Roman ruins and the stunning basilica. Trieste (1 hr): Habsburg elegance, great coffee, and the Castello di Miramare. Venice (2 hr by car or boat bus)." },
        { title:"Seasonal Events",          text:"July–August: Grado in Fiore flower festival, evening markets in the old town. September: Bardìa, the traditional lagoon boat race. Winter: quiet season, excellent for birdwatching." },
      ],
    },
    findus: {
      title:"Find Us",
      sub:"Apartment L'Isola D'Oro, Grado (GO), Friuli Venezia Giulia, Italy.",
      address:"Via [Street Name], 34073 Grado (GO)",
      directions_title:"Getting Here",
      directions:[
        { how:"By Car",   text:"From Trieste: A4 motorway towards Venice, exit Palmanova, then follow signs to Grado (~1 hr). From Venice: A4 east, exit Latisana, follow signs to Grado (~1.5 hr). Parking available on the street (paid in summer)." },
        { how:"By Bus",   text:"APT Gorizia buses connect Grado with Trieste and Monfalcone. Journey from Trieste ~1.5 hr." },
        { how:"By Train", text:"Nearest train station: Cervignano-Aquileia-Grado (15 km). Local buses connect to Grado town centre." },
      ],
      book_title:"Ready to book?",
      book_text:"Check availability and book directly on Booking.com.",
      book_cta:"View on Booking.com ↗",
      contact:"Questions? Contact the host:",
    },
    footer: { rights:"All rights reserved.", made:"Made with ♥ in Grado." },
  },

  it: {
    nav: { home:"Home", house:"L'Appartamento", guide:"Guida Ospiti", neighborhood:"Quartiere", grado:"Grado", findus:"Dove Siamo" },
    home: {
      badge:"Grado · Friuli Venezia Giulia",
      title:"Appartamento\nL'Isola D'Oro",
      sub:"Un appartamento luminoso e pieno di carattere a pochi passi dal Mare Adriatico. Perfetto per famiglie e coppie.",
      cta_house:"Scopri l'appartamento",
      cta_guide:"Guida Ospiti",
      book:"Prenota su Booking.com ↗",
      amenities:["Fino a 5 ospiti","2 Camere da letto","1 Bagno","Wi-Fi incluso","Aria condizionata","Terrazza esterna","Grill privato","5 min dalla spiaggia"],
      cards:[
        { title:"L'Appartamento", text:"Due camere, cucina attrezzata e spazi pieni di carattere — piastrelle vintage, opere d'arte, dettagli colorati." },
        { title:"Guida Ospiti", text:"Tutto quello che serve: check-in, griglia, telecomandi, elettrodomestici e regole della casa." },
        { title:"Il Quartiere", text:"Le nostre spiagge, ristoranti, bar e negozi preferiti — selezione curata da chi conosce bene Grado." },
        { title:"Grado", text:"Il centro storico, la laguna, le spiagge. Gite a Trieste e Aquileia. Eventi stagionali e consigli locali." },
      ],
    },
    house: {
      title:"L'Appartamento",
      sub:"Due camere, cucina attrezzata, soggiorno, bagno e terrazza privata con grill. Fino a 5 ospiti.",
      rooms:"Le Stanze",
      room_main:"Camera Matrimoniale",       room_main_desc:"Letto matrimoniale, testiera in rattan, armadio verde oliva, aria condizionata, pavimento in maiolica.",
      room_kids:"Camera Bambini",            room_kids_desc:"Letto a castello (matrimoniale sotto, singolo sopra) più singolo estraibile. Pareti blu, armadio a muro.",
      room_living:"Soggiorno",              room_living_desc:"Divano, TV grande, stufa a pellet, scrivania, libreria con libri e giochi da tavolo. Poster vintage di Grado.",
      room_kitchen:"Cucina",               room_kitchen_desc:"Piano cottura a gas, forno, frigo-congelatore, bollitore, moka, tostapane. Si apre sulla terrazza.",
      room_bath:"Bagno",                   room_bath_desc:"Doccia, wc, bidet, lavatrice. Finestra sul giardino di pini.",
      room_terrace:"Terrazza Esterna",     room_terrace_desc:"Terrazza ombreggiata con arredi da esterno e griglia a carbone privata.",
      amenities_title:"Cosa è incluso",
      amenities:["Wi-Fi (fibra veloce)","Aria condizionata (Mitsubishi)","Stufa a pellet (inverno)","Serratura smart (codice)","Lavatrice","Grill esterno","Asciugamani da spiaggia","Seggiolone disponibile"],
    },
    guide: {
      title:"Guida Ospiti",
      sub:"Tutto quello che serve per un soggiorno tranquillo. Salva questa pagina sul tuo telefono.",
      sections:[
        { id:"checkin",   icon:"🔑", title:"Check-in e Check-out",     text:"L'appartamento ha una serratura smart — nessuna chiave da ritirare. Il tuo codice personale ti verrà inviato prima dell'arrivo. Check-in dalle 15:00, check-out entro le 10:00." },
        { id:"wifi",      icon:"📶", title:"Wi-Fi e Internet",          text:"Rete: IsolaOro_5G · Password: adriatico2024 — Connessione in fibra veloce in tutto l'appartamento." },
        { id:"aircon",    icon:"❄️",  title:"Aria Condizionata",        text:"Unità Mitsubishi nel corridoio della camera. Telecomando sul ripiano dell'ingresso. Modalità freddo: premere COOL, impostare temperatura, premere ON." },
        { id:"tv",        icon:"📺", title:"TV e Intrattenimento",      text:"Smart TV nel soggiorno. Telecomando principale sul mobile TV. Per cambiare sorgente: premere SOURCE e selezionare HDMI o le app Smart TV (Netflix, Prime Video disponibili)." },
        { id:"kitchen",   icon:"🍳", title:"Cucina ed Elettrodomestici",text:"Piano cottura a gas: girare la manopola e premere contemporaneamente il tasto di accensione. Forno sotto. Frigo-congelatore a sinistra. Moka, bollitore e tostapane sul bancone." },
        { id:"grill",     icon:"🔥", title:"La Griglia",                text:"Griglia a carbone sulla terrazza. Carbone e accendifuoco nella scatola sotto la panca. Accendere il carbone, attendere ~20 min finché non si forma la cenere bianca prima di cucinare. Pulire dopo l'uso." },
        { id:"stove",     icon:"🪵", title:"Stufa a Pellet",            text:"Stufa Remeha nel soggiorno — per uso in inverno/primavera. Pellet nel sacchetto bianco accanto. Premere il tasto di accensione, attendere 10 min di riscaldamento. Telecomando sul ripiano." },
        { id:"washing",   icon:"🫧", title:"Lavatrice",                 text:"Si trova in bagno. Detersivo sotto il lavandino. Ciclo standard 40°: premere Cotone, impostare 40°, premere Start. La porta si apre a fine ciclo." },
        { id:"rules",     icon:"📋", title:"Regole della Casa",        text:"Vietato fumare all'interno · Silenzio dalle 22:00 alle 08:00 · Separare i rifiuti (cestini fuori) · Non spostare i mobili · Segnalare subito eventuali danni." },
        { id:"emergency", icon:"🆘", title:"Emergenze",                text:"Emergenze: 112 · Host: +39 XXX XXX XXXX · Ospedale di Grado, Via Monfalcone 14 · Farmacia Centrale, Piazza Biagio Marin." },
      ],
    },
    neighborhood: {
      title:"Il Quartiere",
      sub:"I nostri posti preferiti — selezione curata di chi conosce Grado.",
      categories:["Tutti","Spiaggia","Cibo e Bevande","Shopping","Servizi"],
      places:[
        { cat:"Spiaggia",       name:"Spiaggia di Grado",      text:"La spiaggia principale, a 5 minuti a piedi. Lido con lettini o aree libere gratuite." },
        { cat:"Spiaggia",       name:"Spiaggia di Fossalon",   text:"Spiaggia più selvaggia e tranquilla a sud della città. Ideale per famiglie." },
        { cat:"Cibo e Bevande", name:"Trattoria de Toni",      text:"Ristorante storico di Grado. La boreto alla gradese è imperdibile. Prenotare in estate." },
        { cat:"Cibo e Bevande", name:"Bar Grado",              text:"Il nostro caffè del mattino. Espresso perfetto, cornetti freschi." },
        { cat:"Cibo e Bevande", name:"Gelateria Al Porto",     text:"Il miglior gelato in città. Da provare il gusto 'Laguna'." },
        { cat:"Shopping",       name:"Mercato Coperto",        text:"Mercato coperto con pesce locale, verdure e formaggi. Aperto la mattina, chiuso domenica." },
        { cat:"Shopping",       name:"Supermercato Coop",      text:"Supermercato principale, 8 minuti a piedi. Aperto tutti i giorni 08:00–20:00." },
        { cat:"Servizi",        name:"Farmacia Centrale",      text:"Farmacia in Piazza Biagio Marin. Lun–Sab 08:30–12:30, 16:00–19:30." },
      ],
    },
    grado: {
      title:"Grado",
      sub:"Antica città insulare sull'Adriatico — chiamata 'L'Isola del Sole'. Patrimonio romano, spiagge dorate e tradizione marinara.",
      sections:[
        { title:"Centro Storico (Città Vecchia)", text:"Il cuore antico di Grado: calli acciottolate, la Basilica di Santa Eufemia del VI secolo e le barche dei pescatori nel piccolo porto. Perfetto per una passeggiata serale." },
        { title:"La Laguna",                      text:"Grado sorge su un banco di sabbia circondato da una laguna bassa. Gita in barca alle isole lagunari, avvistamento di aironi e garzette, o tour di pesca tradizionale." },
        { title:"Le Spiagge",                     text:"Grado vanta alcune delle più belle spiagge sabbiose dell'Adriatico — acque calme e basse, ideali per i bambini. La spiaggia principale si estende per chilometri verso ovest." },
        { title:"Gite",                           text:"Aquileia (10 min): rovine romane UNESCO e la straordinaria basilica. Trieste (1 ora): eleganza asburgica e il Castello di Miramare. Venezia (2 ore in auto o barca-bus)." },
        { title:"Eventi Stagionali",              text:"Luglio–Agosto: Grado in Fiore, mercati serali nel centro storico. Settembre: Bardìa, la regata tradizionale della laguna. Inverno: stagione tranquilla, ottima per il birdwatching." },
      ],
    },
    findus: {
      title:"Dove Siamo",
      sub:"Appartamento L'Isola D'Oro, Grado (GO), Friuli Venezia Giulia, Italia.",
      address:"Via [Nome Via], 34073 Grado (GO)",
      directions_title:"Come Arrivare",
      directions:[
        { how:"In Auto",   text:"Da Trieste: autostrada A4 verso Venezia, uscita Palmanova, poi seguire le indicazioni per Grado (~1 ora). Da Venezia: A4 est, uscita Latisana (~1,5 ore). Parcheggio su strada (a pagamento in estate)." },
        { how:"In Autobus",text:"Gli autobus APT Gorizia collegano Grado con Trieste e Monfalcone. Da Trieste ~1,5 ore." },
        { how:"In Treno",  text:"Stazione più vicina: Cervignano-Aquileia-Grado (15 km). Bus locali per il centro di Grado." },
      ],
      book_title:"Pronto a prenotare?",
      book_text:"Controlla la disponibilità e prenota su Booking.com.",
      book_cta:"Vedi su Booking.com ↗",
      contact:"Domande? Contatta l'host:",
    },
    footer: { rights:"Tutti i diritti riservati.", made:"Fatto con ♥ a Grado." },
  },

  de: {
    nav: { home:"Startseite", house:"Die Wohnung", guide:"Gästeguide", neighborhood:"Umgebung", grado:"Grado", findus:"Anreise" },
    home: {
      badge:"Grado · Friaul-Julisch Venetien",
      title:"Apartment\nL'Isola D'Oro",
      sub:"Eine helle, charaktervolle Wohnung direkt am Adriatischen Meer. Ideal für Familien und Paare.",
      cta_house:"Die Wohnung entdecken",
      cta_guide:"Gästeguide",
      book:"Auf Booking.com buchen ↗",
      amenities:["Bis zu 5 Gäste","2 Schlafzimmer","1 Badezimmer","Wi-Fi inklusive","Klimaanlage","Außenterrasse","Privater Grill","5 Min. zum Strand"],
      cards:[
        { title:"Die Wohnung", text:"Zwei Zimmer, vollausgestattete Küche und Räume voller Charakter — Vintage-Fliesen, Kunst, bunte Details." },
        { title:"Gästeguide", text:"Alles was Sie brauchen: Check-in, Grill, TV-Fernbedienungen, Geräte und Hausregeln." },
        { title:"Umgebung", text:"Unsere Lieblingsstrände, Restaurants, Bars und Geschäfte — kuratierte Empfehlungen." },
        { title:"Grado", text:"Altstadt, Lagune, Strände. Ausflüge nach Triest und Aquileia. Saisonale Events und lokale Tipps." },
      ],
    },
    house: {
      title:"Die Wohnung",
      sub:"Zwei Schlafzimmer, Küche, Wohnzimmer, Bad und Terrasse mit Grill. Bis zu 5 Gäste.",
      rooms:"Zimmer",
      room_main:"Hauptschlafzimmer",  room_main_desc:"Doppelbett, Rattankopfteil, olivgrüner Kleiderschrank, Klimaanlage.",
      room_kids:"Kinderzimmer",        room_kids_desc:"Etagenbett (Doppel unten, Einzel oben) plus ausziehbares Einzelbett. Blaue Wände.",
      room_living:"Wohnzimmer",       room_living_desc:"Sofa, großer TV, Pelletofen, Schreibtisch, Bücherregal. Vintage Grado-Poster.",
      room_kitchen:"Küche",           room_kitchen_desc:"Gasherd, Backofen, Kühlschrank, Wasserkocher, Mokkakanne, Toaster.",
      room_bath:"Badezimmer",         room_bath_desc:"Dusche, WC, Bidet, Waschmaschine. Fenster zum Kiefernpark.",
      room_terrace:"Außenterrasse",   room_terrace_desc:"Überdachte Terrasse mit Gartenmöbeln und privatem Holzkohlegrill.",
      amenities_title:"Ausstattung",
      amenities:["Wi-Fi (Glasfaser)","Klimaanlage (Mitsubishi)","Pelletofen (Winter)","Smart-Türschloss (Code)","Waschmaschine","Außengrill","Strandtücher","Hochstuhl verfügbar"],
    },
    guide: {
      title:"Gästeguide",
      sub:"Alles für einen reibungslosen Aufenthalt. Speichern Sie diese Seite auf Ihrem Handy.",
      sections:[
        { id:"checkin",   icon:"🔑", title:"Check-in & Check-out",       text:"Die Wohnung hat ein Smart-Tastenfeld — keine Schlüsselabholung nötig. Ihr persönlicher Code wird vor der Ankunft gesendet. Check-in ab 15:00 Uhr, Check-out bis 10:00 Uhr." },
        { id:"wifi",      icon:"📶", title:"Wi-Fi & Internet",            text:"Netzwerk: IsolaOro_5G · Passwort: adriatico2024" },
        { id:"aircon",    icon:"❄️",  title:"Klimaanlage",                text:"Mitsubishi-Gerät im Schlafzimmerflur. Fernbedienung auf dem Flurregal. Kühlmodus: COOL drücken, Temperatur einstellen, ON drücken." },
        { id:"tv",        icon:"📺", title:"Fernseher",                   text:"Smart TV im Wohnzimmer. Hauptfernbedienung auf dem TV-Schrank. Eingang wechseln: SOURCE drücken, HDMI oder Smart TV Apps wählen (Netflix, Prime Video verfügbar)." },
        { id:"kitchen",   icon:"🍳", title:"Küche & Geräte",             text:"Gasherd: Knopf drehen und gleichzeitig Zündtaste drücken. Backofen darunter. Kühlschrank links. Mokkakanne, Wasserkocher und Toaster auf der Arbeitsplatte." },
        { id:"grill",     icon:"🔥", title:"Der Grill",                  text:"Holzkohlegrill auf der Terrasse. Kohle und Anzünder in der Box unter der Terrassenbank. Kohle anzünden, ~20 Min warten bis weiße Asche entsteht. Grill nach Benutzung reinigen." },
        { id:"stove",     icon:"🪵", title:"Pelletofen",                 text:"Remeha Pelletofen im Wohnzimmer — für Winter/Frühling. Pellets im weißen Beutel daneben. Einschalttaste drücken, 10 Min Aufwärmen abwarten. Fernbedienung auf Regal." },
        { id:"washing",   icon:"🫧", title:"Waschmaschine",              text:"Im Badezimmer. Waschmittel unter dem Waschbecken. Standardprogramm 40°: Baumwolle wählen, 40° einstellen, Start drücken." },
        { id:"rules",     icon:"📋", title:"Hausregeln",                 text:"Kein Rauchen im Inneren · Ruhezeiten 22:00–08:00 · Mülltrennung (Behälter draußen) · Möbel nicht verschieben · Schäden sofort melden." },
        { id:"emergency", icon:"🆘", title:"Notfälle",                   text:"Notruf: 112 · Gastgeber: +39 XXX XXX XXXX · Krankenhaus Grado, Via Monfalcone 14 · Farmacia Centrale, Piazza Biagio Marin." },
      ],
    },
    neighborhood: {
      title:"Die Umgebung",
      sub:"Unsere Lieblingsplätze rund um die Wohnung.",
      categories:["Alle","Strand","Essen & Trinken","Shopping","Services"],
      places:[
        { cat:"Strand",          name:"Spiaggia di Grado",    text:"Hauptstrand, 5 Gehminuten. Liegestühle oder kostenlose Bereiche." },
        { cat:"Strand",          name:"Spiaggia di Fossalon", text:"Ruhigerer, wilderer Strand südlich der Stadt. Ideal für Familien." },
        { cat:"Essen & Trinken", name:"Trattoria de Toni",    text:"Legendäres Fischrestaurant. Die Fischsuppe ist ein Muss. Im Sommer reservieren." },
        { cat:"Essen & Trinken", name:"Bar Grado",            text:"Unser Morgen-Café. Perfekter Espresso und frische Croissants." },
        { cat:"Essen & Trinken", name:"Gelateria Al Porto",   text:"Bestes Eis der Stadt. Geschmack 'Laguna' unbedingt probieren." },
        { cat:"Shopping",        name:"Mercato Coperto",      text:"Überdachter Markt mit lokalem Fisch, Gemüse und Käse. Morgens, So geschlossen." },
        { cat:"Shopping",        name:"Coop Supermarkt",      text:"Hauptsupermarkt, 8 Gehminuten. Täglich 08:00–20:00." },
        { cat:"Services",        name:"Farmacia Centrale",    text:"Apotheke, Piazza Biagio Marin. Mo–Sa 08:30–12:30, 16:00–19:30." },
      ],
    },
    grado: {
      title:"Grado",
      sub:"Antike Inselstadt an der Adria-Lagune — bekannt als 'Insel der Sonne'.",
      sections:[
        { title:"Altstadt (Città Vecchia)",  text:"Das historische Herz von Grado: Kopfsteinpflaster-Gassen, die Basilika Santa Eufemia aus dem 6. Jahrhundert und Fischerboote im kleinen Hafen." },
        { title:"Die Lagune",               text:"Grado liegt auf einer Sandbank, umgeben von einer flachen Lagune. Bootstouren zu den Laguneninseln, Vogelbeobachtung oder traditionelle Fischereitouren." },
        { title:"Die Strände",             text:"Grado bietet einige der schönsten Sandstrände der Adria — ruhige, flache Gewässer, ideal für Kinder." },
        { title:"Ausflüge",               text:"Aquileia (10 Min): UNESCO-Römerruinen. Triest (1 Std): habsburgische Eleganz, Schloss Miramare. Venedig (2 Std)." },
        { title:"Saisonale Events",       text:"Juli–Aug: Grado in Fiore Blumenfest. September: Bardìa Lagunensegel-Rennen. Winter: Ruhezeit, ideal für Vogelbeobachtung." },
      ],
    },
    findus: {
      title:"Anreise",
      sub:"Apartment L'Isola D'Oro, Grado (GO), Friaul-Julisch Venetien, Italien.",
      address:"Via [Straßenname], 34073 Grado (GO)",
      directions_title:"So kommen Sie hin",
      directions:[
        { how:"Mit dem Auto",  text:"Von Triest: A4 Richtung Venedig, Ausfahrt Palmanova, dann Beschilderung nach Grado (~1 Std). Von Venedig: A4 Ost, Ausfahrt Latisana (~1,5 Std). Straßenparkplatz (im Sommer kostenpflichtig)." },
        { how:"Mit dem Bus",   text:"APT Gorizia Busse verbinden Grado mit Triest und Monfalcone. Von Triest ~1,5 Std." },
        { how:"Mit dem Zug",  text:"Nächster Bahnhof: Cervignano-Aquileia-Grado (15 km). Lokale Busse ins Stadtzentrum." },
      ],
      book_title:"Bereit zu buchen?",
      book_text:"Verfügbarkeit prüfen und auf Booking.com buchen.",
      book_cta:"Auf Booking.com ansehen ↗",
      contact:"Fragen? Kontaktieren Sie den Gastgeber:",
    },
    footer: { rights:"Alle Rechte vorbehalten.", made:"Mit ♥ in Grado gemacht." },
  },

  pl: {
    nav: { home:"Strona główna", house:"Apartament", guide:"Przewodnik", neighborhood:"Okolica", grado:"Grado", findus:"Jak dojechać" },
    home: {
      badge:"Grado · Friuli Wenecja Julijska",
      title:"Apartament\nL'Isola D'Oro",
      sub:"Jasny, pełen charakteru apartament tuż przy Morzu Adriatyckim. Idealny dla rodzin i par.",
      cta_house:"Poznaj apartament",
      cta_guide:"Przewodnik gościa",
      book:"Zarezerwuj na Booking.com ↗",
      amenities:["Do 5 gości","2 sypialnie","1 łazienka","Wi-Fi w cenie","Klimatyzacja","Taras zewnętrzny","Prywatny grill","5 min od plaży"],
      cards:[
        { title:"Apartament", text:"Dwie sypialnie, w pełni wyposażona kuchnia i pełne uroku przestrzenie — vintage płytki, dzieła sztuki, kolorowe detale." },
        { title:"Przewodnik gościa", text:"Wszystko, czego potrzebujesz: zameldowanie, grill, piloty, sprzęt i zasady domu." },
        { title:"Okolica", text:"Nasze ulubione plaże, restauracje, bary i sklepy — sprawdzone miejsca od osób znających Grado." },
        { title:"Grado", text:"Stare miasto, laguna, plaże. Wycieczki do Triestu i Akwilei. Sezonowe imprezy i lokalne porady." },
      ],
    },
    house: {
      title:"Apartament",
      sub:"Dwie sypialnie, kuchnia, salon, łazienka i prywatny taras z grillem. Do 5 gości.",
      rooms:"Pokoje",
      room_main:"Sypialnia główna",   room_main_desc:"Łóżko podwójne, zagłówek rattanowy, szafa w kolorze oliwkowym, klimatyzacja.",
      room_kids:"Pokój dziecięcy",    room_kids_desc:"Łóżko piętrowe (podwójne na dole, pojedyncze na górze) plus rozkładane łóżko. Niebieskie ściany.",
      room_living:"Salon",           room_living_desc:"Sofa, duży TV, piec na pellet, biurko, biblioteczka z książkami i grami. Vintage plakaty Grado.",
      room_kitchen:"Kuchnia",        room_kitchen_desc:"Kuchenka gazowa, piekarnik, lodówka, czajnik, moka, toster.",
      room_bath:"Łazienka",          room_bath_desc:"Prysznic, toaleta, bidet, pralka. Okno na ogród sosnowy.",
      room_terrace:"Taras zewnętrzny",room_terrace_desc:"Zadaszony taras z meblami ogrodowymi i prywatnym grillem węglowym.",
      amenities_title:"Co jest w cenie",
      amenities:["Wi-Fi (szybki światłowód)","Klimatyzacja (Mitsubishi)","Piec na pellet (zima)","Smart zamek (kod)","Pralka","Grill zewnętrzny","Ręczniki plażowe","Krzesełko dla dziecka"],
    },
    guide: {
      title:"Przewodnik gościa",
      sub:"Wszystko, czego potrzebujesz do spokojnego pobytu. Zapisz tę stronę na telefonie.",
      sections:[
        { id:"checkin",   icon:"🔑", title:"Zameldowanie i wymeldowanie", text:"Apartament ma inteligentny zamek klawiszowy — nie trzeba odbierać kluczy. Twój osobisty kod zostanie wysłany przed przyjazdem. Zameldowanie od 15:00, wymeldowanie do 10:00." },
        { id:"wifi",      icon:"📶", title:"Wi-Fi i Internet",             text:"Sieć: IsolaOro_5G · Hasło: adriatico2024" },
        { id:"aircon",    icon:"❄️",  title:"Klimatyzacja",                text:"Urządzenie Mitsubishi w korytarzu sypialni. Pilot na półce w przedpokoju. Tryb chłodzenia: naciśnij COOL, ustaw temperaturę, naciśnij ON." },
        { id:"tv",        icon:"📺", title:"Telewizor i rozrywka",         text:"Smart TV w salonie. Główny pilot na szafce pod TV. Zmiana źródła: naciśnij SOURCE i wybierz HDMI lub aplikacje Smart TV (Netflix, Prime Video dostępne)." },
        { id:"kitchen",   icon:"🍳", title:"Kuchnia i sprzęty",           text:"Kuchenka gazowa: obróć pokrętło i jednocześnie naciśnij przycisk zapłonu. Czajnik, moka i toster na blacie." },
        { id:"grill",     icon:"🔥", title:"Grill",                        text:"Grill węglowy na tarasie. Węgiel i podpałka w skrzynce pod ławką. Podpal węgiel, poczekaj ~20 min aż powstanie biały popiół. Umyj grill po użyciu." },
        { id:"stove",     icon:"🪵", title:"Piec na pellet",              text:"Piec Remeha w salonie — do użytku zimą/wiosną. Pellet w białym worku obok. Naciśnij przycisk włączania, odczekaj 10 min na nagrzanie." },
        { id:"washing",   icon:"🫧", title:"Pralka",                      text:"W łazience. Proszek pod umywalką. Standardowy cykl 40°: wybierz Bawełna, ustaw 40°, naciśnij Start." },
        { id:"rules",     icon:"📋", title:"Zasady domu",                 text:"Zakaz palenia w środku · Cisza nocna 22:00–08:00 · Segregacja odpadów (pojemniki na zewnątrz) · Nie przestawiać mebli · Natychmiast zgłaszać szkody." },
        { id:"emergency", icon:"🆘", title:"Sytuacje awaryjne",           text:"Numer alarmowy: 112 · Gospodarz: +39 XXX XXX XXXX · Szpital w Grado, Via Monfalcone 14." },
      ],
    },
    neighborhood: {
      title:"Okolica",
      sub:"Nasze ulubione miejsca w okolicy apartamentu.",
      categories:["Wszystkie","Plaża","Jedzenie i napoje","Zakupy","Usługi"],
      places:[
        { cat:"Plaża",             name:"Spiaggia di Grado",    text:"Główna plaża piaszczysta, 5 minut piechotą. Leżaki lub bezpłatne strefy." },
        { cat:"Plaża",             name:"Spiaggia di Fossalon", text:"Dzika, spokojniejsza plaża na południe od miasta. Idealna dla rodzin." },
        { cat:"Jedzenie i napoje", name:"Trattoria de Toni",    text:"Legendarna restauracja rybna. Zupa rybna obowiązkowa. Rezerwacja wskazana latem." },
        { cat:"Jedzenie i napoje", name:"Bar Grado",            text:"Nasza poranna kawiarnia. Doskonałe espresso i świeże rogaliki." },
        { cat:"Jedzenie i napoje", name:"Gelateria Al Porto",   text:"Najlepsze lody w mieście. Polecamy smak 'Laguna'." },
        { cat:"Zakupy",            name:"Mercato Coperto",      text:"Kryty rynek z lokalną rybą, warzywami i serami. Rano, nieczynny w niedzielę." },
        { cat:"Zakupy",            name:"Supermarket Coop",     text:"Główny supermarket, 8 min piechotą. Codziennie 08:00–20:00." },
        { cat:"Usługi",            name:"Farmacia Centrale",    text:"Apteka, Piazza Biagio Marin. Pon–Sob 08:30–12:30, 16:00–19:30." },
      ],
    },
    grado: {
      title:"Grado",
      sub:"Starożytne miasto wyspiarskie nad Adriatykiem — znane jako 'Wyspa Słońca'.",
      sections:[
        { title:"Stare miasto (Città Vecchia)", text:"Historyczne serce Grado: brukowane zaułki, bazylika Santa Eufemia z VI wieku i łodzie rybackie w małym porcie." },
        { title:"Laguna",                       text:"Grado leży na łasze piaszczystej otoczonej płytką laguną. Wycieczki łódką na wyspy lagunowe, obserwacja ptaków lub tradycyjne wyprawy rybackie." },
        { title:"Plaże",                        text:"Grado ma jedne z piękniejszych piaszczystych plaż na Adriatyku — spokojne, płytkie wody idealne dla dzieci." },
        { title:"Wycieczki",                    text:"Akwileja (10 min): ruiny UNESCO. Triest (1 godz): elegancja habsburska, Zamek Miramare. Wenecja (2 godz)." },
        { title:"Imprezy sezonowe",             text:"Lipiec–sierpień: festiwal kwiatów Grado in Fiore. Wrzesień: Bardìa — tradycyjny wyścig łodzi lagunarnych. Zima: cisza, świetna dla ptaków." },
      ],
    },
    findus: {
      title:"Jak dojechać",
      sub:"Apartament L'Isola D'Oro, Grado (GO), Friuli Wenecja Julijska, Włochy.",
      address:"Via [Nazwa ulicy], 34073 Grado (GO)",
      directions_title:"Dojazd",
      directions:[
        { how:"Samochodem", text:"Z Triestu: autostrada A4 w kierunku Wenecji, zjazd Palmanova, następnie drogowskazy do Grado (~1 godz). Z Wenecji: A4 na wschód, zjazd Latisana (~1,5 godz). Parking uliczny (płatny latem)." },
        { how:"Autobusem",  text:"Autobusy APT Gorizia łączą Grado z Triestem i Monfalcone. Z Triestu ~1,5 godz." },
        { how:"Pociągiem",  text:"Najbliższa stacja: Cervignano-Aquileia-Grado (15 km). Autobusy lokalne do centrum Grado." },
      ],
      book_title:"Gotowy do rezerwacji?",
      book_text:"Sprawdź dostępność i zarezerwuj na Booking.com.",
      book_cta:"Zobacz na Booking.com ↗",
      contact:"Pytania? Skontaktuj się z gospodarzem:",
    },
    footer: { rights:"Wszelkie prawa zastrzeżone.", made:"Zrobione z ♥ w Grado." },
  },

  sk: {
    nav: { home:"Domov", house:"Apartmán", guide:"Sprievodca", neighborhood:"Okolie", grado:"Grado", findus:"Kde nás nájdete" },
    home: {
      badge:"Grado · Friuli Venezia Giulia",
      title:"Apartmán\nL'Isola D'Oro",
      sub:"Svetlý, osobitý apartmán pri Jadranskom mori. Ideálny pre rodiny a páry.",
      cta_house:"Objavte apartmán",
      cta_guide:"Sprievodca hosťa",
      book:"Rezervovať na Booking.com ↗",
      amenities:["Až 5 hostí","2 spálne","1 kúpeľňa","Wi-Fi v cene","Klimatizácia","Vonkajšia terasa","Súkromný gril","5 min k pláži"],
      cards:[
        { title:"Apartmán", text:"Dve spálne, plne vybavená kuchyňa a priestory plné charakteru — vintage dlaždice, umenie, farebné detaily." },
        { title:"Sprievodca hosťa", text:"Všetko čo potrebujete: check-in, gril, TV diaľkové ovládače, spotrebiče a domáci poriadok." },
        { title:"Okolie", text:"Naše obľúbené pláže, reštaurácie, bary a obchody — overené tipy od ľudí, ktorí Grado dobre poznajú." },
        { title:"Grado", text:"Staré mesto, lagúna, pláže. Výlety do Terstu a Aquileia. Sezónne podujatia a miestne tipy." },
      ],
    },
    house: {
      title:"Apartmán",
      sub:"Dve spálne, kuchyňa, obývačka, kúpeľňa a súkromná terasa s grilom. Až 5 hostí.",
      rooms:"Izby",
      room_main:"Hlavná spálňa",      room_main_desc:"Manželská posteľ, ratanové čelo, olivová skriňa, klimatizácia.",
      room_kids:"Detská izba",        room_kids_desc:"Poschodová posteľ (dvojlôžko dole, jednolôžko hore) plus výsuvné jednolôžko. Modré steny.",
      room_living:"Obývačka",        room_living_desc:"Pohovka, veľká TV, peletový krb, písací stôl, knižnica. Vintage plagáty Grado.",
      room_kitchen:"Kuchyňa",        room_kitchen_desc:"Plynový sporák, rúra, chladnička, kanvica, moka, hriankovač.",
      room_bath:"Kúpeľňa",           room_bath_desc:"Sprcha, WC, bidet, práčka. Okno do borovicovej záhrady.",
      room_terrace:"Vonkajšia terasa",room_terrace_desc:"Tienistá terasa so záhradným nábytkom a súkromným dreveným grilom.",
      amenities_title:"Čo je v cene",
      amenities:["Wi-Fi (rýchle vlákno)","Klimatizácia (Mitsubishi)","Peletový krb (zima)","Smart zámok (kód)","Práčka","Vonkajší gril","Plážové uteráky","Detská stolička"],
    },
    guide: {
      title:"Sprievodca hosťa",
      sub:"Všetko pre bezproblémový pobyt. Uložte si túto stránku do telefónu.",
      sections:[
        { id:"checkin",   icon:"🔑", title:"Check-in a check-out",       text:"Apartmán má inteligentnú kódovú klávesnicu — nie je potrebné vyzdvihnutie kľúčov. Váš osobný kód bude zaslaný pred príchodom. Check-in od 15:00, check-out do 10:00." },
        { id:"wifi",      icon:"📶", title:"Wi-Fi a internet",            text:"Sieť: IsolaOro_5G · Heslo: adriatico2024" },
        { id:"aircon",    icon:"❄️",  title:"Klimatizácia",               text:"Jednotka Mitsubishi na chodbe spálne. Diaľkové ovládanie na poličke v predsieni. Chladenie: stlačte COOL, nastavte teplotu, stlačte ON." },
        { id:"tv",        icon:"📺", title:"Televízor",                   text:"Smart TV v obývačke. Hlavné diaľkové ovládanie na TV stolíku. Zmena vstupu: stlačte SOURCE, vyberte HDMI alebo Smart TV aplikácie (Netflix, Prime Video)." },
        { id:"kitchen",   icon:"🍳", title:"Kuchyňa a spotrebiče",       text:"Plynový sporák: otočte gombíkom a súčasne stlačte tlačidlo zapaľovania. Moka, kanvica a hriankovač na linke." },
        { id:"grill",     icon:"🔥", title:"Gril",                        text:"Drevouhlový gril na terase. Uhlie a podpaľovač v krabici pod lavičkou. Zapáľte uhlie, počkajte ~20 min kým sa vytvorí biely popol." },
        { id:"stove",     icon:"🪵", title:"Peletový krb",               text:"Krb Remeha v obývačke — na použitie v zime/na jar. Pelety v bielom vrecku vedľa. Stlačte vypínač, počkajte 10 min na zahrievanie." },
        { id:"washing",   icon:"🫧", title:"Práčka",                     text:"V kúpeľni. Prací prášok pod umývadlom. Štandardný cyklus 40°: vyberte Bavlna, nastavte 40°, stlačte Štart." },
        { id:"rules",     icon:"📋", title:"Domáci poriadok",            text:"Zákaz fajčenia vo vnútri · Nočný kľud 22:00–08:00 · Triedenie odpadu (kontajnery vonku) · Nepresúvajte nábytok · Nahláste poškodenie okamžite." },
        { id:"emergency", icon:"🆘", title:"Núdzové situácie",           text:"Tiesňové volanie: 112 · Hostiteľ: +39 XXX XXX XXXX · Nemocnica v Grado, Via Monfalcone 14." },
      ],
    },
    neighborhood: {
      title:"Okolie",
      sub:"Naše obľúbené miesta v okolí apartmánu.",
      categories:["Všetky","Pláž","Jedlo a nápoje","Nákupy","Služby"],
      places:[
        { cat:"Pláž",           name:"Spiaggia di Grado",    text:"Hlavná piesočnatá pláž, 5 min peši. Prenájom ležadiel alebo bezplatné zóny." },
        { cat:"Pláž",           name:"Spiaggia di Fossalon", text:"Divšia, pokojnejšia pláž južne od mesta. Ideálna pre rodiny." },
        { cat:"Jedlo a nápoje", name:"Trattoria de Toni",    text:"Legendárna rybia reštaurácia. Rybia polievka je povinnosť. Rezervácia v lete." },
        { cat:"Jedlo a nápoje", name:"Bar Grado",            text:"Naša ranná kaviareň. Dokonalé espresso a čerstvé croissanty." },
        { cat:"Jedlo a nápoje", name:"Gelateria Al Porto",   text:"Najlepšia zmrzlina v meste. Odporúčame chuť 'Laguna'." },
        { cat:"Nákupy",         name:"Mercato Coperto",      text:"Krytý trh s miestnou rybou, zeleninou a syrmi. Ráno, v nedeľu zatvorené." },
        { cat:"Nákupy",         name:"Supermarket Coop",     text:"Hlavný supermarket, 8 min peši. Denne 08:00–20:00." },
        { cat:"Služby",         name:"Farmacia Centrale",    text:"Lekáreň, Piazza Biagio Marin. Po–So 08:30–12:30, 16:00–19:30." },
      ],
    },
    grado: {
      title:"Grado",
      sub:"Starobylé ostrovné mesto na Jadranskej lagúne — známe ako 'Ostrov slnka'.",
      sections:[
        { title:"Staré mesto (Città Vecchia)", text:"Historické srdce Grado: dlážd. uličky, bazilika Santa Eufemia zo 6. stor. a rybárske lode v malom prístave." },
        { title:"Lagúna",                      text:"Grado leží na piesočnom brehu obklopenom plytkými lagúnami. Plavby loďou na lagúnové ostrovy, pozorovanie vtákov alebo tradičné rybárske výlety." },
        { title:"Pláže",                       text:"Grado má jedny z najkrajších piesočných pláží na Jadrane — pokojné, plytké vody ideálne pre deti." },
        { title:"Výlety",                      text:"Aquileia (10 min): rímske ruiny UNESCO. Terst (1 hod): habsburská elegancia, Hrad Miramare. Benátky (2 hod)." },
        { title:"Sezónne podujatia",           text:"Júl–aug: festival kvetov Grado in Fiore. September: Bardìa — tradičná lagúnová regata. Zima: ticho, skvelé na pozorovanie vtákov." },
      ],
    },
    findus: {
      title:"Kde nás nájdete",
      sub:"Apartmán L'Isola D'Oro, Grado (GO), Friuli Venezia Giulia, Taliansko.",
      address:"Via [Názov ulice], 34073 Grado (GO)",
      directions_title:"Ako sa dostať",
      directions:[
        { how:"Autom",      text:"Z Terstu: diaľnica A4 smer Benátky, výjazd Palmanova, potom smerovky na Grado (~1 hod). Z Benátok: A4 na východ, výjazd Latisana (~1,5 hod). Parkovanie na ulici (v lete spoplatnené)." },
        { how:"Autobusom",  text:"Autobusy APT Gorizia spájajú Grado s Triestom a Monfalcone. Z Terstu ~1,5 hod." },
        { how:"Vlakom",     text:"Najbližšia stanica: Cervignano-Aquileia-Grado (15 km). Miestne autobusy do centra Grado." },
      ],
      book_title:"Pripravení rezervovať?",
      book_text:"Skontrolujte dostupnosť a rezervujte na Booking.com.",
      book_cta:"Pozrieť na Booking.com ↗",
      contact:"Otázky? Kontaktujte hostiteľa:",
    },
    footer: { rights:"Všetky práva vyhradené.", made:"Vyrobené s ♥ v Grado." },
  },

  hu: {
    nav: { home:"Főoldal", house:"Az Apartman", guide:"Vendégkalauz", neighborhood:"Környék", grado:"Grado", findus:"Megközelítés" },
    home: {
      badge:"Grado · Friuli Venezia Giulia",
      title:"Apartman\nL'Isola D'Oro",
      sub:"Világos, karakteres apartman az Adriai-tenger mellett. Tökéletes választás családok és párok számára.",
      cta_house:"Fedezze fel az apartmant",
      cta_guide:"Vendégkalauz",
      book:"Foglaljon a Booking.com-on ↗",
      amenities:["Legfeljebb 5 fő","2 hálószoba","1 fürdőszoba","Wi-Fi díjmentes","Légkondicionáló","Külső terasz","Saját grill","5 perc a strandtól"],
      cards:[
        { title:"Az Apartman", text:"Két hálószoba, teljesen felszerelt konyha és karakteres terek — vintage csempék, műalkotások, színes részletek." },
        { title:"Vendégkalauz", text:"Minden, amire szüksége van: bejelentkezés, grill, TV távirányítók, háztartási gépek és házirendek." },
        { title:"A Környék", text:"Kedvenc strandjaink, éttermeink, bárjaink és boltjaink — Gradót jól ismerők ajánlásai." },
        { title:"Grado", text:"Óváros, lagúna, strandok. Kirándulások Triesztbe és Aquileiába. Szezonális programok és helyi tippek." },
      ],
    },
    house: {
      title:"Az Apartman",
      sub:"Két hálószoba, konyha, nappali, fürdőszoba és privát terasz grillel. Legfeljebb 5 vendég.",
      rooms:"Szobák",
      room_main:"Főhálószoba",       room_main_desc:"Franciaágy, rattan fejtámla, olívzöld szekrény, légkondicionáló.",
      room_kids:"Gyerekszoba",       room_kids_desc:"Emeletes ágy (franciaágy lent, egyszemélyes fent) + kihúzható egyszemélyes. Kék falak.",
      room_living:"Nappali",        room_living_desc:"Kanapé, nagy TV, pelletkályha, íróasztal, könyvespolc. Vintage Grado plakátok.",
      room_kitchen:"Konyha",        room_kitchen_desc:"Gáztűzhely, sütő, hűtő-fagyasztó, vízforraló, mokkafőző, kenyérpirító.",
      room_bath:"Fürdőszoba",       room_bath_desc:"Zuhany, WC, bidé, mosógép. Ablak a fenyőkertre.",
      room_terrace:"Külső terasz",  room_terrace_desc:"Árnyékos terasz kerti bútorokkal és privát fasén grillel.",
      amenities_title:"Mi van benne az árban",
      amenities:["Wi-Fi (gyors optikai)","Légkondicionáló (Mitsubishi)","Pelletkályha (tél)","Okos zár (kód)","Mosógép","Külső grill","Strandtörölközők","Gyerekszék elérhető"],
    },
    guide: {
      title:"Vendégkalauz",
      sub:"Minden, ami a zökkenőmentes tartózkodáshoz kell. Mentse el ezt az oldalt a telefonjára.",
      sections:[
        { id:"checkin",   icon:"🔑", title:"Bejelentkezés és kijelentkezés", text:"Az apartmanban okos kódzár van — nincs szükség kulcsátvételre. Személyes kódját az érkezés előtt elküldjük. Bejelentkezés 15:00-tól, kijelentkezés 10:00-ig." },
        { id:"wifi",      icon:"📶", title:"Wi-Fi és internet",              text:"Hálózat: IsolaOro_5G · Jelszó: adriatico2024" },
        { id:"aircon",    icon:"❄️",  title:"Légkondicionáló",               text:"Mitsubishi egység a hálószoba folyosóján. Távirányító az előszoba polcán. Hűtési mód: nyomja meg a COOL gombot, állítsa be a hőmérsékletet, nyomja meg az ON gombot." },
        { id:"tv",        icon:"📺", title:"Televízió és szórakozás",        text:"Smart TV a nappaliban. Fő távirányító a TV-szekrényen. Forrás váltása: nyomja meg a SOURCE gombot, válassza a HDMI-t vagy Smart TV alkalmazásokat (Netflix, Prime Video elérhető)." },
        { id:"kitchen",   icon:"🍳", title:"Konyha és háztartási gépek",    text:"Gáztűzhely: forgassa el a gombót és nyomja meg egyidejűleg a gyújtógombot. Vízforraló, mokkafőző és kenyérpirító a pulton." },
        { id:"grill",     icon:"🔥", title:"A Grill",                         text:"Faszéngrill a teraszon. Szén és gyújtós a pad alatti dobozban. Gyújtsa meg a szenet, várjon ~20 percet amíg fehér hamu képződik. Kérjük, használat után tisztítsa meg a grillt." },
        { id:"stove",     icon:"🪵", title:"Pelletkályha",                   text:"Remeha pelletkályha a nappaliban — téli/tavaszi használatra. Pellet a mellette lévő fehér zsákban. Nyomja meg a bekapcsológombot, várjon 10 percet az előmelegítésre." },
        { id:"washing",   icon:"🫧", title:"Mosógép",                       text:"A fürdőszobában. Mosószer a mosdó alatt. Standard 40°-os ciklus: válassza a Pamut programot, állítsa be a 40°-ot, nyomja meg az Indítás gombot." },
        { id:"rules",     icon:"📋", title:"Házirendek",                    text:"Tilos a dohányzás belül · Éjszakai csend 22:00–08:00 · Kérjük, végezzen szelektív hulladékgyűjtést · Ne mozgassa a bútorokat · A károkat azonnal jelezze." },
        { id:"emergency", icon:"🆘", title:"Vészhelyzetek",                 text:"Segélyhívó: 112 · Házigazda: +39 XXX XXX XXXX · Grado kórháza, Via Monfalcone 14." },
      ],
    },
    neighborhood: {
      title:"A Környék",
      sub:"Kedvenc helyeink az apartman körül.",
      categories:["Összes","Strand","Étkezés és italok","Bevásárlás","Szolgáltatások"],
      places:[
        { cat:"Strand",            name:"Spiaggia di Grado",    text:"Főstrand, 5 perces séta. Napozóágyak bérlése vagy ingyenes zónák." },
        { cat:"Strand",            name:"Spiaggia di Fossalon", text:"Vadabb, csendesebb strand a várostól délre. Ideális családok számára." },
        { cat:"Étkezés és italok", name:"Trattoria de Toni",    text:"Legendás halétterem. A halleves kötelező. Nyáron foglaljon előre." },
        { cat:"Étkezés és italok", name:"Bar Grado",            text:"A mi reggeli kávézónk. Tökéletes espresso és friss croissantok." },
        { cat:"Étkezés és italok", name:"Gelateria Al Porto",   text:"A legjobb fagylalt a városban. Próbálja a 'Laguna' ízét." },
        { cat:"Bevásárlás",        name:"Mercato Coperto",      text:"Fedett piac helyi hallal, zöldségekkel és sajtokkal. Reggel, vasárnap zárva." },
        { cat:"Bevásárlás",        name:"Coop Szupermarket",    text:"Főszupermarket, 8 perces séta. Naponta 08:00–20:00." },
        { cat:"Szolgáltatások",    name:"Farmacia Centrale",    text:"Gyógyszertár, Piazza Biagio Marin. H–Szo 08:30–12:30, 16:00–19:30." },
      ],
    },
    grado: {
      title:"Grado",
      sub:"Ókori szigetváros az Adriai lagúnán — 'A Nap Szigete' névvel is ismert.",
      sections:[
        { title:"Óváros (Città Vecchia)", text:"Grado történelmi szíve: macskakövek, a 6. századi Santa Eufemia bazilika és halászhajók a kis kikötőben." },
        { title:"A Lagúna",              text:"Grado egy sekély lagúna által körülvett homokpadra települt. Csónaktúrák a lagúnaszigetekre, madármegfigyelés vagy hagyományos halászkirándulás." },
        { title:"Strandok",              text:"Grado az Adriai-tenger egyik legszebb homokos strandjait kínálja — nyugodt, sekély vizek, gyerekeknek ideális." },
        { title:"Kirándulások",          text:"Aquileia (10 perc): UNESCO-s római romok. Trieszt (1 óra): Habsburg elegancia, Miramare kastély. Velence (2 óra)." },
        { title:"Szezonális programok",  text:"Július–augusztus: Grado in Fiore virágfesztivál. Szeptember: Bardìa — hagyományos lagúna-regatta. Tél: csend, kiváló madármegfigyelésre." },
      ],
    },
    findus: {
      title:"Megközelítés",
      sub:"L'Isola D'Oro Apartman, Grado (GO), Friuli Venezia Giulia, Olaszország.",
      address:"Via [Utca neve], 34073 Grado (GO)",
      directions_title:"Hogyan juthat ide",
      directions:[
        { how:"Autóval",    text:"Triesztből: A4 autópálya Velence felé, Palmanova lehajtó, majd Grado táblák követése (~1 óra). Velencéből: A4 keletre, Latisana lehajtó (~1,5 óra). Utcai parkolás (nyáron fizetős)." },
        { how:"Busszal",    text:"APT Gorizia buszok kötik össze Gradót Trieszttel és Monfalconéval. Triesztből ~1,5 óra." },
        { how:"Vonattal",   text:"Legközelebbi állomás: Cervignano-Aquileia-Grado (15 km). Helyi buszok a városközpontba." },
      ],
      book_title:"Készen áll a foglalásra?",
      book_text:"Ellenőrizze az elérhetőséget és foglaljon a Booking.com-on.",
      book_cta:"Megnézem a Booking.com-on ↗",
      contact:"Kérdése van? Lépjen kapcsolatba a házigazdával:",
    },
    footer: { rights:"Minden jog fenntartva.", made:"Szeretettel készítve Gradoban." },
  },
};

// ─── COMPONENTS ────────────────────────────────────────────────────────────────

function Wave({ color = C.white, flip = false }) {
  return (
    <svg viewBox="0 0 1200 60" preserveAspectRatio="none"
      style={{ display:"block", width:"100%", height:40, transform: flip ? "scaleY(-1)" : "none" }}>
      <path d="M0,30 C200,0 400,60 600,30 C800,0 1000,60 1200,30 L1200,60 L0,60 Z" fill={color} />
    </svg>
  );
}

function Nav({ page, setPage, lang, setLang, t, showLangMenu, setShowLangMenu }) {
  return (
    <nav style={{ background:C.navy, position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 12px rgba(0,0,0,0.2)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center", height:56, gap:8 }}>
        <button onClick={() => setPage("home")} style={{ background:"none", border:"none", cursor:"pointer",
          fontFamily:"Georgia, serif", fontSize:16, fontWeight:700, color:C.white,
          fontStyle:"italic", letterSpacing:"0.3px", padding:0, marginRight:16, flexShrink:0 }}>
          L'Isola D'Oro
        </button>
        <div style={{ display:"flex", gap:2, flex:1, flexWrap:"wrap" }}>
          {Object.entries(t.nav).map(([key, label]) => (
            <button key={key} onClick={() => setPage(key)} style={{
              background: page === key ? `${C.yellow}22` : "none",
              border:"none", cursor:"pointer", padding:"6px 10px", borderRadius:4,
              fontSize:12, color: page === key ? C.yellow : "#b0c8e4",
              fontWeight: page === key ? 600 : 400, transition:"all 0.15s",
            }}>{label}</button>
          ))}
        </div>
        <div style={{ position:"relative", flexShrink:0 }}>
          <button onClick={() => setShowLangMenu(!showLangMenu)} style={{
            background: showLangMenu ? `${C.yellow}22` : "none", border:`1px solid ${C.yellow}66`,
            borderRadius:6, cursor:"pointer", padding:"5px 10px", display:"flex", alignItems:"center", gap:6,
            color:C.yellow, fontSize:12, fontWeight:600,
          }}>
            {LANGS.find(l => l.code === lang)?.flag} {lang.toUpperCase()} ▾
          </button>
          {showLangMenu && (
            <div style={{ position:"absolute", right:0, top:"calc(100% + 4px)", background:C.navy,
              border:`1px solid ${C.yellow}44`, borderRadius:8, overflow:"hidden", minWidth:140,
              boxShadow:"0 8px 24px rgba(0,0,0,0.3)", zIndex:200 }}>
              {LANGS.map(l => (
                <button key={l.code} onClick={() => { setLang(l.code); setShowLangMenu(false); }} style={{
                  display:"flex", alignItems:"center", gap:8, width:"100%", padding:"9px 14px",
                  background: lang === l.code ? `${C.yellow}22` : "none",
                  border:"none", cursor:"pointer", fontSize:13,
                  color: lang === l.code ? C.yellow : "#b0c8e4", textAlign:"left",
                }}>
                  <span style={{ fontSize:16 }}>{l.flag}</span> {l.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function HomePage({ t, setPage }) {
  const h = t.home;
  return (
    <div>
      {/* Hero */}
      <div style={{ background:C.blue, paddingTop:64, paddingBottom:0, position:"relative", overflow:"hidden" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 24px 40px", display:"flex", alignItems:"flex-end", gap:48 }}>
          <div style={{ flex:1 }}>
            <div style={{ display:"inline-block", background:`${C.yellow}33`, color:C.yellow,
              fontSize:11, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase",
              padding:"4px 12px", borderRadius:4, marginBottom:20 }}>{h.badge}</div>
            <h1 style={{ fontFamily:"Georgia, serif", fontSize:48, fontWeight:700, color:C.white,
              lineHeight:1.1, margin:"0 0 16px", fontStyle:"italic" }}>
              {h.title.split("\n").map((l,i) => <span key={i}>{l}{i===0 && <br/>}</span>)}
            </h1>
            <p style={{ fontSize:16, color:C.blueLight, lineHeight:1.7, maxWidth:480, margin:"0 0 28px" }}>{h.sub}</p>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <button onClick={() => setPage("house")} style={{
                background:C.yellow, color:C.navy, border:"none", borderRadius:6,
                padding:"12px 24px", fontSize:14, fontWeight:700, cursor:"pointer" }}>{h.cta_house}</button>
              <button onClick={() => setPage("guide")} style={{
                background:"none", color:C.white, border:`1.5px solid ${C.white}66`,
                borderRadius:6, padding:"12px 24px", fontSize:14, cursor:"pointer" }}>{h.cta_guide}</button>
              <a href="https://booking.com" target="_blank" rel="noreferrer" style={{
                background:"none", color:C.yellow, border:`1.5px solid ${C.yellow}66`,
                borderRadius:6, padding:"12px 24px", fontSize:14, textDecoration:"none", display:"inline-flex", alignItems:"center" }}>{h.book}</a>
            </div>
          </div>
          <div style={{ flexShrink:0, display:"flex", flexDirection:"column", gap:8, paddingBottom:8 }}>
            {h.amenities.slice(0,4).map((a,i) => (
              <div key={i} style={{ background:`${C.white}15`, border:`1px solid ${C.white}22`,
                borderRadius:6, padding:"8px 14px", fontSize:12, color:C.blueLight,
                display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:C.yellow, flexShrink:0 }} />{a}
              </div>
            ))}
          </div>
        </div>
        <Wave color={C.cream} />
      </div>

      {/* Amenities strip */}
      <div style={{ background:C.cream }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"16px 24px", display:"flex", gap:10, flexWrap:"wrap" }}>
          {h.amenities.slice(4).map((a,i) => (
            <span key={i} style={{ background:C.white, border:`1px solid ${C.border}`,
              borderRadius:20, padding:"5px 14px", fontSize:12, color:C.textMid,
              display:"flex", alignItems:"center", gap:6 }}>
              <span style={{ width:5, height:5, borderRadius:"50%", background:C.blue }} />{a}
            </span>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      <div style={{ background:C.cream, padding:"48px 0 64px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 24px",
          display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px,1fr))", gap:20 }}>
          {h.cards.map((card, i) => {
            const pages = ["house","guide","neighborhood","grado"];
            return (
              <button key={i} onClick={() => setPage(pages[i])} style={{
                background:C.white, border:`1px solid ${C.border}`, borderRadius:12,
                padding:"24px", textAlign:"left", cursor:"pointer", transition:"all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ width:32, height:4, background:C.yellow, borderRadius:2, marginBottom:14 }} />
                <div style={{ fontSize:15, fontWeight:700, color:C.navy, marginBottom:8, fontFamily:"Georgia, serif" }}>{card.title}</div>
                <div style={{ fontSize:13, color:C.textMid, lineHeight:1.6 }}>{card.text}</div>
                <div style={{ marginTop:14, fontSize:12, color:C.blue, fontWeight:600 }}>→</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function HousePage({ t }) {
  const h = t.house;
  const rooms = [
    { k:"room_main", emoji:"🛏" }, { k:"room_kids", emoji:"🛏" },
    { k:"room_living", emoji:"🛋" }, { k:"room_kitchen", emoji:"🍳" },
    { k:"room_bath", emoji:"🚿" }, { k:"room_terrace", emoji:"🌿" },
  ];
  return (
    <div style={{ background:C.cream, minHeight:"60vh", padding:"48px 0 64px" }}>
      <div style={{ maxWidth:900, margin:"0 auto", padding:"0 24px" }}>
        <div style={{ width:40, height:4, background:C.yellow, borderRadius:2, marginBottom:16 }} />
        <h1 style={{ fontFamily:"Georgia, serif", fontSize:36, color:C.navy, margin:"0 0 12px", fontStyle:"italic" }}>{h.title}</h1>
        <p style={{ fontSize:15, color:C.textMid, lineHeight:1.7, maxWidth:640, margin:"0 0 40px" }}>{h.sub}</p>
        <h2 style={{ fontSize:18, color:C.navy, fontWeight:600, margin:"0 0 20px" }}>{h.rooms}</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px,1fr))", gap:16, marginBottom:40 }}>
          {rooms.map(({k, emoji}) => (
            <div key={k} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:12, padding:"20px" }}>
              <div style={{ fontSize:20, marginBottom:8 }}>{emoji}</div>
              <div style={{ fontSize:14, fontWeight:600, color:C.navy, marginBottom:6 }}>{h[k]}</div>
              <div style={{ fontSize:13, color:C.textMid, lineHeight:1.6 }}>{h[k+"_desc"]}</div>
            </div>
          ))}
        </div>
        <div style={{ background:C.bluePale, border:`1px solid ${C.border}`, borderRadius:12, padding:"24px" }}>
          <h2 style={{ fontSize:16, fontWeight:600, color:C.navy, margin:"0 0 16px" }}>{h.amenities_title}</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px,1fr))", gap:8 }}>
            {h.amenities.map((a,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:C.textMid }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:C.blue, flexShrink:0 }} />{a}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GuidePage({ t }) {
  const [open, setOpen] = useState(null);
  const h = t.guide;
  return (
    <div style={{ background:C.cream, minHeight:"60vh", padding:"48px 0 64px" }}>
      <div style={{ maxWidth:800, margin:"0 auto", padding:"0 24px" }}>
        <div style={{ width:40, height:4, background:C.yellow, borderRadius:2, marginBottom:16 }} />
        <h1 style={{ fontFamily:"Georgia, serif", fontSize:36, color:C.navy, margin:"0 0 12px", fontStyle:"italic" }}>{h.title}</h1>
        <p style={{ fontSize:15, color:C.textMid, lineHeight:1.7, margin:"0 0 36px" }}>{h.sub}</p>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {h.sections.map(s => (
            <div key={s.id} style={{ background:C.white, border:`1px solid ${open===s.id ? C.blue : C.border}`,
              borderRadius:10, overflow:"hidden", transition:"border-color 0.2s" }}>
              <button onClick={() => setOpen(open===s.id ? null : s.id)} style={{
                width:"100%", padding:"16px 20px", background:"none", border:"none", cursor:"pointer",
                display:"flex", alignItems:"center", gap:12, textAlign:"left",
              }}>
                <span style={{ fontSize:18, flexShrink:0 }}>{s.icon}</span>
                <span style={{ fontSize:14, fontWeight:600, color:C.navy, flex:1 }}>{s.title}</span>
                <span style={{ color:C.textLight, fontSize:16, transform: open===s.id ? "rotate(180deg)" : "none", transition:"transform 0.2s" }}>▾</span>
              </button>
              {open===s.id && (
                <div style={{ padding:"0 20px 18px 50px", fontSize:14, color:C.textMid, lineHeight:1.7 }}>{s.text}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NeighborhoodPage({ t }) {
  const [cat, setCat] = useState(0);
  const h = t.neighborhood;
  const filtered = cat === 0 ? h.places : h.places.filter(p => p.cat === h.categories[cat]);
  return (
    <div style={{ background:C.cream, minHeight:"60vh", padding:"48px 0 64px" }}>
      <div style={{ maxWidth:900, margin:"0 auto", padding:"0 24px" }}>
        <div style={{ width:40, height:4, background:C.yellow, borderRadius:2, marginBottom:16 }} />
        <h1 style={{ fontFamily:"Georgia, serif", fontSize:36, color:C.navy, margin:"0 0 12px", fontStyle:"italic" }}>{h.title}</h1>
        <p style={{ fontSize:15, color:C.textMid, lineHeight:1.7, margin:"0 0 28px" }}>{h.sub}</p>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:28 }}>
          {h.categories.map((c,i) => (
            <button key={i} onClick={() => setCat(i)} style={{
              padding:"6px 16px", borderRadius:20, fontSize:12, cursor:"pointer", border:"1px solid",
              borderColor: cat===i ? C.blue : C.border,
              background: cat===i ? C.bluePale : C.white,
              color: cat===i ? C.navy : C.textMid, fontWeight: cat===i ? 600 : 400,
            }}>{c}</button>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px,1fr))", gap:16 }}>
          {filtered.map((p,i) => (
            <div key={i} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:10, padding:"18px 20px" }}>
              <div style={{ fontSize:11, fontWeight:600, color:C.blue, letterSpacing:"1px",
                textTransform:"uppercase", marginBottom:6 }}>{p.cat}</div>
              <div style={{ fontSize:14, fontWeight:700, color:C.navy, marginBottom:6 }}>{p.name}</div>
              <div style={{ fontSize:13, color:C.textMid, lineHeight:1.6 }}>{p.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GradoPage({ t }) {
  const h = t.grado;
  return (
    <div style={{ background:C.cream, minHeight:"60vh", padding:"48px 0 64px" }}>
      <div style={{ maxWidth:800, margin:"0 auto", padding:"0 24px" }}>
        <div style={{ width:40, height:4, background:C.yellow, borderRadius:2, marginBottom:16 }} />
        <h1 style={{ fontFamily:"Georgia, serif", fontSize:36, color:C.navy, margin:"0 0 12px", fontStyle:"italic" }}>{h.title}</h1>
        <p style={{ fontSize:15, color:C.textMid, lineHeight:1.7, margin:"0 0 40px" }}>{h.sub}</p>
        <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
          {h.sections.map((s,i) => (
            <div key={i} style={{ display:"flex", gap:20 }}>
              <div style={{ width:4, background: i===0 ? C.yellow : i===1 ? C.blue : i===2 ? "#6B8F71" : C.navy,
                borderRadius:2, flexShrink:0, minHeight:60 }} />
              <div>
                <div style={{ fontSize:16, fontWeight:700, color:C.navy, marginBottom:8, fontFamily:"Georgia, serif" }}>{s.title}</div>
                <div style={{ fontSize:14, color:C.textMid, lineHeight:1.7 }}>{s.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FindUsPage({ t }) {
  const h = t.findus;
  return (
    <div style={{ background:C.cream, minHeight:"60vh", padding:"48px 0 64px" }}>
      <div style={{ maxWidth:800, margin:"0 auto", padding:"0 24px" }}>
        <div style={{ width:40, height:4, background:C.yellow, borderRadius:2, marginBottom:16 }} />
        <h1 style={{ fontFamily:"Georgia, serif", fontSize:36, color:C.navy, margin:"0 0 12px", fontStyle:"italic" }}>{h.title}</h1>
        <p style={{ fontSize:15, color:C.textMid, lineHeight:1.7, margin:"0 0 8px" }}>{h.sub}</p>
        <p style={{ fontSize:14, color:C.blue, fontWeight:600, margin:"0 0 36px" }}>{h.address}</p>

        {/* Map placeholder */}
        <div style={{ background:`${C.blue}15`, border:`1px solid ${C.border}`, borderRadius:12,
          height:220, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:36,
          position:"relative", overflow:"hidden" }}>
          <div style={{ textAlign:"center", color:C.textLight }}>
            <div style={{ fontSize:32, marginBottom:8 }}>📍</div>
            <div style={{ fontSize:13 }}>Grado, Friuli Venezia Giulia</div>
            <div style={{ fontSize:12, marginTop:4 }}>34073 Grado (GO), Italy</div>
          </div>
        </div>

        <h2 style={{ fontSize:18, fontWeight:600, color:C.navy, margin:"0 0 16px" }}>{h.directions_title}</h2>
        <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:40 }}>
          {h.directions.map((d,i) => (
            <div key={i} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:10, padding:"16px 20px", display:"flex", gap:16 }}>
              <div style={{ fontWeight:700, color:C.blue, fontSize:13, minWidth:80, flexShrink:0 }}>{d.how}</div>
              <div style={{ fontSize:13, color:C.textMid, lineHeight:1.65 }}>{d.text}</div>
            </div>
          ))}
        </div>

        <div style={{ background:C.navy, borderRadius:12, padding:"28px", textAlign:"center" }}>
          <div style={{ fontSize:20, fontWeight:700, color:C.white, marginBottom:8, fontFamily:"Georgia, serif", fontStyle:"italic" }}>{h.book_title}</div>
          <div style={{ fontSize:14, color:C.blueLight, marginBottom:20 }}>{h.book_text}</div>
          <a href="https://booking.com" target="_blank" rel="noreferrer" style={{
            display:"inline-block", background:C.yellow, color:C.navy, fontWeight:700,
            padding:"12px 28px", borderRadius:6, textDecoration:"none", fontSize:14 }}>{h.book_cta}</a>
        </div>
      </div>
    </div>
  );
}

function Footer({ t, lang }) {
  const f = t.footer;
  return (
    <footer style={{ background:C.navy, borderTop:`2px solid ${C.yellow}33`, padding:"28px 24px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", justifyContent:"space-between",
        alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <div style={{ fontFamily:"Georgia, serif", fontSize:15, color:C.white, fontStyle:"italic" }}>
          Apartment L'Isola D'Oro
        </div>
        <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
          <span style={{ fontSize:12, color:"#6a8aaa" }}>© 2025 {f.rights}</span>
          <span style={{ fontSize:12, color:"#6a8aaa" }}>{f.made}</span>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ────────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("home");
  const [lang, setLang] = useState("en");
  const [showLangMenu, setShowLangMenu] = useState(false);

  const t = T[lang] || T.en;

  const pages = { home: HomePage, house: HousePage, guide: GuidePage,
    neighborhood: NeighborhoodPage, grado: GradoPage, findus: FindUsPage };
  const PageComponent = pages[page] || HomePage;

  return (
    <div style={{ minHeight:"100vh", background:C.cream, fontFamily:"system-ui, sans-serif" }}
      onClick={() => showLangMenu && setShowLangMenu(false)}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400;1,600&display=swap'); * { box-sizing: border-box; margin: 0; }`}</style>
      <Nav page={page} setPage={setPage} lang={lang} setLang={setLang} t={t}
        showLangMenu={showLangMenu} setShowLangMenu={(v) => { v ? setShowLangMenu(true) : setShowLangMenu(false); }} />
      <PageComponent t={t} setPage={setPage} />
      <Footer t={t} lang={lang} />
    </div>
  );
}
