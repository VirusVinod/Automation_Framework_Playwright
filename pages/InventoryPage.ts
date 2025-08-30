import { Page, Locator, expect } from "@playwright/test";

export class InventoryPage {
    private page: Page;
    private addToCartButtons: Locator;
    private cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButtons = page.locator('[data-test^="add-to-cart"]'); // all Add to cart buttons
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }

    async addProductByName(productName: string) {
        const product = this.page.locator(
            `.inventory_item:has-text("${productName}") button`
        );
        await product.click();
    }

    async getCartCount(): Promise<number> {
        const badge = this.page.locator('.shopping_cart_badge');
        if (await badge.isVisible()) {
            return parseInt(await badge.innerText());
        }
        return 0;
    }


    async addAllProducts() {
        const count = await this.addToCartButtons.count();
        for (let i = 0; i < count; i++) {
            await this.addToCartButtons.nth(i).click();
        }
    }
}