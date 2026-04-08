import HomePage from '../pageobjects/home.page.js'


describe('Navigate to "Home" page and', () => {
    it('validate header', async () => {
        await HomePage.navigateToHomePage()
        await expect.soft(HomePage.homePageHeader).toBeDisplayed();
        await HomePage.validateHomePageHeader('DEMO tEST store')
        
    })
})
