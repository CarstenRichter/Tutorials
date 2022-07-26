<?php
define ("ZEILENUMBRUCH", "\r\n");
// 1. Schritt: Formularerstellung,
// 2. Schritt: Kontrolle und
// 2.5 Speicherung der eingegebenen Daten
// 3. Schritt: E-Mail erstellen und versenden,
// 4. Schritt: Kontrolle des letzten Anmeldeschritte
//    (Link in E-Mail Anklicken durch Bezieher).

// Zur Kontrolle von übergebenen Variablen
// echo "<pre>";
// print_r ($_GET);

// Schritt 2: Kontrolle, ob Formular ausgefüllt wurde
if ( $_GET['aktion']        <> 'form_ausg'
     OR $_GET['emailadresse']  == "" 
     OR $_GET['einverstanden'] <> "v"
   )
{
    // Schritt 1: Formular anzeigen
    formular_erstellen ( $_GET['emailadresse'],
                         $_GET['gender'],
                         $_GET['vorname'],
                         $_GET['nachname'],
                         $_GET['einverstanden'] );
}
else
{
    echo "<h1>Bestätigungs-Mail erstellt";

    // erstellen der Kontrollzahl
    $kontrollzahl = date("syhdim");

    // Schritt 2.5: Speichern der eingegeben Daten
    speichern_datei ( $_GET['emailadresse'],
                         $_GET['gender'],
                         $_GET['vorname'],
                         $_GET['nachname'],
                         $kontrollzahl  );

    // E-Mail senden mit Funktion
    mail_zur_kontrolle ( $_GET['emailadresse'],
                         $_GET['gender'],
                         $_GET['vorname'],
                         $_GET['nachname'],
                         $kontrollzahl  );
}


function speichern_datei  ($emailadresse = "",
                           $gender="",
                           $vorname="",
                           $nachname="",
                           $kontrollzahl="" )
{
    $handle = fopen ( "nl-anwaerter.txt", "a" );

    // schreiben des Inhaltes von emailadresse
    fwrite ( $handle, $emailadresse );

    // Trennzeichen einfügen, damit Auswertung möglich wird
    fwrite ( $handle, "|" );

    // schreiben des Inhalts von gender
    fwrite ( $handle, $gender );
    fwrite ( $handle, "|" );

    // schreiben des Inhalts von vorname
    fwrite ( $handle, $vorname );
    fwrite ( $handle, "|" );

    // schreiben des Inhalts von nachname
    fwrite ( $handle, $nachname );
    fwrite ( $handle, "|" );

    // schreiben des Inhalts der kontrollzahl
    fwrite ( $handle, $kontrollzahl );

    fwrite ( $handle, "\r\n" );

    // Datei schließen
    fclose ( $handle );
}

