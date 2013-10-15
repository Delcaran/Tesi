Introduzione
============

Reti P2P
--------

Negli ultimi anni si è assistito ad una progressiva alterazione delle "leggi" che regolano il mondo dell'hardware informatico in campo consumer: l'aumento della potenza di calcolo del singolo elaboratore non è più economicamente conveniente. %TODO fonte per legge di moore
Per fortuna la soluzione è stata immediata e consiste nello sfruttamento di più elaboratori collegati in rete che condividono (genericamente parlando) risorse.
Sebbene per compiti specifici risulta spesso conveniente creare una rete ad-hoc, per l'utilizzo di tutti i giorni da parte dell'utente comune, la rete per eccellenza risulta essere senza ombra di dubbio la rete Internet.
A causa di questa sua centralità, è stata scelta come base per lo sviluppo di applicazioni dedicate alla condivisione di risorse di vario tipo da parte di utenti con interessi in comune, creando di fatto una sottorete virtuale all'interno della già virtuale rete internet. % TODO sistemare sta frase scritta da cani

Questa convidisione di risorse da parte di utenti per un interesse comune definisce il nucleo di quelle che vengono chiamate **reti Perr-to-Peer**, da qui in avanti abbreviate come *reti P2P*
Data la grande diffusione di queste reti e i loro svariati obiettivi, è comprensibile che ci siano molti disaccordi sulla definizione esatta di *rete P2P*.

Una classificazione molto adatta agli scopi di questo documento è quella presente in @core_concepts_p2p, che distingue tre diversi livelli di rete: 

1. **Infrastrutture P2P**, il cui scopo è porre le basi per i livelli successivi fornendo funzioni di comunicazione, integrazione e "traduzione" tra le varie componenti della rete. In particolare forniscono servizi che permettono la localizzazione e la comunicazione tra gli utenti (da ora in avanti **peers**) e l'identificazione, l'utilizzo e lo scambio delle risorse, oltre che l'implementazione delle politiche di sicurezza quali autenticazione e autorizzazione.

2. **Applicazioni P2P**, che utilizzano i servizi offerti dal livello di infrastruttura per offrire all'utente (qui inteso come essere umano interagente con la macchina, la quale è il peer vero e proprio) le funzionalità della rete. Sono in pratica le interfacce tra l'infrastruttura e la persona.

3. **Fenomeni sociali** derivanti dall'utilizzo delle applicazioni P2P. Spesso infatti la forte coesione di intenti tra gli utenti di una rete P2P porta alla nascita di comunità virtuali, centri di aggregazione e correnti di pensiero che esulano dalla sfera prettamente informatica.

Come si vedrà più avanti nel corso della trattazione, la rete Bitcoin è caratterizzata da tutti e tre i livelli in modo molto più peculiare di altre reti P2P maggiormente diffuse e famose.

Reti P2P tradizionali: il caso del file-sharing
-------------------------------------

P2P come alternativa a client-server "puro" 
Esempio di una ricerca MP3 @kurose_ross 
Chiarire come ogni peer è contemporaneamente sia un client che un server, in tal senso il paradigma è sempre client-server: 
esempio: se scarico via http, ogni peer è sia un client web che un server temporaneo (temporaneo perché IP non è fisso).

### Distribuzione File

Ciascun peer distribuisce la quantità di contenuti in suo possesso mentre scarica da altri peer quello che gli manca

#### Scalabilità

$u_s$
:   frequenza di upload verso il server

$u_i$
:   frequenza di upload dell’$i-$esimo peer

$d_i$
:   frequenza di download dell’$i-$esimo peer

$F$
:   dimensione in bit del file da distribuire

$N$
:   numero di peer che vuole una copia del file

$D_{cs}$
:   tempo di distribuzione del file per l’architettura client-server

Implicazione: condizioni ottimali di distribuzione (rete dedicata)

##### Client-Server

Osservazioni:

-   Il server deve trasmettere il file a $N$ peer, quindi $NF$ bit. Data la frequenza di upload $u_s$, il tempo per distribuire il file deve essere almeno $NF/u_s$. 

-   sia $ d_{min} = \min\{d_1,d_p,\cdots,d_N \}$ la frequenza di download del peer con il valore più basso. Tale peer riceverà il file in almeno $F/d_{min}$ secondi, che è quindi il tempo minimo di distribuzione.

Da cui

$$D_{cs} \geq \max \left\lbrace \frac{NF}{u_s}, \frac{F}{d_{min}} \right\rbrace$$

Questo è il limite inferiore al tempo di distribuzione minimo per l’architettura client-server. Trattiamo il caso ottimo e consideriamolo come il tempo di distribuzione effettivo, ovvero:

$$D_{cs} = \max \left\lbrace \frac{NF}{u_s}, \frac{F}{d_{min}} \right\rbrace$$

### Localizzazione dei contenuti

#### Directory centralizzata

Si usa un servizio centrale per fornire un servizio di directory, che i peer contattano per sapere quali peer hanno quali file e per rendere disponibili agli altri peer i propri file. Il server usa una connessione TCP permanente con ogni peer o invia pacchetti per sapere quando questo va offline

##### Svantaggi

Unico punto di rottura
:   
Collo di bottiglia delle prestazioni
:   
Violazione del copyright
:   

