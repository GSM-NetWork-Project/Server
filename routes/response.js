const querystring = require("querystring");
const url = require("url");
const db = require("../db");

module.exports = {
    Select: async function(req, res, table) {
        try {
            parsedUrl = url.parse(req.url);
            parsedQuery = querystring.parse(parsedUrl.query, "&", "=")

            let results = await db.Select(table, parsedQuery);
            
            if (results.length == 0) {
                throw 'selected zero rows';
            }

            res.json({
                status: 200,
                result: results
            });
        } catch (e) {
            console.log(e);

            res.json({
                status: 500
            });
        }
    },
    Insert: async function(req, res, table) {
        try {
            parsedUrl = url.parse(req.url);
            parsedQuery = querystring.parse(parsedUrl.query, "&", "=")

            await db.Insert(table, parsedQuery);

            res.json({
                status: 200
            });
        } catch (e) {
            console.log(e);
            
            res.json({
                status: 500
            });
        }
    },
    Update: async function(req, res, table) {
        try {
            parsedUrl = url.parse(req.url);
            parsedQuery = querystring.parse(parsedUrl.query, "&", "=")

            await db.Update(table, parsedQuery);
            
            res.json({
                status: 200
            });
        } catch (e) {
            console.log(e);
            
            res.json({
                status: 500
            });
        }
    },
    Delete: async function(req, res, table) {
        try {
            parsedUrl = url.parse(req.url);
            parsedQuery = querystring.parse(parsedUrl.query, "&", "=")

            let results = await db.Delete(table, parsedQuery);
            
            if (results['affectedRows'] == 0) {
                throw 'deleted zero rows'
            }

            res.json({
                status: 200
            });
        } catch (e) {
            console.log(e);

            res.json({
                status: 500
            });
        }
    }
}