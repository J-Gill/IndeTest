const { Given, When, Then, After, AfterAll } = require('cucumber');
const { Builder, By, Capabilities, Key } = require('selenium-webdriver');
const { expect } = require('chai');

require("chromedriver");

// driver setup
const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false });
const driver = new Builder().withCapabilities(capabilities).build();

Given('I am on the IndeJuice home page', async function () {
    await driver.get('https://indejuice.com/');
});

When('I search for {string}', async function (searchTerm) {
    const element = await driver.findElement(By.id('MainSearchInputA'));
    element.sendKeys(searchTerm, Key.RETURN);
    element.submit();
});

Then('the page title should start with {string}', {timeout: 60 * 1000}, async function (searchTerm) {
    const title = await driver.getTitle();
    const isTitleStartWithCheese = title.toLowerCase().lastIndexOf(`${searchTerm}`, 0) === 0;
    expect(isTitleStartWithCheese).to.equal(true);
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

