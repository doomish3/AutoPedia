<?php
/**
 * AutoPedia — Car Recognition Proxy (Gemini API Version)
 * Endpoint: POST /api/recognize.php
 * Forwards the image to Gemini API and returns the result.
 */

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed."]);
    exit();
}

$raw  = file_get_contents("php://input");
$data = json_decode($raw, true);

// Validación de los datos de entrada
if (!$data || empty($data["image_base64"]) || empty($data["media_type"])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Missing image data."]);
    exit();
}

// ── Read API key from environment or a local config file ──
$apiKey = getenv("GEMINI_API_KEY");

if (!$apiKey && file_exists(__DIR__ . "/config.php")) {
    require_once __DIR__ . "/config.php";
    $apiKey = defined("GEMINI_KEY") ? GEMINI_KEY : (defined("ANTHROPIC_KEY") ? ANTHROPIC_KEY : "");
}

if (!$apiKey) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "API key not configured. Set the GEMINI_API_KEY environment variable or create api/config.php."
    ]);
    exit();
}

// Si el frontend envía algo como "data:image/jpeg;base64,/9j/4AAQSk...", extraemos solo el contenido
$imageBase64 = $data["image_base64"];
if (preg_match('/^data:[^;]+;base64,/', $imageBase64)) {
    $imageBase64 = substr($imageBase64, strpos($imageBase64, ',') + 1);
}
// Eliminamos posibles espacios en blanco o saltos de línea
$imageBase64 = trim($imageBase64);

// ── Build the Gemini request ──
$prompt = "You are an expert automotive historian and engineer. Analyse the car in this image and provide a detailed, structured explanation.\n\nUse this exact format:\n\n## Identification\n- Make & Model: [your answer]\n- Approximate Year / Generation: [your answer]\n- Body Style: [your answer]\n- Origin Country: [your answer]\n\n## History\nWrite 3-4 sentences about this car's origins, cultural significance, and its place in automotive history.\n\n## Key Specifications\n- Engine: [your answer]\n- Power Output: [your answer]\n- Transmission: [your answer]\n- 0-60 mph: [your answer]\n- Top Speed: [your answer]\n\n## Notable Components & Engineering\nList 4-5 bullet points explaining interesting technical aspects, design choices, or engineering innovations of this car.\n\n## Fun Facts\nList 2-3 surprising or lesser-known facts about this model.\n\nIf you cannot identify the specific model, describe what you can see and give your best educated guess with reasoning. Always be informative and enthusiastic.";

$body = json_encode([
    "contents" => [
        [
            "parts" => [
                [
                    "text" => $prompt
                ],
                [
                    "inlineData" => [
                        "mimeType" => $data["media_type"],
                        "data"     => $imageBase64
                    ]
                ]
            ]
        ]
    ]
]);

// ── Call Gemini API via cURL ──

$model = "gemini-2.5-flash";
$url   = "https://generativelanguage.googleapis.com/v1/models/{$model}:generateContent?key=" . $apiKey;

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $body,
    CURLOPT_HTTPHEADER     => [
        "Content-Type: application/json"
    ],
    CURLOPT_TIMEOUT        => 60,
]);

$response   = curl_exec($ch);
$httpStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError  = curl_error($ch);
curl_close($ch);

if ($curlError) {
    http_response_code(502);
    echo json_encode(["success" => false, "message" => "cURL error: " . $curlError]);
    exit();
}

$decoded = json_decode($response, true);

// Manejo robusto de errores si la estructura no es la esperada
if ($httpStatus !== 200 || !isset($decoded["candidates"][0]["content"]["parts"][0]["text"])) {
    http_response_code(502);
    
    // Si Gemini nos da un mensaje de error detallado, lo exponemos para debuggear rápido
    $errorMsg = $decoded["error"]["message"] ?? "Gemini API error (HTTP $httpStatus).";
    echo json_encode([
        "success" => false,
        "message" => $errorMsg
    ]);
    exit();
}

$text = $decoded["candidates"][0]["content"]["parts"][0]["text"];

http_response_code(200);
echo json_encode(["success" => true, "text" => $text]);