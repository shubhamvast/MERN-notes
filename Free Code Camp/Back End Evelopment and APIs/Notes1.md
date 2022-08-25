# Managing Packages with NPM

## NPM : (Node Package Manager)

1. commond line tool
2. to install , create, and share packages of JS code written for Node.Js

## package.json file

> center of any Node.js project or npm package

> store information about project or META-DATA of project

> it's similar to \<head> tag in html

> consist of single JSON object, information stored in key-value pairs

> Only required fields : "name" and "version"

> should add additional info of project , it's useful...

### "author":"shubham mangore" field

```json
 "author":"shubham mangore",

 or

  "author":{
    "first name" : "shubham",
    "last name" : "mangore"
  }
```

> "author" field can be string or object, 

>should use object as value field for big projects

### "description": "store description about project" field

```json
"description":"leatning freecode camp",
```

> a great way to summarize what a project does

> the string that should sell your idea to the user when they decide whether to install your package or not

### "keywords": [ "descriptive", "related", "words" ] field

```json
  "keywords":["freecodecamp","learn code for free","awsome"],
```
>to describe your project using related keywords

>array of type String 

### "license": "MIT" field

```json
"license": "MIT",
```
>you inform users of what they are allowed to do with your project

>NOT required but better to add it, which guide users

### "version": "1.2.0" field
```json
"version": ^"1.2.3", // ^ for major updates
or
"version": ~"3.2.0", // ~ for major and minor updates

```
>describes the current version of your project

## External Packages from npm

>biggest reasons to use a package manager(npm), is their powerful dependency management

>when you set up a project on a new computer, npm automatically installs everything for you. But how can npm know exactly what your project needs? 

> ANSWER : "dependencies" field

```json
"dependencies": {
  "package-name": "version",
  "express": "4.14.0"
}
```






