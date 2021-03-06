<?php

/*
 * @author     M2E Pro Developers Team
 * @copyright  M2E LTD
 * @license    Commercial use is forbidden
 */

/**
 * @method Ess_M2ePro_Block_Adminhtml_Ebay_Template_Edit getParentBlock()
 */
class Ess_M2ePro_Block_Adminhtml_Ebay_Template_Edit_General extends Mage_Adminhtml_Block_Widget
{
    protected $_enabledMarketplaces = null;

    //########################################

    public function __construct()
    {
        parent::__construct();

        // Initialization block
        // ---------------------------------------
        $this->setId('ebayTemplateEditGeneral');
        // ---------------------------------------

        $this->setTemplate('M2ePro/ebay/template/edit/general.phtml');
    }

    public function getTemplateNick()
    {
        return $this->getParentBlock()->getTemplateNick();
    }

    public function getTemplateId()
    {
        $template = $this->getParentBlock()->getTemplateObject();

        return $template ? $template->getId() : null;
    }

    public function canDisplayMarketplace()
    {
        $manager = Mage::getSingleton('M2ePro/Ebay_Template_Manager')
            ->setTemplate($this->getTemplateNick());

        return $manager->isMarketplaceDependentTemplate();
    }

    public function getEnabledMarketplaces()
    {
        if ($this->_enabledMarketplaces === null) {
            $collection = Mage::getModel('M2ePro/Marketplace')->getCollection();
            $collection->addFieldToFilter('component_mode', Ess_M2ePro_Helper_Component_Ebay::NICK);
            $collection->addFieldToFilter('status', Ess_M2ePro_Model_Marketplace::STATUS_ENABLE);
            $collection->setOrder('sorder', 'ASC');

            $this->_enabledMarketplaces = $collection;
        }

        return $this->_enabledMarketplaces->getItems();
    }

    public function getMarketplaceId()
    {
        if ($this->getRequest()->getParam('marketplace_id', false)) {
            return $this->getRequest()->getParam('marketplace_id');
        }

        $template = $this->getParentBlock()->getTemplateObject();

        if ($template) {
            return $template->getData('marketplace_id');
        }

        return null;
    }

    protected function _beforeToHtml()
    {
        parent::_beforeToHtml();

        // ---------------------------------------
        $this->setChild('confirm', $this->getLayout()->createBlock('M2ePro/adminhtml_widget_dialog_confirm'));
        // ---------------------------------------
    }

    //########################################
}
