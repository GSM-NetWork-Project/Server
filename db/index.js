const mysql = require('mysql');
const pool = mysql.createPool({
    host:       'localhost',
    port:       '3310',
    user:       'root',
    password:   '1234',
    database:   'kovf'
});

let kovfdb = {};

kovfdb.Select = async (table, column = '*', query = {operator: 'AND'}) => {
    return new Promise((resolve, reject) => {
        joinType = query['join_type']; delete query['join_type'];
        joinTable = query['join_table']; delete query['join_table'];
        operator = query['operator']; delete query['operator'];

        selectQuery = `SELECT ${column} FROM ${table}`;

        seperator = '';
        whereState = 'WHERE';

        if (typeof joinType == 'undefined') {
            seperator = `'`;
        }
        else {
            selectQuery += ` ${joinType.replace(/[^a-zA-Z ]/g, ' ')} ${joinTable}`
            whereState = 'ON';
        }

        let queryString = []

        Object.entries(query).forEach(entry => {
            const [key, value] = entry;

            String(value).split(',').forEach((item) => {
                queryString.push(`${key} = ${seperator}${item}${seperator}`);
            });
        });
        
        if (queryString.length > 0) {
            if (typeof operator == 'undefined') {
                operator = 'AND';
            }

            selectQuery += ` ${whereState} ${queryString.join(` ${operator} `)}`;
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

        Object.values(obj).forEach(val => {
            queryValue.push(`'${val}'`);
        });

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
        operator = query['operator'];
        delete query['operator'];

        let whereQuery = [], setQuery = [];

        Object.entries(query).forEach(entry => {
            const [key, value] = entry;

            if (key.startsWith('where_')) {
                whereQuery.push(`${key.substring(6)} = '${value}'`);
            }
            else if (key.startsWith('set_')) {
                setQuery.push(`${key.substring(4)} = '${value}'`);
            }
        });

        if (typeof operator == 'undefined') {
            operator = 'AND';
        }

        updateQuery = `UPDATE ${table} SET ${setQuery.join(',')} WHERE ${whereQuery.join(` ${operator} `)}`;

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
        
        Object.entries(query).forEach(entry => {
            const [key, value] = entry;
            queryString.push(`${key} = '${value}'`)
        });

        if (typeof operator == 'undefined') {
            operator = 'AND';
        }

        deleteQuery = `DELETE FROM ${table} WHERE ${queryString.join(` ${operator} `)}`;

        pool.query(deleteQuery, (err, results) => {
            if (err) {
                return reject(err);
            }

            return resolve(results);
        });
    })
}

module.exports = kovfdb;