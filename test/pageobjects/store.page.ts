import { $ } from '@wdio/globals' // selectors
import Page from './page';
import homePage from './home.page';
import { expect } from '@wdio/globals'

interface ProductDetails {
    name: string;
    urlPart: string;
    price: string;
    availability: string;
};

let page = new Page();



class StorePage extends Page {
    //----------------------------------------------- STORE PAGE SELECTORS ------------------------------------------------
    public get storeMenuItem() {
        return $('a[href="/store"]');
    }

    // ----------------------------------------------- STORE PAGE METHODS ------------------------------------------------
    public async navigateToStorePage() {
        page.open('store'); // open store page
        await this.storeMenuItem.waitForDisplayed();
        await expect(this.storeMenuItem).toHaveAttribute('href', '/store');
    }

    public async openEachProductAndValidateDetails(productDetails: ProductDetails[]): Promise<void> {
        for (let i = 0; i < productDetails.length; i++) {
            const product = $(`h3[class="product__heading heading__no-margin"] > a[href^="${productDetails[i].urlPart}"]`);
            await product.click();
            const currentUrl = await browser.getUrl();
            expect(currentUrl).toContain(productDetails[i].urlPart);
            // Validate product name
            await expect($(`h1=${productDetails[i].name}`)).toBeDisplayed();
            // Validate product price
            await expect($('div[class="product__price js-product-container__price"] > span')).toHaveText(productDetails[i].price);
            // Validate product availability
            await expect($('div[class="product-sticker"]')).toHaveText(productDetails[i].availability);
            // Validate that the "Add to cart" button is disabled
            const addToCartButton = $('button[class^="jw-btn product__add-to-cart"]');
            await expect(addToCartButton).toBeDisabled();
            expect(addToCartButton).toHaveText('Disabled');
            // Validate the Add to Wishlist button is disabled
            const addToWishlistButton = $('button[class^="jw-btn jw-btn--icon-only product__add-to-wishlist"]');
            await expect(addToWishlistButton).toBeDisabled();
            // Validate the product description content
            const productDescription = $$('div[class="product__description"] > p');
            expect(productDescription[i]).toHaveText('Description:');
            expect(productDescription[i]).toHaveText('"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."');

            await homePage.navigateToCustomPage('Store');

        }
    }
}
export default new StorePage();