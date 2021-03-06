<?php

/*
 * @author     M2E Pro Developers Team
 * @copyright  M2E LTD
 * @license    Commercial use is forbidden
 */

class Ess_M2ePro_Model_Resource_Template_SellingFormat_Collection
    extends Ess_M2ePro_Model_Resource_Collection_Component_Parent_Abstract
{
    //########################################

    public function _construct()
    {
        parent::_construct();
        $this->_init('M2ePro/Template_SellingFormat');
    }

    //########################################
}
