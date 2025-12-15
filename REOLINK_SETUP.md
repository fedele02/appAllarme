# Guida Setup Telecamere Reolink

## Come Aggiungere le Telecamere

1. **Apri l'app** → Vai nella tab "Telecamere"
2. **Premi il pulsante +** in alto a destra
3. **Inserisci i dati:**
   - **Nome**: es. "Ingresso Principale"
   - **IP**: Indirizzo IP locale della telecamera (es. `192.168.1.100`)
   - **Username**: Il tuo username Reolink (di solito `admin`)
   - **Password**: La password della telecamera

## Come Trovare l'IP della Telecamera Reolink

### Metodo 1: App Reolink Mobile
1. Apri l'app Reolink sul telefono
2. Vai su Impostazioni → Informazioni Dispositivo
3. Trovi l'indirizzo IP sotto "Network"

### Metodo 2: Router
1. Accedi al pannello del tuo router (es. `192.168.1.1`)
2. Vai su "Dispositivi Connessi" o "DHCP"
3. Cerca il dispositivo con nome "Reolink" o MAC address della camera

### Metodo 3: Reolink Client PC
1. Scarica il software Reolink Client per PC
2. Le telecamere vengono rilevate automaticamente con i loro IP

## Accesso Locale vs Remoto

### 📱 **ACCESSO LOCALE** (WiFi di Casa)
✅ **Funziona Subito**
- Quando sei connesso al WiFi di casa, l'app accede direttamente alle telecamere tramite IP locale
- Stream video fluido e senza ritardi
- Nessuna configurazione aggiuntiva necessaria

### 🌍 **ACCESSO REMOTO** (Da Fuori Casa)
⚠️ **Richiede Configurazione**

Per accedere alle telecamere da fuori casa hai 3 opzioni:

#### Opzione 1: VPN (Consigliata - La Più Sicura)
1. Configura un server VPN sul router di casa (se supportato)
   - Molti router moderni hanno VPN integrata (OpenVPN, WireGuard)
2. Installa l'app VPN sul telefono
3. Connettiti alla VPN quando sei fuori casa
4. Le telecamere saranno accessibili come se fossi a casa

#### Opzione 2: Port Forwarding
⚠️ MENO SICURO - Espone le telecamere a Internet

1. **Accedi al Router**
   - Apri il browser → `192.168.1.1` (o l'IP del tuo router)
   - Inserisci username/password amministratore

2. **Trova la Sezione Port Forwarding**
   - Di solito sotto "Advanced" → "Port Forwarding" o "NAT"

3. **Crea una Regola per Ogni Telecamera**
   - **Service Name**: Reolink_Ingresso
   - **External Port**: 8081 (scegli una porta esterna)
   - **Internal IP**: 192.168.1.100 (IP della telecamera)
   - **Internal Port**: 80
   - **Protocol**: TCP

4. **Ottieni il Tuo IP Pubblico**
   - Cerca "What is my IP" su Google
   - Oppure usa un servizio DDNS (Dynamic DNS) se il tuo IP cambia

5. **Configura DDNS (Opzionale ma Consigliato)**
   - Molti router supportano servizi come No-IP, DynDNS
   - Ti dà un nome fisso (es. `miacasa.ddns.net`) invece dell'IP che cambia

6. **Usa l'IP Pubblico nell'App**
   - Quando aggiungi la telecamera da remoto, usa:
   - IP: `tuoippubblico:8081` (o il nome DDNS)
   - Username/Password: come al solito

#### Opzione 3: Reolink Cloud (Più Semplice)
- Le Reolink 520A supportano P2P Cloud
- Configura il cloud nell'app Reolink ufficiale
- Non serve per questa app custom

## Risoluzione Problemi

### ❌ Stream Non Si Vede
1. Verifica che l'IP sia corretto
2. Verifica username/password
3. Assicurati di essere connesso allo stesso WiFi
4. Prova a pingare la telecamera: `ping 192.168.1.100`
5. Controlla che la porta 80 della telecamera sia aperta

### ❌ Funziona in Locale ma Non da Remoto
1. Verifica che il port forwarding sia configurato correttamente
2. Controlla che il firewall del router non blocchi le porte
3. Assicurati di usare l'IP pubblico corretto
4. Testa la porta: usa un sito come `canyouseeme.org`

### ❌ IP Cambia Continuamente
- Configura un IP statico per le telecamere nel router (DHCP Reservation)
- Oppure configura DDNS come spiegato sopra

## Configurazione Consigliata

### Per Uso Domestico:
- Usa l'IP locale (`192.168.1.x`)
- Nessuna configurazione aggiuntiva

### Per Uso Misto (Casa + Remoto):
1. **Imposta IP Statico** per ogni telecamera nel router
2. **Configura VPN** sul router (WireGuard è il più veloce)
3. **Installa WireGuard** sul telefono
4. Quando sei fuori, connetti la VPN e le telecamere saranno accessibili

## Sicurezza

⚠️ **IMPORTANTE:**
- **Non usare password deboli** per le telecamere
- **Cambia la password di default** `admin/admin`
- Se usi port forwarding, usa **password complesse** e considera un firewall
- La **VPN è molto più sicura** del port forwarding diretto
- Non esporre mai telecamere senza autenticazione forte

## Porte Reolink Comuni

- **HTTP**: 80
- **HTTPS**: 443
- **RTSP**: 554
- **RTMP**: 1935
- **Onvif**: 8000

## URL Stream Reolink 520A

L'app usa automaticamente:
- **Snapshot**: `http://IP/cgi-bin/api.cgi?cmd=Snap&channel=0`
- **MJPEG Stream**: `http://IP/cgi-bin/api.cgi?cmd=GetMjpeg&channel=0`
- **RTSP** (se necessario): `rtsp://username:password@IP:554/h264Preview_01_main`

## Roadmap Futura

Attualmente i dati sono salvati in **localStorage** del telefono.

Prossimi sviluppi:
- [ ] Salvataggio credenziali cifrate nel database backend
- [ ] Supporto multi-utente con condivisione telecamere
- [ ] Notifiche push per motion detection
- [ ] Registrazione cloud clip
- [ ] Supporto PTZ (Pan/Tilt/Zoom) se le tue 520A lo supportano

---

**Hai domande?** Fammi sapere se hai problemi con la configurazione!
