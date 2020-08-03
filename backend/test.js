// function quickSort(array) {
//     //if array smaller than 2 ele, return 
//     if(array.length < 2) {
//       return array;
//     }
//     // first item as pivot
//     let pivot = array[0];
//     // all ele less than pivot goes in to lesserarray
//     let lesserArray = [];
//     // all ele greater than pivot goes in to lesserarray
//     let greaterArray = [];

//     for (let i = 1; i < array.length; i++) {
//       if ( array[i] > pivot ) {
//         greaterArray.push(array[i]);
//       } else {
//         lesserArray.push(array[i]);
//       }

//     }    
//     step = `
//     left part ${lesserArray}
//     pivot is ${pivot}
//     right part ${greaterArray}`      

//     // recursive call quicksort and join together 
//     return quickSort(lesserArray).concat(pivot, quickSort(greaterArray));
//   }
// array = [ 'b','c','a','e']
// arr = quickSort(array);
var sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('./mydatabase.db');

// db.all(sql, [], (err, rows) => {
//     if (err) {
//         throw err;
//     }
//     rows.forEach((row) => {
//         console.log(row.name);
//     });
// });

db.all("SELECT * FROM steps",(err, results) => {
  // receives all the results as an array
    console.log(results);
  });