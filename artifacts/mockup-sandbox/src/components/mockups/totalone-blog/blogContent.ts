export type ArticleSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  numbered?: string[];
  flow?: string[];
  callout?: { label: string; text: string };
  comparison?: {
    leftTitle: string;
    left: string[];
    rightTitle: string;
    right: string[];
  };
};

export type BlogArticleData = {
  id: string;
  category: string;
  categoryRoute: string;
  route: string;
  primaryKeyword: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  guide: { label: string; href: string };
  product: { label: string; href: string };
  sections: ArticleSection[];
  related: string[];
  finalCta: {
    heading: string;
    text: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
};

const preview = (component: string) => `/__mockup/preview/totalone-blog/${component}`;

export const blogArticles: BlogArticleData[] = [
  {
    id: "software-gestionale-negozio-arredamento",
    category: "Gestione showroom",
    categoryRoute: "/blog/gestione-showroom",
    route: "/blog/gestione-showroom/software-gestionale-negozio-arredamento",
    primaryKeyword: "software gestionale negozio arredamento",
    seoTitle: "Software gestionale per negozio di arredamento: guida | Totalone",
    metaDescription: "Cosa deve gestire un software per negozi di arredamento: clienti, preventivi, commesse, arrivi, montaggi e post-vendita in un processo condiviso.",
    h1: "Software gestionale per negozi di arredamento: cosa deve fare davvero",
    intro: [
      "Gestire un negozio di arredamento significa coordinare molto più di clienti e vendite.",
      "Un cliente può entrare in showroom, richiedere un progetto, ricevere più versioni di un preventivo, confermare una parte della proposta e arrivare alla consegna e al montaggio settimane o mesi dopo il primo incontro.",
      "Quando queste informazioni vengono distribuite tra Excel, email, calendari, cartelle e strumenti diversi, seguire il lavoro diventa progressivamente più difficile. Un software gestionale per negozi di arredamento dovrebbe servire prima di tutto a questo: collegare le diverse fasi del lavoro in un unico processo.",
    ],
    guide: { label: "Guida alla gestione showroom", href: "/guide/gestione-showroom-arredamento" },
    product: { label: "Scopri l’architettura Totalone", href: "/gestionale-arredamento/" },
    sections: [
      {
        heading: "Perché un negozio di arredamento ha esigenze diverse da un normale punto vendita",
        paragraphs: [
          "La vendita di arredamento è spesso consulenziale e legata a un progetto. La relazione non si esaurisce in un acquisto immediato: richiede ascolto, composizione dell’offerta, revisioni, coordinamento di prodotti e servizi e una consegna organizzata.",
          "Per questo il gestionale deve mantenere il contesto anche quando il lavoro passa da una persona all’altra. La domanda iniziale, il preventivo, la commessa e ciò che accade dopo devono poter essere letti come parti dello stesso percorso.",
        ],
        bullets: ["Cicli di vendita lunghi", "Più interazioni con lo stesso cliente", "Preventivi e revisioni", "Prodotti, specifiche e servizi", "Consegne, montaggio e assistenza"],
      },
      {
        heading: "1. Gestire clienti e ingressi showroom",
        paragraphs: [
          "Il processo comincia prima del preventivo. Registrare contatto, showroom, venditore, appuntamento, provenienza e note della visita aiuta a non perdere il motivo per cui una persona è entrata e il passo successivo da proporre.",
          "Uno storico leggibile evita di chiedere di nuovo le stesse informazioni e permette al team di riprendere una relazione anche quando il primo interlocutore non è disponibile.",
        ],
        callout: { label: "Approfondimento", text: "Il CRM è il punto in cui la visita allo showroom diventa una relazione commerciale seguibile nel tempo." },
      },
      {
        heading: "2. Seguire le trattative commerciali",
        paragraphs: [
          "Una pipeline non serve a classificare i clienti in astratto: serve a capire quali opportunità sono aperte, quali stanno avanzando e quali richiedono un follow-up. Senza questa visibilità, le attività commerciali dipendono troppo dalla memoria dei singoli venditori.",
          "Il valore di una trattativa è anche nel suo prossimo passo: richiamare, fissare un appuntamento, inviare una revisione o trasformare una proposta in commessa.",
        ],
        callout: { label: "Collegamento", text: "Dalla relazione commerciale alla gestione operativa: scopri Gestione trattative." },
      },
      {
        heading: "3. Creare preventivi adatti all’arredamento",
        paragraphs: [
          "Un preventivo può contenere cucine, mobili, sistemi, elettrodomestici, finiture, dimensioni, immagini, quantità, sconti, IVA, extra e servizi. La difficoltà non è solo calcolare un totale: è presentare una proposta che resti comprensibile mentre cambia.",
          "Un software per l’arredamento dovrebbe aiutare a organizzare prodotti e composizioni, gestire revisioni e mantenere coerenti le informazioni che passano dal venditore alla commessa.",
        ],
        callout: { label: "Collegamento", text: "Per la fase di proposta, approfondisci i Preventivi Totalone." },
      },
      {
        heading: "4. Trasformare la vendita in una commessa",
        paragraphs: [
          "Quando il cliente conferma, il lavoro cambia natura. Le informazioni commerciali diventano una base per seguire ciò che è stato venduto, con il cliente, il venditore, il valore preventivato e venduto, gli acconti, il saldo e lo stato della commessa.",
          "Il passaggio è più ordinato quando non richiede di ricostruire manualmente la storia della trattativa. La commessa eredita il contesto e diventa il riferimento comune per le fasi successive.",
        ],
        callout: { label: "Collegamento", text: "Scopri come seguire il lavoro con Gestione commesse." },
      },
      {
        heading: "5. Coordinare progetti e attività",
        paragraphs: [
          "Una commessa può coinvolgere venditori, progettisti, fornitori, magazzino e montatori. Attività, responsabilità e scadenze devono essere visibili alle persone che ne hanno bisogno, senza trasformare il coordinamento in una catena di messaggi separati.",
          "La condivisione non significa aggiungere riunioni: significa rendere chiaro chi deve fare cosa e quale impatto ha un ritardo sul passaggio successivo.",
        ],
        callout: { label: "Collegamento", text: "Per coordinare attività e responsabilità, esplora Gestione progetti." },
      },
      {
        heading: "6. Sapere cosa sta arrivando",
        paragraphs: [
          "Dopo la vendita, conoscere lo stato dei prodotti e gli arrivi previsti diventa essenziale. Una consegna non si pianifica bene se la merce attesa è sparsa tra conferme, email e fogli diversi.",
          "La visibilità sugli arrivi collega la commessa al magazzino e rende più concreto il momento in cui si può programmare la consegna o il montaggio.",
        ],
        callout: { label: "Collegamento", text: "Scopri Magazzino e logistica per seguire prodotti, colli e arrivi." },
      },
      {
        heading: "7. Pianificare il montaggio",
        paragraphs: [
          "Il montaggio richiede una data, informazioni corrette, merce pronta e persone coordinate. Un calendario separato dalla commessa rischia di perdere proprio il contesto che serve al montatore.",
          "Portare la pianificazione dentro lo stesso flusso aiuta a verificare cosa è pronto, cosa manca e quali attività devono essere completate prima dell’intervento.",
        ],
        callout: { label: "Collegamento", text: "Approfondisci la pianificazione con Gestione montaggi." },
      },
      {
        heading: "8. Continuare a seguire il cliente dopo la consegna",
        paragraphs: [
          "La relazione non finisce con il montaggio. Una verifica, un intervento o un prodotto in assistenza devono restare collegati al cliente e alla commessa a cui appartengono.",
          "Lo storico del post-vendita è parte dell’esperienza complessiva: permette di rispondere con il contesto giusto e di non ricominciare da zero ogni volta.",
        ],
        callout: { label: "Collegamento", text: "Scopri Assistenza e post-vendita." },
      },
      {
        heading: "Un unico sistema o tanti strumenti separati?",
        paragraphs: [
          "Digitalizzare una singola attività non significa necessariamente collegare il lavoro. Un foglio per i contatti, uno per i preventivi e un calendario per i montaggi possono funzionare singolarmente, ma diventano fragili quando le informazioni devono passare da uno strumento all’altro.",
          "La domanda utile è se il processo resta leggibile dall’inizio alla fine:",
        ],
        flow: ["Cliente", "Trattativa", "Preventivo", "Commessa", "Arrivi", "Montaggio", "Post-vendita"],
      },
      {
        heading: "Come scegliere un gestionale per il proprio showroom",
        paragraphs: [
          "Prima di valutare le singole funzioni, osserva il lavoro reale: dove nascono le informazioni, chi le usa, quante volte vengono riscritte e quali passaggi richiedono telefonate o richieste interne.",
        ],
        bullets: ["È verticale per il settore arredamento?", "Le informazioni sono condivise dal team?", "Collega clienti, preventivi, commesse e operatività?", "Supporta più utenti e, quando serve, più showroom?", "Rende visibile il passaggio tra una fase e l’altra?", "Può crescere insieme all’azienda senza complicare il lavoro?"],
      },
    ],
    related: ["crm-negozio-arredamento", "software-preventivi-arredamento", "gestione-commesse-arredamento"],
    finalCta: {
      heading: "Un unico modo di lavorare, costruito per l’arredamento.",
      text: "Totalone riunisce clienti, trattative, preventivi, commesse e operatività in un sistema progettato intorno al lavoro reale di showroom e negozi di arredamento.",
      primaryLabel: "Scopri Totalone",
      primaryHref: "/__mockup/preview/totalone-perche/PercheTotalonePage",
      secondaryLabel: "Prenota una demo",
      secondaryHref: "/demo/",
    },
  },
  {
    id: "gestionale-per-arredatori",
    category: "Gestione showroom",
    categoryRoute: "/blog/gestione-showroom",
    route: "/blog/gestione-showroom/gestionale-per-arredatori",
    primaryKeyword: "gestionale per arredatori",
    seoTitle: "Gestionale per arredatori: come scegliere quello giusto | Totalone",
    metaDescription: "Come scegliere un gestionale per arredatori: processi da verificare, differenza tra software generico e verticale e checklist per lo showroom.",
    h1: "Gestionale per arredatori: come scegliere quello giusto per il tuo showroom",
    intro: [
      "Non tutti i software gestionali rispondono agli stessi problemi.",
      "Per un negozio di arredamento, il punto non è semplicemente digitalizzare documenti o anagrafiche. Il vero obiettivo è mantenere collegato un processo che può iniziare con un ingresso in showroom e terminare mesi dopo con montaggio e assistenza.",
      "Prima di scegliere un gestionale è quindi utile capire quali processi deve realmente supportare.",
    ],
    guide: { label: "Guida alla gestione showroom", href: "/guide/gestione-showroom-arredamento" },
    product: { label: "Perché Totalone", href: preview("PercheTotalonePage") },
    sections: [
      { heading: "Prima domanda: quali processi vuoi gestire?", paragraphs: ["Parti da una mappa concreta, non da un elenco di funzioni. Elenca come entrano i contatti, come vengono seguite le trattative, come nascono i preventivi e cosa succede dopo la conferma.", "Un gestionale utile deve ridurre i passaggi in cui il team cerca informazioni o chiede a una persona di ricostruire lo stato di un lavoro."] , flow: ["Ingresso showroom", "Relazione", "Trattativa", "Preventivo", "Commessa", "Operatività"] },
      { heading: "Gestionale generico o software verticale per arredamento?", paragraphs: ["Un software generico può essere adatto quando il processo è semplice e stabile. Un software verticale parte invece dalle particolarità del settore: vendita consulenziale, composizioni, prodotti collegati a commesse, arrivi, montaggi e assistenza.", "La scelta non riguarda quale categoria sia migliore in assoluto. Riguarda quanto il sistema riesca a parlare il linguaggio del lavoro quotidiano senza richiedere continue personalizzazioni o ricostruzioni manuali."] },
      { heading: "CRM e gestione clienti", paragraphs: ["Un arredatore ha bisogno di ricordare non solo chi è il cliente, ma da quale visita è iniziata la relazione, quale showroom lo ha accolto, quale venditore lo segue e quali informazioni sono già state condivise.", "Lo storico permette di dare continuità alla relazione e di passare il contesto al collega giusto quando il lavoro lo richiede."], callout: { label: "Da verificare", text: "Il CRM deve essere parte del percorso, non un archivio isolato." } },
      { heading: "Trattative e follow-up", paragraphs: ["Una trattativa aperta non è una previsione di vendita: è un lavoro da seguire. Chiedi come il gestionale rende visibili opportunità, prossimi passi e situazioni ferme.", "Se il follow-up rimane affidato a calendari personali e memoria, il dato commerciale non diventa patrimonio del team."] },
      { heading: "Preventivi", paragraphs: ["Verifica se il sistema gestisce la complessità delle proposte di arredamento: prodotti, composizioni, quantità, finiture, immagini, sconti, IVA e revisioni.", "È importante anche il passaggio successivo: il preventivo confermato deve poter diventare una base leggibile per la commessa."] },
      { heading: "Commesse", paragraphs: ["La commessa deve riunire ciò che è stato venduto e ciò che deve essere eseguito. Chiedi come vengono letti stato, valore, acconti, saldo, prodotti e attività.", "Un buon criterio è osservare quanto tempo serve a una persona del team per capire dove si trova il lavoro senza telefonare a chi lo segue."] },
      { heading: "Progetti e attività", paragraphs: ["Quando una commessa coinvolge più persone, attività e scadenze devono essere assegnabili e condivise. La visibilità non sostituisce il coordinamento, ma lo rende più verificabile.", "Cerca un sistema che mantenga attività e progetto collegati alla commessa, invece di spostarli in uno spazio senza contesto."] },
      { heading: "Magazzino e arrivi", paragraphs: ["Prodotti e colli possono avere stati diversi e arrivare in momenti diversi. Il gestionale deve aiutare a capire cosa è da ordinare, cosa è confermato e cosa può passare alle fasi successive.", "La visibilità sugli arrivi è utile solo se resta collegata alla commessa e alla consegna che dipende da quei prodotti."] },
      { heading: "Montaggi e post-vendita", paragraphs: ["Il montaggio non è una voce finale del preventivo: è un’attività con una data, persone, merce e informazioni da coordinare. Dopo il montaggio, assistenze e interventi devono mantenere lo storico del cliente.", "Valuta il flusso completo: dall’ordine alla consegna, fino alla chiusura della relazione."] },
      { heading: "E se hai più showroom?", paragraphs: ["Con più sedi, il punto non è solo vedere più dati. È distinguere responsabilità e performance mantenendo una visione comune di clienti, trattative e commesse.", "Chiedi come il sistema evita duplicazioni e come permette al management di leggere il lavoro senza imporre lo stesso metodo a ogni sede in modo artificiale."] },
      { heading: "La facilità di utilizzo conta quanto le funzionalità", paragraphs: ["Un gestionale adottato solo da una parte del team non produce una visione condivisa. La semplicità non significa avere meno struttura: significa trovare le informazioni e registrare i passaggi senza attrito inutile.", "Durante una demo, chiedi al team di simulare un caso reale del vostro showroom, non solo di vedere una lista di moduli."] },
      { heading: "Checklist: 10 domande da fare prima di scegliere", numbered: ["È pensato per il settore arredamento?", "Collega CRM e preventivi?", "Posso seguire la commessa?", "Posso vedere cosa deve arrivare?", "Posso coordinare i montaggi?", "Posso gestire più showroom?", "Il team lavora sulle stesse informazioni?", "È semplice da utilizzare?", "Riduce i passaggi tra strumenti?", "Può crescere con l’azienda?"] },
    ],
    related: ["software-gestionale-negozio-arredamento", "crm-negozio-arredamento", "excel-vs-gestionale-arredamento"],
    finalCta: { heading: "Scopri un gestionale costruito intorno al lavoro di uno showroom.", text: "La scelta diventa più semplice quando puoi confrontare il software con i tuoi processi reali, dalla prima visita al post-vendita.", primaryLabel: "Perché Totalone", primaryHref: preview("PercheTotalonePage"), secondaryLabel: "Prenota una demo", secondaryHref: "/demo/" },
  },
  {
    id: "software-preventivi-arredamento",
    category: "Preventivi",
    categoryRoute: "/blog/preventivi",
    route: "/blog/preventivi/software-preventivi-arredamento",
    primaryKeyword: "software preventivi arredamento",
    seoTitle: "Software preventivi arredamento: cosa deve gestire | Totalone",
    metaDescription: "Cosa deve gestire un software per preventivi di arredamento: composizioni, prodotti, finiture, revisioni, PDF e passaggio alla commessa.",
    h1: "Software per preventivi di arredamento: cosa serve davvero a uno showroom",
    intro: ["Un preventivo di arredamento raramente è una semplice lista di prodotti e prezzi.", "Una proposta può includere cucine, sistemi, mobili, elettrodomestici, finiture, misure, immagini, alternative e servizi.", "Per questo un preventivatore destinato al settore arredamento deve organizzare informazioni diverse mantenendo l’offerta comprensibile sia per il venditore sia per il cliente."],
    guide: { label: "Guida ai preventivi per arredamento", href: "/guide/preventivi-arredamento" },
    product: { label: "Scopri i Preventivi Totalone", href: preview("PreventiviProductPage") },
    sections: [
      { heading: "Perché un preventivo di arredamento è complesso", paragraphs: ["La proposta deve raccontare una soluzione, non solo sommare righe. Ogni elemento può appartenere a un ambiente, avere una specifica, una quantità, un’immagine o una relazione con un altro elemento.", "Quando il preventivo cambia, il venditore deve poter distinguere ciò che è stato modificato senza perdere la versione precedente."] },
      { heading: "Organizzare prodotti e ambienti", paragraphs: ["Dividere la proposta per ambienti o aree aiuta a mantenere leggibile la composizione. Il cliente capisce cosa sta acquistando e il team può ritrovare più rapidamente le informazioni operative.", "La struttura deve restare abbastanza flessibile per adattarsi a cucine, living, camere, bagni o progetti completi."] },
      { heading: "Gestire cucine e composizioni", paragraphs: ["Una cucina può includere composizioni, aree, top, elettrodomestici, accessori e alternative. Il preventivo deve esplicitare questi rapporti senza trasformare la presentazione in un elenco indecifrabile.", "La chiarezza aiuta anche nella revisione: quando cambia una finitura o un elemento, è più facile capire quale parte della proposta viene coinvolta."], bullets: ["Composizioni e aree", "Piani e finiture", "Elettrodomestici", "Extra e opzioni"] },
      { heading: "Descrivere correttamente ogni prodotto", paragraphs: ["Brand, modello, area, dimensioni, finiture, note, immagini e quantità sono informazioni diverse. Tenerle insieme rende la proposta più utile al cliente e più affidabile per chi dovrà gestire la commessa.", "Le note dovrebbero chiarire ciò che non può essere dedotto dal nome del prodotto, senza sostituire le specifiche essenziali."] },
      { heading: "Prezzi, quantità, sconti e IVA", paragraphs: ["Il totale deve essere leggibile e coerente con le righe che lo compongono. Quantità, sconti e IVA hanno un ruolo diverso e vanno presentati senza ambiguità.", "Una buona proposta rende verificabile il calcolo e riduce le domande che non riguardano il progetto, lasciando spazio alla conversazione sul valore della soluzione."] },
      { heading: "Immagini e presentazione della proposta", paragraphs: ["Le immagini possono aiutare a collegare un prodotto alla soluzione progettata. Non sostituiscono la descrizione, ma rendono più concreta la lettura del preventivo.", "Anche il PDF deve mantenere gerarchia, sezioni e informazioni importanti. Un documento ordinato è più semplice da rileggere durante una revisione."] },
      { heading: "Gestire più versioni dello stesso preventivo", paragraphs: ["Le revisioni fanno parte della vendita di arredamento. Il punto non è impedire ogni cambiamento, ma sapere quale versione è attuale e cosa è cambiato rispetto alla precedente.", "Conservare il filo delle alternative aiuta a evitare che una decisione già superata rientri nella proposta finale."] },
      { heading: "Dal preventivo al PDF", paragraphs: ["Il PDF è spesso il documento che il cliente porta fuori dallo showroom. Deve quindi essere coerente con ciò che è stato discusso e abbastanza chiaro da poter essere riletto senza spiegazioni aggiuntive.", "La generazione del documento è l’ultimo passaggio di un lavoro di organizzazione: se la struttura è confusa, il PDF rende visibile la confusione."] },
      { heading: "Collegare preventivo, trattativa e commessa", paragraphs: ["Il preventivo non vive da solo. È una tappa della relazione commerciale e, quando viene confermato, diventa il riferimento per il lavoro operativo.", "Un flusso collegato riduce la necessità di ricopiare dati e rende più chiaro il passaggio di responsabilità."], flow: ["Trattativa", "Preventivo", "Revisione", "Conferma", "Commessa"] },
      { heading: "Cosa valutare in un software per preventivi di arredamento", bullets: ["Può organizzare prodotti e composizioni per ambiente?", "Gestisce specifiche, quantità, immagini, sconti e IVA in modo leggibile?", "Permette di mantenere più versioni?", "Produce un PDF coerente con la proposta?", "Collega il preventivo alla trattativa e alla commessa?", "È abbastanza semplice da usare durante una conversazione con il cliente?"] },
    ],
    related: ["software-gestionale-negozio-arredamento", "gestione-commesse-arredamento", "crm-negozio-arredamento"],
    finalCta: { heading: "Crea preventivi pensati per il modo in cui vendi arredamento.", text: "La proposta commerciale diventa più utile quando resta leggibile per il cliente e collegata al lavoro che viene dopo.", primaryLabel: "Scopri i Preventivi Totalone", primaryHref: preview("PreventiviProductPage"), secondaryLabel: "Prenota una demo", secondaryHref: "/demo/" },
  },
  {
    id: "gestione-commesse-arredamento",
    category: "Commesse e progetti",
    categoryRoute: "/blog/commesse-progetti",
    route: "/blog/commesse-progetti/gestione-commesse-arredamento",
    primaryKeyword: "gestione commesse arredamento",
    seoTitle: "Gestione commesse arredamento: guida completa | Totalone",
    metaDescription: "Come gestire una commessa di arredamento dal preventivo al montaggio: stato, valori, prodotti, attività, arrivi e post-vendita.",
    h1: "Come gestire una commessa di arredamento dal preventivo al montaggio",
    intro: ["Una commessa di arredamento non termina quando il cliente accetta il preventivo.", "Da quel momento iniziano attività commerciali, economiche e operative che devono rimanere coordinate fino alla conclusione del progetto."],
    guide: { label: "Guida alla gestione commesse", href: "/guide/gestione-commesse-arredamento" },
    product: { label: "Scopri Gestione commesse", href: preview("CommesseProductPage") },
    sections: [
      { heading: "Quando nasce una commessa", paragraphs: ["La commessa nasce quando una proposta diventa un lavoro da eseguire. Il suo punto di partenza dovrebbe restare riconoscibile: cliente, venditore, preventivo e condizioni condivise.", "Separare completamente la commessa dalla vendita significa perdere informazioni proprio nel momento in cui servono più dettagli."] },
      { heading: "Dal preventivo alla vendita", paragraphs: ["Il passaggio richiede una verifica: cosa è stato confermato, con quale valore e quali elementi sono ancora da definire? Una transizione ordinata rende esplicite le decisioni invece di affidarle a messaggi o appunti personali."] },
      { heading: "Tenere sotto controllo lo stato della commessa", paragraphs: ["Lo stato deve aiutare a capire cosa sta accadendo e quale passaggio viene dopo. Non serve aggiungere etichette per ogni eccezione: serve una lettura condivisa che il team riconosca.", "Uno stato leggibile è utile quando porta a un’azione: verificare un arrivo, completare un’attività, pianificare il montaggio o aprire un’assistenza."] },
      { heading: "Preventivato, finalizzato e venduto: perché distinguerli", paragraphs: ["Un valore preventivato non coincide sempre con ciò che viene finalizzato o venduto. Distinguere questi momenti aiuta a leggere la commessa senza confondere proposta, conferma e risultato.", "La chiarezza economica non richiede complicare la pagina: richiede usare parole diverse per situazioni diverse."] },
      { heading: "Acconti e saldo", paragraphs: ["Acconti e saldo fanno parte del contesto della commessa e devono essere rintracciabili insieme al lavoro a cui si riferiscono. Il team operativo non deve ricostruire la situazione economica cercando in più strumenti.", "La registrazione ordinata non sostituisce le procedure amministrative: rende però più chiaro il quadro condiviso del progetto."] },
      { heading: "Prodotti e documentazione", paragraphs: ["Una commessa può raccogliere molti prodotti, documenti e specifiche. Il valore sta nel collegamento: sapere a quale cliente, ambiente e lavoro appartiene un’informazione.", "La documentazione dovrebbe aiutare la fase successiva, non essere solo un archivio da consultare quando nasce un problema."] },
      { heading: "Coordinare attività e responsabilità", paragraphs: ["Quando più persone lavorano sulla stessa commessa, ogni attività dovrebbe avere un responsabile e un momento di verifica. La condivisione evita che un passaggio importante rimanga implicito.", "Il progetto diventa più gestibile quando le attività non sono separate dal contesto della commessa."] },
      { heading: "Arrivi e logistica", paragraphs: ["Una commessa procede anche in base a ciò che deve arrivare. Collegare prodotti e arrivi aiuta a capire quali attività possono essere pianificate e quali dipendono da una consegna ancora aperta.", "La logistica non è una fase estranea alla vendita: è ciò che rende eseguibile ciò che il cliente ha acquistato."] },
      { heading: "Pianificare il montaggio", paragraphs: ["Il montaggio va preparato quando la merce, le informazioni e le persone sono compatibili con la data prevista. Un calendario senza il contesto della commessa non basta.", "Verificare prima ciò che è pronto permette di arrivare al giorno dell’intervento con meno informazioni da ricostruire."] },
      { heading: "Chiudere la commessa senza perdere il post-vendita", paragraphs: ["La chiusura operativa non dovrebbe cancellare lo storico. Se dopo il montaggio nasce un’assistenza, il team deve poter ritrovare cliente, prodotti e percorso seguito.", "Una commessa ben chiusa lascia un contesto utile, non solo una riga archiviata."] },
      { heading: "La gestione della commessa come processo condiviso", paragraphs: ["Il risultato non è avere una schermata in più. È fare in modo che le persone lavorino sullo stesso filo, dal primo contatto al post-vendita."], flow: ["Trattativa", "Preventivo", "Vendita", "Commessa", "Arrivi", "Montaggio", "Post-vendita"] },
    ],
    related: ["software-preventivi-arredamento", "gestione-magazzino-arredamento", "gestione-montaggi-arredamento"],
    finalCta: { heading: "Segui ogni commessa in un unico sistema.", text: "Porta nel lavoro operativo il contesto costruito durante la vendita e mantieni collegate le fasi che accompagnano ogni progetto.", primaryLabel: "Scopri Gestione commesse", primaryHref: preview("CommesseProductPage"), secondaryLabel: "Prenota una demo", secondaryHref: "/demo/" },
  },
  {
    id: "crm-negozio-arredamento",
    category: "Vendite e CRM",
    categoryRoute: "/blog/vendite-crm",
    route: "/blog/vendite-crm/crm-negozio-arredamento",
    primaryKeyword: "CRM negozio arredamento",
    seoTitle: "CRM per negozi di arredamento: guida per showroom | Totalone",
    metaDescription: "Come usare un CRM per negozi di arredamento per gestire ingressi showroom, contatti, appuntamenti, venditori, trattative e follow-up.",
    h1: "CRM per negozi di arredamento: come gestire clienti, ingressi e trattative",
    intro: ["In uno showroom, la relazione commerciale spesso inizia molto prima del preventivo.", "Un cliente entra, osserva, parla con un venditore, lascia un contatto, torna per un appuntamento e solo successivamente può trasformarsi in una vera trattativa. Un CRM pensato per l’arredamento deve mantenere continuità lungo questo percorso."],
    guide: { label: "Guida al CRM per arredatori", href: "/guide/crm-per-arredatori" },
    product: { label: "Scopri il CRM Totalone", href: preview("CrmProductPage") },
    sections: [
      { heading: "Cos’è un CRM per arredamento", paragraphs: ["È il luogo in cui la relazione viene resa visibile e condivisa. Non serve solo a conservare un nome: raccoglie contesto, interazioni e prossimi passi.", "Nel settore arredamento questo contesto deve poter accompagnare il cliente fino alla trattativa e al preventivo."] },
      { heading: "Dal visitatore al contatto", paragraphs: ["Non ogni visitatore è pronto a comprare. Registrare una visita permette però di distinguere una semplice presenza da un contatto che merita un seguito, senza lasciare la relazione nella memoria del venditore."] },
      { heading: "Registrare gli ingressi showroom", paragraphs: ["Data, showroom, venditore, provenienza e note sono elementi semplici ma utili. Il loro valore aumenta quando la visita può essere collegata al contatto e riletta in seguito.", "La registrazione deve essere veloce abbastanza da entrare nel lavoro quotidiano, non un adempimento separato."] },
      { heading: "Costruire uno storico del cliente", paragraphs: ["Lo storico evita di ripartire da zero a ogni contatto. Aiuta a capire cosa è già stato visto, quale esigenza è emersa e quale promessa è stata fatta.", "Una buona cronologia non è una raccolta indiscriminata: contiene le informazioni che servono alla relazione successiva."] },
      { heading: "Assegnare clienti e opportunità ai venditori", paragraphs: ["La responsabilità deve essere leggibile. Il team può collaborare meglio quando sa chi segue il cliente e quando una richiesta deve essere riassegnata.", "L’assegnazione non riguarda solo il controllo: protegge la continuità della relazione."] },
      { heading: "Gestire appuntamenti e calendario", paragraphs: ["Un appuntamento è più utile quando conserva il motivo dell’incontro e il contesto del cliente. Il calendario diventa così parte della relazione, non un elenco di orari.", "Dopo l’appuntamento dovrebbe essere chiaro quale passo segue: contatto, progetto, preventivo o follow-up."] },
      { heading: "Seguire le trattative", paragraphs: ["La trattativa rende visibile il passaggio tra interesse e decisione. Fasi e prossimi passi aiutano a capire dove concentrare il lavoro senza confondere tutte le opportunità.", "Un CRM non deve promettere di chiudere vendite al posto del team: deve aiutare il team a non perdere il filo."] },
      { heading: "Dal CRM al preventivo", paragraphs: ["Quando la relazione diventa progetto, il preventivo dovrebbe partire dalle informazioni già raccolte. Il passaggio conserva il contesto e riduce la ripetizione di dati.", "Il cliente deve percepire continuità anche quando cambia il tipo di attività che lo showroom sta svolgendo."] },
      { heading: "Segmentare i contatti", paragraphs: ["Liste e filtri possono aiutare a leggere gruppi di contatti secondo criteri utili al lavoro: fase, responsabile, showroom o prossimo passo.", "Le Smart Lists hanno valore quando rispondono a una domanda concreta del team, non quando generano segmentazioni che nessuno usa."] },
      { heading: "CRM generico o CRM verticale?", paragraphs: ["Un CRM generico può gestire contatti e attività. Un CRM verticale per l’arredamento dovrebbe mantenere visibile il percorso specifico dello showroom: ingresso, relazione, trattativa, preventivo e commessa.", "La scelta va verificata con casi reali, non solo con la quantità di funzioni elencate."] },
    ],
    related: ["gestire-ingressi-showroom", "software-gestionale-negozio-arredamento", "software-preventivi-arredamento"],
    finalCta: { heading: "Un CRM costruito intorno allo showroom.", text: "Trasforma ingressi, contatti e trattative in un percorso leggibile per tutto il team commerciale.", primaryLabel: "Scopri il CRM Totalone", primaryHref: preview("CrmProductPage"), secondaryLabel: "Prenota una demo", secondaryHref: "/demo/" },
  },
  {
    id: "gestire-ingressi-showroom",
    category: "Vendite e CRM",
    categoryRoute: "/blog/vendite-crm",
    route: "/blog/vendite-crm/gestire-ingressi-showroom",
    primaryKeyword: "gestire ingressi showroom",
    seoTitle: "Come gestire gli ingressi in showroom | Totalone",
    metaDescription: "Come registrare e gestire gli ingressi in uno showroom di arredamento: informazioni utili, venditori, contatti, sedi e lettura del percorso commerciale.",
    h1: "Come registrare e gestire gli ingressi in uno showroom di arredamento",
    intro: ["Quante persone entrano realmente nel tuo showroom? Chi le segue? Da dove arrivano? Quante diventano contatti, trattative o clienti?", "Registrare gli ingressi permette di trasformare una parte spesso invisibile dell’attività commerciale in informazioni utili per capire meglio il proprio showroom."],
    guide: { label: "Guida al CRM per arredatori", href: "/guide/crm-per-arredatori" },
    product: { label: "Scopri il CRM Totalone", href: preview("CrmProductPage") },
    sections: [
      { heading: "Perché registrare gli ingressi", paragraphs: ["Senza una registrazione, lo showroom conosce solo ciò che diventa subito una trattativa. Si perde invece il percorso di chi visita, osserva, chiede informazioni e magari torna dopo settimane.", "Il dato non serve a giudicare ogni ingresso: serve a capire come il punto vendita sta generando relazioni e dove il processo si interrompe."] },
      { heading: "Quali informazioni raccogliere", paragraphs: ["Raccogli solo ciò che può essere usato dal team. Una scheda essenziale è spesso più efficace di un modulo molto lungo che nessuno compila con continuità."], bullets: ["Data e ora della visita", "Venditore o persona che ha accolto il cliente", "Showroom di riferimento", "Paese o nazionalità quando rilevante per il lavoro", "Note sintetiche", "Associazione al contatto CRM quando esiste"] },
      { heading: "Collegare una visita al contatto CRM", paragraphs: ["La visita diventa più utile quando non resta un evento isolato. Collegarla al contatto permette di ritrovare le informazioni durante il follow-up e di capire quali interazioni hanno preceduto una trattativa.", "Il collegamento deve essere semplice e verificabile: un dato sbagliato crea più confusione di un dato ancora da completare."] },
      { heading: "Attribuire correttamente il venditore", paragraphs: ["La responsabilità della visita aiuta a mantenere continuità e a leggere il contributo delle persone senza ridurre il dato a una classifica.", "Quando più venditori collaborano, è importante distinguere chi ha accolto il cliente da chi seguirà il progetto, se i due ruoli non coincidono."] },
      { heading: "Analizzare gli ingressi per showroom", paragraphs: ["Una sede può ricevere più ingressi ma avere esigenze, bacini e processi diversi da un’altra. Leggere i dati per showroom rende il confronto più corretto.", "L’obiettivo non è inseguire un numero isolato: è capire quali visite diventano relazioni e quali passaggi richiedono attenzione."] },
      { heading: "Confrontare sedi e periodi", paragraphs: ["Il confronto ha senso quando usa periodi e criteri coerenti. Una variazione può dipendere da stagionalità, campagne, eventi, orari o composizione del team.", "Prima di trarre conclusioni, verifica sempre che le modalità di registrazione siano rimaste comparabili."] },
      { heading: "Dal numero di ingressi alla qualità commerciale", paragraphs: ["Gli ingressi sono un punto di partenza, non il risultato finale. Il dato diventa più ricco quando si collega a contatto, trattativa e cliente."], flow: ["Ingresso", "Contatto", "Trattativa", "Cliente"] },
      { heading: "Gli errori da evitare", bullets: ["Registrare gli ingressi solo quando diventano opportunità", "Raccogliere informazioni che nessuno userà", "Lasciare il dato in un foglio separato dal CRM", "Confrontare sedi con criteri diversi", "Usare il numero di visite come unico indicatore della qualità commerciale"] },
    ],
    related: ["crm-negozio-arredamento", "software-gestionale-negozio-arredamento", "gestionale-per-arredatori"],
    finalCta: { heading: "Trasforma gli ingressi in informazioni utili.", text: "Una visita registrata nel contesto giusto può diventare il primo passo di una relazione commerciale più ordinata.", primaryLabel: "Scopri Ingressi Showroom", primaryHref: preview("CrmProductPage"), secondaryLabel: "Scopri il CRM Totalone", secondaryHref: preview("CrmProductPage") },
  },
  {
    id: "gestione-magazzino-arredamento",
    category: "Logistica e magazzino",
    categoryRoute: "/blog/logistica-magazzino",
    route: "/blog/logistica-magazzino/gestione-magazzino-arredamento",
    primaryKeyword: "gestione magazzino arredamento",
    seoTitle: "Gestione magazzino arredamento: guida per showroom | Totalone",
    metaDescription: "Come gestire il magazzino di un negozio di arredamento: prodotti collegati a clienti e commesse, stati, colli, arrivi e passaggio al montaggio.",
    h1: "Come gestire il magazzino di un negozio di arredamento",
    intro: ["Nel settore dell’arredamento il magazzino non riguarda soltanto quantità disponibili.", "Ogni prodotto può essere collegato a un cliente, avere uno stato diverso, essere ancora da ordinare, confermato, in arrivo o già disponibile per le fasi successive. Avere una visione chiara della merce significa riuscire a coordinare meglio tutto ciò che viene dopo la vendita."],
    guide: { label: "Guida alla gestione magazzino", href: "/guide/gestione-magazzino-arredamento" },
    product: { label: "Scopri Magazzino e logistica", href: preview("MagazzinoProductPage") },
    sections: [
      { heading: "Perché il magazzino di un negozio di arredamento è particolare", paragraphs: ["La merce non è sempre intercambiabile o disponibile a scaffale. Può appartenere a una commessa, arrivare in più colli e avere una destinazione precisa.", "Il magazzino è quindi un punto di collegamento tra ciò che è stato venduto e ciò che potrà essere consegnato o montato."] },
      { heading: "Collegare prodotti e clienti", paragraphs: ["Sapere a quale cliente e commessa appartiene un prodotto aiuta a rispondere alle domande operative senza ricostruire il percorso in più documenti.", "Il collegamento protegge anche le eccezioni: un prodotto ritardato o da verificare ha un impatto leggibile sul lavoro a cui è destinato."] },
      { heading: "Conoscere lo stato di ogni prodotto", paragraphs: ["Uno stato deve descrivere un passaggio reale e aiutare il team a capire cosa fare dopo. Nel flusso del magazzino possono comparire fasi come:"], bullets: ["Da ordinare", "Confermato", "Ordinato", "Arrivato", "In magazzino", "Programmato", "In corso", "Assistenza"] },
      { heading: "Gestire i colli", paragraphs: ["Un prodotto può arrivare in più colli e non tutti i colli hanno necessariamente lo stesso percorso. Registrare questa differenza evita di considerare completa una fornitura quando manca ancora una parte.", "La lettura per colli è utile soprattutto quando la pianificazione del montaggio dipende dalla disponibilità effettiva."] },
      { heading: "Sapere dove si trova la merce", paragraphs: ["La domanda non è sempre “è arrivata?”. Può essere “è in magazzino, è già stata programmata, è stata consegnata o è in assistenza?”. Una sequenza chiara riduce telefonate e interpretazioni diverse.", "Le informazioni di posizione e stato devono rimanere abbastanza semplici da essere aggiornate durante il lavoro."] },
      { heading: "Arrivi previsti", paragraphs: ["Un calendario degli arrivi rende visibile ciò che ancora non è disponibile. Aiuta a non pianificare il passaggio successivo troppo presto e a comunicare il cambiamento con maggiore chiarezza.", "La data prevista non è una promessa assoluta: è un’informazione da aggiornare e leggere insieme allo stato del prodotto."] },
      { heading: "Dagli arrivi al montaggio", paragraphs: ["Il passaggio dalla merce al montaggio dovrebbe avvenire quando il quadro è sufficiente: prodotti presenti, colli verificati e informazioni operative disponibili.", "Collegare queste fasi permette di preparare il calendario a partire dalla realtà della commessa, non solo dal desiderio di chiuderla."] },
      { heading: "Perché logistica e commessa devono comunicare", paragraphs: ["La logistica risponde a cosa sta succedendo alla merce; la commessa risponde a perché quella merce è importante e quale lavoro dipende da essa.", "Tenere separati i due contesti costringe il team a ricomporre continuamente il quadro. Tenerli collegati rende più chiara la prossima decisione."] },
    ],
    related: ["gestione-commesse-arredamento", "gestione-montaggi-arredamento", "gestione-post-vendita-arredamento"],
    finalCta: { heading: "Più visibilità sulla merce, meno informazioni da ricostruire.", text: "Collega prodotti, colli, arrivi e commesse per preparare meglio le fasi che seguono la vendita.", primaryLabel: "Scopri Magazzino e logistica", primaryHref: preview("MagazzinoProductPage"), secondaryLabel: "Prenota una demo", secondaryHref: "/demo/" },
  },
  {
    id: "gestione-montaggi-arredamento",
    category: "Montaggi e post-vendita",
    categoryRoute: "/blog/montaggi-post-vendita",
    route: "/blog/montaggi-post-vendita/gestione-montaggi-arredamento",
    primaryKeyword: "gestione montaggi arredamento",
    seoTitle: "Gestione montaggi arredamento: come organizzarli | Totalone",
    metaDescription: "Come organizzare i montaggi in un negozio di arredamento: merce pronta, calendario, cliente, attività, rapportino e passaggio all’assistenza.",
    h1: "Come organizzare i montaggi in un negozio di arredamento",
    intro: ["Il montaggio è uno dei momenti più delicati di una commessa.", "La vendita può essere perfetta, ma se date, prodotti, informazioni e attività non sono coordinate correttamente, l’esperienza finale del cliente può risentirne. Per questo il montaggio dovrebbe essere parte dello stesso flusso che ha accompagnato la commessa fino a quel momento."],
    guide: { label: "Guida alla gestione showroom", href: "/guide/gestione-showroom-arredamento" },
    product: { label: "Scopri Gestione montaggi", href: preview("MontaggiProductPage") },
    sections: [
      { heading: "Quando iniziare a pianificare un montaggio", paragraphs: ["La pianificazione può iniziare quando la commessa ha raggiunto un livello di chiarezza sufficiente, ma non dovrebbe essere rimandata all’ultimo giorno.", "Verificare in anticipo prodotti, colli, indirizzo, persone e attività permette di rendere visibili le dipendenze."] },
      { heading: "Verificare che la merce sia pronta", paragraphs: ["Una data in calendario non significa che il lavoro sia pronto. Prima di confermare il montaggio bisogna sapere quali prodotti sono arrivati, quali colli mancano e quali elementi richiedono attenzione.", "Questa verifica è più affidabile quando parte dalle informazioni della commessa e del magazzino."] },
      { heading: "Organizzare il calendario dei montaggi", paragraphs: ["Il calendario deve mostrare date e responsabilità senza perdere il riferimento al cliente e al lavoro. Una vista sintetica serve a pianificare; il dettaglio della commessa serve a eseguire.", "Quando una data cambia, il cambiamento deve essere leggibile da chi coordina e da chi deve intervenire."] },
      { heading: "Collegare cliente e montaggio", paragraphs: ["Il montaggio è un momento della relazione con il cliente. Indirizzo, note, riferimenti e aspettative devono essere accessibili senza cercare in conversazioni separate.", "Il contesto aiuta anche a gestire meglio le comunicazioni quando una parte della consegna deve essere riprogrammata."] },
      { heading: "Coordinare le attività", paragraphs: ["Un montaggio può richiedere più attività: preparazione, verifica, consegna, installazione e controllo finale. Assegnarle rende più chiaro il lavoro e permette di vedere cosa manca.", "Le attività devono essere proporzionate alla complessità reale: troppe micro-attività rendono il calendario illeggibile."] },
      { heading: "Il rapportino di montaggio", paragraphs: ["Il rapportino chiude una parte importante del lavoro e conserva ciò che è successo. Può raccogliere:"], bullets: ["Note di completamento", "Autore del rapportino", "Data dell’intervento", "Foto dove applicabile", "Documentazione utile alla commessa"] },
      { heading: "Dal montaggio all’assistenza", paragraphs: ["Se durante o dopo il montaggio emerge un problema, il passaggio all’assistenza deve mantenere cliente, prodotti e commessa collegati.", "Lo storico evita che il cliente debba raccontare di nuovo tutto e permette al team di intervenire con informazioni già verificate."] },
      { heading: "Perché il montaggio non dovrebbe vivere in un calendario separato", paragraphs: ["Un calendario separato può mostrare quando intervenire, ma non necessariamente perché, con quali prodotti e con quale storia commerciale.", "Portare il montaggio nello stesso flusso aiuta a tenere insieme pianificazione ed esecuzione."] },
    ],
    related: ["gestione-magazzino-arredamento", "gestione-commesse-arredamento", "gestione-post-vendita-arredamento"],
    finalCta: { heading: "Porta i montaggi nello stesso flusso della commessa.", text: "Coordina date, merce, persone e rapportini mantenendo visibile il contesto del progetto.", primaryLabel: "Scopri Gestione montaggi", primaryHref: preview("MontaggiProductPage"), secondaryLabel: "Prenota una demo", secondaryHref: "/demo/" },
  },
  {
    id: "gestione-post-vendita-arredamento",
    category: "Montaggi e post-vendita",
    categoryRoute: "/blog/montaggi-post-vendita",
    route: "/blog/montaggi-post-vendita/gestione-post-vendita-arredamento",
    primaryKeyword: "gestione post vendita arredamento",
    seoTitle: "Gestione post-vendita arredamento: guida | Totalone",
    metaDescription: "Come gestire assistenza e post-vendita nel settore arredamento: collegare cliente, commessa e prodotti, seguire interventi e conservare lo storico.",
    h1: "Come gestire assistenza e post-vendita nel settore arredamento",
    intro: ["La relazione con il cliente non termina quando il montaggio è concluso.", "Un prodotto può richiedere una verifica, un intervento o una sostituzione e, quando accade, è fondamentale sapere immediatamente a quale cliente e commessa appartiene."],
    guide: { label: "Guida alla gestione showroom", href: "/guide/gestione-showroom-arredamento" },
    product: { label: "Scopri Assistenza e post-vendita", href: preview("AssistenzaPostVenditaProductPage") },
    sections: [
      { heading: "Perché il post-vendita fa parte della commessa", paragraphs: ["Il post-vendita nasce da ciò che è stato venduto e installato. Separarlo completamente dalla commessa rende più difficile capire prodotti, responsabilità e storia del cliente.", "Un’assistenza collegata non elimina la complessità dell’intervento, ma rende più semplice iniziare con le informazioni giuste."] },
      { heading: "Registrare una nuova assistenza", paragraphs: ["La prima registrazione dovrebbe chiarire chi ha chiesto supporto, per quale motivo e quale risultato viene atteso. Una descrizione precisa aiuta a distinguere una richiesta informativa da un intervento operativo.", "Anche quando il problema è ancora da verificare, il ticket deve avere un riferimento riconoscibile."] },
      { heading: "Collegare cliente e prodotti", paragraphs: ["Sapere quale prodotto è coinvolto permette di ricostruire più rapidamente la situazione. Il collegamento è particolarmente importante quando una commessa contiene molti elementi o quando il cliente ha acquistato in momenti diversi.", "Il team può così lavorare sul caso senza chiedere al cliente di fornire informazioni già presenti."] },
      { heading: "Conoscere lo stato delle assistenze", paragraphs: ["Uno stato leggibile aiuta a distinguere richieste appena aperte, casi in attesa di informazioni, interventi in corso e situazioni concluse.", "Gli stati devono riflettere il lavoro reale e indicare quale passaggio può sbloccare il caso successivo."] },
      { heading: "Gestire documenti e informazioni", paragraphs: ["Foto, note, riferimenti di prodotto e documentazione possono essere necessari per capire l’intervento. Tenerli nello stesso contesto riduce la ricerca tra cartelle e messaggi.", "La documentazione deve restare comprensibile anche a chi entra nel caso dopo il primo contatto."] },
      { heading: "Controllare gli arrivi previsti", paragraphs: ["Se una sostituzione o un componente dipende da un arrivo, il post-vendita deve rendere visibile questa attesa. Il cliente riceve una risposta più chiara quando il team conosce il passaggio da cui dipende la risoluzione.", "La data prevista va letta come informazione da aggiornare, non come certezza da promettere senza verifica."] },
      { heading: "Dalla richiesta alla risoluzione", paragraphs: ["Il percorso è più leggibile quando ogni passaggio conserva il motivo per cui è stato aperto e ciò che è già stato fatto."], flow: ["Cliente", "Assistenza", "Prodotto", "Intervento", "Chiusura"] },
      { heading: "Conservare lo storico", paragraphs: ["Lo storico permette di capire ricorrenze, tempi e contesto senza trasformare ogni caso in una nuova indagine. È utile al team e protegge la relazione con il cliente.", "Chiudere un’assistenza non significa cancellarla: significa renderla consultabile quando sarà necessario ricordare cosa è successo."] },
      { heading: "Montaggio e assistenza: un unico percorso", paragraphs: ["Il passaggio più naturale nasce quando il rapportino di montaggio e l’assistenza condividono cliente, commessa e prodotti. In questo modo il post-vendita non appare come un sistema estraneo, ma come la fase successiva dello stesso lavoro."] },
    ],
    related: ["gestione-montaggi-arredamento", "gestione-magazzino-arredamento", "gestione-commesse-arredamento"],
    finalCta: { heading: "Continua a seguire il cliente anche dopo il montaggio.", text: "Mantieni collegati assistenze, prodotti e commesse per dare al team il contesto necessario quando serve.", primaryLabel: "Scopri Assistenza e post-vendita", primaryHref: preview("AssistenzaPostVenditaProductPage"), secondaryLabel: "Prenota una demo", secondaryHref: "/demo/" },
  },
  {
    id: "excel-vs-gestionale-arredamento",
    category: "Gestione showroom",
    categoryRoute: "/blog/gestione-showroom",
    route: "/blog/gestione-showroom/excel-vs-gestionale-arredamento",
    primaryKeyword: "Excel gestionale arredamento",
    seoTitle: "Excel o gestionale per un negozio di arredamento? | Totalone",
    metaDescription: "Excel o gestionale per un negozio di arredamento? Un confronto equilibrato sui segnali che indicano quando serve un flusso condiviso.",
    h1: "Excel o gestionale? Quando un negozio di arredamento deve cambiare metodo",
    intro: ["Excel può essere uno strumento estremamente utile. Per un piccolo team, un foglio ben costruito può funzionare per molto tempo.", "Il problema nasce quando il numero di clienti, preventivi, commesse, prodotti e attività aumenta e le informazioni iniziano a dipendere le une dalle altre. A quel punto il limite non è necessariamente Excel: è il numero di processi che stiamo cercando di coordinare manualmente."],
    guide: { label: "Guida alla digitalizzazione del negozio", href: "/guide/digitalizzazione-negozio-arredamento" },
    product: { label: "Scopri perché Totalone", href: preview("PercheTotalonePage") },
    sections: [
      { heading: "Quando Excel funziona ancora bene", paragraphs: ["Excel può essere sufficiente quando il processo è semplice, il numero di persone è ridotto e tutti sanno quale file usare. È uno strumento flessibile e spesso già conosciuto dal team.", "La scelta non va giudicata in astratto: se il foglio risponde al bisogno senza generare lavoro nascosto, cambiarlo non è automaticamente un miglioramento."] },
      { heading: "Quando iniziano i problemi", paragraphs: ["Il segnale non è il numero di righe. È la quantità di collegamenti che il team deve mantenere a mano tra informazioni diverse.", "Se ogni risposta richiede di aprire più file, chiedere conferma o verificare quale versione è corretta, il metodo sta diventando più fragile del lavoro che dovrebbe supportare."] },
      { heading: "Segnale 1: gli stessi dati vengono inseriti più volte", paragraphs: ["Cliente, indirizzo, prodotti e valori possono comparire in CRM, preventivo, commessa e foglio logistico. Ogni riscrittura aggiunge un’occasione di disallineamento.", "Prima di cambiare strumento, misura quante volte il team ripete davvero lo stesso passaggio."] },
      { heading: "Segnale 2: nessuno sa qual è l’ultima versione", paragraphs: ["File duplicati, nomi con date e allegati diversi indicano che il problema non è più creare una tabella, ma governare la versione condivisa.", "Quando il team perde tempo a verificare quale documento sia valido, il costo è organizzativo anche se il software è gratuito."] },
      { heading: "Segnale 3: per capire una commessa devi chiedere a qualcuno", paragraphs: ["Una commessa non dovrebbe vivere nella memoria della persona che la segue. Se per conoscere stato, prodotti o prossima attività serve una telefonata, le informazioni non sono abbastanza condivise.", "Questo non significa esporre ogni dettaglio a tutti: significa rendere disponibile il contesto alle persone che lavorano sul passaggio successivo."] },
      { heading: "Segnale 4: clienti e follow-up dipendono dalla memoria", paragraphs: ["Un promemoria personale può bastare per una relazione semplice. Quando aumentano contatti e trattative, però, il follow-up deve diventare un processo visibile.", "Il rischio non è solo dimenticare una chiamata: è perdere il momento giusto per riprendere una relazione."] },
      { heading: "Segnale 5: magazzino e vendite non condividono le stesse informazioni", paragraphs: ["Se il venditore non sa cosa è arrivato o il magazzino non vede a quale commessa appartiene un prodotto, il cliente percepisce la distanza tra le fasi.", "Il collegamento tra vendita, commessa e logistica diventa importante quando le consegne dipendono da più elementi."] },
      { heading: "Segnale 6: coordinare più showroom diventa difficile", paragraphs: ["Più sedi significano più persone, clienti, file e modi di lavorare. Un metodo basato su copie locali può funzionare fino a quando il confronto tra sedi diventa una ricostruzione manuale.", "La visione comune non deve cancellare le differenze tra punti vendita: deve renderle leggibili."] },
      { heading: "Da fogli separati a un flusso condiviso", paragraphs: ["Il passaggio non consiste nel sostituire ogni foglio con una schermata. Consiste nel decidere quali informazioni devono restare collegate e accessibili nel punto in cui servono."], comparison: { leftTitle: "Excel / strumenti separati", left: ["Cliente", "Trattativa", "Preventivo", "Commessa", "Arrivi", "Montaggio", "Post-vendita"], rightTitle: "Sistema condiviso", right: ["Un contesto cliente comune", "Prossimi passi visibili", "Versione della proposta riconoscibile", "Stato della commessa leggibile", "Prodotti collegati al lavoro", "Calendario con contesto", "Storico dell’assistenza"] } },
      { heading: "Quando è il momento di valutare un gestionale", paragraphs: ["Valuta un cambiamento quando il metodo attuale richiede più controllo che lavoro utile: troppe copie, troppi passaggi manuali, informazioni che arrivano tardi o dipendenza dalla memoria di una singola persona.", "La domanda finale non è “Excel è sbagliato?”. È “il metodo attuale riesce ancora a sostenere il modo in cui lavoriamo?”."] },
    ],
    related: ["software-gestionale-negozio-arredamento", "gestionale-per-arredatori", "gestione-commesse-arredamento"],
    finalCta: { heading: "Quando il lavoro cresce, anche il metodo può evolvere.", text: "Totalone nasce per collegare il lavoro di showroom e negozi di arredamento in un unico sistema, senza trasformare il processo in una serie di strumenti separati.", primaryLabel: "Scopri perché Totalone", primaryHref: preview("PercheTotalonePage"), secondaryLabel: "Prenota una demo", secondaryHref: "/demo/" },
  },
];

export const blogArticleById = Object.fromEntries(blogArticles.map((article) => [article.id, article])) as Record<string, BlogArticleData>;

export const blogCategories = ["Tutti", "Gestione showroom", "Vendite e CRM", "Preventivi", "Commesse e progetti", "Logistica e magazzino", "Montaggi e post-vendita"];
