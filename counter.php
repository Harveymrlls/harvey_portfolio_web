<?php
// counter.php
// Increments and returns visitor count stored in counter.txt
// IMPORTANT: Set correct file permissions so PHP can write the file.

header('Content-Type: text/plain');

// For better security, replace '*' with your GitHub Pages domain like 'https://yourusername.github.io'
header('Access-Control-Allow-Origin: https://harveymrlls.github.io/harvey_miralles/index.html#portfolio'); 
// Note: Using '*' is easiest; see security note below to limit to your domain.

// File that stores the counter value
$file = __DIR__ . '/counter.txt';

// Ensure file exists
if (!file_exists($file)) {
    file_put_contents($file, "0");
}

// Use file locking to prevent race conditions
$fp = fopen($file, "c+");
if ($fp === false) {
    http_response_code(500);
    echo "ERROR";
    exit;
}

if (flock($fp, LOCK_EX)) {
    // read current value (from start)
    rewind($fp);
    $contents = stream_get_contents($fp);
    $count = (int) trim($contents);
    $count++;
    // rewind and truncate then write new value
    rewind($fp);
    ftruncate($fp, 0);
    fwrite($fp, (string)$count);
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);
    echo $count;
} else {
    // Lock failed
    fclose($fp);
    http_response_code(500);
    echo "ERROR";
}
?>
