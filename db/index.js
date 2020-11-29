const mysql = require('mysql');
const pool = mysql.createPool({
    host:       'localhost',
    port:       '3310',
    user:       'root',
    password:   '1234',
    database:   'kovf'
});

let kovfdb = {};

kovfdb.Select = async (table, query) => {
    return new Promise((resolve, reject) => {
        let queryString = []
        
        for (index = 0; index < Object.keys(query).length; index++) {
            queryString.push(`${Object.keys(query)[index]} = '${Object.values(query)[index]}'`)
        }

        selectQuery = `SELECT * FROM ${table}`;

        if (Object.keys(query).length > 0) {
            selectQuery += ` WHERE ${queryString.join(" AND ")}`;
        }

        pool.query(selectQuery, (err, results) => {
            if (err) {
                return reject(err);
            }

            return resolve(results);
        });
    })
}

kovfdb.Insert = async (table, query) => {
    return new Promise((resolve, reject) => {
        let queryValue = []

        for (index = 0; index < Object.keys(query).length; index++) {
            queryValue.push(`'${Object.values(query)[index]}'`)
        }

        insertQuery = `INSERT INTO ${table} (${Object.keys(query).join(',')}) VALUES (${queryValue.join(',')})`;

        pool.query(insertQuery, (err, results) => {
            if (err) {
                return reject(err);
            }

            return resolve(results);
        });
    })
}

kovfdb.Update = async (table, query) => {
    return new Promise((resolve, reject) => {
        let whereQueryString = [], setQueryString = [];

        for (index = 0; index < Object.keys(query).length; index++) {
            key = Object.keys(query)[index];
            
            if (key.startsWith("where_")) {
                whereQueryString.push(`${Object.keys(query)[index].substring(6)} = '${Object.values(query)[index]}'`);
            }
            else if (key.startsWith("set_")) {
                setQueryString.push(`${Object.keys(query)[index].substring(4)} = '${Object.values(query)[index]}'`);
            }
        }

        updateQuery = `UPDATE ${table} SET ${setQueryString.join(",")} WHERE ${whereQueryString.join(" AND ")}`;

        pool.query(updateQuery, (err, results) => {
            if (err) {
                return reject(err);
            }

            return resolve(results);
        });
    })
}

kovfdb.Delete = async (table, query) => {
    return new Promise((resolve, reject) => {
        let queryString = []
        
        for (index = 0; index < Object.keys(query).length; index++) {
            queryString.push(`${Object.keys(query)[index]} = '${Object.values(query)[index]}'`)
        }

        deleteQuery = `DELETE FROM ${table} WHERE ${queryString.join(" AND ")}`;

        pool.query(deleteQuery, (err, results) => {
            if (err) {
                return reject(err);
            }

            return resolve(results);
        });
    })
}

module.exports = kovfdb;