window.EbayListingVariationProductManage = Class.create(Action,{

    // ---------------------------------------

    parseResponse: function(response)
    {
        if (!response.responseText.isJSON()) {
            return;
        }

        return response.responseText.evalJSON();
    },

    // ---------------------------------------

    openPopUp: function(productId, title, filter, variationIdFilter)
    {
        MessageObj.clearAll();

        new Ajax.Request(M2ePro.url.get('variationProductManage'), {
            method: 'post',
            parameters: {
                product_id : productId,
                filter: filter,
                variation_id_filter : variationIdFilter
            },
            onSuccess: function (transport) {

                variationProductManagePopup = Dialog.info(null, {
                    draggable: true,
                    resizable: true,
                    closable: true,
                    className: "magento",
                    windowClassName: "popup-window",
                    title: title.escapeHTML(),
                    top: 5,
                    width: 1100,
                    height: 600,
                    zIndex: 100,
                    hideEffect: Element.hide,
                    showEffect: Element.show
                });
                variationProductManagePopup.options.destroyOnClose = true;

                variationProductManagePopup.productId = productId;

                $('modal_dialog_message').update(transport.responseText);
            }
        });
    },

    closeManageVariationsPopup: function()
    {
        variationProductManagePopup.close();
    },

    // ---------------------------------------

    loadVariationsGrid: function(showMask)
    {
        showMask && $('loading-mask').show();

        var gridIframe = $('ebayVariationsProductManageVariationsGridIframe');

        if(gridIframe) {
            gridIframe.remove();
        }

        var iframe = new Element('iframe', {
            id: 'ebayVariationsProductManageVariationsGridIframe',
            src: $('ebayVariationsProductManageVariationsGridIframeUrl').value,
            width: '100%',
            height: '100%',
            style: 'border: none; min-height: inherit',
            'parent-container': 'ebayVariationsProductManageVariationsGrid'
        });

        $('ebayVariationsProductManageVariationsGrid').insert(iframe);

        Event.observe($('ebayVariationsProductManageVariationsGridIframe'), 'load', function() {
            $('loading-mask').hide();
        });
    },

    reloadVariationsGrid: function()
    {
        var gridIframe = $('ebayVariationsProductManageVariationsGridIframe');

        if(!gridIframe) {
            return;
        }
        gridIframe.contentWindow.EbayListingEbayGridObj.actionHandler.gridHandler.unselectAllAndReload();
    },

    // ---------------------------------------

    loadDeletedVariationsGrid: function(showMask)
    {
        var self = this;
        showMask && $('loading-mask').show();

        var gridIframe = $('ebayDeletedVariationsProductManageVariationsGridIframe');

        if(gridIframe) {
            gridIframe.remove();
        }

        var iframe = new Element('iframe', {
            id: 'ebayDeletedVariationsProductManageVariationsGridIframe',
            src: $('ebayDeletedVariationsProductManageVariationsGridIframeUrl').value,
            width: '100%',
            height: '100%',
            style: 'border: none;',
            'parent-container': 'ebayDeletedVariationsProductManageVariationsGrid'
        });

        $('ebayDeletedVariationsProductManageVariationsGrid').insert(iframe);

        Event.observe($('ebayDeletedVariationsProductManageVariationsGridIframe'), 'load', function() {
            $('loading-mask').hide();
            GridFrameObj.autoHeightFrameByContent(
                $('ebayDeletedVariationsProductManageVariationsGrid'), this
            );
            $('deleted_magento_variations_show') && $('deleted_magento_variations_show').show();
        });
    },

    // ---------------------------------------

    showDeletedMagentoVariations: function()
    {
        $('deleted_magento_variations_show').hide();
        $('deleted_magento_variations_hide').show();

        $('ebayDeletedVariationsProductManageVariationsGrid').show();
    },

    hideDeletedMagentoVariations: function()
    {
        $('deleted_magento_variations_show').show();
        $('deleted_magento_variations_hide').hide();

        $('ebayDeletedVariationsProductManageVariationsGrid').hide();
    }

    // ---------------------------------------
});