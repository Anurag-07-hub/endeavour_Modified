import https from 'https';
import fs from 'fs';

https.get('https://www.endeavoursliet.in/static/js/main.42a9618c.js', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        const match = data.match(/calibre of en.{0,200}/);
        if (match) {
            console.log(match[0].substring(0, 200));
        }
    });
});
