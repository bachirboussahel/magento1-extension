window.AmazonTemplateProductTaxCode = Class.create(AmazonTemplateEdit, {

    rulesIndex: 0,

    // ---------------------------------------

    initialize: function()
    {
        this.setValidationCheckRepetitionValue('M2ePro-tpl-title',
                                                M2ePro.translator.translate('The specified Title is already used for other Policy. Policy Title must be unique.'),
                                                'Amazon_Template_ProductTaxCode', 'title', 'id',
                                                M2ePro.formData.id);
    },

    // ---------------------------------------

    duplicate_click: function($headId)
    {
        this.setValidationCheckRepetitionValue('M2ePro-tpl-title',
                                                M2ePro.translator.translate('The specified Title is already used for other Policy. Policy Title must be unique.'),
                                                'Amazon_Template_ProductTaxCode', 'title', 'id', '');

        CommonObj.duplicate_click($headId, M2ePro.translator.translate('Add Product Tax Code Policy'));
    },

    // ---------------------------------------

    productTaxCodeModeChange: function()
    {
        $('product_tax_code_custom_value_tr').hide();
        $('product_tax_code_attribute').value = '';

        if (this.value == M2ePro.php.constant('Ess_M2ePro_Model_Amazon_Template_ProductTaxCode::PRODUCT_TAX_CODE_MODE_VALUE')) {
            $('product_tax_code_custom_value_tr').show();
        } else if (this.value == M2ePro.php.constant('Ess_M2ePro_Model_Amazon_Template_ProductTaxCode::PRODUCT_TAX_CODE_MODE_ATTRIBUTE')) {
            AmazonTemplateProductTaxCodeObj.updateHiddenValue(this, $('product_tax_code_attribute'));
        }
    }

    // ---------------------------------------

});