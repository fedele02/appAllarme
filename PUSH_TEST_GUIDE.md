# 🚀 Test Push Notifications - Guida Rapida

## ✅ Cosa Hai Adesso

L'app è **completamente configurata** con Firebase Push Notifications!

**Componenti Installati:**
- ✅ Firebase Cloud Messaging
- ✅ NotificationService (auto-registration)
- ✅ AlarmSoundService (ringtone + vibration)
- ✅ AlarmScreen con swipe gestures
- ✅ TEST ALLARME button su Home

---

## 📱 Come Testare

### 1. Apri l'App su Android

Quando apri l'app per la prima volta:
1. Android chiederà **permesso per le notifiche** → Clicca "Consenti"
2. L'app si registrerà automaticamente con Firebase
3. Vedrai nel log: `Push registration success, token: ...`

### 2. Testa il Sistema

**Metodo 1: Pulsante TEST ALLARME (Consigliato)**
1. Vai sulla **Home** (schermata principale)
2. Sotto il cerchio grande, c'è pulsante arancione **"TEST ALLARME"**
3. Clicca → Dovrebbe apparire **AlarmScreen** con:
   - 🚨 Schermata rossa di emergenza
   - 🔔 Suoneria (30 secondi loop con pause ogni 4s)
   - 📳 Vibrazione continua
   - 👆 Due slider per swipe

**Metodo 2: Notifica Push dal Backend**
(Quando implementerai l'endpoint `/notifications/test` nel backend Python)

### 3. Testa Swipe Actions su AlarmScreen

Quando appare l'AlarmScreen:

**← Swipe Sinistra (Entra in App):**
- Scorri il bottone bianco verso sinistra
- La barra diventa verde
- → Stop suoneria + navigazione a `/sensors`

**→ Swipe Destra (Silenzia):**
- Scorri il bottone bianco verso destra  
- La barra diventa arancione
- → Stop suoneria + chiusura schermata

---

## 🐛 Risoluzione Problemi

### ❌ "Permessi Notifiche Non Richiesti"
**Soluzione:** Vai in Impostazioni Android → App → De Biasi Alarm → Notifiche → Abilita

### ❌ "Device Token Non Registrato"
**Soluzione:** Chiudi e riapri l'app. Verifica i log di Android Studio.

### ❌ "Suoneria Non Si Sente"
**Soluzione:** 
- Verifica volume telefono non sia a zero
- Vai in Impostazioni → Suoni → Verifica volume notifiche

### ❌ "Vibrazione Non Funziona"
**Soluzione:** Verifica che la vibrazione non sia disabilitata in Impostazioni Android

### ❌ "Pulsante TEST Non Fa Nulla"
**Soluzione:** 
- Apri Chrome DevTools: `chrome://inspect`
- Seleziona il device
- Guarda la Console per errori

---

## 📊 Log Utili (Android Studio)

Apri Android Studio → Logcat e cerca:
```
NotificationService: Push registration success
AlarmSoundService: Alarm sound started
AlarmScreen: Swipe left detected
```

---

## 🔥 Prossimi Passi

1. **Testa ora** con pulsante TEST ALLARME
2. **Verifica swipe** su AlarmScreen
3. **Implementa backend** `/notifications/test` endpoint
4. **Testa notifica vera** dal backend quando rilevi movimento

---

## 🎯 Notifiche Push Vere (Backend)

Quando implementerai il backend, per inviare notifiche:

**Endpoint:** `POST https://fcm.googleapis.com/v1/projects/{PROJECT_ID}/messages:send`

**Headers:**
```
Authorization: Bearer {ACCESS_TOKEN}
Content-Type: application/json
```

**Payload:**
```json
{
  "message": {
    "token": "{DEVICE_TOKEN}",
    "notification": {
      "title": "🚨 ALLARME ATTIVATO",
      "body": "Movimento rilevato: Zona Ingresso"
    },
    "data": {
      "type": "alarm_triggered",
      "zone_name": "Ingresso",
      "zone_id": "1",
      "timestamp": "2025-12-16T10:00:00Z"
    },
    "android": {
      "priority": "high"
    }
  }
}
```

Questo payload farà apparire AlarmScreen automaticamente!

---

**Buon Test! 🚀** Se hai problemi, fammi sapere cosa vedi nei log!
