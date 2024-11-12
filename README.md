# Morent Backend

Willkommen im Frontend-teil des **Morent-Projekts**! Dieses Projekt ist das Abschluss-Projekt unseres Java-Backend-Entwicklungs-Bootcamps. Es wurde in Teamarbeit innerhalb von 10 Tagen basierend auf einer kurzen Themenvorlage entwickelt.
Die **Morent-Website** ermöglicht es Benutzern, Autos an verschiedenen Standorten zu mieten, an denen eine Filiale von Morent existiert.

**Backend-Repository**: [Morent Backend](https://github.com/SuCoBootcamp24/Day113_EndProject_Morent_Backend)

## 📦 Projektübersicht

Das Morent Backend ist ein RESTful API-Service auf Basis von **Spring Boot** und bietet folgende Features:

1. **Email-Verifikation**: Nach der Registrierung erhält der Benutzer eine Bestätigungs-E-Mail. Erst nach der Bestätigung wird der Account freigeschaltet und der Benutzer kann die Plattform nutzen.

2. **Erweiterte Storesuche**: Neben der einfachen Suche nach Städten ermöglicht das System automatisch eine Standort-basierte Suche und zeigt die 5 nächstgelegenen Stores zum angegebenen Ort an. Diese Funktion hilft Nutzern, schnell eine Filiale in ihrer Nähe zu finden.

3. **Suche und Filterung**: Die API unterstützt eine kombinierte Such- und Filterfunktion, sodass Benutzer nach spezifischen Kriterien suchen und Ergebnisse nach Belieben eingrenzen können.

4. **Favoritenfunktion**: Nutzer können Autos zu ihren Favoriten hinzufügen, um schnellen Zugriff auf bevorzugte Autos zu haben.

5. **Newsletter (Vorbereitung)**: Ein Newsletter-System ist vorbereitet, um zukünftig die Benutzer mit aktuellen Informationen zu versorgen. Das Feature inkludiert eine Unterscheidung, ob der Benutzer registriert ist oder nicht.

6. **Admin-Panel**: Ein exklusiver Bereich für Mitarbeiter, der zusätzliche Features bietet, um Benutzerdaten, Buchungen und Rückgaben zu verwalten und den Systemstatus zu überwachen.

7. **Buchungssystem**: Ermöglicht es den Nutzern, Reservierungen für Fahrzeuge zu erstellen und Details zu verwalten.

8. **Rückgabesystem**: Nach einer Buchung können Nutzer Fahrzeuge zurückgeben, und Rückgabedetails werden systematisch erfasst.

9. **Buchungsübersicht**: Die Benutzer haben eine klare Übersicht über ihre aktuellen und vergangenen Buchungen.

10. **Bild-Upload**: Benutzer können Bilder hochladen, welche dann mit Fahrzeug- und Benutzerprofilen verknüpft werden.

11. **Sicherheitsfilter**: Das Backend enthält eine Sicherheitsvorkehrung, die nur eine begrenzte Anzahl an Anfragen pro Zeiteinheit von derselben IP-Adresse zulässt, um Missbrauch und DDoS-Angriffe zu verhindern.

12. **Adressüberprüfung**: Bei der Eingabe einer Adresse (für Stores und Benutzer) wird im Hintergrund geprüft, ob es sich um eine korrekte und existierende Adresse handelt.

## 🚀 Technologien

- **React** mit **Vite** für ein schnelles Entwicklungs-Setup
- **JavaScript** als Programmiersprache
- **HTML** zur Strukturierung der Inhalte
- **Tailwind CSS** mit **DaisyUI** für erweitertes Styling
- **React Router** für die Navigation
- **jwt-decode** zur Verarbeitung von JWTs

## 👥 Team
Das Team bestand aus 3 Personen:

- [Andreas Reich](https://github.com/andreasReichHl)
- [Vittorio De Marzi](https://github.com/VittorioDeMarzi)
- [René Behrens](https://github.com/ReBehrens)

## 📌 Wichtige Seiten und Komponenten

- **Home** – Startseite mit einer Übersicht über die Hauptfunktionen und einer Suche nach Filialen.
- **Suche und Filter** – Seite, auf der Benutzer nach verfügbaren Fahrzeugen suchen und diese filtern können.
- **Favoriten** – Seite, auf der Nutzer ihre favorisierten Filialen und Fahrzeuge sehen.
- **Buchung** – Seite zur Fahrzeugbuchung und zur Verwaltung der Buchungsdetails.
- **Admin-Panel** – Bereich für Administratoren mit erweiterten Verwaltungsfunktionen (erreichbar nur als Mitarbeiter).
- **Profil** – Profilseite des Nutzers mit der Möglichkeit, Details und Einstellungen anzupassen.

## 🔧 Installation

1. **Projekt klonen**:
    ```bash
    git clone https://github.com/SuCoBootcamp24/Day113_EndProject_Morent_Frontend.git
    cd Day113_EndProject_Morent_Frontend
    ```

2. **Abhängigkeiten installieren**:
    ```bash
    npm install
    ```

3. **Entwicklungsserver starten**:
    ```bash
    npm run dev
    ```

4. **Backend-Verbindung konfigurieren**: Stelle sicher, dass die API-URLs für das Backend in der Konfigurationsdatei korrekt angegeben sind.


## 🔒 Umgebungseinstellungen

es wird eine `.env`-datei benötigt. in diese wird die folgende variable eingetragen:
```bash
VITE_BACKEND=http://backupURL:8080
```
