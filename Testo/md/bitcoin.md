Bitcoin: moneta elettronica decentralizzata
===========================================

Tutte le reti P2P finora descritte sono in circolazione da molti anni, hanno una base di utenti che conta milioni di peer divisi tra utenti reali e server automatizzati, contano migliaia di forum di supporto e scambiano quotidianamente una immensa fetta del traffico totale della rete Internet (tanto che molti provider tendono a limitarne quanto più possibile l'utilizzo, soprattutto nelle fasce orarie di maggior traffico).
Sono però tutte reti dedicate al file-sharing.
Bitcoin no. O almeno, non proprio, come vedremo.

Bitcoin è una rete P2P (intesa per tutti e tre i livelli descritti in precedenza) che mira a creare un sistema di valuta digitale privo di controllo centrale, con pagamenti effettuati direttamente tra gli utenti senza l'intervento di terzi.
È stata ideata e realizzata in origine da un anonimo noto con il nome di **Satoshi Nakamoto** \cite{bitcoin} e si è in poco tempo evoluta in modo esponenziale fino a catturare di recente l'attenzione dei media internazionali, delle banche mondiali e, per alcuni suoi utilizzi illeciti, da FBI ed NSA.
Ma vediamo di cosa si tratta.

Moneta Elettronica
------------------

**Bitcoin** è il nome dato alla rete, al client originale, al protocollo di comunicazione e alla moneta utilizzata per le transazioni all'interno della rete.

Le monete (d'ora in avanti **btc**) posso essere ottenute "gratuitamente" dopo aver impegnato la propria CPU o GPU in alcuni calcoli di crittografia (operazione chiamata **mining** e discussa più avanti), oppure acquistate da altri utenti della rete tramite una valuta reale [^1].

[^1]: Ad esempio tramite il sito Internet Mt. Gox \cite{mtgox}.

Entrambi questi metodi sono fondamentali nell'ecosistema Bitcoin:

- Grazie al mining, la valuta Bitcoin è ininflazionabile. Gli algoritmi che permettono la creazione di bitcoin "dal nulla" sono progettati in modo da limitare il numero massimo di bitcoin creabili ad un velore tendente le 21 milioni di unità. A Gennaio 2013 sono state generate circa 10 milioni di bitcoin e si stima che nel 2017 si raggiungerà la quota di 15 milioni.
  La quota massima di moneta circolante e l'assenza di istituti centrali in grado di creare nuove monete rendono l'economia bitcoin invulnerabile all'inflazione che colpisce le economie reali.
  Il sistema è ispirato a quella che era l'economia del Dollaro prima della istituzionalizzazione della Federal Reserve come banca federale: il valore del Dollaro era legato al valore corrente dell'oro, il quale esiste in quantità limitata ed è ottenibile solo attraverso il lavoro dei minatori.

- La compravendita di bitcoin è invece simile alle compravendite di azioni effettuate nelle borse di tutte il mondo. Esistono infatti alcuni luoghi dedicati (ad esempio il sito internet *Mt. GOX*) che fungono da stock exchange offrendo agli utenti la possibilità di mettere in vendita o di acquistare bitcoin al prezzo che preferiscono. Sono delle vere e proprie borse che trattano unicamente bitcoin invece che molti titoli di aziende diverse, calcolano un valore di scambio medio basato sulle ultime transazioni portate a termine ma lasciano libero l'utente di scegliere a quanto vendere o comprare bitcoin, con prezzo medio che si adegua di conseguenza. %fixme sistemare sta roba
  %TODO: verificare se rapporto bitcoin/euro e bitcoin/dollaro sono legati alle transazioni in quella valuta (come credo che sia)

Come per le monete in valuta reale e le azioni borsistiche, anche le bitcoin vengono "tenute" in portafogli. Come vedremo, il termine *tenute* è usato impropriamente, ma questa è l'apparenza dal punto di vista dell'utente, per cui a tale apparenza al momento ci atterremo.

### Portafogli e indirizzi

La prima volta che un nuovo utente avvia il suo client Bitcoin fresco di installazione, si vede assegnato un portafoglio contenente un indirizzo e una copia di chiavi di cifratura simmetrica.
L'indirizzo è semplicemente una stringa di 33 caratteri alfanumerici che inizia con un 1 o con un 3, generata in modo casuale dalle chiavi create per l'utente.
Gli indirizzi rappresentano il punto di uscita e/o il punto di ingresso per tutti i movimenti che coinvolgono bitcoin. Questo significa che nelle transazioni bitcoin compariranno unicamente questi indirizzi, rendendo di fatto **anonimi** tutti i movimenti di bitcoin (meno quelli che riguardano l'acquisto di bitcoin tramite moneta reale), in un modo del tutto equivalente a quello dei conti in Svizzera. Non esiste quindi nessuna correlazione diretta e ovvia tra un utente e il suo indirizzo.
Essendo le chiavi associate al portafogli, e gli indirizzi generati dalle chiavi, viene di conseguenza pensare (giustamente) che un portafogli possa contenere più indirizzi: basta infatti usare le chiavi per generare un nuovo indirizzo e il gioco è fatto. Il numero di indirizzi esistenti è virtualmente infinito.

I portafogli sono solitamente legati al software che li crea, basta quindi cambiare software per poter creare un nuovo portafogli e una nuova coppia di chiavi (oppure installare un software in grado di gestire più portafogli). In alternativa è possibile "aprire un conto" presso numeri siti che offrono questa funzionalità, quale ad esempio blockchain.info. In questo caso però bisogna fare i conti con la sicurezza del sito in questione %FIXME link alla sezione sicurezza

### Transazioni

Le transazioni rappresentano il nucleo fondamentale di bitcoin. Esse sono il metodo con cui ci si assicura che un indirizzo contenga esattamente quel numero di bitcoin, che una bitcoin non venga spesa più volte e che quella bitcoin appartiene a quello specifico indirizzo.
Le transazioni si basano su meccanismi di crittografia a chiave pubblica, rendendo quindi obsoleto il coinvolgimento di terze parti nella transazione.
Se infatti nelle normali compravendite online, volenti o nolenti si è costretti a fidarsi di terze parti che garantiscono per il buon esito dell'operazione (istituti di credito, compagnie di carte di credito, siti come Paypal, ecc), qui gli utenti hanno direttamente la prova crittografica senza aver quindi necessita di fidarsi di qualcuno.

Satoshi Nakamoto descrive la sua moneta elettronica come una serie di firme digitali. Il trasferimento di moneta da un utente all'altro avviene infatti applicando la firma digitale dell'acquirente ad un hash di una precedente transazione e della chiave pubblica del venditore, e aggiungendo ciò alla fine della moneta.

Riassumendo schematicamente:

~~~~~~
hash = hash(previous_transaction, vendor_public_key)
transaction = sign(hash, private_key)
~~~~~~

La moneta diventa quindi non una unità atomica, ma il risultato di una serie di transazioni che coinvolgono firme digitali e verifiche che deve essere calcolato dinamicamente. La serie di tutte le transazioni mai effettuate viene raccolta in una sequenza denominata **blockchain** %TODO verificare termine blockchain

%TODO immagine pag 2 in alto di Nakamoto

Questa implementazione però non garantisce che l'acquirente non abbia già effettuato una transazione con questa moneta, ovvero che stia spendendo una moneta già spesa in precedenza.

L'unico modo per garantire ciò senza utilizzare una terza parte di cui fidarsi, è tenere conto di **tutte** le transazioni. Questo vuol dire che tutte le transazioni devono essere annunciate ad un pubblico in grado di mettersi d'accordo sull'effettivo ordine temporale in cui sono state effettuate. Il venditore deve avere quindi la prova che, nel momento in cui riceve la transazione, la maggioranza dei nodi è d'accordo che quella è la prima transazione ricevuta.

La soluzione consiste nell'utilizzo di un **timestamp server**. Un timestamp server funziona calcolando l'hash di un blocco di oggetti di cui si vuole realizzare il timestamp e rendendo tale hash pubblico. Il timestamp dimostra inequivocabilmente che gli oggetti esistevano al momento dell'hashing. Ogni timestamp include anche il precedente timestamp nell'hash, formando quindi una catena in cui ogni timestamp rinforza [^2] quelli precedenti.

[^2]: leggasi: rende più difficili da modificare.

%TODO: grafico dei timestamp a pag 2 di Nakamoto

Ora il problema consiste nell'implementare questo server di timestamp in modo distribuito, come è appunto la rete Bitcoin.
Per prima cosa bisogna trovare un sistema per cui effettuare il timestamp è un'operazione difficoltosa (computazionalmente parlando), ma verificare che il timestamp sia corretto deve essere immediato.
Basandosi sul lavoro di Adam Back (\cite{hashcash}), Nakamoto ha deciso che la difficoltà dell'operazione deve essere trovare un valore che, una volta sottoposto ad hashing (ad esempio con SHA-256), il risultato sia un hash che comincia con uno specifico numero di bit pari a zero: la difficoltà del lavoro è esponenziale al numero di bit zero richiesti, ma è facilmente verificabile con un singolo hash.
L'implementazione per bitcoin consiste quindi nella creazione di un blocco di dati di cui calcolare l'hash che contiene le transazioni interessate, l'hash precedente e un valore chiamato **nonce** da incrementare fino a quando l'hash non avrà le caratteristiche richieste.
Modificare una transazione comporta modificare un blocco, e quindi ripetere tutto il lavoro di calcolo della nonce. Inoltre, se a questo blocco è già stato incatenato uno più blocchi successivi, anche tali blocchi andranno ricalcolati in sequenza, rendendo il lavoro estremamente gravoso.

%TODO immagine sequenza di blocchi pag 3 nakamoto

Con la prova di lavoro si risolve anche il problema di cosa significa che la maggioranza deve accettare un timestamp.
Con l'hash infatti si realizza una sorta di sistema one-CPU-one-vote, e la "decisione della maggioranza" è rappresentata dalla più lunga sequenza di timestamp, che è la sequenza per la quale è stata impiegata la maggior parte di lavoro computazionale.
Ciò significa che se la maggior parte della forza-CPU è controllata da peer onesti (cioè che non hanno nessuna intenzione di modificare una transazione effettuata), un nodo disonesto che volesse modificare una transazione non solo dovrebbe rifare tutti i calcoli per il blocco della transazione e per tutti i blocchi successivi, ma avendo minor potenza di CPU a disposizione rispetto ai nodi onesti, verrebbe rapidamente soverchiato dal numero di calcoli da fare, in quando il numero di blocchi da ricalcolare sarebbe sempre superiori a quelli da lui già ricalcolati.

Si capisce subito che è nella rete bitcoin (e nelle reti P2P in generale) è importante che le risorse (potenza di calcolo in questo caso) siano equamente distribuite tra i peer, in modo da evitare che un solo nodo o un solo gruppo di nodi controlli l'intera rete.

Per far fronte alle differenti configurazioni hardware degli utenti, alla sempre crescente capacità di calcolo di CPU e GPU e anche ai potenzialmente mutevoli interessi dei nodi, la difficoltà della prova di lavoro (ovvero il numero di bit zero) è determinata da una media calcolata sul numero medio di blocchi generati ogni ora. Se vengono generati troppi blocchi, vuol dire che la difficoltà è troppo bassa e viene subito aumentata.


