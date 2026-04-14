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

		const bodyText = await $('body').getText();
		const prices = ['CA$0.99', 'CA$0.89', 'CA$0.79'];

		for (const price of prices) {
			expect(bodyText).toContain(price);
		}

		const unavailableCount = bodyText.split('Unavailable').length - 1;
		expect(unavailableCount).toBeGreaterThanOrEqual(3);
	});

	it('validate store action links and footer disclaimer', async () => {

		const viewCartLink = $('a[href="/cart"]');
		await expect(viewCartLink).toExist();
		await expect(viewCartLink).toHaveAttribute('href', '/cart');

		const seeDetailsLinks = await $$('a*=See details');
		expect(seeDetailsLinks.length).toBeGreaterThanOrEqual(2);

		const bodyText = await $('body').getText();
		expect(bodyText).toContain('DISCLAIMER: This is NOT a real');
		expect(bodyText).toContain('educational purposes ONLY');
	});
});
