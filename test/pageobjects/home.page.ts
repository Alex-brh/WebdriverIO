import { $ } from '@wdio/globals' // selectors
import Page from './page';
import { expect } from '@wdio/globals'


let page = new Page();


//------------------------------------------------- HOME PAGE SELECTORS ---------------------------------------------------
class HomePage extends Page {
    /**
     * define selectors using getter methods
     */
    public get homePageHeader () {
        return $('h1 > span');
    }

    public getMenuItemsOnTopBar (index: number) {
        return $$('li[class^="jw-menu-item"] > a > span')[index];
    }


    // ----------------------------------------------- HOME PAGE METHODS ------------------------------------------------
    public async navigateToHomePage () {
        page.open(''); // open home page
        await this.homePageHeader.waitForDisplayed();
    }

    public async validateHomePageHeader (expectedHeaderText: string) {
        await this.homePageHeader.waitForDisplayed();
        await expect(this.homePageHeader).toHaveText(expectedHeaderText,  { ignoreCase: true, trim: true }) // check header text
    }

    public async validateMenuItemsOnTopBar ({index, expectedMenuItemText}: {index: number, expectedMenuItemText: string }) {
        console.log(`Validating menu item at index ${index} with text ${expectedMenuItemText}.`);
        const menuItem = this.getMenuItemsOnTopBar(index);
        await menuItem.waitForDisplayed();
        await expect(menuItem).toHaveText(expectedMenuItemText, { ignoreCase: true, trim: true });
    }


}

export default new HomePage();