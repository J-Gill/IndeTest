const assert = require('assert');
const { Given, When, Then, After, AfterAll } = require('cucumber');
const { Builder, By, Capabilities, Key } = require('selenium-webdriver');
const { expect } = require('chai');

require("chromedriver");

// driver setup
const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false });
const driver = new Builder().withCapabilities(capabilities).build();

Given('I am on the IndeJuice home page', async function () {
    await driver.get('https://indejuice.local/');
});

When('I search for {string}',  async function (searchTerm) {
    const element = await driver.findElement(By.id('MainSearchInputA'));
    element.sendKeys(searchTerm, Key.RETURN);
    element.submit();
});

Then('products should be loaded', async function () {
    const timeout = 6000
    driver.wait(function () {
        return driver.isElementPresent(webdriver.By.className('grid'));
    }, timeout);
});

Then('the first item name should be {string}', {timeout: 60 * 1000}, async function (firstItemName) {
    const actualFirstItem = await driver.findElement(By.className('name ng-binding'));
    console.log(actualFirstItem);
    assert.equal(actualFirstItem, firstItemName);
    //const isTitleStartWithCheese = title.toLowerCase().lastIndexOf(`${searchTerm}`, 0) === 0;
    //expect(isTitleStartWithCheese).to.equal(true);
});

AfterAll('end', async function(){
    await driver.quit();
});


After(function (scenario) {
    if (scenario.result.status === "failed") {
        var world = this;
        return driver.takeScreenshot().then(function(screenShot, error) {
            if (!error) {
                //world.attach(screenShot, "image/png");

            }
        });
    }
}); 

