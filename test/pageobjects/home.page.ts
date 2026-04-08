import { $ } from '@wdio/globals' // selectors
import Page from './page.js';
import { expect } from '@wdio/globals'
import { assert } from 'node:console';


let page = new Page();


/**
 * sub page containing specific selectors and methods for a specific page
 */
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

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
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