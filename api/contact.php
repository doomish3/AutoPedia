<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

/* Preflight CORS */
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

/* Only accept POST */
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed. Use POST."]);
    exit();
}

/* Read and decode JSON body */
$raw  = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid or empty JSON."]);
    exit();
}

/* ── Validation ── */
$name    = trim($data["name"]    ?? "");
$email   = trim($data["email"]   ?? "");
$car     = trim($data["car"]     ?? "");
$message = trim($data["message"] ?? "");

$errors = [];

if (empty($name)) {
    $errors[] = "Name is required.";
}

if (empty($email)) {
    $errors[] = "Email is required.";
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Email format is not valid.";
}

if (empty($message)) {
    $errors[] = "Message is required.";
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(["success" => false, "message" => implode(" ", $errors)]);
    exit();
}

/* ── Sanitise ── */
$name    = htmlspecialchars($name,    ENT_QUOTES, "UTF-8");
$email   = htmlspecialchars($email,   ENT_QUOTES, "UTF-8");
$car     = htmlspecialchars($car,     ENT_QUOTES, "UTF-8");
$message = htmlspecialchars($message, ENT_QUOTES, "UTF-8");

/* ── Write to log ── */
$logDir  = __DIR__ . "/logs";
$logFile = $logDir . "/messages.log";

if (!is_dir($logDir)) {
    mkdir($logDir, 0755, true);
}

$entry = sprintf(
    "[%s] name=%s | email=%s | car=%s | message=%s\n",
    date("Y-m-d H:i:s"),
    $name,
    $email,
    $car ?: "Not specified",
    str_replace("\n", " ", $message)
);

file_put_contents($logFile, $entry, FILE_APPEND | LOCK_EX);

/* ── Success response ── */
http_response_code(200);
echo json_encode([
    "success"   => true,
    "message"   => "Message received successfully.",
    "timestamp" => date("Y-m-d H:i:s"),
    "data"      => [
        "name"  => $name,
        "email" => $email,
        "car"   => $car ?: "Not specified",
    ],
]);
