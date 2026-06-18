import https from 'https';

https.get('https://www.endeavoursliet.in/images/sliet.png', (res) => {
    console.log("sliet.png status:", res.statusCode);
});
https.get('https://www.endeavoursliet.in/images/sliet_logo.png', (res) => {
    console.log("sliet_logo.png status:", res.statusCode);
});
https.get('https://www.endeavoursliet.in/images/Sliet_logo.png', (res) => {
    console.log("Sliet_logo.png status:", res.statusCode);
});
https.get('https://www.endeavoursliet.in/images/Sliet_Logo.png', (res) => {
    console.log("Sliet_Logo.png status:", res.statusCode);
});
