# Module Wrapper Function

> every .js file in node.js is act as separate module

> all the variables and fuctions are #private by default

> node.js Wrape all the code in .js file into Wrapper Function which is IIFE () immediately invoked funciton expression )

## IIFE function

```javascript
(function (exports, require, module, __filename, __dirname) {
  // code in .js file wrapp inside IIFE funciton

  const fs = require("fs");

  console.log("hello india....");
})();
```

```javascript
> exports, require, module, __filename, __dirname
// all these are local variables in every .js file
```

> All it happens behind the scene... you no need to do anythig...

> all the data inside IIFE is became private no one can access it externally....
