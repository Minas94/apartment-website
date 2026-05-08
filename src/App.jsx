import { useState, useEffect } from "react";

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

// Category colors indexed by position in h.categories: [All, Beach, Food&Drink, IceCream, Parks, Activities, Shopping, Services]
const CAT_COLOR = ["#3B7FC4","#1589A0","#C2622A","#B0598A","#4A7C59","#B03A2E","#7B5EA7","#4A6F8A"];
const CAT_PALE  = ["#eef5fc","#E8F6FA","#FBF0EB","#F9EDF5","#EDF4EF","#FBEEED","#F3EFF9","#EDF2F6"];

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
    nav: { home:"Home", house:"The Apartment", guide:"Guest Guide", neighborhood:"Local Guide", grado:"Grado", findus:"Find Us" },
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
        { title:"Local Guide", text:"Our favourite beaches, restaurants, bars, and shops — curated picks from people who know Grado well." },
        { title:"Grado", text:"The old town, the lagoon, the beaches. Day trips to Trieste and Aquileia. Seasonal events and local tips." },
      ],
    },
    house: {
      title:"The Apartment",
      sub:"Two bedrooms, a fully equipped kitchen, living area, bathroom, and a private outdoor terrace with grill. Space for up to 5 guests.",
      rooms:"Rooms",
      room_main:"Master Bedroom",
      room_main_desc:"Double bed, rattan headboard, olive green wardrobe, air conditioning.",
      room_kids:"Kids' Bedroom",
      room_kids_desc:"Bunk bed (double below, single above) plus pull-out single. Blue walls, built-in wardrobe.",
      room_living:"Living Room",
      room_living_desc:"Sofa, large TV, pellet stove, desk area, bookshelf with books and board games.",
      room_kitchen:"Kitchen",
      room_kitchen_desc:"Gas hob, fridge-freezer, moka, dishwasher. Opens onto the terrace.",
      room_bath:"Bathroom",
      room_bath_desc:"Shower, toilet, bidet. Window overlooking the pine garden.",
      room_terrace:"Outdoor Terrace",
      room_terrace_desc:"Shaded terrace with outdoor furniture, outdoor kitchenette and washing machine. Perfect for summer evenings.",
      room_veranda:"Veranda – Dining & Relax",
      room_veranda_desc:"Covered outdoor veranda connecting the living area to the terrace. A relaxing spot for morning coffee or an afternoon read.",
      room_parking:"Private Parking & Bikes",
      room_parking_desc:"Covered private parking space included with your stay. No need to worry about finding a spot in busy summer months.",
      amenities_title:"What's included",
      amenities:["Wi-Fi (fast fibre)","Air conditioning","Private parking","3 bikes","Dishwasher","Washing machine","External kitchenette","Pellet stove (winter)","Smart door lock (code entry)","Baby crib available","Highchair available","Beach towels"],
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
      title:"Local Guide",
      sub:"Our favourite spots around the apartment — handpicked recommendations from people who know Grado.",
      disclaimer:"We have no affiliation with any of the businesses listed here and receive no compensation for these mentions. These are simply the places we genuinely visit when in Grado.",
      intro:"The apartment sits at the gateway to Grado's Città Giardino — a peaceful residential district, just a short walk from both the beach and the old town, without being in the middle of the summer chaos. The only park in the area, Parco delle Rose, lies right between the apartment and the city centre: a shaded, pleasant path we highly recommend for the stroll into town.",
      categories:["All","Beach","Food & Drink","Ice Cream","Parks","Activities","Shopping","Services"],
      places:[
        { cat:"Beach", name:"Spiaggia Nuova",   text:"Full-service lido just 200 m from the apartment. Sun loungers, umbrellas, showers, beach bar and playground. Entrance fee applies.", map:"https://maps.app.goo.gl/MtKtu3JCe3Q2r6uP6" },
        { cat:"Beach", name:"Spiaggia le Dune", text:"Free sandy beach in the dunes area, a 5-minute walk. Less crowded, no service — great for a more natural beach day.", map:"https://maps.app.goo.gl/Ry9VRm9H4xsR5vYg9" },
        { cat:"Beach", name:"Grado Pineta",     text:"Quiet beach by the pine forest, a 15-minute walk. Free entry, less touristy — a lovely spot away from the summer crowds.", map:"https://maps.app.goo.gl/9nhHTviUEfkmn43M7" },
        { cat:"Beach", name:"Dog Beach",        text:"Designated dog-friendly beach — dogs welcome in the water. Free entry. A great spot for guests travelling with four-legged friends.", map:"https://maps.app.goo.gl/vtqeMwiHwZu6Hw2w7" },
        { cat:"Food & Drink", name:"Pizza & Döner",          text:"Pizza slices and doner — great for a quick bite or a late-night snack on the way back to the apartment.", map:"https://maps.app.goo.gl/sS7rN91fMvdcUk3Z8" },
        { cat:"Food & Drink", name:"La Ciacolada",           text:"Neapolitan-style pizza. Excellent quality but gets very busy — be prepared to wait for a table.", map:"https://maps.app.goo.gl/NyDTmGYx1ABagjvt7" },
        { cat:"Food & Drink", name:"Bistrot Ratatouille",    text:"In our opinion one of the best spots in Grado, just 1 minute from the apartment. Fresh food, good quality and very reasonably priced. Great for lunch or dinner.", map:"https://maps.app.goo.gl/9whmgsj1WkGLmA5y5" },
        { cat:"Food & Drink", name:"Mandracchio Bistrot",    text:"In the port area. Fresh food and good quality at a very reasonable price.", map:"https://maps.app.goo.gl/ZUWQKheoKZ5Fy5cM9" },
        { cat:"Food & Drink", name:"Cardamomo",              text:"Upscale restaurant — ideal for an intimate dinner or a special occasion.", map:"https://maps.app.goo.gl/rUdDRQQ5H4icm2Q56" },
        { cat:"Food & Drink", name:"Tavernetta all'Androna", text:"A hidden gem tucked in a narrow alley of the old town. Elegant yet cozy, with a warm atmosphere and refined local cuisine — the perfect choice for a special evening.", map:"https://maps.app.goo.gl/4Ne5VEDhmT1ShBU8A" },
        { cat:"Food & Drink", name:"Là de le Vele",          text:"In the old town with a lovely view. A great setting for a relaxed meal.", map:"https://maps.app.goo.gl/MhMj8CLKZGdUbSeU9" },
        { cat:"Food & Drink", name:"Il Panino",              text:"The go-to spot for fried calamari to take away. A perfect snack while strolling through town.", map:"https://maps.app.goo.gl/n9gZ3PryWwMGQHwEA" },
        { cat:"Ice Cream",    name:"Antoniazzi Gelateria",   text:"The best gelato in Grado in our opinion — the only one we truly recommend. Expect a short queue, absolutely worth the wait.", map:"https://maps.app.goo.gl/gh6AauQ8VAr36diTA" },
        { cat:"Parks",        name:"Parco delle Rose",       text:"The only park in the area, right on the path between the apartment and the old town. Lovely shade and calm — we always recommend walking through it.", map:"https://maps.app.goo.gl/c32dWytXqCYcWkYr6" },
        { cat:"Activities",   name:"Kite Life",              text:"Kitesurfing school and equipment rental. Great whether you want to learn from scratch or just hire gear for the day.", map:"https://maps.app.goo.gl/pLhPJ92ZbWFoiy7G8" },
        { cat:"Activities",   name:"Terme Marine Di Grado",  text:"Heated seawater pools — including a rooftop pool — thermal baths, and spa. A genuine highlight of Grado, especially worth a visit in shoulder season.", map:"https://maps.app.goo.gl/rZp3p2xKHNHAm3rT6" },
        { cat:"Shopping",     name:"Supermarket",            text:"The closest supermarket to the apartment.", map:"https://maps.app.goo.gl/NR6rGyvmExya86tW6" },
        { cat:"Services",     name:"Post Office & ATM",      text:"The closest post office and ATM to the apartment.", map:"https://maps.app.goo.gl/hMEyPqYB2DiSGXdN8" },
        { cat:"Services",     name:"Pharmacy",               text:"The closest pharmacy to the apartment.", map:"https://maps.app.goo.gl/TiX3iEqZcctxs1vq9" },
      ],
    },
    grado: {
      title:"Grado",
      sub:"Ancient island city on the Adriatic lagoon — known as the 'Island of the Sun'. Roman heritage, golden beaches, and a living fishing tradition.",
      eventsLink:"Full events calendar →",
      sections:[
        { title:"Old Town (Città Vecchia)",  text:"The ancient heart of Grado: narrow cobblestone calli, the 6th-century Basilica di Santa Eufemia, and fishing boats in the small harbour. Perfect for an evening stroll." },
        { title:"The Lagoon",               text:"Grado sits on a sandbar surrounded by a shallow lagoon. Take a boat trip to the lagoon islands, spot herons and egrets, or join a traditional fishing tour." },
        { title:"The Beaches",              text:"Grado has some of the finest sandy beaches on the Adriatic — calm, shallow waters make them ideal for children. The main beach stretches for kilometres westward." },
        { title:"Barbana",                  text:"A tiny island sanctuary in the Grado lagoon, reachable only by boat. Its Marian basilica dates back to the 7th century, making it one of the oldest pilgrimage sites in the Adriatic. A peaceful, quietly beautiful trip — boats leave regularly from the harbour." },
        { title:"Day Trips",                text:"Aquileia (10 min): UNESCO Roman ruins and the stunning basilica. Palmanova (35 min): a perfectly preserved Renaissance star-shaped fortress city and UNESCO World Heritage Site. Trieste (1 hr): Habsburg elegance, great coffee, and the Castello di Miramare. Venice (2 hr by car or boat bus)." },
        { title:"Seasonal Events",          text:"July–August: Grado in Fiore flower festival, evening markets in the old town. September: Bardìa, the traditional lagoon boat race. Winter: quiet season, excellent for birdwatching." },
      ],
    },
    findus: {
      title:"Find Us",
      sub:"Apartment L'Isola D'Oro, Grado (GO), Friuli Venezia Giulia, Italy.",
      address:"Viale Italia 28, 34073 Grado (GO)",
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
    nav: { home:"Home", house:"L'Appartamento", guide:"Guida Ospiti", neighborhood:"Guida Locale", grado:"Grado", findus:"Dove Siamo" },
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
        { title:"Guida Locale", text:"Le nostre spiagge, ristoranti, bar e negozi preferiti — selezione curata da chi conosce bene Grado." },
        { title:"Grado", text:"Il centro storico, la laguna, le spiagge. Gite a Trieste e Aquileia. Eventi stagionali e consigli locali." },
      ],
    },
    house: {
      title:"L'Appartamento",
      sub:"Due camere, cucina attrezzata, soggiorno, bagno e terrazza privata con grill. Fino a 5 ospiti.",
      rooms:"Le Stanze",
      room_main:"Camera Matrimoniale",       room_main_desc:"Letto matrimoniale, testiera in rattan, armadio verde oliva, aria condizionata.",
      room_kids:"Camera Bambini",            room_kids_desc:"Letto a castello (matrimoniale sotto, singolo sopra) più singolo estraibile. Pareti blu, armadio a muro.",
      room_living:"Soggiorno", room_living_desc:"Divano, TV grande, stufa a pellet, scrivania, libreria con libri e giochi da tavolo.",
      room_kitchen:"Cucina",               room_kitchen_desc:"Piano cottura a gas, frigo-congelatore, moka, lavastoviglie. Si apre sulla terrazza.",
      room_bath:"Bagno",                   room_bath_desc:"Doccia, wc, bidet. Finestra sul giardino di pini.",
      room_terrace:"Terrazza Esterna",     room_terrace_desc:"Terrazza ombreggiata con arredi da esterno, cucina esterna e lavatrice. Perfetta per le serate estive.",
      room_veranda:"Veranda – Pranzo & Relax",room_veranda_desc:"Veranda coperta che collega il soggiorno alla terrazza. Angolo relax ideale per il caffè mattutino o una lettura pomeridiana.",
      room_parking:"Parcheggio Privato & Bici",   room_parking_desc:"Posto auto coperto privato incluso nel soggiorno. Nessun problema con il parcheggio nei mesi estivi affollati.",
      amenities_title:"Cosa è incluso",
      amenities:["Wi-Fi (fibra veloce)","Aria condizionata","Parcheggio privato","3 biciclette","Lavastoviglie","Lavatrice","Cucina esterna","Stufa a pellet (inverno)","Serratura smart (codice)","Lettino per neonati disponibile","Seggiolone disponibile","Asciugamani da spiaggia"],
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
      title:"Guida Locale",
      sub:"I nostri posti preferiti — selezione curata di chi conosce Grado.",
      disclaimer:"Non siamo affiliati ad alcuna delle attività elencate e non riceviamo alcun compenso per queste menzioni. Sono semplicemente i posti che frequentiamo davvero quando siamo a Grado.",
      intro:"L'appartamento si trova all'ingresso della Città Giardino di Grado — un quartiere residenziale tranquillo, a pochi passi dalla spiaggia e dal centro storico, lontano dal caos estivo. L'unico parco della zona, il Parco delle Rose, si trova proprio tra l'appartamento e il centro: un percorso ombreggiato e rilassante che consigliamo vivamente per la passeggiata verso il centro.",
      categories:["Tutti","Spiaggia","Cibo e Bevande","Gelato","Parchi","Attività","Shopping","Servizi"],
      places:[
        { cat:"Spiaggia", name:"Spiaggia Nuova",   text:"Lido attrezzato a soli 200 m dall'appartamento. Lettini, ombrelloni, docce, bar spiaggia e parco giochi. Ingresso a pagamento.", map:"https://maps.app.goo.gl/MtKtu3JCe3Q2r6uP6" },
        { cat:"Spiaggia", name:"Spiaggia le Dune", text:"Spiaggia libera nella zona delle dune, a 5 minuti a piedi. Meno affollata, senza servizi — ideale per una giornata più naturale.", map:"https://maps.app.goo.gl/Ry9VRm9H4xsR5vYg9" },
        { cat:"Spiaggia", name:"Grado Pineta",     text:"Spiaggia tranquilla vicino alla pineta, a 15 minuti a piedi. Ingresso gratuito, meno turistica — perfetta per staccare dalla folla estiva.", map:"https://maps.app.goo.gl/9nhHTviUEfkmn43M7" },
        { cat:"Spiaggia", name:"Dog Beach",        text:"Spiaggia dedicata ai cani — benvenuti in acqua. Ingresso gratuito. Ideale per chi viaggia con amici a quattro zampe.", map:"https://maps.app.goo.gl/vtqeMwiHwZu6Hw2w7" },
        { cat:"Cibo e Bevande", name:"Pizza & Döner",          text:"Pizza al trancio e kebab — perfetto per uno spuntino veloce o uno snack serale tornando all'appartamento.", map:"https://maps.app.goo.gl/sS7rN91fMvdcUk3Z8" },
        { cat:"Cibo e Bevande", name:"La Ciacolada",           text:"Pizza in stile napoletano. Ottima qualità ma sempre piena — preparatevi ad aspettare.", map:"https://maps.app.goo.gl/NyDTmGYx1ABagjvt7" },
        { cat:"Cibo e Bevande", name:"Bistrot Ratatouille",    text:"Uno dei migliori posti di Grado secondo noi, a 1 minuto dall'appartamento. Cibo fresco, buona qualità e prezzi ragionevoli. Ottimo per pranzo e cena.", map:"https://maps.app.goo.gl/9whmgsj1WkGLmA5y5" },
        { cat:"Cibo e Bevande", name:"Mandracchio Bistrot",    text:"Nella zona del porto. Cibo fresco e buona qualità a un prezzo molto ragionevole.", map:"https://maps.app.goo.gl/ZUWQKheoKZ5Fy5cM9" },
        { cat:"Cibo e Bevande", name:"Cardamomo",              text:"Ristorante raffinato — ideale per una cena intima o un'occasione speciale.", map:"https://maps.app.goo.gl/rUdDRQQ5H4icm2Q56" },
        { cat:"Cibo e Bevande", name:"Tavernetta all'Androna", text:"Un gioiello nascosto in un vicolo del centro storico. Elegante e accogliente, con un'atmosfera calda e cucina locale raffinata — la scelta perfetta per una serata speciale.", map:"https://maps.app.goo.gl/4Ne5VEDhmT1ShBU8A" },
        { cat:"Cibo e Bevande", name:"Là de le Vele",          text:"Nel centro storico con una bella vista. Un posto meraviglioso per un pasto tranquillo.", map:"https://maps.app.goo.gl/MhMj8CLKZGdUbSeU9" },
        { cat:"Cibo e Bevande", name:"Il Panino",              text:"Il posto migliore per calamari fritti da asporto. Uno spuntino perfetto passeggiando per la città.", map:"https://maps.app.goo.gl/n9gZ3PryWwMGQHwEA" },
        { cat:"Gelato",         name:"Antoniazzi Gelateria",   text:"Il miglior gelato di Grado secondo noi — l'unico che raccomandiamo davvero. Aspettatevi una piccola fila, ma ne vale assolutamente la pena.", map:"https://maps.app.goo.gl/gh6AauQ8VAr36diTA" },
        { cat:"Parchi",         name:"Parco delle Rose",       text:"L'unico parco della zona, sul percorso tra l'appartamento e il centro storico. Tanto verde e ombra — lo consigliamo sempre per la passeggiata verso il centro.", map:"https://maps.app.goo.gl/c32dWytXqCYcWkYr6" },
        { cat:"Attività",       name:"Kite Life",              text:"Scuola di kitesurf e noleggio attrezzatura. Perfetto sia per chi vuole imparare da zero sia per chi cerca l'attrezzatura per la giornata.", map:"https://maps.app.goo.gl/pLhPJ92ZbWFoiy7G8" },
        { cat:"Attività",       name:"Terme Marine Di Grado",  text:"Piscine di acqua di mare riscaldata — inclusa una piscina sul tetto — bagni termali e spa. Un'esperienza da non perdere a Grado, ideale anche in bassa stagione.", map:"https://maps.app.goo.gl/rZp3p2xKHNHAm3rT6" },
        { cat:"Shopping",       name:"Supermercato",           text:"Il supermercato più vicino all'appartamento.", map:"https://maps.app.goo.gl/NR6rGyvmExya86tW6" },
        { cat:"Servizi",        name:"Ufficio Postale & ATM",  text:"L'ufficio postale e il bancomat più vicini all'appartamento.", map:"https://maps.app.goo.gl/hMEyPqYB2DiSGXdN8" },
        { cat:"Servizi",        name:"Farmacia",               text:"La farmacia più vicina all'appartamento.", map:"https://maps.app.goo.gl/TiX3iEqZcctxs1vq9" },
      ],
    },
    grado: {
      title:"Grado",
      sub:"Antica città insulare sull'Adriatico — chiamata 'L'Isola del Sole'. Patrimonio romano, spiagge dorate e tradizione marinara.",
      eventsLink:"Calendario eventi completo →",
      sections:[
        { title:"Centro Storico (Città Vecchia)", text:"Il cuore antico di Grado: calli acciottolate, la Basilica di Santa Eufemia del VI secolo e le barche dei pescatori nel piccolo porto. Perfetto per una passeggiata serale." },
        { title:"La Laguna",                      text:"Grado sorge su un banco di sabbia circondato da una laguna bassa. Gita in barca alle isole lagunari, avvistamento di aironi e garzette, o tour di pesca tradizionale." },
        { title:"Le Spiagge",                     text:"Grado vanta alcune delle più belle spiagge sabbiose dell'Adriatico — acque calme e basse, ideali per i bambini. La spiaggia principale si estende per chilometri verso ovest." },
        { title:"Barbana",                         text:"Un piccolo santuario isolano nella laguna di Grado, raggiungibile solo in barca. La basilica mariana risale al VII secolo, rendendola uno dei luoghi di pellegrinaggio più antichi dell'Adriatico. Una gita tranquilla e di rara bellezza — i battelli partono regolarmente dal porto." },
        { title:"Gite",                           text:"Aquileia (10 min): rovine romane UNESCO e la straordinaria basilica. Palmanova (35 min): la più perfetta città fortezza rinascimentale a pianta stellare — Patrimonio UNESCO. Trieste (1 ora): eleganza asburgica e il Castello di Miramare. Venezia (2 ore in auto o barca-bus)." },
        { title:"Eventi Stagionali",              text:"Luglio–Agosto: Grado in Fiore, mercati serali nel centro storico. Settembre: Bardìa, la regata tradizionale della laguna. Inverno: stagione tranquilla, ottima per il birdwatching." },
      ],
    },
    findus: {
      title:"Dove Siamo",
      sub:"Appartamento L'Isola D'Oro, Grado (GO), Friuli Venezia Giulia, Italia.",
      address:"Viale Italia 28, 34073 Grado (GO)",
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
    nav: { home:"Startseite", house:"Die Wohnung", guide:"Gästeguide", neighborhood:"Lokaler Guide", grado:"Grado", findus:"Anreise" },
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
        { title:"Lokaler Guide", text:"Unsere Lieblingsstrände, Restaurants, Bars und Geschäfte — kuratierte Empfehlungen." },
        { title:"Grado", text:"Altstadt, Lagune, Strände. Ausflüge nach Triest und Aquileia. Saisonale Events und lokale Tipps." },
      ],
    },
    house: {
      title:"Die Wohnung",
      sub:"Zwei Schlafzimmer, Küche, Wohnzimmer, Bad und Terrasse mit Grill. Bis zu 5 Gäste.",
      rooms:"Zimmer",
      room_main:"Hauptschlafzimmer",  room_main_desc:"Doppelbett, Rattankopfteil, olivgrüner Kleiderschrank, Klimaanlage.",
      room_kids:"Kinderzimmer",        room_kids_desc:"Etagenbett (Doppel unten, Einzel oben) plus ausziehbares Einzelbett. Blaue Wände.",
      room_living:"Wohnzimmer", room_living_desc:"Sofa, großer TV, Pelletofen, Schreibtisch, Bücherregal.",
      room_kitchen:"Küche",           room_kitchen_desc:"Gasherd, Kühlschrank, Mokkakanne, Geschirrspüler. Öffnet zur Terrasse.",
      room_bath:"Badezimmer",         room_bath_desc:"Dusche, WC, Bidet. Fenster zum Kiefernpark.",
      room_terrace:"Außenterrasse",   room_terrace_desc:"Überdachte Terrasse mit Gartenmöbeln, Außenküche und Waschmaschine. Ideal für Sommerabende.",
      room_veranda:"Veranda – Essen & Entspannen",room_veranda_desc:"Überdachte Veranda, die Wohnbereich und Terrasse verbindet. Ideal für den Morgenkaffee oder eine entspannte Lektüre.",
      room_parking:"Privater Parkplatz & Fahrräder", room_parking_desc:"Überdachter privater Stellplatz im Preis inbegriffen. Kein Stress bei der Parkplatzsuche in den Sommermonaten.",
      amenities_title:"Ausstattung",
      amenities:["Wi-Fi (Glasfaser)","Klimaanlage","Privater Parkplatz","3 Fahrräder","Geschirrspüler","Waschmaschine","Außenküche","Pelletofen (Winter)","Smart-Türschloss (Code)","Babybett verfügbar","Hochstuhl verfügbar","Strandtücher"],
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
      title:"Lokaler Guide",
      sub:"Unsere Lieblingsplätze rund um die Wohnung.",
      disclaimer:"Wir haben keinerlei Verbindung zu den hier aufgeführten Betrieben und erhalten keine Vergütung für diese Erwähnungen. Es sind schlicht die Orte, die wir selbst besuchen, wenn wir in Grado sind.",
      intro:"Die Wohnung liegt am Eingang zur Città Giardino von Grado — einem ruhigen Wohnviertel, nur wenige Gehminuten vom Strand und der Altstadt entfernt, aber weit genug vom Sommertreiben. Der einzige Park der Gegend, der Parco delle Rose, liegt genau zwischen der Wohnung und dem Stadtzentrum: ein schattiger, angenehmer Weg, den wir für den Spaziergang ins Zentrum sehr empfehlen.",
      categories:["Alle","Strand","Essen & Trinken","Eis","Parks","Aktivitäten","Shopping","Services"],
      places:[
        { cat:"Strand", name:"Spiaggia Nuova",   text:"Vollausgestatteter Lido nur 200 m von der Wohnung. Liegestühle, Sonnenschirme, Duschen, Strandbar und Spielplatz. Eintritt kostenpflichtig.", map:"https://maps.app.goo.gl/MtKtu3JCe3Q2r6uP6" },
        { cat:"Strand", name:"Spiaggia le Dune", text:"Freier Sandstrand im Dünenbereich, 5 Gehminuten entfernt. Weniger belebt, kein Service — ideal für einen natürlicheren Strandtag.", map:"https://maps.app.goo.gl/Ry9VRm9H4xsR5vYg9" },
        { cat:"Strand", name:"Grado Pineta",     text:"Ruhiger Strand am Kiefernwald, 15 Gehminuten entfernt. Freier Eintritt, weniger touristisch — ideal abseits des Sommertrubels.", map:"https://maps.app.goo.gl/9nhHTviUEfkmn43M7" },
        { cat:"Strand", name:"Dog Beach",        text:"Ausgewiesener hundefreundlicher Strand — Hunde willkommen im Wasser. Freier Eintritt. Ideal für Reisende mit Vierbeiner.", map:"https://maps.app.goo.gl/vtqeMwiHwZu6Hw2w7" },
        { cat:"Essen & Trinken", name:"Pizza & Döner",          text:"Pizzastücke und Döner — ideal für einen schnellen Bissen oder einen Spätabend-Snack auf dem Nachhauseweg.", map:"https://maps.app.goo.gl/sS7rN91fMvdcUk3Z8" },
        { cat:"Essen & Trinken", name:"La Ciacolada",           text:"Neapolitanische Pizza. Ausgezeichnete Qualität, aber sehr belebt — Wartezeit einplanen.", map:"https://maps.app.goo.gl/NyDTmGYx1ABagjvt7" },
        { cat:"Essen & Trinken", name:"Bistrot Ratatouille",    text:"Unserer Meinung nach einer der besten Spots in Grado, 1 Minute von der Wohnung entfernt. Frisches Essen, gute Qualität und sehr vernünftiger Preis. Großartig für Mittag- und Abendessen.", map:"https://maps.app.goo.gl/9whmgsj1WkGLmA5y5" },
        { cat:"Essen & Trinken", name:"Mandracchio Bistrot",    text:"Im Hafenbereich. Frisches Essen und gute Qualität zu einem sehr vernünftigen Preis.", map:"https://maps.app.goo.gl/ZUWQKheoKZ5Fy5cM9" },
        { cat:"Essen & Trinken", name:"Cardamomo",              text:"Gehobenes Restaurant — ideal für ein intimes Abendessen oder einen besonderen Anlass.", map:"https://maps.app.goo.gl/rUdDRQQ5H4icm2Q56" },
        { cat:"Essen & Trinken", name:"Tavernetta all'Androna", text:"Ein verstecktes Juwel in einer engen Gasse der Altstadt. Elegant und gemütlich, mit warmer Atmosphäre und raffinierter lokaler Küche — die perfekte Wahl für einen besonderen Abend.", map:"https://maps.app.goo.gl/4Ne5VEDhmT1ShBU8A" },
        { cat:"Essen & Trinken", name:"Là de le Vele",          text:"In der Altstadt mit schöner Aussicht. Ein wundervoller Ort für eine entspannte Mahlzeit.", map:"https://maps.app.goo.gl/MhMj8CLKZGdUbSeU9" },
        { cat:"Essen & Trinken", name:"Il Panino",              text:"Die beste Adresse für gebratene Tintenfischringe zum Mitnehmen. Ein perfekter Snack beim Stadtbummel.", map:"https://maps.app.goo.gl/n9gZ3PryWwMGQHwEA" },
        { cat:"Eis",             name:"Antoniazzi Gelateria",   text:"Unserer Meinung nach das beste Gelato in Grado — das einzige, das wir wirklich empfehlen. Kurze Warteschlange, aber absolut die Wartezeit wert.", map:"https://maps.app.goo.gl/gh6AauQ8VAr36diTA" },
        { cat:"Parks",           name:"Parco delle Rose",      text:"Der einzige Park der Gegend, direkt auf dem Weg zwischen der Wohnung und der Altstadt. Viel Schatten und Ruhe — wir empfehlen immer, dort entlangzugehen.", map:"https://maps.app.goo.gl/c32dWytXqCYcWkYr6" },
        { cat:"Aktivitäten",     name:"Kite Life",             text:"Kitesurfschule und Verleih. Ideal für Anfänger, die Unterricht suchen, sowie für erfahrene Fahrer, die Ausrüstung für den Tag mieten möchten.", map:"https://maps.app.goo.gl/pLhPJ92ZbWFoiy7G8" },
        { cat:"Aktivitäten",     name:"Terme Marine Di Grado", text:"Beheizte Meerwasserbecken — darunter ein Dachpool —, Thermalbäder und Spa. Ein echtes Highlight in Grado, besonders in der Nebensaison.", map:"https://maps.app.goo.gl/rZp3p2xKHNHAm3rT6" },
        { cat:"Shopping",        name:"Supermarkt",            text:"Der nächste Supermarkt zur Wohnung.", map:"https://maps.app.goo.gl/NR6rGyvmExya86tW6" },
        { cat:"Services",        name:"Postamt & ATM",         text:"Das nächste Postamt und der nächste Geldautomat zur Wohnung.", map:"https://maps.app.goo.gl/hMEyPqYB2DiSGXdN8" },
        { cat:"Services",        name:"Apotheke",              text:"Die nächste Apotheke zur Wohnung.", map:"https://maps.app.goo.gl/TiX3iEqZcctxs1vq9" },
      ],
    },
    grado: {
      title:"Grado",
      sub:"Antike Inselstadt an der Adria-Lagune — bekannt als 'Insel der Sonne'.",
      eventsLink:"Vollständiger Veranstaltungskalender →",
      sections:[
        { title:"Altstadt (Città Vecchia)",  text:"Das historische Herz von Grado: Kopfsteinpflaster-Gassen, die Basilika Santa Eufemia aus dem 6. Jahrhundert und Fischerboote im kleinen Hafen." },
        { title:"Die Lagune",               text:"Grado liegt auf einer Sandbank, umgeben von einer flachen Lagune. Bootstouren zu den Laguneninseln, Vogelbeobachtung oder traditionelle Fischereitouren." },
        { title:"Die Strände",             text:"Grado bietet einige der schönsten Sandstrände der Adria — ruhige, flache Gewässer, ideal für Kinder." },
        { title:"Barbana",                text:"Ein kleines Inselheiligtum in der Grader Lagune, nur per Boot erreichbar. Die Marienwallfahrtskirche stammt aus dem 7. Jahrhundert und gehört zu den ältesten Pilgerorten der Adria. Ein ruhiger, schöner Ausflug — Boote fahren regelmäßig vom Hafen ab." },
        { title:"Ausflüge",               text:"Aquileia (10 Min): UNESCO-Römerruinen und beeindruckende Basilika. Palmanova (35 Min): perfekt erhaltene sternförmige Renaissancefestung — UNESCO-Welterbe. Triest (1 Std): habsburgische Eleganz, Schloss Miramare. Venedig (2 Std)." },
        { title:"Saisonale Events",       text:"Juli–Aug: Grado in Fiore Blumenfest. September: Bardìa Lagunensegel-Rennen. Winter: Ruhezeit, ideal für Vogelbeobachtung." },
      ],
    },
    findus: {
      title:"Anreise",
      sub:"Apartment L'Isola D'Oro, Grado (GO), Friaul-Julisch Venetien, Italien.",
      address:"Viale Italia 28, 34073 Grado (GO)",
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
    nav: { home:"Strona główna", house:"Apartament", guide:"Przewodnik", neighborhood:"Lokalny Przewodnik", grado:"Grado", findus:"Jak dojechać" },
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
        { title:"Lokalny Przewodnik", text:"Nasze ulubione plaże, restauracje, bary i sklepy — sprawdzone miejsca od osób znających Grado." },
        { title:"Grado", text:"Stare miasto, laguna, plaże. Wycieczki do Triestu i Akwilei. Sezonowe imprezy i lokalne porady." },
      ],
    },
    house: {
      title:"Apartament",
      sub:"Dwie sypialnie, kuchnia, salon, łazienka i prywatny taras z grillem. Do 5 gości.",
      rooms:"Pokoje",
      room_main:"Sypialnia główna",   room_main_desc:"Łóżko podwójne, zagłówek rattanowy, szafa w kolorze oliwkowym, klimatyzacja.",
      room_kids:"Pokój dziecięcy",    room_kids_desc:"Łóżko piętrowe (podwójne na dole, pojedyncze na górze) plus rozkładane łóżko. Niebieskie ściany.",
      room_living:"Salon", room_living_desc:"Sofa, duży TV, piec na pellet, biurko, biblioteczka z książkami i grami.",
      room_kitchen:"Kuchnia",        room_kitchen_desc:"Kuchenka gazowa, lodówka, moka, zmywarka. Wychodzi na taras.",
      room_bath:"Łazienka",          room_bath_desc:"Prysznic, toaleta, bidet. Okno na ogród sosnowy.",
      room_terrace:"Taras zewnętrzny",room_terrace_desc:"Zadaszony taras z meblami ogrodowymi, zewnętrzną kuchnią i pralką. Idealny na letnie wieczory.",
      room_veranda:"Weranda – Jadalnia & Relaks",room_veranda_desc:"Zadaszona weranda łącząca salon z tarasem. Idealne miejsce na poranną kawę lub popołudniową lekturę.",
      room_parking:"Prywatny Parking & Rowery",room_parking_desc:"Zadaszone prywatne miejsce parkingowe wliczone w pobyt. Żaden stres z szukaniem miejsca w ruchliwych miesiącach letnich.",
      amenities_title:"Co jest w cenie",
      amenities:["Wi-Fi (szybki światłowód)","Klimatyzacja","Prywatny parking","3 rowery","Zmywarka","Pralka","Zewnętrzna kuchnia","Piec na pellet (zima)","Smart zamek (kod)","Łóżeczko dla niemowląt dostępne","Krzesełko dla dziecka","Ręczniki plażowe"],
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
      title:"Lokalny Przewodnik",
      sub:"Nasze ulubione miejsca w okolicy apartamentu.",
      disclaimer:"Nie jesteśmy powiązani z żadnym z wymienionych tu miejsc i nie otrzymujemy żadnego wynagrodzenia za te wzmianki. To po prostu miejsca, które sami odwiedzamy, będąc w Grado.",
      intro:"Apartament stoi u bram Città Giardino w Grado — spokojnej dzielnicy mieszkaniowej, zaledwie kilka minut spacerem od plaży i centrum, z dala od letniego zgiełku. Jedyny park w okolicy, Parco delle Rose, leży dokładnie na trasie między apartamentem a starym miastem: zacieniona, przyjemna ścieżka, którą gorąco polecamy na spacer do centrum.",
      categories:["Wszystkie","Plaża","Jedzenie i napoje","Lody","Parki","Aktywności","Zakupy","Usługi"],
      places:[
        { cat:"Plaża", name:"Spiaggia Nuova",   text:"W pełni wyposażone lido zaledwie 200 m od apartamentu. Leżaki, parasole, prysznice, beach bar i plac zabaw. Wstęp płatny.", map:"https://maps.app.goo.gl/MtKtu3JCe3Q2r6uP6" },
        { cat:"Plaża", name:"Spiaggia le Dune", text:"Bezpłatna plaża w strefie wydm, 5 minut piechotą. Mniej zatłoczona, bez obsługi — idealna na bardziej naturalny dzień na plaży.", map:"https://maps.app.goo.gl/Ry9VRm9H4xsR5vYg9" },
        { cat:"Plaża", name:"Grado Pineta",     text:"Spokojna plaża przy sosnowym lesie, 15 minut piechotą. Bezpłatny wstęp, mniej turystyczna — świetna ucieczka od letnich tłumów.", map:"https://maps.app.goo.gl/9nhHTviUEfkmn43M7" },
        { cat:"Plaża", name:"Dog Beach",        text:"Wyznaczona plaża przyjazna psom — psy mile widziane w wodzie. Bezpłatny wstęp. Idealne miejsce dla podróżujących z czworonogami.", map:"https://maps.app.goo.gl/vtqeMwiHwZu6Hw2w7" },
        { cat:"Jedzenie i napoje", name:"Pizza & Döner",          text:"Pizza na kawałki i döner — świetne na szybki kąsek lub późnonocną przekąskę w drodze do apartamentu.", map:"https://maps.app.goo.gl/sS7rN91fMvdcUk3Z8" },
        { cat:"Jedzenie i napoje", name:"La Ciacolada",           text:"Pizza w stylu neapolitańskim. Doskonała jakość, ale bardzo zajęta — bądźcie gotowi poczekać.", map:"https://maps.app.goo.gl/NyDTmGYx1ABagjvt7" },
        { cat:"Jedzenie i napoje", name:"Bistrot Ratatouille",    text:"Naszym zdaniem jedno z najlepszych miejsc w Grado, 1 minuta od apartamentu. Świeże jedzenie, dobra jakość i bardzo przystępne ceny. Świetne na lunch lub kolację.", map:"https://maps.app.goo.gl/9whmgsj1WkGLmA5y5" },
        { cat:"Jedzenie i napoje", name:"Mandracchio Bistrot",    text:"W obszarze portowym. Świeże jedzenie i dobra jakość w bardzo rozsądnej cenie.", map:"https://maps.app.goo.gl/ZUWQKheoKZ5Fy5cM9" },
        { cat:"Jedzenie i napoje", name:"Cardamomo",              text:"Ekskluzywna restauracja — idealna na romantyczną kolację lub wyjątkową okazję.", map:"https://maps.app.goo.gl/rUdDRQQ5H4icm2Q56" },
        { cat:"Jedzenie i napoje", name:"Tavernetta all'Androna", text:"Ukryty klejnot w wąskiej uliczce starego miasta. Elegancka, a zarazem przytulna, z ciepłą atmosferą i wyrafinowaną lokalną kuchnią — idealny wybór na wyjątkowy wieczór.", map:"https://maps.app.goo.gl/4Ne5VEDhmT1ShBU8A" },
        { cat:"Jedzenie i napoje", name:"Là de le Vele",          text:"W starym mieście z pięknym widokiem. Świetne miejsce na spokojny posiłek.", map:"https://maps.app.goo.gl/MhMj8CLKZGdUbSeU9" },
        { cat:"Jedzenie i napoje", name:"Il Panino",              text:"Najlepsze miejsce na smażone kalmary na wynos. Idealna przekąska podczas spaceru po mieście.", map:"https://maps.app.goo.gl/n9gZ3PryWwMGQHwEA" },
        { cat:"Lody",              name:"Antoniazzi Gelateria",   text:"Najlepsze gelato w Grado według nas — jedyne, które naprawdę polecamy. Spodziewaj się krótkiej kolejki — absolutnie warto.", map:"https://maps.app.goo.gl/gh6AauQ8VAr36diTA" },
        { cat:"Parki",             name:"Parco delle Rose",      text:"Jedyny park w okolicy, na trasie między apartamentem a starym miastem. Mnóstwo cienia i spokoju — zawsze polecamy tędy przechodzić.", map:"https://maps.app.goo.gl/c32dWytXqCYcWkYr6" },
        { cat:"Aktywności",        name:"Kite Life",             text:"Szkoła kitesurfingu i wypożyczalnia sprzętu. Idealne zarówno dla tych, którzy chcą się nauczyć, jak i dla doświadczonych, szukających sprzętu na dzień.", map:"https://maps.app.goo.gl/pLhPJ92ZbWFoiy7G8" },
        { cat:"Aktywności",        name:"Terme Marine Di Grado", text:"Podgrzewane baseny z wodą morską — w tym basen na dachu — kąpiele termalne i spa. Wyjątkowa atrakcja Grado, warta odwiedzenia szczególnie poza sezonem.", map:"https://maps.app.goo.gl/rZp3p2xKHNHAm3rT6" },
        { cat:"Zakupy",            name:"Supermarket",           text:"Najbliższy supermarket od apartamentu.", map:"https://maps.app.goo.gl/NR6rGyvmExya86tW6" },
        { cat:"Usługi",            name:"Poczta & Bankomat",     text:"Najbliższy urząd pocztowy i bankomat od apartamentu.", map:"https://maps.app.goo.gl/hMEyPqYB2DiSGXdN8" },
        { cat:"Usługi",            name:"Apteka",                text:"Najbliższa apteka od apartamentu.", map:"https://maps.app.goo.gl/TiX3iEqZcctxs1vq9" },
      ],
    },
    grado: {
      title:"Grado",
      sub:"Starożytne miasto wyspiarskie nad Adriatykiem — znane jako 'Wyspa Słońca'.",
      eventsLink:"Pełny kalendarz wydarzeń →",
      sections:[
        { title:"Stare miasto (Città Vecchia)", text:"Historyczne serce Grado: brukowane zaułki, bazylika Santa Eufemia z VI wieku i łodzie rybackie w małym porcie." },
        { title:"Laguna",                       text:"Grado leży na łasze piaszczystej otoczonej płytką laguną. Wycieczki łódką na wyspy lagunowe, obserwacja ptaków lub tradycyjne wyprawy rybackie." },
        { title:"Plaże",                        text:"Grado ma jedne z piękniejszych piaszczystych plaż na Adriatyku — spokojne, płytkie wody idealne dla dzieci." },
        { title:"Barbana",                      text:"Mała wysepka-sanktuarium w lagunie Grado, dostępna wyłącznie łodzią. Mariańska bazylika pochodzi z VII wieku i należy do najstarszych miejsc pielgrzymkowych na Adriatyku. Spokojna, piękna wycieczka — łodzie odpływają regularnie z portu." },
        { title:"Wycieczki",                    text:"Akwileja (10 min): ruiny UNESCO i imponująca bazylika. Palmanova (35 min): doskonale zachowane renesansowe miasto-twierdza w kształcie gwiazdy — Dziedzictwo UNESCO. Triest (1 godz): elegancja habsburska, Zamek Miramare. Wenecja (2 godz)." },
        { title:"Imprezy sezonowe",             text:"Lipiec–sierpień: festiwal kwiatów Grado in Fiore. Wrzesień: Bardìa — tradycyjny wyścig łodzi lagunarnych. Zima: cisza, świetna dla ptaków." },
      ],
    },
    findus: {
      title:"Jak dojechać",
      sub:"Apartament L'Isola D'Oro, Grado (GO), Friuli Wenecja Julijska, Włochy.",
      address:"Viale Italia 28, 34073 Grado (GO)",
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
    nav: { home:"Domov", house:"Apartmán", guide:"Sprievodca", neighborhood:"Lokálny Sprievodca", grado:"Grado", findus:"Kde nás nájdete" },
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
        { title:"Lokálny Sprievodca", text:"Naše obľúbené pláže, reštaurácie, bary a obchody — overené tipy od ľudí, ktorí Grado dobre poznajú." },
        { title:"Grado", text:"Staré mesto, lagúna, pláže. Výlety do Terstu a Aquileia. Sezónne podujatia a miestne tipy." },
      ],
    },
    house: {
      title:"Apartmán",
      sub:"Dve spálne, kuchyňa, obývačka, kúpeľňa a súkromná terasa s grilom. Až 5 hostí.",
      rooms:"Izby",
      room_main:"Hlavná spálňa",      room_main_desc:"Manželská posteľ, ratanové čelo, olivová skriňa, klimatizácia.",
      room_kids:"Detská izba",        room_kids_desc:"Poschodová posteľ (dvojlôžko dole, jednolôžko hore) plus výsuvné jednolôžko. Modré steny.",
      room_living:"Obývačka",room_living_desc:"Pohovka, veľká TV, peletový krb, písací stôl, knižnica.",
      room_kitchen:"Kuchyňa",        room_kitchen_desc:"Plynový sporák, chladnička, moka, umývačka riadu. Otvára sa na terasu.",
      room_bath:"Kúpeľňa",           room_bath_desc:"Sprcha, WC, bidet. Okno do borovicovej záhrady.",
      room_terrace:"Vonkajšia terasa",room_terrace_desc:"Tienistá terasa so záhradným nábytkom, vonkajšou kuchynkou a práčkou. Ideálna na letné večery.",
      room_veranda:"Veranda – Jedáleň & Relax",room_veranda_desc:"Krytá veranda spájajúca obývačku s terasou. Ideálne miesto na rannú kávu alebo popoludňajšie čítanie.",
      room_parking:"Súkromné Parkovanie & Bicykle",room_parking_desc:"Kryté súkromné parkovacie miesto je súčasťou pobytu. Žiadny stres s hľadaním parkovacieho miesta v letnej sezóne.",
      amenities_title:"Čo je v cene",
      amenities:["Wi-Fi (rýchle vlákno)","Klimatizácia","Súkromné parkovanie","3 bicykle","Umývačka riadu","Práčka","Vonkajšia kuchynka","Peletový krb (zima)","Smart zámok (kód)","Detská postieľka k dispozícii","Detská stolička","Plážové uteráky"],
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
      title:"Lokálny Sprievodca",
      sub:"Naše obľúbené miesta v okolí apartmánu.",
      disclaimer:"Nie sme nijako prepojení so žiadnym z tu uvedených podnikov a nedostávame za tieto zmienky žiadnu odmenu. Sú to jednoducho miesta, ktoré sami navštevujeme, keď sme v Grado.",
      intro:"Apartmán stojí na vstupe do Città Giardino v Grado — tichej obytnej štvrte, len niekoľko minút chôdze od pláže a centra, ďaleko od letného ruchu. Jediný park v oblasti, Parco delle Rose, leží priamo na ceste medzi apartmánom a starým mestom: tienistá, príjemná trasa, ktorú vždy odporúčame na prechádzku do centra.",
      categories:["Všetky","Pláž","Jedlo a nápoje","Zmrzlina","Parky","Aktivity","Nákupy","Služby"],
      places:[
        { cat:"Pláž", name:"Spiaggia Nuova",   text:"Plne vybavené lido len 200 m od apartmánu. Ležadlá, slnečníky, sprchy, beach bar a ihrisko. Vstupné sa platí.", map:"https://maps.app.goo.gl/MtKtu3JCe3Q2r6uP6" },
        { cat:"Pláž", name:"Spiaggia le Dune", text:"Bezplatná piesočná pláž v oblasti dún, 5 minút pešo. Menej preplnená, bez obsluhy — skvelá pre prirodzenejší deň na pláži.", map:"https://maps.app.goo.gl/Ry9VRm9H4xsR5vYg9" },
        { cat:"Pláž", name:"Grado Pineta",     text:"Tichá pláž pri borovicovom lese, 15 minút pešo. Vstup zadarmo, menej turistická — ideálne miesto mimo letného ruchu.", map:"https://maps.app.goo.gl/9nhHTviUEfkmn43M7" },
        { cat:"Pláž", name:"Dog Beach",        text:"Vyhradená pláž pre psov — psy vítané vo vode. Vstup zadarmo. Skvelé miesto pre cestujúcich so štvornohými priateľmi.", map:"https://maps.app.goo.gl/vtqeMwiHwZu6Hw2w7" },
        { cat:"Jedlo a nápoje", name:"Pizza & Döner",          text:"Pizza na plátky a döner — skvelé na rýchle zahryznutie alebo večerný snack cestou domov.", map:"https://maps.app.goo.gl/sS7rN91fMvdcUk3Z8" },
        { cat:"Jedlo a nápoje", name:"La Ciacolada",           text:"Pizza v neapolskom štýle. Výborná kvalita, ale veľmi rušná — pripravte sa na čakanie.", map:"https://maps.app.goo.gl/NyDTmGYx1ABagjvt7" },
        { cat:"Jedlo a nápoje", name:"Bistrot Ratatouille",    text:"Podľa nás jedno z najlepších miest v Grado, 1 minútu od apartmánu. Čerstvé jedlo, dobrá kvalita a veľmi rozumné ceny. Skvelé na obed aj večeru.", map:"https://maps.app.goo.gl/9whmgsj1WkGLmA5y5" },
        { cat:"Jedlo a nápoje", name:"Mandracchio Bistrot",    text:"V prístavnej oblasti. Čerstvé jedlo a dobrá kvalita za veľmi rozumnú cenu.", map:"https://maps.app.goo.gl/ZUWQKheoKZ5Fy5cM9" },
        { cat:"Jedlo a nápoje", name:"Cardamomo",              text:"Luxusná reštaurácia — ideálna na romantickú večeru alebo špeciálnu príležitosť.", map:"https://maps.app.goo.gl/rUdDRQQ5H4icm2Q56" },
        { cat:"Jedlo a nápoje", name:"Tavernetta all'Androna", text:"Skrytý klenot v úzkej uličke starého mesta. Elegantná a útulná, s teplou atmosférou a rafinovanou miestnou kuchyňou — ideálna voľba pre špeciálny večer.", map:"https://maps.app.goo.gl/4Ne5VEDhmT1ShBU8A" },
        { cat:"Jedlo a nápoje", name:"Là de le Vele",          text:"V starom meste s krásnym výhľadom. Skvelé miesto na pokojné jedlo.", map:"https://maps.app.goo.gl/MhMj8CLKZGdUbSeU9" },
        { cat:"Jedlo a nápoje", name:"Il Panino",              text:"Najlepšie miesto na vyprážané kalamáre so sebou. Dokonalý snack pri prechádzke mestom.", map:"https://maps.app.goo.gl/n9gZ3PryWwMGQHwEA" },
        { cat:"Zmrzlina",       name:"Antoniazzi Gelateria",   text:"Podľa nás najlepšie gelato v Grado — jediné, ktoré skutočne odporúčame. Čakajte krátku frontu — úplne to stojí za to.", map:"https://maps.app.goo.gl/gh6AauQ8VAr36diTA" },
        { cat:"Parky",          name:"Parco delle Rose",      text:"Jediný park v oblasti, priamo na ceste medzi apartmánom a starým mestom. Veľa tieňa a pokoja — vždy odporúčame prejsť tadiaľ.", map:"https://maps.app.goo.gl/c32dWytXqCYcWkYr6" },
        { cat:"Aktivity",       name:"Kite Life",             text:"Škola kitesurfingu a požičovňa vybavenia. Skvelé pre začiatočníkov, ktorí chcú hodiny, aj pre skúsených, ktorí hľadajú vybavenie na deň.", map:"https://maps.app.goo.gl/pLhPJ92ZbWFoiy7G8" },
        { cat:"Aktivity",       name:"Terme Marine Di Grado", text:"Vyhrievané bazény s morskou vodou — vrátane strešného bazéna —, termálne kúpele a spa. Skutočný klenot Grado, výnimočne príjemné aj mimo hlavnej sezóny.", map:"https://maps.app.goo.gl/rZp3p2xKHNHAm3rT6" },
        { cat:"Nákupy",         name:"Supermarket",           text:"Najbližší supermarket k apartmánu.", map:"https://maps.app.goo.gl/NR6rGyvmExya86tW6" },
        { cat:"Služby",         name:"Pošta & Bankomat",      text:"Najbližšia pošta a bankomat k apartmánu.", map:"https://maps.app.goo.gl/hMEyPqYB2DiSGXdN8" },
        { cat:"Služby",         name:"Lekáreň",               text:"Najbližšia lekáreň k apartmánu.", map:"https://maps.app.goo.gl/TiX3iEqZcctxs1vq9" },
      ],
    },
    grado: {
      title:"Grado",
      sub:"Starobylé ostrovné mesto na Jadranskej lagúne — známe ako 'Ostrov slnka'.",
      eventsLink:"Kompletný kalendár podujatí →",
      sections:[
        { title:"Staré mesto (Città Vecchia)", text:"Historické srdce Grado: dlážd. uličky, bazilika Santa Eufemia zo 6. stor. a rybárske lode v malom prístave." },
        { title:"Lagúna",                      text:"Grado leží na piesočnom brehu obklopenom plytkými lagúnami. Plavby loďou na lagúnové ostrovy, pozorovanie vtákov alebo tradičné rybárske výlety." },
        { title:"Pláže",                       text:"Grado má jedny z najkrajších piesočných pláží na Jadrane — pokojné, plytké vody ideálne pre deti." },
        { title:"Barbana",                     text:"Malý ostrovný svätyňa v lagúne Grado, dostupná len loďou. Mariánska bazilika pochádza zo 7. storočia a patrí k najstarším pútnickým miestam na Jadrane. Pokojný a krásny výlet — lode vyplávajú pravidelne z prístavu." },
        { title:"Výlety",                      text:"Aquileia (10 min): rímske ruiny UNESCO a úžasná bazilika. Palmanova (35 min): dokonale zachované renesančné hviezdicové opevnené mesto — UNESCO svetové dedičstvo. Terst (1 hod): habsburská elegancia, Hrad Miramare. Benátky (2 hod)." },
        { title:"Sezónne podujatia",           text:"Júl–aug: festival kvetov Grado in Fiore. September: Bardìa — tradičná lagúnová regata. Zima: ticho, skvelé na pozorovanie vtákov." },
      ],
    },
    findus: {
      title:"Kde nás nájdete",
      sub:"Apartmán L'Isola D'Oro, Grado (GO), Friuli Venezia Giulia, Taliansko.",
      address:"Viale Italia 28, 34073 Grado (GO)",
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
    nav: { home:"Főoldal", house:"Az Apartman", guide:"Vendégkalauz", neighborhood:"Helyi Kalauz", grado:"Grado", findus:"Megközelítés" },
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
        { title:"Helyi Kalauz", text:"Kedvenc strandjaink, éttermeink, bárjaink és boltjaink — Gradót jól ismerők ajánlásai." },
        { title:"Grado", text:"Óváros, lagúna, strandok. Kirándulások Triesztbe és Aquileiába. Szezonális programok és helyi tippek." },
      ],
    },
    house: {
      title:"Az Apartman",
      sub:"Két hálószoba, konyha, nappali, fürdőszoba és privát terasz grillel. Legfeljebb 5 vendég.",
      rooms:"Szobák",
      room_main:"Főhálószoba",       room_main_desc:"Franciaágy, rattan fejtámla, olívzöld szekrény, légkondicionáló.",
      room_kids:"Gyerekszoba",       room_kids_desc:"Emeletes ágy (franciaágy lent, egyszemélyes fent) + kihúzható egyszemélyes. Kék falak.",
      room_living:"Nappali",room_living_desc:"Kanapé, nagy TV, pelletkályha, íróasztal, könyvespolc.",
      room_kitchen:"Konyha",        room_kitchen_desc:"Gáztűzhely, hűtő-fagyasztó, mokkafőző, mosogatógép. Kinyílik a teraszra.",
      room_bath:"Fürdőszoba",       room_bath_desc:"Zuhany, WC, bidé. Ablak a fenyőkertre.",
      room_terrace:"Külső terasz",  room_terrace_desc:"Árnyékos terasz kerti bútorokkal, külső konyhával és mosógéppel. Tökéletes nyári estékre.",
      room_veranda:"Veranda – Étkezés & Pihenő",room_veranda_desc:"Fedett veranda, amely összekötve a nappalit a terasszal. Tökéletes reggeli kávéhoz vagy délutáni olvasáshoz.",
      room_parking:"Privát Parkoló & Kerékpárok", room_parking_desc:"Fedett privát parkolóhely a szállásban. Nem kell aggódni a szabad helyek megtalálása miatt a nyüzsgő nyári hónapokban.",
      amenities_title:"Mi van benne az árban",
      amenities:["Wi-Fi (gyors optikai)","Légkondicionáló","Privát parkoló","3 kerékpár","Mosogatógép","Mosógép","Külső konyha","Pelletkályha (tél)","Okos zár (kód)","Kiságy elérhető","Gyerekszék elérhető","Strandtörölközők"],
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
      title:"Helyi Kalauz",
      sub:"Kedvenc helyeink az apartman körül.",
      disclaimer:"Semmilyen kapcsolatban nem állunk az itt felsorolt vállalkozásokkal, és nem kapunk ellentételezést ezekért az ajánlásokért. Ezek egyszerűen azok a helyek, amelyeket mi magunk látogatunk, amikor Gradóban vagyunk.",
      intro:"Az apartman Grado Città Giardino negyedének kapujában áll — egy csendes lakónegyedben, mindössze néhány perces sétára a strandtól és a belvárostól, mégis messze a nyári forgatag zajától. A környék egyetlen parkja, a Parco delle Rose, pontosan az apartman és az óváros között helyezkedik el: árnyékos, kellemes sétaút, amelyet mindig ajánlunk a városközpontba vezető séta alkalmával.",
      categories:["Összes","Strand","Étkezés és italok","Fagylalt","Parkok","Tevékenységek","Bevásárlás","Szolgáltatások"],
      places:[
        { cat:"Strand", name:"Spiaggia Nuova",   text:"Teljesen felszerelt lido mindössze 200 m-re az apartmantól. Napágyak, napernyők, zuhanyzók, strandbar és játszótér. Belépőjegy szükséges.", map:"https://maps.app.goo.gl/MtKtu3JCe3Q2r6uP6" },
        { cat:"Strand", name:"Spiaggia le Dune", text:"Ingyenes homokos strand a dűnék területén, 5 perc sétára. Kevésbé zsúfolt, nincs szolgáltatás — tökéletes egy természetesebb strandnaphoz.", map:"https://maps.app.goo.gl/Ry9VRm9H4xsR5vYg9" },
        { cat:"Strand", name:"Grado Pineta",     text:"Csendes strand a fenyőerdő mellett, 15 perc sétára. Ingyenes belépés, kevésbé turistás — remek menedék a nyári tömeg elől.", map:"https://maps.app.goo.gl/9nhHTviUEfkmn43M7" },
        { cat:"Strand", name:"Dog Beach",        text:"Kijelölt kutyabarát strand — kutyák szívesen látottak a vízben. Ingyenes belépés. Remek hely kutyával utazóknak.", map:"https://maps.app.goo.gl/vtqeMwiHwZu6Hw2w7" },
        { cat:"Étkezés és italok", name:"Pizza & Döner",          text:"Pizza szeletek és döner — remek gyors harapnivalóra vagy késő esti nassolásra hazafelé.", map:"https://maps.app.goo.gl/sS7rN91fMvdcUk3Z8" },
        { cat:"Étkezés és italok", name:"La Ciacolada",           text:"Nápolyi stílusú pizza. Kiváló minőség, de nagyon forgalmas — készüljön fel a várakozásra.", map:"https://maps.app.goo.gl/NyDTmGYx1ABagjvt7" },
        { cat:"Étkezés és italok", name:"Bistrot Ratatouille",    text:"Véleményünk szerint Grado egyik legjobb helye, 1 percre az apartmantól. Friss étel, jó minőség és nagyon kedvező árak. Remek ebédre és vacsorára.", map:"https://maps.app.goo.gl/9whmgsj1WkGLmA5y5" },
        { cat:"Étkezés és italok", name:"Mandracchio Bistrot",    text:"A kikötői negyedben. Friss étel és jó minőség nagyon ésszerű áron.", map:"https://maps.app.goo.gl/ZUWQKheoKZ5Fy5cM9" },
        { cat:"Étkezés és italok", name:"Cardamomo",              text:"Elegáns étterem — tökéletes romantikus vacsorára vagy különleges alkalomra.", map:"https://maps.app.goo.gl/rUdDRQQ5H4icm2Q56" },
        { cat:"Étkezés és italok", name:"Tavernetta all'Androna", text:"Rejtett kincs az óváros egy szűk sikátorában. Elegáns és meghitt, meleg hangulattal és kifinomult helyi konyhával — tökéletes választás egy különleges estére.", map:"https://maps.app.goo.gl/4Ne5VEDhmT1ShBU8A" },
        { cat:"Étkezés és italok", name:"Là de le Vele",          text:"Az óvárosban gyönyörű kilátással. Remek helyszín egy nyugodt étkezéshez.", map:"https://maps.app.goo.gl/MhMj8CLKZGdUbSeU9" },
        { cat:"Étkezés és italok", name:"Il Panino",              text:"A legjobb hely sült kalamárihoz elvitelre. Tökéletes rágcsálnivaló városnézés közben.", map:"https://maps.app.goo.gl/n9gZ3PryWwMGQHwEA" },
        { cat:"Fagylalt",          name:"Antoniazzi Gelateria",   text:"Véleményünk szerint a legjobb fagylalt Gradóban — az egyetlen, amelyet igazán ajánlunk. Számítson rövid sorban állásra — abszolút megéri.", map:"https://maps.app.goo.gl/gh6AauQ8VAr36diTA" },
        { cat:"Parkok",            name:"Parco delle Rose",      text:"A környék egyetlen parkja, közvetlenül az apartman és az óváros közötti útvonalon. Rengeteg árnyék és nyugalom — mindig ajánljuk ezt az utat.", map:"https://maps.app.goo.gl/c32dWytXqCYcWkYr6" },
        { cat:"Tevékenységek",     name:"Kite Life",             text:"Kiteszörfiskola és felszerelés-kölcsönző. Kezdőknek tanfolyamokhoz és tapasztalt lovasoknak napi bérléshez egyaránt ajánlott.", map:"https://maps.app.goo.gl/pLhPJ92ZbWFoiy7G8" },
        { cat:"Tevékenységek",     name:"Terme Marine Di Grado", text:"Fűtött tengervizes medencék — köztük egy tetőterasz-medence —, termálfürdők és spa. Grado egyik igazi különlegessége, főszezonon kívül is nagyon ajánlott.", map:"https://maps.app.goo.gl/rZp3p2xKHNHAm3rT6" },
        { cat:"Bevásárlás",        name:"Szupermarket",          text:"Az apartmanhoz legközelebbi szupermarket.", map:"https://maps.app.goo.gl/NR6rGyvmExya86tW6" },
        { cat:"Szolgáltatások",    name:"Posta & ATM",           text:"Az apartmanhoz legközelebbi posta és bankjegykiadó.", map:"https://maps.app.goo.gl/hMEyPqYB2DiSGXdN8" },
        { cat:"Szolgáltatások",    name:"Gyógyszertár",          text:"Az apartmanhoz legközelebbi gyógyszertár.", map:"https://maps.app.goo.gl/TiX3iEqZcctxs1vq9" },
      ],
    },
    grado: {
      title:"Grado",
      sub:"Ókori szigetváros az Adriai lagúnán — 'A Nap Szigete' névvel is ismert.",
      eventsLink:"Teljes eseménynaptár →",
      sections:[
        { title:"Óváros (Città Vecchia)", text:"Grado történelmi szíve: macskakövek, a 6. századi Santa Eufemia bazilika és halászhajók a kis kikötőben." },
        { title:"A Lagúna",              text:"Grado egy sekély lagúna által körülvett homokpadra települt. Csónaktúrák a lagúnaszigetekre, madármegfigyelés vagy hagyományos halászkirándulás." },
        { title:"Strandok",              text:"Grado az Adriai-tenger egyik legszebb homokos strandjait kínálja — nyugodt, sekély vizek, gyerekeknek ideális." },
        { title:"Barbana",               text:"Kis szigeti szentély a Gradói-lagúna közepén, csak hajóval megközelíthető. A Mária-bazilika a 7. századból származik, és az Adriai-tenger egyik legrégibb zarándokhelye. Csendes, különleges szépségű kirándulás — a kikötőből rendszeresen indulnak hajók." },
        { title:"Kirándulások",          text:"Aquileia (10 perc): UNESCO-s római romok és lenyűgöző bazilika. Palmanova (35 perc): tökéletesen megőrzött reneszánsz csillag alakú erődváros — UNESCO Világörökség. Trieszt (1 óra): Habsburg elegancia, Miramare kastély. Velence (2 óra)." },
        { title:"Szezonális programok",  text:"Július–augusztus: Grado in Fiore virágfesztivál. Szeptember: Bardìa — hagyományos lagúna-regatta. Tél: csend, kiváló madármegfigyelésre." },
      ],
    },
    findus: {
      title:"Megközelítés",
      sub:"L'Isola D'Oro Apartman, Grado (GO), Friuli Venezia Giulia, Olaszország.",
      address:"Viale Italia 28, 34073 Grado (GO)",
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

function BeachScene() {
  const n = C.navy;
  const y = C.yellow;
  return (
    <svg viewBox="0 0 1200 180" preserveAspectRatio="none"
      className="beach-scene" style={{ display:"block", width:"100%", height:150 }}>

      {/* wave / cream transition */}
      <path d="M0,122 C200,95 400,152 600,122 C800,92 1000,152 1200,122 L1200,180 L0,180 Z" fill={C.cream} />

      {/* ── SAILBOAT LEFT — waterline at y=100, clearly in the blue sea ── */}
      <path d="M80,100 L158,100 Q142,117 119,119 Q96,117 80,100 Z" fill={n} />
      <path d="M119,100 L119,28" stroke={n} strokeWidth="2.5" fill="none" />
      <path d="M121,30 L121,100 L155,93 Z" fill={y} opacity="0.9" />
      <path d="M119,32 L119,74 L85,96 Z" fill={y} opacity="0.7" />

      {/* ── CHILD WITH KITE (x≈574) ── */}
      <circle cx="574" cy="87" r="8" fill={n} />
      <path d="M574,95 L574,114" stroke={n} strokeWidth="5.5" fill="none" strokeLinecap="round" />
      <path d="M574,114 L566,127 M574,114 L582,127" stroke={n} strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M574,103 L593,95 M574,103 L560,109" stroke={n} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M593,95 Q624,73 649,44" stroke={n} strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M649,27 L668,44 L649,62 L630,44 Z" fill={y} />
      <path d="M630,44 L668,44 M649,27 L649,62" stroke={n} strokeWidth="1.5" fill="none" opacity="0.2" />
      <path d="M649,62 Q657,71 652,81 Q647,90 653,98" stroke={y} strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* ── KITESURFER RIGHT — kite on right, rider leans LEFT/back away from kite ── */}
      {/* board centered at x=853, symmetric span 820–886 */}
      <path d="M820,117 Q853,126 886,115" stroke={n} strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* body: feet at x=848, leans back-left to head at x=812 */}
      <path d="M848,117 L840,108 L828,100 L818,93" stroke={n} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="812" cy="86" r="7" fill={n} />
      {/* arms reach forward-right to control bar */}
      <path d="M828,100 L836,91" stroke={n} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* control bar */}
      <path d="M826,91 L846,89" stroke={n} strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* kite lines: from bar ends up to parafoil wingtips */}
      <path d="M826,91 L888,28" stroke={n} strokeWidth="1.5" fill="none" opacity="0.45" />
      <path d="M846,89 L972,28" stroke={n} strokeWidth="1.5" fill="none" opacity="0.45" />
      {/* parafoil kite */}
      <path d="M888,28 C908,4 952,4 972,28 C957,48 903,48 888,28 Z" fill={y} />
      <path d="M913,43 L916,9" stroke={n} strokeWidth="1" fill="none" opacity="0.25" />
      <path d="M930,46 L930,6" stroke={n} strokeWidth="1" fill="none" opacity="0.25" />
      <path d="M947,43 L944,9" stroke={n} strokeWidth="1" fill="none" opacity="0.25" />

    </svg>
  );
}

