# Specifiche API Backend per Gestione Telecamere Reolink

## Contesto del Progetto

Sto sviluppando un'app mobile di allarme domestico che include la visualizzazione di telecamere Reolink 520A. Ho bisogno che tu implementi il modulo di gestione telecamere nel backend Python FastAPI esistente.

**Server Esistente:**
- Backend Python con FastAPI
- Ngrok per accesso remoto (https://unexploitative-emmalyn-unroosting.ngrok-free.dev/api)
- Autenticazione via JWT Bearer token
- Database per persistenza (specificare quale usi: PostgreSQL/SQLite/altro)

**Architettura:**
```
App Mobile → Ngrok (HTTPS) → Backend FastAPI → Telecamere Reolink (rete locale)
```

## Obiettivo

Il backend deve fare da **proxy sicuro** tra l'app mobile e le telecamere Reolink sulla rete locale. Le credenziali delle telecamere (IP, username, password) devono rimanere protette nel database e mai esposte all'app.

---

## API Endpoints da Implementare

### 1. GET /api/cameras
**Scopo:** Ottieni la lista di tutte le telecamere dell'utente autenticato

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response Success (200):**
```json
{
  "cameras": [
    {
      "id": "uuid-string",
      "user_id": "user-uuid",
      "name": "Ingresso Principale",
      "ip": "192.168.1.100",
      "port": 80,
      "username": "admin",
      "created_at": "2025-12-15T10:00:00Z",
      "updated_at": "2025-12-15T10:00:00Z"
    },
    // ... altre telecamere
  ]
}
```

**Note:**
- Ritorna SOLO le telecamere dell'utente che ha fatto richiesta (verifica JWT)
- La password NON deve essere inclusa nella response
- Se l'utente non ha telecamere, ritorna array vuoto

---

### 2. POST /api/cameras
**Scopo:** Aggiungi una nuova telecamera

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Ingresso Principale",
  "ip": "192.168.1.100",
  "username": "admin",
  "password": "la_tua_password_telecamera",
  "port": 80
}
```

**Validazione:**
- `name`: required, string, max 100 caratteri
- `ip`: required, valid IP address format
- `username`: required, string
- `password`: required, string
- `port`: optional, default 80, range 1-65535

**Response Success (201):**
```json
{
  "id": "new-camera-uuid",
  "name": "Ingresso Principale",
  "ip": "192.168.1.100",
  "port": 80,
  "username": "admin",
  "created_at": "2025-12-15T10:00:00Z"
}
```

**Response Error (400):**
```json
{
  "detail": "Invalid IP address format"
}
```

**Note:**
- Associa la telecamera all'utente corrente (user_id dal JWT)
- La password deve essere salvata in modo sicuro (usa hashing/encryption se possibile)
- Verifica che l'IP non sia duplicato per lo stesso utente

---

### 3. DELETE /api/cameras/{camera_id}
**Scopo:** Elimina una telecamera

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Camera deleted successfully"
}
```

**Response Error (404):**
```json
{
  "detail": "Camera not found"
}
```

**Response Error (403):**
```json
{
  "detail": "Not authorized to delete this camera"
}
```

**Note:**
- Verifica che la telecamera appartenga all'utente corrente
- Elimina tutti i dati associati

---

### 4. GET /api/cameras/{camera_id}/snapshot
**Scopo:** Proxy per ottenere uno snapshot dalla telecamera Reolink

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
```
?token=<jwt_token>  (alternativo agli headers per compatibilità <img>)
```

**Flusso Interno:**
1. Verifica JWT token (da header o query param)
2. Recupera telecamera dal DB usando camera_id
3. Verifica che appartenga all'utente corrente
4. Recupera credenziali telecamera dal DB (ip, username, password)
5. Fai richiesta HTTP alla telecamera:
   ```
   GET http://{username}:{password}@{ip}:{port}/cgi-bin/api.cgi?cmd=Snap&channel=0&rs=snapshot&user={username}&password={password}
   ```
6. Ritorna direttamente l'immagine JPEG al client

**Response:**
- Content-Type: `image/jpeg`
- Body: raw image bytes

**Note:**
- Implementa caching (30 secondi) per evitare troppi richieste
- Timeout: 5 secondi massimo
- Gestisci errori di rete (telecamera offline)

---

### 5. GET /api/cameras/{camera_id}/stream
**Scopo:** Proxy per stream video MJPEG dalla telecamera

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
```
?token=<jwt_token>  (alternativo agli headers)
```

**Flusso Interno:**
1. Verifica JWT token
2. Recupera telecamera e verifica ownership
3. Inizia stream MJPEG dalla telecamera:
   ```
   GET http://{username}:{password}@{ip}:{port}/cgi-bin/api.cgi?cmd=GetMjpeg&channel=0
   ```
4. Fai streaming dei bytes direttamente al client (chunked transfer)

**Response:**
- Content-Type: `multipart/x-mixed-replace; boundary=--myboundary`
- Body: streaming MJPEG

**Note:**
- Usa streaming asincrono (non bufferizzare tutto)
- Implementa timeout di 30 minuti (chiudi stream automaticamente)
- Gestisci disconnessioni client correttamente
- Implementa rate limiting per utente (max 3 stream simultanei)

---

## Schema Database

### Tabella: `cameras`

