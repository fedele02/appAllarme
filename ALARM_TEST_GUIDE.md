# Guida Test e Debug Allarme

## Cosa Ho Implementato

### ✅ Modifiche Completate:
1. **Notification Channel** - Creato canale "alarm_channel" con:
   - Importance: HIGH (5)
   - Sound: alarm.wav (default)
   - Vibration: enabled
   - Lights: red LED

2. **Vibrazione Continua** - Loop con Haptics API:
   - Vibra 1000ms
   - Pausa 200ms
   - Ripete per 30 secondi

3. **Logging Completo** - Ogni step logga emoji per debug facile

## Come Testare

1. **Chiudi completamente l'app**
2. **Riapri** (Run ▶ in Android Studio)
3. **Clicca TEST ALLARME**
4. **Apri Chrome DevTools** (`chrome://inspect`)

## Log Attesi

Se funziona correttamente, dovresti vedere:
```
🔔 AlarmSoundService.start() called
📱 Requesting permissions...
✅ Permission result: {display: "granted"}
✅ Alarm channel created
📳 Continuous vibration started
📅 Scheduling alarm notification...
✅ Notification scheduled
```

## Problemi Comuni

### ❌ "Permission not granted"
**Soluzione:** Vai in Impostazioni → App → De Biasi Alarm → Notifiche → Abilita

### ❌ Non vibra
**Soluzione:** 
- Verifica vibrazione non disabilitata in Impostazioni
- Modalità "Non disturbare" disattivata?
- Volume notifiche non a zero

### ❌ Non suona
**Soluzione:**
- Volume notifiche/allarmi alto?
- Modalità silenziosa OFF?
- Telefono su "Suoneria" non "Vibrazione"

### ❌ Suona ma si interrompe subito
**Soluzione:** Verifica nei log se appare errore dopo `✅ Notification scheduled`

## Verifica Permessi

**Impostazioni Android → App → De Biasi Alarm:**
- ✅ Notifiche: ON
- ✅ Consenti popup e overlay: ON (per full-screen)
- ✅ Non ottimizzare batteria: ON (opzionale)

## Info per Backend

Quando implementerai `/notifications/test` nel backend Python, usa questo payload FCM:

```json
{
  "message": {
    "token": "{DEVICE_TOKEN}",
    "data": {
      "type": "alarm_triggered",
      "zone_name": "Zona Ingresso",
      "zone_id": "1"
    },
    "android": {
      "priority": "high",
      "notification": {
        "channel_id": "alarm_channel"
      }
    }
  }
}
```

L'app gestirà automaticamente l'evento e mostrerà AlarmScreen con suono/vibrazione!
