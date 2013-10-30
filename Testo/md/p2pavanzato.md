Un'analisi più approfondita delle reti P2P
==========================================

Riprendiamo ora in modo più rigoroso i concetti generali espressi in precedenza.
Chiamiamo il tipo di rete in analisi *P2P overlay* e la definiamo come un grafo virtuale che connette i peer e che viene utilizzato per la ricerca di risorse, lo storage di file e gli algoritmi di gestione.
È bene notare che la P2P overlay si trova a livello di applicazione, mentre le comunicazioni tra i peer sono punto-a-punto una volta che la connessione è stata stabilita.

Una P2P overlay può essere *strutturata* o *destrutturata*, a seconda della tipologia di connessione del grafo che la rappresenta. Nel caso strutturato è facile definire algoritmi precisi per la gestione delle risorse condivisi, mentre in grafi destrutturati l'approccio è più "alla buona" e richiede spesso l'utilizzo di tecniche di flooding o di *random walk* come nel casodi Gnutella.

Indicizzazione dei dati e overlays
----------------------------------

Qualsiasi sia la sua struttura, ammesso che ne abbia una, una rete P2P sfrutta una qualche forma di indice per localizzare i dati al suo interno. Possiamo distinguere tre metodologie diverse di indicizzazione:

Indice centralizzato:
	Vengono utilizzati alcuni server centrali che mantengono la posizione dei vari dati sui vari nodi. Questo è il metodo utilizzato nelle ricerche DNS e nelle prime reti P2P come Naptser.

Indice distribuito:
	L'indice generale è distribuito tra tutti i peer. Per accedere agli indici nella overlay viene utilizzata una struttura. Creare un indice distribuito efficente è una sfida molto complessa, e tra tutte le soluzioni proposte negli anni quella *tabella hash distribuita* (*DHT*) è tra le più efficaci. Esistono infatti molte varianti diverse dello schema DHT, ognuna con i propri algoritmi, vantaggi e debolezze, ma lo schema tipico prevede l'utilizzo di uno spazio delle chiavi piatto che mappa i nodi della rete con i dati in essi contenuti /// TODO: immagine della mappa in prof 680. Nello specifico, l'indirizzo di un nodo viene mappato ad un identificatore nello spazio delle chiavi tramite una apposita funzione di hash. Allo stesso modo, ogni dato del nodo viene mappato nello stesso spazio delle chiavi tramite hash.

Indice locale:
	Ogni peer mantiene un indice dei propri dati locali e di quei dati remoti per cui deve effettuare una ricerca. È una forma di indicizzazione spesso utilizzata in reti non strutturate in cui è necessaria una query flood, come ad esempio Gnutella.

Esiste un altro criterio per classificare un meccanismo di indicizzazione, basato sulla semantica.
Un *indice semantico* è utilizzabile anche da un essere umano e può essere il nome di un file, una parola-chiave, una chiave in un database.
Si parla di *indice libero da semantica* quando non è leggibile da un essere umano, e spesso corrisponde ad un indice basato su funzioni matematiche come quella di hash, ad esempio lo schema DHT sopra descritto.
Il vantaggio del primo rispetto al secondo sta nella possibilità di effettuare ricerche tramite parole chiavi, ricerche per range e anche ricerche basate su risultati approssimativi [^1], tutte cose non supportate in un indice senza semantica.

[^1]: ad esempio ricercare tutte le stringhe che iniziano, finiscono o contengono una sottostringa o una espressione regolare.

### Indici distribuiti (///TODO: probabilmente posso eliminare)

In una overlay strutturata, la rete P2P ha una topologia ben definita e i dati sono localizzati secondo un criterio deterministico dipendente da algoritmi precisi.
L'obiettivo di questa precisa struttura è fornire una ricerca molto rapida e deterministica per le query, pertanto tali sistemi vengono definiti *sistemi di lookup* e tipicamente sfruttano tabelle di hash per localizzare i dati.
Oltre allo svantaggio sopra indicato dell'impossibilità di effetture query approssimative, il calcolo dell'hash per ogni risorsa condivisa dai peer genera un certo overhead che potrebbe essere particolarmente gravoso in fase di churm.

D'altro canto, in una overlay non strutturata, dato che non esiste un metodo per stabilire la posizione di un file o di un nodo all'interno della rete, viene usato un *indice locale* per ogni peer. Pur facilitando il churm, una query eseguita in questa rete può generare un grande numero di messaggi e un grande ritardo per la risposta. Tale svantaggio viene però bilanciato dalla possibilità di effettuare query approssimative.
Nonostante l'assenza di un struttra definita, emergono alcune topologie, a seconda della funzione statistica che lega i nodi:

**Power law random graph** (PLRG):
	Questa topologia viene rappresentata da un grafo casuale in cui ogni nodo ha un certo numero di vicini (*grado*)	e si relaziona con gli altri nodi in base alla *Legge della Potenza* [^leggepotenza]. Se ordiniamo i nodi in base al grado, allora l'$i$-esimo nodo avrà $c/i^\alpha$ vicini con $c$ costante.
	
