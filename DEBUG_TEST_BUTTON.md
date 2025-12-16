# Debug TEST ALLARME Button

## Issue
User reports TEST ALLARME button not responding to clicks.

## Changes Made

1. **Home.jsx**
   - Added Alert 1 in onClick: "Pulsante cliccato! Test in corso..."
   - Added Alert 2 in handleTestAlarm: "Funzione handleTestAlarm chiamata!"
   - Added try/catch with error alert

2. **NotificationService.js**
   - Added console.log at start of sendTestNotification
   - Changed to always trigger alarm screen locally (not dependent on backend)

3. **AlarmScreen.jsx**
   - Added console.log when mounted
   - Added console.log when alarm event received

## Expected Flow

When clicking TEST ALLARME:
1. Alert "Pulsante cliccato! Test in corso..."
2. Alert "Funzione handleTestAlarm chiamata!"
3. Console: "🔔 TEST ALLARME button clicked"
4. Console: "🚨 Triggering alarm screen with data: {...}"
5. AlarmScreen appears with red background
6. Suoneria + vibrazione start

## Debug Steps

Ask user which alerts they see:
- [ ] Alert 1 appears?
- [ ] Alert 2 appears?
- [ ] AlarmScreen appears?
- [ ] Any errors in console?

This will identify where the chain breaks.
