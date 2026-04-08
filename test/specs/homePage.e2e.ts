import HomePage from '../pageobjects/home.page.js'
import Page from '../pageobjects/page.js';

const page = new Page();


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
            await page.validateElementAttribute(
                {
                    selector: 'li[class^="jw-menu-item"] > a',
                    index: menuItem.index,
                    attributeName: "href",
                    expectedAttributeValue: menuItem.href
                }
            )
        }
    })


})
