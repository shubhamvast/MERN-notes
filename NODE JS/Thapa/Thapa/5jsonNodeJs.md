# JSON

## JavaScript Object Notation

### 1. Lightweight format

### 2. To store and transporting data

### 3. server use this format to send data

## JSON object

```javascript
{
    "name" : "shubham",
    "age" : 34,
    "employeeId" : 101
}

//  "name" ==> key
// "shubham" ==> value

```

## Equivalent javascript object

```javascript
let object = {
  name: "shubham",
  age: 34,
  employeeId: 101,
};
```

## How to convert Js object to JSON object

### .js file

```javascript
let object = {
  name: "shubham",
  age: 34,
  employeeId: 101,
};

const objectToJson = JSON.stringify(object);

console.log(objectToJson);
```

### shell output

```bash
{"name":"shubham","age":34,"employeeId":101}
```

## How to convert JSON object to Js object

### .js file

```javascript
const jsonToObject = JSON.parse(objectToJson);

console.log(jsonToObject);
```

### shell output

```javascript
{ name: 'shubham', age: 34, employeeId: 101 }
```

# TASK

1. convert JS object to JSON object
2. store that JSON object in seperate .json file
3. read .json file and fetch data inside it

## 1. convert JS object to JSON object

```javascript
const convertToJson = JSON.stringify(object);
```

## 2. store that JSON object in seperate .json file

```javascript
const convertToJson = JSON.stringify(object);

import fs from "fs";

let data = convertToJson;

fs.writeFile("apifile.json", data, (error) => {
  console.log(error);
});
```

## 3. read .json file and fetch data inside it

```javascript
import fs from "fs";

fs.readFile("apifile.json", "utf-8", (error, data) => {
  console.log(error);

  console.log(data);
});
```
