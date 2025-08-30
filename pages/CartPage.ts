import { Page, Locator } from "@playwright/test";

export class CartPage {
    private page: Page;
    private cartLink: Locator;
    private removeButtons: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartLink = this.page.locator('.shopping_cart_link');
        this.removeButtons = page.locator('[data-test^="remove-"]');
    }

    // async openCart() {
    //     await this.cartLink.click();
    //     // await this.page.locator('.shopping_cart_link').click();
    // }
    async openCart() {
        await Promise.all([
            this.page.waitForURL('**/cart.html'),
             this.cartLink.click()
        ]);
    }

    async removeProduct(productName: string) {
        const product = this.page.locator(
            `.cart_item:has-text("${productName}") button`
        );
        await product.click();
    }

    async getCartItemsCount(): Promise<number> {
        return await this.page.locator(".cart_item").count();
    }
}