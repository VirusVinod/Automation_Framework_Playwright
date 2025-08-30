import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/Loginpage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";

test("Add and remove product - verify cart count updates", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // Step 1: Login
    await loginPage.gotoLoginPage();
    await loginPage.login("standard_user", "secret_sauce");

    // Step 2: Add product to cart
    await inventoryPage.addProductByName("Sauce Labs Backpack");
    let count = await inventoryPage.getCartCount();
    expect(count).toBe(1);

    // Step 3: Add second product
    await inventoryPage.addProductByName("Sauce Labs Bike Light");
    count = await inventoryPage.getCartCount();
    expect(count).toBe(2);

    // Step 4: Go to cart
    await cartPage.openCart();
    expect(await cartPage.getCartItemsCount()).toBe(2);

    // Step 5: Remove product
    await cartPage.removeProduct("Sauce Labs Backpack");
    expect(await cartPage.getCartItemsCount()).toBe(1);

    // Cart badge should also update
    count = await inventoryPage.getCartCount();
    expect(count).toBe(1);
});