function Nav({ page, setPage, lang, setLang, t, showLangMenu, setShowLangMenu }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navTo = (key) => { setPage(key); setMobileOpen(false); setShowLangMenu(false); };

  return (
    <nav style={{ background:C.navy, position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 12px rgba(0,0,0,0.2)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center", height:56, gap:8 }}>

        <button onClick={() => navTo("home")} style={{ background:"none", border:"none", cursor:"pointer",
          fontFamily:"Georgia, serif", fontSize:16, fontWeight:700, color:C.white,
          fontStyle:"italic", letterSpacing:"0.3px", padding:0, marginRight:16, flexShrink:0 }}>
          L'Isola D'Oro
        </button>

        {/* Desktop nav links */}
        <div className="nav-desktop" style={{ display:"flex", gap:2, flex:1 }}>
          {Object.entries(t.nav).map(([key, label]) => (
            <button key={key} onClick={() => navTo(key)} style={{
              background: page===key ? `${C.yellow}22` : "none",
              border:"none", cursor:"pointer", padding:"6px 10px", borderRadius:4,
              fontSize:12, color: page===key ? C.yellow : "#b0c8e4",
              fontWeight: page===key ? 600 : 400, transition:"all 0.15s",
            }}>{label}</button>
          ))}
        </div>

        {/* Desktop lang picker */}
        <div className="nav-desktop" style={{ position:"relative", flexShrink:0 }}>
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
                  background: lang===l.code ? `${C.yellow}22` : "none",
                  border:"none", cursor:"pointer", fontSize:13,
                  color: lang===l.code ? C.yellow : "#b0c8e4", textAlign:"left",
                }}>
                  <span style={{ fontSize:16 }}>{l.flag}</span> {l.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="nav-hamburger" onClick={() => setMobileOpen(v => !v)} style={{
          display:"none", background:"none", border:`1px solid rgba(255,255,255,0.3)`,
          borderRadius:6, cursor:"pointer", padding:"6px 11px",
          color:C.white, fontSize:20, lineHeight:1, marginLeft:"auto", flexShrink:0,
        }}>{mobileOpen ? "✕" : "☰"}</button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div style={{ background:C.navy, borderTop:`1px solid rgba(255,255,255,0.1)`, paddingBottom:12 }}>
          {Object.entries(t.nav).map(([key, label]) => (
            <button key={key} onClick={() => navTo(key)} style={{
              display:"block", width:"100%",
              background: page===key ? `${C.yellow}22` : "none",
              border:"none", borderBottom:`1px solid rgba(255,255,255,0.05)`,
              cursor:"pointer", padding:"14px 24px", textAlign:"left",
              fontSize:15, color: page===key ? C.yellow : "#cce0f5",
              fontWeight: page===key ? 600 : 400,
            }}>{label}</button>
          ))}
          <div style={{ padding:"12px 24px 0", display:"flex", flexWrap:"wrap", gap:8, marginTop:4 }}>
            {LANGS.map(l => (
              <button key={l.code} onClick={() => { setLang(l.code); setMobileOpen(false); }} style={{
                background: lang===l.code ? `${C.yellow}33` : "rgba(255,255,255,0.07)",
                border: lang===l.code ? `1px solid ${C.yellow}66` : "1px solid rgba(255,255,255,0.15)",
                borderRadius:20, cursor:"pointer", padding:"5px 12px",
                fontSize:12, color: lang===l.code ? C.yellow : "#b0c8e4",
                fontWeight: lang===l.code ? 600 : 400,
              }}>{l.flag} {l.code.toUpperCase()}</button>
            ))}
          </div>
        </div>
      )}
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
            <h1 className="hero-h1" style={{ fontFamily:"Georgia, serif", fontSize:48, fontWeight:700, color:C.white,
              lineHeight:1.1, margin:"0 0 16px", fontStyle:"italic" }}>
              {h.title.split("\n").map((l,i) => <span key={i}>{l}{i===0 && <br/>}</span>)}
            </h1>
            <p className="hero-sub" style={{ fontSize:16, color:C.blueLight, lineHeight:1.7, maxWidth:480, margin:"0 0 28px" }}>{h.sub}</p>
            <div className="hero-ctas" style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
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
        </div>
        <BeachScene />
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

const ROOM_PHOTOS = {
  room_main:    ["/photos/room_main/_DSF2510.jpg","/photos/room_main/_DSF2512.jpg"],
  room_kids:    ["/photos/room_kids/_DSF2519.jpg","/photos/room_kids/_DSF2521.jpg","/photos/room_kids/_DSF2525.jpg","/photos/room_kids/_DSF2530.jpg"],
  room_living:  ["/photos/room_living/_DSF2473-s.png","/photos/room_living/_DSF2469.jpg","/photos/room_living/_DSF2472.jpg"],
  room_kitchen: ["/photos/room_kitchen/_DSF2542.jpg","/photos/room_kitchen/_DSF2546.jpg"],
  room_bath:    ["/photos/room_bath/_DSF2501.jpg","/photos/room_bath/_DSF2502.jpg"],
  room_terrace: ["/photos/room_terrace/_DSF2533.jpg","/photos/room_terrace/_DSF2535.jpg"],
  room_veranda: ["/photos/room_veranda/_DSF2456-s.png","/photos/room_veranda/_DSF2453.jpg","/photos/room_veranda/_DSF2457-s.png"],
  room_parking: ["/photos/room_parking/_DSF2555.jpg","/photos/room_parking/_DSF2550.jpg","/photos/room_parking/_DSF2556.jpg","/photos/room_parking/_DSF2561.jpg"],
};

function HousePage({ t }) {
  const h = t.house;
  const [lb, setLb] = useState(null); // { room, idx }

  const rooms = [
    { k:"room_living",  emoji:"🛋" }, { k:"room_veranda", emoji:"🌅" },
    { k:"room_kitchen", emoji:"🍳" }, { k:"room_terrace", emoji:"🌿" },
    { k:"room_main",    emoji:"🛏" }, { k:"room_kids",    emoji:"🛏" },
    { k:"room_bath",    emoji:"🚿" }, { k:"room_parking", emoji:"🚗" },
  ];

  const allPhotos = rooms.flatMap(({k, emoji}) =>
    ROOM_PHOTOS[k].map((src, i) => ({ src, room:k, emoji, idx:i }))
  );

  useEffect(() => {
    if (!lb) return;
    const photos = ROOM_PHOTOS[lb.room];
    const onKey = (e) => {
      if (e.key === "Escape") setLb(null);
      if (e.key === "ArrowRight" && photos.length > 1) setLb(l => ({ ...l, idx:(l.idx+1)%photos.length }));
      if (e.key === "ArrowLeft"  && photos.length > 1) setLb(l => ({ ...l, idx:(l.idx-1+photos.length)%photos.length }));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lb]);

  return (
    <div style={{ background:C.cream, minHeight:"60vh", padding:"48px 0 64px" }}>
      <div style={{ maxWidth:960, margin:"0 auto", padding:"0 24px" }}>
        <div style={{ width:40, height:4, background:C.yellow, borderRadius:2, marginBottom:16 }} />
        <h1 style={{ fontFamily:"Georgia, serif", fontSize:36, color:C.navy, margin:"0 0 12px", fontStyle:"italic" }}>{h.title}</h1>
        <p style={{ fontSize:15, color:C.textMid, lineHeight:1.7, maxWidth:640, margin:"0 0 32px" }}>{h.sub}</p>

        {/* Scrollable photo overview — visible once photos are added */}
        {allPhotos.length > 0 && (
          <div style={{ marginBottom:40, overflowX:"auto", paddingBottom:4 }}>
            <div style={{ display:"flex", gap:10 }}>
              {allPhotos.map((p, i) => (
                <div key={i} onClick={() => setLb({ room:p.room, idx:p.idx })}
                  style={{ position:"relative", flexShrink:0, width:190, height:130,
                    borderRadius:10, overflow:"hidden", cursor:"pointer" }}>
                  <img src={p.src} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  {p.idx === 0 && (
                    <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"22px 10px 7px",
                      background:"linear-gradient(transparent,rgba(0,0,0,0.58))", color:"white", fontSize:11 }}>
                      {p.emoji} {h[p.room]}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <h2 style={{ fontSize:18, color:C.navy, fontWeight:600, margin:"0 0 20px" }}>{h.rooms}</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px,1fr))", gap:16, marginBottom:40 }}>
          {rooms.map(({k, emoji}) => {
            const photos = ROOM_PHOTOS[k];
            return (
              <div key={k} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
                {/* Photo area */}
                <div onClick={() => setLb({ room:k, idx:0 })}
                  style={{ height:160, cursor:"pointer", position:"relative", overflow:"hidden",
                    background:"#edeae3", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  {photos.length > 0 ? (
                    <>
                      <img src={photos[0]} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                      {photos.length > 1 && (
                        <div style={{ position:"absolute", bottom:8, right:10,
                          background:"rgba(0,0,0,0.45)", color:"white", fontSize:11,
                          padding:"2px 9px", borderRadius:10 }}>
                          1 / {photos.length}
                        </div>
                      )}
                    </>
                  ) : (
                    <div style={{ textAlign:"center", color:"#9a9488", userSelect:"none" }}>
                      <div style={{ fontSize:30 }}>{emoji}</div>
                      <div style={{ fontSize:10, marginTop:5, letterSpacing:"0.6px", textTransform:"uppercase" }}>photos coming soon</div>
                    </div>
                  )}
                </div>
                {/* Text */}
                <div style={{ padding:"16px 20px" }}>
                  <div style={{ fontSize:14, fontWeight:600, color:C.navy, marginBottom:6 }}>{h[k]}</div>
                  <div style={{ fontSize:13, color:C.textMid, lineHeight:1.6 }}>{h[k+"_desc"]}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* What's included */}
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

      {/* Lightbox */}
      {lb && (() => {
        const photos = ROOM_PHOTOS[lb.room];
        const room = rooms.find(r => r.k === lb.room);
        return (
          <div onClick={() => setLb(null)}
            style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.93)", zIndex:200,
              display:"flex", flexDirection:"column" }}>
            {/* Header */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
              padding:"14px 20px", flexShrink:0 }} onClick={e => e.stopPropagation()}>
              <span style={{ fontFamily:"Georgia, serif", fontSize:15, fontStyle:"italic", color:"rgba(255,255,255,0.85)" }}>
                {room?.emoji}&nbsp;&nbsp;{h[lb.room]}
              </span>
              <button onClick={() => setLb(null)} style={{ background:"none", border:"none",
                color:"white", fontSize:28, cursor:"pointer", lineHeight:1, padding:"0 4px", opacity:0.7 }}>×</button>
            </div>
            {/* Main image */}
            <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center",
              position:"relative", minHeight:0, padding:"0 56px" }} onClick={e => e.stopPropagation()}>
              {photos.length > 0 ? (
                <img src={photos[lb.idx]}
                  style={{ maxHeight:"100%", maxWidth:"100%", objectFit:"contain", borderRadius:6 }} />
              ) : (
                <div style={{ textAlign:"center", color:"rgba(255,255,255,0.3)" }}>
                  <div style={{ fontSize:72 }}>{room?.emoji}</div>
                  <div style={{ fontSize:14, marginTop:16 }}>Photos coming soon</div>
                </div>
              )}
              {photos.length > 1 && (<>
                <button onClick={() => setLb(l => ({ ...l, idx:(l.idx-1+photos.length)%photos.length }))}
                  style={{ position:"absolute", left:8, background:"rgba(255,255,255,0.1)", border:"none",
                    color:"white", width:44, height:44, borderRadius:"50%", cursor:"pointer", fontSize:22 }}>‹</button>
                <button onClick={() => setLb(l => ({ ...l, idx:(l.idx+1)%photos.length }))}
                  style={{ position:"absolute", right:8, background:"rgba(255,255,255,0.1)", border:"none",
                    color:"white", width:44, height:44, borderRadius:"50%", cursor:"pointer", fontSize:22 }}>›</button>
              </>)}
            </div>
            {/* Counter */}
            {photos.length > 1 && (
              <div style={{ textAlign:"center", color:"rgba(255,255,255,0.4)", fontSize:12,
                padding:"6px 0", flexShrink:0 }} onClick={e => e.stopPropagation()}>
                {lb.idx+1} / {photos.length}
              </div>
            )}
            {/* Filmstrip */}
            {photos.length > 1 && (
              <div style={{ padding:"8px 20px 20px", overflowX:"auto", display:"flex",
                gap:8, flexShrink:0 }} onClick={e => e.stopPropagation()}>
                {photos.map((src, i) => (
                  <img key={i} src={src} onClick={() => setLb(l => ({ ...l, idx:i }))}
                    style={{ height:58, width:82, objectFit:"cover", borderRadius:6, cursor:"pointer",
                      flexShrink:0, opacity:i===lb.idx ? 1 : 0.45,
                      outline:`2px solid ${i===lb.idx ? C.yellow : "transparent"}`,
                      transition:"opacity 0.15s, outline 0.15s" }} />
                ))}
              </div>
            )}
          </div>
        );
      })()}
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
    <div style={{ background:C.cream, minHeight:"60vh", paddingBottom:64, paddingTop:48 }}>
      <div style={{ maxWidth:900, margin:"0 auto", padding:"0 24px 0" }}>
        <div style={{ width:40, height:4, background:C.yellow, borderRadius:2, marginBottom:16 }} />
        <h1 style={{ fontFamily:"Georgia, serif", fontSize:36, color:C.navy, margin:"0 0 4px", fontStyle:"italic" }}>{h.title}</h1>
        <p style={{ fontFamily:"Georgia, serif", fontSize:15, fontStyle:"italic", color:"#4a7a52", margin:"0 0 20px", letterSpacing:"0.4px" }}>Città Giardino</p>
        {h.intro && <p style={{ fontSize:15, color:C.textMid, lineHeight:1.8, margin:"0 0 24px", maxWidth:720 }}>{h.intro}</p>}
        <p style={{ fontSize:13, color:C.blue, fontWeight:600, letterSpacing:"0.4px", margin:"0 0 20px", textTransform:"uppercase" }}>{h.sub}</p>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:28 }}>
          {h.categories.map((c,i) => {
            const col = CAT_COLOR[i] || CAT_COLOR[0];
            const pale = CAT_PALE[i] || CAT_PALE[0];
            return (
              <button key={i} onClick={() => setCat(i)} style={{
                padding:"6px 16px", borderRadius:20, fontSize:12, cursor:"pointer", border:"1px solid",
                borderColor: cat===i ? col : C.border,
                background: cat===i ? pale : C.white,
                color: cat===i ? col : C.textMid, fontWeight: cat===i ? 600 : 400,
              }}>{c}</button>
            );
          })}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px,1fr))", gap:16 }}>
          {filtered.map((p,i) => {
            const ci = h.categories.indexOf(p.cat);
            const cardCol = CAT_COLOR[ci] || CAT_COLOR[0];
            const cardPale = CAT_PALE[ci] || CAT_PALE[0];
            return (
            <div key={i} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:10, padding:"18px 20px" }}>
              <div style={{ display:"inline-block", fontSize:10, fontWeight:700, color:cardCol,
                letterSpacing:"0.9px", textTransform:"uppercase", marginBottom:8,
                background:cardPale, borderRadius:20, padding:"2px 9px" }}>{p.cat}</div>
              <div style={{ fontSize:14, fontWeight:700, color:C.navy, marginBottom:6 }}>{p.name}</div>
              <div style={{ fontSize:13, color:C.textMid, lineHeight:1.6 }}>{p.text}</div>
              {p.map && (
                <a href={p.map} target="_blank" rel="noopener noreferrer"
                  style={{ display:"inline-flex", alignItems:"center", gap:5, marginTop:10,
                    fontSize:11, fontWeight:600, color:C.blue, textDecoration:"none",
                    border:`1px solid ${C.border}`, borderRadius:20, padding:"4px 10px",
                    letterSpacing:"0.3px" }}>
                  📍 Open in Maps
                </a>
              )}
            </div>
          );
          })}
        </div>
        {h.disclaimer && (
          <p style={{ marginTop:40, fontSize:12, color:C.textLight, lineHeight:1.7,
            fontStyle:"italic", borderTop:`1px solid ${C.border}`, paddingTop:20, maxWidth:720 }}>
            {h.disclaimer}
          </p>
        )}
      </div>
    </div>
  );
}

