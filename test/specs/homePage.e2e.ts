import HomePage from '../pageobjects/home.page.js'


describe('Navigate to "Home" page and', () => {
    it('validate header', async () => {
        await HomePage.navigateToHomePage()
        await expect.soft(HomePage.homePageHeader).toBeDisplayed();
        await HomePage.validateHomePageHeader('DEMO tEST store')
    })

    it('validate menu items on the top bar of the page', async () => {
        const menuItemDetails = [
            {index: 0, expectedMenuItemText: 'Home'},
            {index: 1, expectedMenuItemText: 'Store'},
            {index: 2, expectedMenuItemText: 'FAQ'},
            {index: 3, expectedMenuItemText: 'Customer Testimonials'},
            {index: 4, expectedMenuItemText: 'Contact'},
            {index: 5, expectedMenuItemText: 'Elements with frames'},
            {index: 6, expectedMenuItemText: 'Showcase'},
            {index: 7, expectedMenuItemText: 'Clearance'},
        ]
        for (const menuItem of menuItemDetails) {
            await HomePage.validateMenuItemsOnTopBar({index: menuItem.index, expectedMenuItemText: menuItem.expectedMenuItemText});
        }
    })
})
