<?php
$verzeichnis = ".";

if (is_dir($verzeichnis))
{
    if ( $handle = opendir($verzeichnis) )
    {
        while (($file = readdir($handle)) !== false)
        {
            echo "<li>filename: $file ";
            echo "<li>filetype: ". filetype( $file) . "<hr>\n";
            // Test, ob ein Bilder (Endung .jpg) vorliegt
            if ( filetype( $file) == "file"
                 AND substr( $file, -4) == ".jpg")
            {
                // Dateiname wird im Array bilderdateinamen
                // gespeichert
                $bilderdateinamen[] = $file;
            }
        }
        closedir($handle);
    }
}

// Ausgabe der Bilderdateinamen zur Kontrolle
echo "<pre>";
print_r ( $bilderdateinamen );
echo "<hr>";

foreach ( $bilderdateinamen AS $dateiname ) {
    echo "Dateiname: $dateiname:\n";

    $exif = exif_read_data($dateiname, ANY_TAG, true, true);

    // print_r ($exif);

    echo '<h2>'. $exif['WINXP']['Title'] . '</h2>';
    echo '<img src="'. $dateiname . '"';
    echo $exif['COMPUTED']['html'];
	echo ' alt="';
    echo $exif['WINXP']['Title'];
    echo '"> ';

    echo '<hr>';
}
?>



<?php
// Funktionsbibliothek Konvertierungen

function dateigroesse_als( $bytes, $to="" )
{
    switch($to)
    {
        // Kilobit
        case 'kbit':
            $bytes = ($bytes * 8) / 1024;
            $bytes .= " kbit";
            break;

        //  bit
        case 'bit' :
            $bytes = $bytes * 8;
            $bytes .= " bit";
            break;

        // Gigabyte
        case 'GB' :
            $bytes = $bytes / 1024 / 1024;
            $bytes .= " GB";

        // Megabyte
        case 'MB' :
            $bytes = $bytes / 1024;
            $bytes .= " MB";

        // Kilobyte
        case 'KB' :
            $bytes  = $bytes / 1024;
            $bytes .= " KB";

        // byte
        default :
    }
    return $bytes;
}
?>

//Einbinden
<?php
require ('dateigroessen.php');
echo dateigroesse_als( 156463, "KB" );
?>
