<?php
/**
 * 2007-2016 [PagSeguro Internet Ltda.]
 *
 * NOTICE OF LICENSE
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author    PagSeguro Internet Ltda.
 * @copyright 2007-2016 PagSeguro Internet Ltda.
 * @license   http://www.apache.org/licenses/LICENSE-2.0
 *
 */

namespace PagSeguro\Services\DirectPreApproval;

use PagSeguro\Domains\Account\Credentials;
use PagSeguro\Domains\Requests\DirectPreApproval\Payment;
use PagSeguro\Parsers\DirectPreApproval\PaymentParser;
use PagSeguro\Resources\Connection;
use PagSeguro\Resources\Http;
use PagSeguro\Resources\Log\Logger;
use PagSeguro\Resources\Responsibility;

/**
 * Class PaymentService
 *
 * @package PagSeguro\Services\DirectPreApproval
 */
class PaymentService
{
    /**
     * @param Credentials $credentials
     * @param Payment     $payment
     *
     * @return mixed
     * @throws \Exception
     */
    public static function create(Credentials $credentials, Payment $payment)
    {
        Logger::info("Begin", ['service' => 'DirectPreApproval']);
        try {
            $connection = new Connection\Data($credentials);
            $http = new Http('json');
            Logger::info(sprintf("POST: %s", self::request($connection)), ['service' => 'DirectPreApproval']);
            Logger::info(
                sprintf(
                    "Params: %s",
                    json_encode(PaymentParser::getData($payment))
                ),
                ['service' => 'DirectPreApproval']
            );
            $http->post(
                self::request($connection),
                PaymentParser::getData($payment)
            );
            $response = Responsibility::http(
                $http,
                new PaymentParser
            );
            Logger::info(
                sprintf("DirectPreApproval URL: %s", json_encode(self::response($response))),
                ['service' => 'DirectPreApproval']
            );

            return self::response($response);
        } catch (\Exception $exception) {
            Logger::error($exception->getMessage(), ['service' => 'DirectPreApproval']);
            throw $exception;
        }
    }

    /**
     * @param Connection\Data $connection
     *
     * @return string
     */
    private static function request(Connection\Data $connection)
    {
        return $connection->buildDirectPreApprovalPaymentRequestUrl()."?".$connection->buildCredentialsQuery();
    }

    /**
     * @param $response
     *
     * @return mixed
     */
    private static function response($response)
    {
        return $response;
    }
}
