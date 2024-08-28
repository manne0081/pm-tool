const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Überprüfen, ob ein Argument übergeben wurde
const moduleName = process.argv[2];

if (!moduleName) {
    console.error('Bitte gib einen Modulnamen an, z.B. "node createModule.js client".');
    process.exit(1);
}

// Setze den Pfad basierend auf dem Modulnamen
const modulePath = path.join('src', 'app', 'modules', 'private', moduleName);

// Ändere das Arbeitsverzeichnis auf das Projektstammverzeichnis
process.chdir(path.join(__dirname, '..'));

// Erstelle den Ordner (rekursiv, falls nötig)
fs.mkdir(modulePath, { recursive: true }, (err) => {
    if (err) {
        console.error(`Fehler beim Erstellen des Ordners: ${err}`);
        return;
    }

    console.log(`Ordner ${modulePath} erfolgreich erstellt.`);

    // Erstelle die Components
    exec(`ng generate component ${path.join('modules/private', moduleName, `${moduleName}-list`)}`, (err, stdout, stderr) => {
        if (err) {
            console.error(`Fehler beim Erstellen der Komponente ${moduleName}-list: ${stderr}`);
            return;
        }
        console.log(`Komponente ${moduleName}-list erfolgreich erstellt.`);
        console.log(stdout);
    });

    exec(`ng generate component ${path.join('modules/private', moduleName, `${moduleName}-detail`)}`, (err, stdout, stderr) => {
        if (err) {
            console.error(`Fehler beim Erstellen der Komponente ${moduleName}-detail: ${stderr}`);
            return;
        }
        console.log(`Komponente ${moduleName}-detail erfolgreich erstellt.`);
        console.log(stdout);
    });

    // Erstelle den Service
    exec(`ng generate service ${path.join('modules/private', moduleName, moduleName)}`, (err, stdout, stderr) => {
        if (err) {
            console.error(`Fehler beim Erstellen des Services ${moduleName}.service: ${stderr}`);
            return;
        }
        console.log(`Service ${moduleName}.service erfolgreich erstellt.`);
        console.log(stdout);
    });
});

/**
 * Use this, to create a new component at the private components ->
 *
 * node script/createModule.js [componentName]
 * -------------------------------------------
 */
