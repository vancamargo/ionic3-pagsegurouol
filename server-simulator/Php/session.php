<?php

//pagamento transparente

//1-conectar com pagseguro e gerar um sessao token

//2- Iniciar uma biblioteca javacript do pagseguro

//gerar outro tolken p/ enviar as inf de pagamento

require_once  __DIR__. '/vendor/autoload.php';
//Cors -aplicativo 8100 | aplicacao php 8000

header('Access-Control-Allow-Origin: *');

putenv('PAGSEGURO_EMAIL=vanessa.camargo@uniso.br');
putenv('PAGSEGURO_TOKEN_SANDBOX=3C004A48369E4A12AE6F1569D54F7C8B');
putenv('PAGSEGURO_ENV=sandbox');

\PagSeguro\Library::initialize();
\PagSeguro\Library::cmsVersion()->setName("School of net")->setRelease("10.0.1");
\PagSeguro\Library::moduleVersion()->setName("Scholl of Net")->setRelease("10.0.2");

$sessionCode= \PagSeguro\Services\Session::create(
    \PagSeguro\Configuration\Configure::getAccountCredentials()
);

echo json_encode([
    'sessionId' => $sessionCode->getResult()
]);


