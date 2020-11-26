const querystring = require("querystring");
const url = require("url");
const db = require("../db");

module.exports = {
    Select: async function(req, res, table) {
        try {
            parsedUrl = url.parse(req.url);
            parsedQuery = querystring.parse(parsedUrl.query, "&", "=")

            let results = await db.Select(table, parsedQuery);
            res.json(results);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    },
    Insert: async function(req, res, table) {
        try {
            parsedUrl = url.parse(req.url);
            parsedQuery = querystring.parse(parsedUrl.query, "&", "=")

            await db.Insert(table, parsedQuery);
            res.sendStatus(200);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    },
    Update: async function(req, res, table) {
        try {
            parsedUrl = url.parse(req.url);
            parsedQuery = querystring.parse(parsedUrl.query, "&", "=")

            await db.Update(table, parsedQuery);
            res.sendStatus(200);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    },
    Delete: async function(req, res, table) {
        try {
            parsedUrl = url.parse(req.url);
            parsedQuery = querystring.parse(parsedUrl.query, "&", "=")

            await db.Delete(table, parsedQuery);
            res.sendStatus(200);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
}