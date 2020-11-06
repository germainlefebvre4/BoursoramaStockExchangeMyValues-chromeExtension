# Boursorama Stock Exchange MyValues - Chrome Extension

Show your stock exchange values imported from another trading board in your Boursorama List.


## Getting started

Change the values with YOURS at the top of the file `main.js`.

Go in you Google Chrome browser at `chrome://extensions`.

Load an "Unpacked extension" and choose the directory of this repository `C:\ChromeExtensions\BoursoramaStockExchangeMyValues`.

Go at your Boursorama List (i.e. [https://www.boursorama.com/espace-membres/mes-listes/M1234567/1](https://www.boursorama.com/espace-membres/mes-listes/M1234567/1))

Enjoy !!


## Description
The values injected come from the list created at the top of the file `main.js`.
```js
stock_my_values = {
    "BOUYGUES": 30.16,
    "CREDIT AGRICOLE SA": 7.10,
    "EDF": 9.94,
    "ENGIE": 11.01,
    ...
}
```

The values are colored following the conditions:
* **`green`**: `Current value` < `My value`
* **`orange`**: 0.08% of `Current value` < `My value` < `Current value`
* **`red`**: `My value` < 0.08% of `Current value`

The Chrome Extension adds 2 columns into your oursorama Bourse List:
* `My Data`: The values imported and sotred into the extension
* `My Perc`: The calculated value between `My Data` and the last value `Der. Ech.`


## Screenshot

![logo](https://raw.githubusercontent.com/germainlefebvre4/BoursoramaStockExchangeMyValues-chromeExtension/main/docs/boursorama-list-myvalues.png)