function mail_zur_kontrolle ($email, $gender, $vorname,
                             $nachname, $kontrollzahl )
{

    if ( $gender == "w")
    {
        $mailtext = "Sehr geehrte Frau $vorname $nachname,";
    }
    elseif ( $gender == "m" )
    {
        $mailtext = "Sehr geehrte Herr $vorname $nachname,";
    }
    else
    {
        $mailtext = "Hallo $vorname $nachname,";
    }
    $mailtext .= ZEILENUMBRUCH;
    $mailtext .= ZEILENUMBRUCH;

    $mailtext .= "Sie haben den Newsletter von ... bestellt. ";
    $mailtext .= "Um sicherzustellen, dass die E-Mail-Adresse ";
    $mailtext .= "funktioniert und Sie den Newsletter erhalten ";
    $mailtext .= "möchten, klicken Sie bitte auf folgenden Link:";
    $mailtext .= ZEILENUMBRUCH;
    $mailtext .= ZEILENUMBRUCH;
    $mailtext .= 'http://localhost/newsletter-freischalten.php';
    $mailtext .= '?mail=';
    $mailtext .= $email;
    $mailtext .= '&id=';
    $mailtext .= $kontrollzahl;
    $mailtext .= ZEILENUMBRUCH;
    $mailtext .= ZEILENUMBRUCH;
    $mailtext .= "Wenn Sie den Newsletter nicht angefordert haben,";
    $mailtext .= "entschuldigen Sie bitte diese E-Mail. ";
    $mailtext .= "Dann hat sich wahrscheinlich jemand vertippt. ";
    $mailtext .= "Ignorieren Sie einfach die Mail ";
    $mailtext .= "und löschen Sie diese.";

    // Nur zur Kontrolle beim Programmieren, ob E-Mail-Text
    // sauber zusammengestellt wird
    echo '<textarea name="" rows="10" cols="80">';
    echo $mailtext;
    echo "<";

    mail ($email,
          "Kontrolle E-Mail-Adresse Newsletter XYZ",
          $mailtext,
          "From: axel@example.com\nReply-To: axel@example.com"
          );
}

      
function formular_erstellen ($emailadresse = "",
                             $gender="",
                             $vorname="",
                             $nachname="",
                             $einverstanden="" )
{
    echo '<form name="" action="';
    echo $_SERVER['PHP_SELF'];
    echo '" method="GET" enctype="text/html">';

    echo '<p>';
    echo 'Ihre E-Mail-Adresse:<br>';
    echo '<input type="Text" name="emailadresse" value="';
    // Inhalt, falls das Formular bereits unvollständig
    // ausgefüllt wurde (also zweiter Aufruf)
    echo $emailadresse;
    echo '" size="50">';
    echo '</p>';

    echo '<p>';
    echo 'Anrede: (optional)<br>';
    echo '<input type="Radio" name="gender" value="w" ';
    // Inhalt, falls das Formular bereits unvollständig
    // ausgefüllt wurde (also zweiter Aufruf)
    if ( $gender == "w")
    {
        echo 'checked="checked" ';
    }
    echo '>';
    echo 'Frau   ';

    echo '<input type="Radio" name="gender" value="m" ';
    // Inhalt, falls das Formular bereits unvollständig
    // ausgefüllt wurde (also zweiter Aufruf)
    if ( $gender == "m")
    {
        echo 'checked="checked" ';
    }
    echo '>';
    echo 'Mann';
    echo '</p>';

    echo '<p>';
    echo 'Vorname: (optional)<br>';
    echo '<input type="Text" name="vorname" value="';
    // Inhalt, falls das Formular bereits unvollständig
    // ausgefüllt wurde (also zweiter Aufruf)
    echo $vorname;
    echo '" size="">';
    echo '</p>';

    echo '<p>';
    echo 'Nachname: (optional)<br>';
    echo '<input type="Text" name="nachname" value="';
    // Inhalt, falls das Formular bereits unvollständig
    // ausgefüllt wurde (also zweiter Aufruf)
    echo $nachname;
    echo '" size="">';
    echo '</p>';

    echo '<p>';
    echo '<input type="Checkbox" name="einverstanden" value="v"> ';
    echo 'hiermit bin ich einverstanden, dass meine Daten ';
    echo 'elektronisch gespeichert werden, damit mir die';
    echo 'gewünschte Newsletter zugestellt werden kann ...';
    echo '(gesetzliches Blahblah zum Datenschutz und Speicherung';
    echo 'der Daten ....)';
    echo '</p>';

    echo '<input type="hidden" name="aktion" value="form_ausg">';

    echo '<p>';
    echo '<input type="Submit" value="speichern">';
    echo '</p>';
    echo '</form>';
}
?>
Der Programmteil newsletter-freischalten.php zum überprüfen der Rückmeldung

PHP-Quellcode: Newsletter freischalten
<?php
// newsletter-freischalten.php

// übergebene Daten anzeigen zur Kontrolle beim Programmieren
// später ausblenden !
echo "<pre>";
print_r ( $_GET );

// Datei öffnen zum Lesen
$handle = fopen ("nl-anwaerter.txt", "r");

while ( $inhalt = fgets ($handle, 4096 ))
{
  $inhalt = trim ( $inhalt );
  echo "<li> |". $inhalt ."| </li>";

  list($email, $gender, $vorname, $nachname, $kontrollzahl) =
    explode("|", $inhalt, 5);

  echo "<li>$email, $gender, $vorname, $nachname, $kontrollzahl</li>";

  if ( $email == $_GET['mail'] AND $kontrollzahl == $_GET['id'])
  {
        echo "<h1>Sie wurden freigeschaltet</h1>";
        speichern ($email, $gender, $vorname, $nachname, $kontrollzahl);
  }
}

fclose($handle);

function speichern ($email, $gender, $vorname, $nachname, $kontrollzahl)
{
    $handle = fopen ( "nl-bestaetigt.txt", "a" );

    // schreiben des Inhaltes von emailadresse
    fwrite ( $handle, $email );

    // Trennzeichen einfügen, damit Auswertung möglich wird
    fwrite ( $handle, "|" );

    // schreiben des Inhalts von gender
    fwrite ( $handle, $gender );
    fwrite ( $handle, "|" );

    // schreiben des Inhalts von vorname
    fwrite ( $handle, $vorname );
    fwrite ( $handle, "|" );

    // schreiben des Inhalts von nachname
    fwrite ( $handle, $nachname );
    fwrite ( $handle, "|" );

    // schreiben des Inhalts der Kontrollzahl
    fwrite ( $handle, $kontrollzahl );

    fwrite ( $handle, "\r\n" );

    // Datei schließen
    fclose ( $handle );
}
?>
