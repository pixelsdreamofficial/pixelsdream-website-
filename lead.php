<?php
/* Pixels Dream – callback requests from the website popup.
   Emails each request and keeps a copy in leads/leads.csv (blocked from public view). */
header('Content-Type: application/json');

$TO   = 'pixelsdreamofficial@gmail.com';   // where new requests are emailed
$FROM = 'website@pixelsdream.in';          // must be on your own domain

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo '{"ok":false}'; exit; }
if (!empty($_POST['website'])) { echo '{"ok":true}'; exit; }   // spam trap

function clean($v, $max) { return mb_substr(trim(preg_replace('/[\r\n\t]+/', ' ', strip_tags($v ?? ''))), 0, $max); }
$name  = clean($_POST['name']  ?? '', 80);
$phone = preg_replace('/\D/', '', $_POST['phone'] ?? '');
$shoot = clean($_POST['shoot'] ?? '', 60);
$date  = clean($_POST['date']  ?? '', 20);
$page  = clean($_POST['page']  ?? '', 120);

if ($name === '' || !preg_match('/^[6-9]\d{9}$/', $phone)) { http_response_code(400); echo '{"ok":false}'; exit; }

/* simple rate limit: one request per phone number every 2 minutes */
$dir = __DIR__ . '/leads';
if (!is_dir($dir)) { mkdir($dir, 0750, true); }
$lock = $dir . '/.last_' . $phone;
if (file_exists($lock) && time() - filemtime($lock) < 120) { echo '{"ok":true}'; exit; }
touch($lock);

$when = (new DateTime('now', new DateTimeZone('Asia/Kolkata')))->format('d M Y, h:i A');
$fh = fopen($dir . '/leads.csv', 'a');
if ($fh) { fputcsv($fh, [$when, $name, $phone, $shoot, $date, $page]); fclose($fh); }

$subject = "New call back request: $name ($shoot)";
$body = "Name: $name\nPhone: $phone\nShoot: $shoot\nPreferred date: " . ($date ?: 'not given') .
        "\nPage: $page\nReceived: $when\n\nCall: tel:+91$phone\nWhatsApp: https://wa.me/91$phone\n";
$headers = "From: Pixels Dream Website <$FROM>\r\nContent-Type: text/plain; charset=UTF-8\r\n";
@mail($TO, $subject, $body, $headers);

echo '{"ok":true}';
