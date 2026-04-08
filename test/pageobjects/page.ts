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
     */
    public async validateElementAttribute(
        { selector, index, attributeName, expectedAttributeValue }:
            { selector: string, index: number, attributeName: string, expectedAttributeValue: string }) {

        console.log(`Running method: validateElementAttribute`);
        console.log(`Method params are: selector: ${selector}, index: ${index}, attributeName: ${attributeName}, expectedAttributeValue: ${expectedAttributeValue}`)

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












}