**Normal random graph**:
	In questo nodo la distribuzione dei nodi risponde alla distribuzione normale, per cui il grado di ogni peer risulta essere tipicamente uniforme.
	
[^leggepotenza]: Si tratta di una relazione funzionale tra due quantità in cui una quantità varia in base ad una potenza dell'altra.

Overlay non strutturati
---------------------------

Essendo privi di algoritmi per il posizionamento di dati e nodi, una ricerca eseguita in queste reti presenta alcune sfide che vale la pena trattare.

### Proprietà

Come accennato, lo svantaggio principale nelle overlay non strutturate sta nella ricerca: essa può richiedere lungo tempo e può risultare infruttuosa anche nel caso in cui la risorsa cercata esista e sia disponibile.
Esistono però alcuni vantaggi:

- Supporto le query complesse basate su range, attributi e valori approssimati.
- Un churm elevato non rappresenta un problema, la connessione e la disconnessione di molti nodi risulta sempre rapida e non influisce sulle performance.

Tali vantaggi sono validi nella maggior parte delle implementazioni di una overlay non strutturata, come ad esempio in Gnutella, ma se vengono soddisfatte alcune condizioni sono valide anche le seguenti proprietà:

- Se esiste un certo grado di replicazione dei dati, le ricerche risultano efficienti
- L'utenza tipa è soddisfatta con ricerche di tipo best-effort.
- Se la rete non è troppo vasta, non ci sono problemi di scalabilità durante la ricerca.

### Ricercare in reti non strtturate

Prendiamo il caso della rete Gnutella come esempio generico e analizziamo nel dettaglio le metodologie di ricerca.

