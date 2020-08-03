const express = require('express');
const cors = require('cors')

const db = require('./database.js');

const app = express();
const port = 3001;

app.use(cors())
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// api for sorting
app.post('/sort', function (request, response) {
    try {
        // convert incoming data to list
        const data_type = request.body.data.data_type;
        const unsorted_data = request.body.data.list.split(',');
        if (data_type === 'integer') {
            //convert string to integer
            unsorted_list = unsorted_data.map((value) => +value);
        } else {
            unsorted_list = unsorted_data
        }
        // perform sort function
        const steps = [];
        const sorted = quickSort(unsorted_list, steps);
        // Save steps to database
        db.write(steps);

        // send sorted list to frontend
        // console.log(data);
        response.send({sorted, steps});
    } catch (error) {
        response.send(error);
    }
});

// sort list and write to database for eachstep
// For integers, compare using their numeric value
// For strings, compare using their ASCII code
function quickSort(array, steps) {
    console.log(array);
    //if array smaller than 2 ele, return 
    if (array.length < 2) {
        return array;
    }
    // first item as pivot
    let pivot = array[0];
    // all ele less than pivot goes in to lesserarray
    let lesserArray = [];
    // all ele greater than pivot goes in to greaterArray
    let greaterArray = [];

    for (let i = 1; i < array.length; i++) {
        if (array[i] > pivot) {
            greaterArray.push(array[i]);
        } else {
            lesserArray.push(array[i]);
        }

    }
    steps.push(`
    left part : ${lesserArray},
    pivot : ${pivot},
    right part : ${greaterArray}`);

    // recursive call quicksort and join together 
    return quickSort(lesserArray, steps).concat(pivot, quickSort(greaterArray, steps));
}

db.init('mydatabase.db', () => {
    app.listen(port, function () {
        console.log(`Example app listening on port ${port}!`);
    });
});