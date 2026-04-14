import homePage from '../pageobjects/home.page.js';
import HomePage from '../pageobjects/home.page.js';
import { $ } from '@wdio/globals';

describe('Navigate to "Home" page and', () => {
    it('validate header', async () => {
        await HomePage.navigateToHomePage()
        await expect.soft(HomePage.homePageHeader).toBeDisplayed();
        await HomePage.validateHomePageHeader('DEMO tEST store')
    })

    it('validate menu items on the top bar of the page', async () => {
        const menuItemDetails = [
            { index: 0, expectedMenuItemText: 'Home', href: "/" },
            { index: 1, expectedMenuItemText: 'Store', href: "/store" },
            { index: 2, expectedMenuItemText: 'FAQ', href: "/faq" },
            { index: 3, expectedMenuItemText: 'Customer Testimonials', href: "/customer-testimonials" },
            { index: 4, expectedMenuItemText: 'Contact', href: "/contact" },
            { index: 5, expectedMenuItemText: 'Elements with frames', href: "/elements-with-frames" },
            { index: 6, expectedMenuItemText: 'Showcase', href: "/showcase" },
            { index: 7, expectedMenuItemText: 'Clearance', href: "/clearance" },
        ]
        for (const menuItem of menuItemDetails) {
            await HomePage.validateMenuItemsOnTopBar({ index: menuItem.index, expectedMenuItemText: menuItem.expectedMenuItemText });
            await HomePage.validateMenuItemHrefAttribute({ index: menuItem.index, expectedHrefValue: menuItem.href });
        }
    })

    it('validate the main top slide text', async () => {
        await homePage.validateMainTopSlideText('Discover Unique Ways To Create Test Scripts');
    });

    it('validate the H1 headers', async () => {
        // Validate all H1 headers on the home page
        const hiHeaders = [
            { index: 0, expectedH1Text: `Welcome to Alex's test automation site for practice` },
            { index: 1, expectedH1Text: 'Verify New Collection' },
            { index: 2, expectedH1Text: 'Discover Our Exclusive Collection' },
            { index: 3, expectedH1Text: 'More stuff' }
        ];
        for (const h1Header of hiHeaders) {
            await homePage.validateAllH1HeadersOnHomePage({ expectedH1Text: h1Header.expectedH1Text, index: h1Header.index });
        }
    });

    it('validate the paragraphs', async () => {
        const paragraphDetails = [
            { index: 0, expectedParagraphText: `DISCLAIMER: This is NOT a real e-comm website. It's being used for educational purposes ONLY. No items can be purchased and/or delivered through this website.` },
            { index: 1, expectedParagraphText: `Don't miss out on the chance to save while enjoying the quality and service you love. Keep an eye on this space for the latest updates and grab these amazing deals while they last!` },
            { index: 2, expectedParagraphText: 'Jessica L.' },
            { index: 3, expectedParagraphText: 'Browse our special selection of unique items and find something new today!' },
            { index: 4, expectedParagraphText: `Don't miss out on the chance to save while enjoying the quality and service you love. Keep an eye on this space for the latest updates and grab these amazing deals while they last!` },
            { index: 5, expectedParagraphText: `Online Store is dedicated to bringing you a diverse range of random items, carefully selected to suit various tastes and needs. Our mission is to provide a one-stop shop where customers can find everything from the unexpected to the essential. We pride ourselves on offering quality products at competitive prices, ensuring that our customers always get the best value for their money. At Online Store, customer satisfaction is our top priority, and we strive to exceed expectations with every order. Join our growing community of happy customers and experience the convenience and variety that Online Store has to offer.` },
            { index: 6, expectedParagraphText: `DISCLAIMER: This is NOT a real` }
        ]
        for (const paragraph of paragraphDetails) {
            await homePage.validateHomePageParagraphs({ expectedParagraphText: paragraph.expectedParagraphText, index: paragraph.index });
        }
    });

    it('validate buttons', async () => {
        const buttonDetails = [
            { index: 3, expectedButtonText: 'Shop Now' },
            { index: 4, expectedButtonText: 'Shop Now' },
            { index: 5, expectedButtonText: 'Shop Now' },
            { index: 6, expectedButtonText: 'Shop Now' },
        ]
        for (const button of buttonDetails) {
            await homePage.validateButtonsOnHomePage({ expectedButtonText: button.expectedButtonText, index: button.index });
        }
    });

    it('validate the pictures on the page', async () => {
        const pictureSelectors = [
            'div[class^="jw-slideshow-slide-content"]', // main top background img
            'img[class="jw-element-image__image jw-intrinsic__item"]',
            'img[class="jw-element-image__image jw-intrinsic__item"]',
            'img[class="jw-element-image__image jw-intrinsic__item"]',
            'img[class="jw-element-image__image jw-intrinsic__item"]',
            'img[class="jw-element-image__image jw-intrinsic__item"]'
        ]

        for (const selector of pictureSelectors) {
            const pictureElement = $(selector);
            await pictureElement.waitForDisplayed();
            await expect(pictureElement).toBeDisplayed();
        }
    });
})