```sql
CREATE TABLE cameras (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    ip VARCHAR(45) NOT NULL,  -- Support IPv6 too
    port INTEGER DEFAULT 80,
    username VARCHAR(50) NOT NULL,
    password_encrypted TEXT NOT NULL,  -- Encrypted storage
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, ip)  -- Prevent duplicate IPs per user
);

CREATE INDEX idx_cameras_user_id ON cameras(user_id);
```

**Encryption Password:**
- Usa Fernet (Python cryptography library) o simile
- Salva chiave encryption in variabile ambiente
- Encrypt/decrypt on-the-fly quando accedi alla telecamera

---

## Sicurezza

### 1. Autenticazione
- Tutti gli endpoint richiedono JWT valido
- Verifica sempre che camera.user_id == current_user.id

### 2. Rate Limiting
- `/api/cameras`: 60 req/min per utente
- `/api/cameras/{id}/snapshot`: 120 req/min per utente
- `/api/cameras/{id}/stream`: max 3 connessioni simultanee per utente

### 3. Validazione Input
- Sanitizza IP address (no injection)
- Valida range porte
- Limita lunghezza strings

### 4. Gestione Errori
- Non esporre dettagli interni nelle risposte
- Log errori server-side solo
- Return generic messages al client

### 5. Encryption
- Password telecamere devono essere encrypt in DB
- Usa HTTPS tramite ngrok (già configurato)

---

## Librerie Python Consigliate

```python
# HTTP client per chiamate alle telecamere
import httpx  # async HTTP client

# Encryption
from cryptography.fernet import Fernet

# Validazione
from pydantic import BaseModel, validator, IPvAnyAddress

# Streaming
from fastapi.responses import StreamingResponse

# Database (esempio con SQLAlchemy)
from sqlalchemy.ext.asyncio import AsyncSession
```

---

## Esempio Codice di Riferimento

### Proxy Snapshot
```python
@router.get("/cameras/{camera_id}/snapshot")
async def get_camera_snapshot(
    camera_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # 1. Get camera from DB
    camera = await db.get(Camera, camera_id)
    if not camera or camera.user_id != current_user.id:
        raise HTTPException(404, "Camera not found")
    
    # 2. Decrypt password
    password = decrypt_password(camera.password_encrypted)
    
    # 3. Build Reolink URL
    url = f"http://{camera.username}:{password}@{camera.ip}:{camera.port}/cgi-bin/api.cgi?cmd=Snap&channel=0"
    
    # 4. Fetch image
    async with httpx.AsyncClient(timeout=5.0) as client:
        response = await client.get(url)
        if response.status_code != 200:
            raise HTTPException(503, "Camera unavailable")
    
    # 5. Return image
    return Response(content=response.content, media_type="image/jpeg")
```

### Proxy Stream
```python
@router.get("/cameras/{camera_id}/stream")
async def stream_camera(
    camera_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    camera = await db.get(Camera, camera_id)
    if not camera or camera.user_id != current_user.id:
        raise HTTPException(404, "Camera not found")
    
    password = decrypt_password(camera.password_encrypted)
    url = f"http://{camera.username}:{password}@{camera.ip}:{camera.port}/cgi-bin/api.cgi?cmd=GetMjpeg&channel=0"
    
    async def stream_generator():
        async with httpx.AsyncClient(timeout=1800.0) as client:  # 30 min timeout
            async with client.stream("GET", url) as response:
                async for chunk in response.aiter_bytes(chunk_size=1024):
                    yield chunk
    
    return StreamingResponse(
        stream_generator(),
        media_type="multipart/x-mixed-replace; boundary=--myboundary"
    )
```

---

## Testing

### Test Manuale
```bash
# 1. Aggiungi telecamera
curl -X POST https://your-ngrok.ngrok-free.dev/api/cameras \
  -H "Authorization: Bearer YOUR_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Camera",
    "ip": "192.168.1.100",
    "username": "admin",
    "password": "password123"
  }'

# 2. Get lista
curl https://your-ngrok.ngrok-free.dev/api/cameras \
  -H "Authorization: Bearer YOUR_JWT"

# 3. Test snapshot
curl https://your-ngrok.ngrok-free.dev/api/cameras/{ID}/snapshot?token=YOUR_JWT \
  --output snapshot.jpg

# 4. Test stream (dovrebbe streamare video)
curl https://your-ngrok.ngrok-free.dev/api/cameras/{ID}/stream?token=YOUR_JWT
```

---

## Domande per Te

Prima di iniziare l'implementazione, fammi sapere:

1. **Database**: Quale stai usando? (PostgreSQL, SQLite, MySQL, MongoDB?)
2. **ORM**: Usi SQLAlchemy o altro?
3. **User Model**: Come è strutturato il tuo modello User attuale?
4. **Encryption Key**: Hai già una strategia per gestire chiavi di encryption?
5. **Testing**: Hai un ambiente di test con telecamere Reolink accessibili al server?

---

## Note Finali

- Le telecamere Reolink 520A supportano perfettamente le API HTTP descritte
- Il server deve essere sulla stessa rete locale delle telecamere (o avere accesso via VPN)
- Lo streaming MJPEG funziona bene per mobile (alternativa a RTSP che è più complesso)
- Considera di implementare un sistema di health check per verificare telecamere offline

Fammi sapere se hai domande o se devo chiarire qualche aspetto!
