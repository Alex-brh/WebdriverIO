import { $ } from '@wdio/globals' // selectors
import Page from './page';
import { expect } from '@wdio/globals'


let page = new Page();


//------------------------------------------------- HOME PAGE SELECTORS ---------------------------------------------------
class HomePage extends Page {
    /**
     * define selectors using getter methods
     */
    public get homePageHeader() {
        return $('h1 > span');
    }

    public getMenuItemsOnTopBar(index: number) {
        return $$('li[class^="jw-menu-item"] > a')[index];
    }




    // ----------------------------------------------- HOME PAGE METHODS ------------------------------------------------
    public async navigateToHomePage() {
        page.open(''); // open home page
        await this.homePageHeader.waitForDisplayed();
    }

    public async navigateToCustomPage(pageMenuItemText: string) {
        pageMenuItemText = pageMenuItemText.trim();
        const menuItem = $(`a=${pageMenuItemText}`);
        await menuItem.waitForDisplayed();
        await menuItem.click();
    }

    public async validateHomePageHeader(expectedHeaderText: string) {
        await this.homePageHeader.waitForDisplayed();
        await expect(this.homePageHeader).toHaveText(expectedHeaderText, { ignoreCase: true, trim: true }) // check header text
    }

    public async validateMenuItemsOnTopBar({ index, expectedMenuItemText }: { index: number, expectedMenuItemText: string }) {
        expectedMenuItemText = expectedMenuItemText.trim();
        console.log(`Validating menu item at index ${index} with text ${expectedMenuItemText}.`);
        const menuItem = this.getMenuItemsOnTopBar(index);
        await menuItem.waitForDisplayed();
        await expect(menuItem).toHaveText(expectedMenuItemText, { ignoreCase: true, trim: true });
    }

    public async validateMenuItemHrefAttribute({ index, expectedHrefValue }: { index: number, expectedHrefValue: string }) {
        const menuItem = this.getMenuItemsOnTopBar(index);
        await menuItem.waitForDisplayed();
        await expect(menuItem).toHaveAttribute("href", expectedHrefValue);
    }

    public async validateMainTopSlideText(expectedSlideText: string) {
        const mainTopSlideTextElement = 'div[class="jw-slideshow-title"]';
        page.validateElementText({ 
            selector: mainTopSlideTextElement, 
            index: 0, 
            expectedText: expectedSlideText, 
            ignoreCaseOrNot: false, 
            trimOrNot: true })
    }

    public async validateAllH1HeadersOnHomePage({ expectedH1Text, index }: { expectedH1Text: string, index: number }) {
        const h1Headers = 'h1[class^="jw-heading"]';
        page.validateElementText({ 
            selector: h1Headers, 
            index: index, 
            expectedText: expectedH1Text,
            ignoreCaseOrNot: false, 
            trimOrNot: true })
    }

    public async validateHomePageParagraphs({ expectedParagraphText, index }: { expectedParagraphText: string, index: number }) {
        const paragraph = `div[class="jw-element-imagetext-text"] > p`;
        page.validateElementText({ 
            selector: paragraph, 
            index: index, 
            expectedText: expectedParagraphText, 
            ignoreCaseOrNot: false, 
            trimOrNot: true })
    }

    public async validateButtonsOnHomePage({ expectedButtonText, index }: { expectedButtonText: string, index: number }) {
        const buttons = 'a > span[class="jw-btn-caption"]';
        page.validateElementText({ 
            selector: buttons, 
            index: index, 
            expectedText: expectedButtonText, 
            ignoreCaseOrNot: false, 
            trimOrNot: true })
    }
}

export default new HomePage();