let array1 = [1, 2, 3, 4, 5, 6, 7, 7, 5, 4, 8];
let array2 = [5, 6, 7, 8, 9, 10, 6, 8, 10];
let array3 = [8, 9, 10, 11, 11, 12, 13, 15, 17, 19, 22, 23, 14];

function mapTheArray(array) {
  //O(1) time complexity

  let map = new Map();

  array.forEach((element) => {
    if (map.has(element)) {
      map.set(element, map.get(element) + 1);
    } else {
      map.set(element, 1);
    }
  });

  return map;
}

let mapArray1 = mapTheArray(array1);

let mapArray2 = mapTheArray(array2);

let mapArray3 = mapTheArray(array3);

// console.log(mapArray3);

function duplicate(map1, map2) {
  let keys = map1.keys();
  let duplicateArray = [];
  for (let key of keys) {
    if (map2.has(key)) {
      duplicateArray.push(key);
    }
  }
  return duplicateArray;
}

let duplicatesInArray12 = duplicate(mapArray1,mapArray2);

// console.log(duplicatesInArray12);

let mapOfDuplicateInArray12 = mapTheArray(duplicatesInArray12);

let duplicatesInArray123 = duplicate(mapArray3,mapOfDuplicateInArray12);

console.log(duplicatesInArray123);
