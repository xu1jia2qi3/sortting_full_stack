const { Database } = require('sqlite3');
// sqlite database
const sqlite3 = require('sqlite3').verbose();

let db;
function init(filepath, callback) {
    db = new sqlite3.Database(filepath, (err) => {
        // if there is an error 
        if (err) {
            // Cannot open database
            console.error(err.message)
            throw err
        } else {
            // create table if the script runs for the first time
            console.log('Connected to the SQLite database.')
            db.run('CREATE TABLE IF NOT EXISTS steps(step)');
            callback();
        }
    });
}

function write(steps) {
    // insert all steps into the steps table
    const bindings = steps.map(() => '(?)').join(',')
    const query = `INSERT INTO steps VALUES ${bindings};`;

    db.run(query, steps, function (err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });

}

module.exports = {init, write};