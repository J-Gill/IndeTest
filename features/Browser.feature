@smoke
Feature: Add to Basket
  Browser testing


Scenario Outline: Finding some cheese
   Given I am on the IndeJuice home page
   When I search for "<flavour>"
   Then the page title should start with "<answer>"
   
Examples:
    | flavour     | answer |
    | mango       | lol    |
    | strawberry  | lol    |