<?php
/**
 * Created by PhpStorm.
 * User: thiago.medeiros
 * Date: 04/08/2017
 * Time: 10:00
 */

namespace PagSeguro\Domains\DirectPreApproval;

class AddressTest extends \PHPUnit_Framework_TestCase
{
    private $obj;

    public function testParameters()
    {
        $this->assertObjectHasAttribute('street', $this->obj);
        $this->assertObjectHasAttribute('number', $this->obj);
        $this->assertObjectHasAttribute('district', $this->obj);
        $this->assertObjectHasAttribute('city', $this->obj);
        $this->assertObjectHasAttribute('state', $this->obj);
        $this->assertObjectHasAttribute('country', $this->obj);
    }

    public function testWithParameters()
    {
        $this->assertInstanceOf(Address::class, $this->obj);
    }

    protected function setUp()
    {
        $this->obj = new Address();
    }
}