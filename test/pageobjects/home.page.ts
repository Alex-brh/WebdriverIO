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


}

export default new HomePage();