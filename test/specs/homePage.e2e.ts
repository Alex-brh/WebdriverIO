import homePage from '../pageobjects/home.page.js';
import HomePage from '../pageobjects/home.page.js'

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

    it('validate the H1 headers on the page', async () => {
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

})
