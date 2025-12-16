# Guida Setup Firebase per Notifiche Push

## Passo 1: Creare Progetto Firebase

1. **Vai su Firebase Console**
   - Apri: https://console.firebase.google.com/
   - Accedi con il tuo account Google

2. **Crea Nuovo Progetto**
   - Clicca "Add project" (o "Aggiungi progetto")
   - Nome progetto: `DebiasAlarm` (o come preferisci)
   - Clicca "Continue"

3. **Google Analytics (Opzionale)**
   - Puoi disabilitare se non ti serve
   - Clicca "Create project"
   - Aspetta che Firebase crei il progetto (~30 secondi)

---

## Passo 2: Aggiungere App Android

1. **Nella Dashboard Firebase**
   - Clicca sull'icona Android (robot verde)
   - Oppure vai su "Project Settings" → "Your apps" → "Add app" → Android

2. **Configura App Android**
   - **Android package name**: `com.debiasalarm.app`
     ⚠️ DEVE essere uguale al package name in Android Studio!
   - **App nickname**: `De Biasi Alarm` (opzionale)
   - **Debug SHA-1**: Lascia vuoto per ora
   - Clicca "Register app"

3. **Scarica google-services.json**
   - Clicca "Download google-services.json"
   - **IMPORTANTE**: Salva questo file, ti servirà dopo!
   - Clicca "Next"

4. **Firebase SDK (SKIP)**
   - Clicca "Next" (lo faremo manualmente dopo)

5. **Completa Setup**
   - Clicca "Continue to console"

---

## Passo 3: Abilita Cloud Messaging

1. **Vai su Project Settings**
   - Clicca l'icona ingranaggio in alto a sinistra
   - Seleziona "Project settings"

2. **Tab "Cloud Messaging"**
   - Vai sulla tab "Cloud Messaging"
   - Dovresti vedere "Cloud Messaging API (Legacy)" - DISABLED
   
3. **Abilita Cloud Messaging API**
   - Clicca sui tre puntini → "Manage API in Google Cloud Console"
   - Si apre Google Cloud Console
   - Cerca "Firebase Cloud Messaging API"
   - Clicca "ENABLE" (Abilita)
   - Torna alla Firebase Console

4. **Server Key (Opzionale per ora)**
   - Vedrai "Server key" - lo useremo nel backend Python dopo

---

## Passo 4: Copia google-services.json

**Adesso ti dirò dove copiare il file:**

1. Apri la cartella del progetto:
   ```
   C:\Users\Velika1-1\Documents\miei file\app allarme\android\app\
   ```

2. Copia il file `google-services.json` che hai scaricato in questa cartella

3. Il percorso finale deve essere:
   ```
   android/app/google-services.json
   ```

---

## Verifica Package Name

**IMPORTANTE**: Il package name deve corrispondere!

1. Apri: `android/app/build.gradle`
2. Cerca la riga: `applicationId "com.qualcosa"`
3. Assicurati che sia: `applicationId "com.debiasalarm.app"`
4. Se è diverso, cambialo e poi vai su Firebase → Project Settings → Your apps → Android → Modifica package name

---

## Note Finali

✅ Una volta completati questi passaggi, dimmi "Firebase configurato" e procederò con il codice!

⚠️ Se hai problemi, mandami screenshot o dimmi a che punto sei bloccato.

📖 Documentazione ufficiale: https://firebase.google.com/docs/android/setup
