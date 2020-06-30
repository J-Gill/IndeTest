@smoke
Feature: Add to Basket
  Search flavour, verify and select top result to add to basket


Scenario Outline: Selecting Products
   Given I am on the IndeJuice home page
   When I search for "<flavour>"
   Then products should be loaded
   Then the first item name should be "<firstItemName>"
   
Examples:
    | flavour     | firstItemName | 
    | mango       | Mango       |
    | mango       | fish        |
    | strawberry  | strawberry  |