Consideriamo un sistema con $n$ nodi e $m$ oggetti. Definiamo $q_i$ come la popolarità dell'oggetto $i$, ovvero la frazione di query rispetto al totale che richiedono l'oggetto $i$. La popolarità può essere equivalente per tutti gli oggetti oppure seguire la topologia PLRG precedentemente nominata. In quest'ultimo caso nell'analisi utilizzeremo la variante della distribuzione enunciata da Zipf (///TODO: fonte per Zipf), particolarmente indicata per descrivere la frequenza di un'occorrenza in un insieme di occorrenze. Con queste considerazioni abbiamo:

$$ \sum^m_{i=1} q_i = 1 $$

dove 

$$ \begin{array}{ll} 
	q_i = \frac{1}{m} & \textrm{con distribuzione uniforme} \\
	q_i \propto i^{-\alpha} & \textrm{con distribuzione di Zipf}
	\end{array}
$$

Stabiliamo poi che $r_i$ sia il numero delle copie esistenti dell'oggetto $i$, e $p_i$ sia la frazione di tutti gli oggetti che sono una copia di $i$. Esistono tre tipologie di distribuzione che possono descrivere la replicazione: uniforme, proporzionale e quadratica. Per cui:

$$ \sum^m_{i=1} r_i = R $$
$$ p_i = \frac{r_i}{R} $$

con

$$ \begin{array}{ll} 
	r_i = \frac{R}{m} & \textrm{con distribuzione uniforme} \\
	r_i \propto q & \textrm{con distribuzione proporzionale} \\
	r_i \propto \sqrt{q_i} & \textrm{con distribuzione quadratica}
	\end{array}
$$
	
Con una replicazione uniforme, tutti gli oggetti hanno lo stesso numero di copie e dunque le performance per tutte le ricerche sono identiche.
Con una popolarità uniforme, gli schemi di replicazione proporzionale e quadratica si riducono allo schema di replicazione uniforme.

Per misurare le perfomance vengono impiegate varie metriche, tra le più popolari ci sono:

- La probabilità di query-hit.
- Ritardo o numero di inoltri di query necessari per il query-hit.
- Numero di messaggi processati da ogni nodo coinvolto nella ricerca.
- Copertura dei nodi, ovvero il numero di nodi distinti visitati.
- *duplicazione dei messaggi*, calcolabile come $\frac{(\textrm{#messaggi} - \textr{#nodi_visitati})}{\textrm{#messaggi}}$.
- massimo numero di messaggi in un nodo.
- *recall*, definitio come il numero di oggetti trovati che soddisfano i criteri ricercati (questa metrica è rese possibile dalle query complesse permesse in una overlay non strutturata).
- *efficienza dei messaggi*, ovvero i recall ottenuti per ogni messaggio.

Queste metriche potrebbero essere influenzate nel caso in cui le ricerche non siano indipendenti l'una dall'altra. Nelle ricerche definite *guidate* infatti, un nodo mantiene alcune informazioni ottenute dalle ricerche precedenti, in modo da ottimizzare i risultati delle ricerche successive. Dato che esistono numerosi metodi per raccogliere e utilizzare i dati di una ricerca, in questa trattazione si discuteranno solo ricerche non guidate.
\\\\
Abbiamo visto nel capitolo precedente il metodo di ricerca detto *flooding*, ne abbiamo visto le problematiche e analizzato la soluzione del Time-To-Live dei pacchetti di ricerca con i suoi vantaggi e le sue criticità.
Il TTL rappresenta una sorta di miglioramento rispetto alla prima soluzione proposta per il flooding, il *checking*. In questo metodo ogni nodo contatta il nodo di origine della query per vedere se inoltrare o meno la query. La soluzione viene considerata non pratica a causa dell'elevatissimo numero di messaggi scambiati e il carico eccessivo imposto sul nodo che effettua la query, che deve infatti gestire i messaggi di moltissimi nodi.
Invece un raffinamento ulteriore del TTL consiste nell'implementazione di un *anello di espansione*. Seconda questa strategia il nodo effettua un primo flooding con un piccolo TTL. In caso di insuccesso, la ricerca viene rifatta con un TTL maggiore e ripetuto all'occorrenza. Il successo di questa strategia è tanto maggiore quanto maggiore è il numero di repliche.
In linea di massima, l'anello di espansione ha molto più successo rispetto al TTL qualsiasi strategia di replicazione si utilizzi e per qualsiasi tipo di popolarità, il tutto al prezzo di un leggero aumento del ritardo. Ciononostante, tutte queste strategia sono basate sul flooding e generano quindi messaggi duplicati.
\\\\
Un'alternativa al flooding utilizzabili in reti destrutturate è il *random walk*. Come dice il nome, una query viene inoltrata in modo casuale ad un altro nodo quando viene ricevuta.
Il random walk risolve il problema dei messaggi duplicati a scapito di un aumento della latenza di ricerca. Per risolvere anche questo problema si può aumentare il numero di nodi casuali a cui la query viene inoltrata ad un valore $k$, implementando il *k random walk*. Per terminare la ricerca, la strategia più efficace consiste nell'unire il checking con il TTL: ogni *walker*, alla scadenza del TTL, controlla con il nodo di origine della query se terminare la ricerca o meno. Il TTL viene utilizzato per evitare la creazione di cicli, e solitamente viene impostato ad un valore molto elevato.

Il random walk risulta più performante rispetto al flooding e offre anche molta più scalabilità.

//// TODO: strategie di replicazione??

Chord Distributed Hash Table
-----------------------------------

Questo algoritmo per le DHT utilizza uno spazio delle chiavi piatto per associare le mappe tra i nodi e i dati condivisi. Sia l'indirizzo del nodo che i dati sono mappati ad un identificatore nello spazio delle chiavi tramite una funzione di hash.
Sia il mapping delle chiavi che il mapping dei nodi dovrebbero assicurarsi che le chiavi siano uniformemente distribuiti tra tutti i nodi. Questo inoltre riduce la possibilità che i calcoli da effettuare durante il churm generino troppo overhead. Nello specifico, quando un nodo lascia o si unisce ad una rete con $n$ nodi, solamente $O(1/n)$ chiavi devono essere spostate in altri nodi.
L'algoritmo Chord supporta una sola operazione, *lookup(x)*, che mappa una data chiave $x$ ad un nodo della rete.
Chord salva un dato nel nodo mappato dalla chiave di tale dato, il richiede due step:

1. Mappare il dato alla sua chiave nello spazio degli indirizzi comune.
2. Mappare la chiave al nodo utilizzando *lookup*. La progettazione di *lookup* è la sfida di questo algoritmo.

In questo algoritmo, l'indirizzo IP viene passato ad una funzione di hash che genera un identificatore di $m$ bit che identifica il nodo nello spazio comune delle chiavi.
Anche i dati vengono passati ad una funzione di hash che genera sempre una chiave da $m$-bit. Il valore $m$ viene deciso a priori per evitare di generare collisioni con in fase di hashing.
Chord utilizza un anello logico di dimensione $2^m$, per cui lo spazio delle chiavi è ordinato su tale anello logico con modulo $2^m$ [^mod2m].

[^mod2m]: Nei successivi conti il modulo $2^m$ verrà sottinteso.

Una chiave $k$ viene assegnata al primo nodo tale che l'identificatore di tale nodo equivale o è successivo all'identificatore della chiave $k$ nello spazio degli identificatori, e tale nodo viene chiamato *successore di k* e denotato come *succ(k)*.
Ad esempio, in un anello con $m=7$ abbiamo i nodi N5, N18, N23, N28, N63, N73, N99, N104, N115 e N119. Sei chiavi K8, K15, K28, K53, K87 e K121 vengono distribuite tra questi nodi come segue: *succ*(8)=18, *succ*(15)=18, *succ*(28)=28, *succ*(53)=63, *succ*(87)=99, *succ*(121)=5.


