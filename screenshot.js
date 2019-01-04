const { parse } = require('url');
const { getScreenshot } = require('./chromium');
const { getInt, getUrlFromPath, isValidUrl } = require('./validator');

module.exports = async function (req, res) {
    try {
        const { pathname = '/', query = {} } = parse(req.url, true);
        const { width, height, deviceScaleFactor } = query;
        const url = getUrlFromPath(pathname);
        const w = getInt(width);
        const h = getInt(height);
        const scale = getInt(deviceScaleFactor);
        if (!isValidUrl(url)) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<h1>Bad Request</h1><p>The url <em>${url}</em> is not valid.</p>`);
        } else {
            console.log(query)
            const file = await getScreenshot(url, w, h, scale);
            res.statusCode = 200;
            res.setHeader('Content-Type', `image/png`);
            res.end(file);
        }
    } catch (e) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Server Error</h1><p>Sorry, there was a problem</p>');
        console.error(e.message);
    }
};