const GRADO_PHOTOS = {
  0: ["/photos/grado/old_town/0B1103337927.jpg", "/photos/grado/old_town/20031922.jpg"],
  1: ["/photos/grado/lagoon/grado_laguna_barbana_al_tramonto_tgonshq.jpg"],
  2: ["/photos/grado/beaches/Grado.jpg"],
  3: ["/photos/grado/barbana/insel-barbana-grado-123rf-75629475_700.jpg"],
  4: ["/photos/grado/day_trips/aerial_aquileia_basilica.jpg", "/photos/grado/day_trips/miramare.jpg", "/photos/grado/day_trips/cop5.jpg"],
};
const SECTION_COLORS = [C.yellow, C.blue, "#6B8F71", "#5B8FA8", C.navy, C.navy];

function GradoPage({ t }) {
  const h = t.grado;
  return (
    <div style={{ background:C.cream, minHeight:"60vh", padding:"48px 0 64px" }}>
      <div style={{ maxWidth:860, margin:"0 auto", padding:"0 24px" }}>
        <div style={{ width:40, height:4, background:C.yellow, borderRadius:2, marginBottom:16 }} />
        <h1 style={{ fontFamily:"Georgia, serif", fontSize:36, color:C.navy, margin:"0 0 12px", fontStyle:"italic" }}>{h.title}</h1>
        <p style={{ fontSize:15, color:C.textMid, lineHeight:1.7, margin:"0 0 32px" }}>{h.sub}</p>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {h.sections.map((s, i) => {
            const photos = GRADO_PHOTOS[i];
            const isEvents = i === h.sections.length - 1;
            const color = SECTION_COLORS[i] || C.navy;
            const flip = photos && i % 2 !== 0;
            return (
              <div key={i} className="grado-card" style={{
                background:C.white, border:`1px solid ${C.border}`, borderRadius:12,
                overflow:"hidden", display:"flex", flexDirection: flip ? "row-reverse" : "row",
                boxShadow:"0 1px 6px rgba(0,0,0,0.05)",
              }}>
                {photos
                  ? <div className="grado-card-img" style={{ width:260, flexShrink:0 }}>
                      <img src={photos[0]} alt={s.title}
                        style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                    </div>
                  : <div style={{ width:4, flexShrink:0, background:color, borderRadius:"12px 0 0 12px" }} />
                }
                <div style={{ flex:1, padding:"24px 28px", minWidth:0 }}>
                  <div style={{ width:28, height:3, background:color, borderRadius:2, marginBottom:12 }} />
                  <div style={{ fontSize:16, fontWeight:700, color:C.navy, marginBottom:8, fontFamily:"Georgia, serif" }}>{s.title}</div>
                  <div style={{ fontSize:14, color:C.textMid, lineHeight:1.75 }}>{s.text}</div>
                  {isEvents && (
                    <a href="https://grado.it/en/events-and-tours" target="_blank" rel="noopener noreferrer"
                      style={{ display:"inline-flex", alignItems:"center", gap:6, marginTop:14,
                        fontSize:12, fontWeight:600, color:C.blue, textDecoration:"none",
                        border:`1px solid ${C.border}`, borderRadius:20, padding:"5px 14px" }}>
                      🗓 {h.eventsLink}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
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

        <div style={{ borderRadius:12, overflow:"hidden", marginBottom:36, border:`1px solid ${C.border}` }}>
          <iframe
            title="map"
            width="100%"
            height="300"
            style={{ display:"block", border:0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Viale+Italia+28,+34073+Grado+GO,+Italy&output=embed"
          />
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400;1,600&display=swap');
        * { box-sizing: border-box; margin: 0; }
        .nav-desktop { display: flex; }
        .nav-hamburger { display: none; }
        .grado-card-img { min-height: 180px; }
        @media (max-width: 680px) {
          .grado-card { flex-direction: column !important; }
          .grado-card-img { width: 100% !important; height: 200px; min-height: unset; }
          .grado-card-img img { height: 200px; }
        }
        @media (max-width: 680px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
          .beach-scene { height: calc(100vw * 0.15) !important; }
          .hero-h1 { font-size: 30px !important; }
          .hero-sub { font-size: 14px !important; }
          .hero-ctas { flex-direction: column !important; }
          .hero-ctas button, .hero-ctas a { width: 100% !important; text-align: center; justify-content: center; }
        }
      `}</style>
      <Nav page={page} setPage={setPage} lang={lang} setLang={setLang} t={t}
        showLangMenu={showLangMenu} setShowLangMenu={(v) => { v ? setShowLangMenu(true) : setShowLangMenu(false); }} />
      <PageComponent t={t} setPage={setPage} />
      <Footer t={t} lang={lang} />
    </div>
  );
}
