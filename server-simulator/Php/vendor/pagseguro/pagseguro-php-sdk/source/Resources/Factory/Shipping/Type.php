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

namespace PagSeguro\Resources\Factory\Shipping;

use PagSeguro\Domains\ShippingType;

/**
 * Class Shipping
 * @package PagSeguro\Resources\Factory\Request
 */
class Type
{

    /**
     * @var \PagSeguro\Domains\Shipping
     */
    private $shipping;

    /**
     * Shipping constructor.
     */
    public function __construct($shipping)
    {
        $this->shipping = $shipping;
    }

    public function instance(ShippingType $type)
    {
        return $this->shipping->setType($type);
    }

    public function withParameters($type)
    {
        $shipping = new ShippingType();
        $shipping->setType($type);
        $this->shipping->setType(
            $shipping
        );
        return $this->shipping;
    }
}
