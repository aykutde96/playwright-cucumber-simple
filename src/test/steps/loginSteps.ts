import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber"
import { expect } from "@playwright/test"
import { pageFixture } from "../hooks/pageFixture";
setDefaultTimeout(60*1000);
Given('User navigates to the application', async function () {

    await pageFixture.page.goto("https://bookcart.azurewebsites.net");
});

Given('User click on the login link', async function () {
    await pageFixture.page.locator("//span[text()='Login']").click();
});

Given('User enter the username as {string}', async function (username) {
    await pageFixture.page.locator("//input[@formcontrolname='username']").type(username);
});


Given('User enter the password as {string}', async function (password) {
    await pageFixture.page.locator("//input[@formcontrolname='password']").type(password);
});


When('User click on the login button', async function () {
    await pageFixture.page.locator("//button[@color='primary']").click();
});

When('Login should fail', async function () {
    const alertElement =  pageFixture.page.locator("//mat-error[@role='alert']");
    await expect(alertElement).toHaveText("Username or Password is incorrect.");
});

Then('Login should be success', async function () {
    const user =  pageFixture.page.locator("//button[contains(@class,'mat-focus-indicator mat-menu-trigger')]//span[1]");
    console.log(await user.textContent());
    await expect(user).toContainText("ortoni");

});
