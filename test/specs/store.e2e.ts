import HomePage from '../pageobjects/home.page.js';
import { $, $$, browser } from '@wdio/globals';

describe('Navigate to "Store" page and', () => {

    beforeEach(async () => {
        await HomePage.navigateToHomePage()
        await HomePage.navigateToCustomPage('Store');
        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('/store');
        await expect($('a=Best test script A')).toBeDisplayed()
    });

    it('validate menu items on the top bar of the page', async () => {

        const menuItemDetails = [
            { index: 0, expectedMenuItemText: 'Home', href: '/' },
            { index: 1, expectedMenuItemText: 'Store', href: '/store' },
            { index: 2, expectedMenuItemText: 'FAQ', href: '/faq' },
            { index: 3, expectedMenuItemText: 'Customer Testimonials', href: '/customer-testimonials' },
            { index: 4, expectedMenuItemText: 'Contact', href: '/contact' },
            { index: 5, expectedMenuItemText: 'Elements with frames', href: '/elements-with-frames' },
            { index: 6, expectedMenuItemText: 'Showcase', href: '/showcase' },
            { index: 7, expectedMenuItemText: 'Clearance', href: '/clearance' },
        ];

        for (const menuItem of menuItemDetails) {
            await HomePage.validateMenuItemsOnTopBar({
                index: menuItem.index,
                expectedMenuItemText: menuItem.expectedMenuItemText,
            });
            await HomePage.validateMenuItemHrefAttribute({
                index: menuItem.index,
                expectedHrefValue: menuItem.href,
            });
        }
    });

    it('validate store products names and links', async () => {

        const productDetails = [
            { name: 'Best test script A', href: '/product/15277987/best-test-script-a' },
            { name: 'Best test script B', href: '/product/15278051/best-test-script-b' },
            { name: 'Best test script C', href: '/product/15278052/best-test-script-c' },
        ];

        for (const product of productDetails) {
            const productLink = $(`a=${product.name}`);
            await productLink.scrollIntoView();
            await expect(productLink).toBeDisplayed();
            await expect(productLink).toHaveAttribute('href', product.href);
        }
    });

    it('validate store pricing and availability text', async () => {

        const pricingElements = $$('div[class="product__price js-product-container__price"] > span');
        const pricingElementCount = await pricingElements.length;
        expect(pricingElementCount).toEqual(3);
        const prices = ['CA$0.99', 'CA$0.89', 'CA$0.79'];

        for (let i = 0; i < prices.length; i++) {
            // Check if the pricing elements contain the expected prices in proper order
            await expect(pricingElements[i]).toHaveText(prices[i]);
        }

        const availabilityElements = $$('div[class="product-sticker"]');
        const availabilityElementCount = await availabilityElements.length;
        expect(availabilityElementCount).toEqual(3);

        for (let i = 0; i < availabilityElementCount; i++) {
            // Check if the availability elements contain the text "Unavailable"
            await expect(availabilityElements[i]).toHaveText('Unavailable');
        }
    });

    it('validate store action links and footer disclaimer', async () => {

        const viewCartLink = $('a[href="/cart"]');
        await expect(viewCartLink).toExist();
        await expect(viewCartLink).toHaveAttribute('href', '/cart');

        const seeDetailsLinks = $$('a*=See details');
        const seeDetailsLinkCount = await seeDetailsLinks.length;
        expect(seeDetailsLinkCount).toBeGreaterThanOrEqual(2);

        const disclaimers = $$('div[class="jw-element-imagetext-text"] > p > span');
        const disclaimerCount = await disclaimers.length;
        expect(disclaimerCount).toEqual(2);

        for (let i = 0; i < disclaimerCount; i++) {
            const disclaimerText = await disclaimers[i].getText();
            expect(disclaimerText).toContain('DISCLAIMER: This is NOT a real');
            expect(disclaimerText).toContain('educational purposes ONLY');
        };
    });

    it('validate each item description content', async () => {

        const productLink = $$('div[class="product__description"] > p');
        for (let i = 0; i < 4; i++) {
            expect(productLink[i]).toHaveText(['Description:', '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."']);
        }
    });

});
