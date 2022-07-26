<?php
$termin[] = array('Datum' => 20221208, 
                  'Ort'   => "Wangen", 
                  'Band'  => "cOoL RoCk oPaS");

$termin[] = array('Datum' => 20220311, 
                  'Ort'   => "Stuttgart", 
                  'Band'  => "Die Hosenbodenband");

$termin[] = array('Datum' => 20220628, 
                  'Ort'   => "Tübingen", 
                  'Band'  => "flying socks");

$termin[] = array('Datum' => 20220628, 
                  'Ort'   => "Stuttgart", 
                  'Band'  => "flying socks");

// print_r ( $termin );

foreach ($termin as $nr => $inhalt)
{
    $band[$nr]  = strtolower( $inhalt['Band'] );
    $ort[$nr]   = strtolower( $inhalt['Ort'] );
    $datum[$nr] = strtolower( $inhalt['Datum'] );
}

switch ( $_GET['sortierung'] )
{
    case ("d"):
        // Sortierung nach Datum und Ort aufsteigend
        array_multisort($datum, SORT_ASC, $ort,SORT_ASC,$termin);
        break;
    case ("o"):
        // Sortierung nach Ort aufsteigend
        array_multisort($ort, SORT_ASC, $termin);
        break;
    case ("b"):
        // Sortierung nach Band aufsteigend
        array_multisort($band, SORT_ASC, $termin);
        break;
    case ("da"):
        // Sortierung nach Datum und Ort aufsteigend
        array_multisort($datum, SORT_DESC, $termin);
        break;
    case ("oa"):
        // Sortierung nach Ort aufsteigend
        array_multisort($ort, SORT_DESC, $termin);
        break;
    case ("ba"):
        // Sortierung nach Band aufsteigend
        array_multisort($band, SORT_DESC, $termin);
        break;
    DEFAULT:
        // Sortierung nach Datum
        array_multisort($datum, SORT_ASC, $ort,SORT_ASC,$termin);
}

ausgabe_tabelle ( $termin );

function ausgabe_tabelle ( $termin )
{
    echo '<table border="1">';

    // Kopf fuer sortierung
    echo '<tr bgcolor="#6C9DE6">';
    echo '<th>';
    echo ' ';
    echo '</th>';

    echo '<th>';
        echo 'Datum ';
        echo '<a href="terminkalender.php?sortierung=d">';
        echo '↓</a>';
        echo ' ';
        echo '<a href="terminkalender.php?sortierung=da">';
        echo '↑</a>';
    echo '</th>';

    echo '<th>';
        echo 'Band ';
        echo '<a href="terminkalender.php?sortierung=b">';
        echo '↓</a>';
        echo ' ';
        echo '<a href="terminkalender.php?sortierung=ba">';
        echo '↑</a>';
    echo '</th>';

    echo '<th>';
        echo 'Ort ';
        echo '<a href="terminkalender.php?sortierung=o">';
        echo '↓</a>';
        echo ' ';
        echo '<a href="terminkalender.php?sortierung=oa">';
        echo '↑</a>';
    echo '</th>';
    echo '</tr>';

    foreach ($termin AS $inhalt )
    {
        $zeilenr  ;
        echo '<tr';
        echo farbwechsel ( $zeilenr );
        echo '>';
        echo '<td>';
            echo $zeilenr. ".";
        echo '</td>';

        echo '<td>';
            echo datum_deutsch ( $inhalt['Datum'] );
        echo '</td>';

        echo '<td>';
            echo $inhalt['Band'];
        echo '</td>';

        echo '<td>';
            echo $inhalt['Ort'];
        echo '</td>';
        echo '</tr>';
    }
    echo '</table>';
}

function datum_deutsch ( $datum )
{
    $jahr  = substr ( $datum, 0, 4 );
    $monat = substr ( $datum, 4, 2 );
    $tag   = substr ( $datum, -2 );
    $datum_deutsch = $tag .".". $monat .".". $jahr;
    return ( $datum_deutsch );
}

function farbwechsel ( $zeilenr )
{
    if ( bcmod ( $zeilenr , '2' ) == 0 )
    {
        $hintergrundfarbe = ' bgcolor="#ACC8F0" ';
    }
    else
    {
        $hintergrundfarbe = ' bgcolor="#DDE8F9" ';
    }
    return ( $hintergrundfarbe );
}
?>
