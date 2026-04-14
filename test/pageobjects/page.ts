import { browser } from '@wdio/globals'

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    // --------------------------------------------------------------------------------------------------------

    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    public open(path: string) {
        return browser.url(`https://free-5288352.webadorsite.com//${path}`);
    }
    // --------------------------------------------------------------------------------------------------------

    /**
     * Validates that an element has a specific attribute value
     * @param {object} options - an object containing the following properties:
     * @param {string} options.selector - the css selector of the element to validate
     * @param {number} options.index - the index of the element to validate
     * @param {string} options.attributeName - the name of the attribute to validate
     * @param {string} options.expectedAttributeValue - the expected value of the attribute
     * @throws {Error} if the actual attribute value does not match the expected attribute value
     * @returns {Promise<void>}
     * @example
     * await page.validateElementAttribute({
     *   selector: 'li[class^="jw-menu-item"] > a',
     *   index: 0,
     *   attributeName: 'href',
     *   expectedAttributeValue: '/home'
     * });
     */
    public async validateElementAttribute(
        { selector, index, attributeName, expectedAttributeValue }:
            { selector: string, index: number, attributeName: string, expectedAttributeValue: string }) {

        console.log(`Running method: validateElementAttribute`);
        console.log(`Method params are: selector: ${selector}, index: ${index}, attributeName: ${attributeName}, expectedAttributeValue: ${expectedAttributeValue}`);

        // 1. Get all elements matching the selector
        const elements = $$(selector);
        const element = elements[index];

        // 2. Wait for the specific element to be visible
        await element.waitForDisplayed();

        // 3. Get the attribute value and validate it
        const actualValue = await element.getAttribute(attributeName);

        if (actualValue !== expectedAttributeValue) {
            throw new Error(`Expected ${attributeName} to be "${expectedAttributeValue}", but found "${actualValue}"`);
        }
    }
    // --------------------------------------------------------------------------------------------------------

    /**
    * Validates that an element has a specific text value
    * @param {Object} options - an object containing the following properties:
    * @param {string} options.selector - the css selector of the element to validate
    * @param {number} options.index - the index of the element to validate
    * @param {string} options.expectedText - the expected value of the text
    * @param {boolean} [options.ignoreCaseOrNot=true] - (true by default) whether to ignore case when validating the text
    * @param {boolean} [options.trimOrNot=true] - (true by default) whether to trim the text before validating
    * @throws {Error} if the actual text value does not match the expected text value
    * @returns {Promise<void>}
    * @example
    * await page.validateElementText({
    *   selector: 'li[class^="jw-menu-item"] > a',
    *   index: 0,
    *   expectedText: 'Home',
    *   ignoreCaseOrNot: true by default,
    *   trimOrNot: true by default
    * });
    */
    public async validateElementText(
        { selector, index, expectedText, ignoreCaseOrNot = true, trimOrNot = true }:
            { selector: string, index: number, expectedText: string, ignoreCaseOrNot?: boolean, trimOrNot?: boolean }) {

        console.log(`Running method: validateElementText`);
        console.log(`Method params are: selector: ${selector}, index: ${index}, expectedText: ${expectedText}, ignoreCaseOrNot: ${ignoreCaseOrNot}, trimOrNot: ${trimOrNot}`);

        // 1. Get all elements matching the selector
        const elements = $$(selector);
        const element = elements[index];

        // 2. Wait for the specific element to be visible
        await element.waitForDisplayed();

        // 3. Get the text value and validate it
        await expect(element).toHaveText(expectedText, { ignoreCase: ignoreCaseOrNot, trim: trimOrNot }); 
        
    }
    // --------------------------------------------------------------------------------------------------------











}
