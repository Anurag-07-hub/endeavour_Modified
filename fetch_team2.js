import https from 'https';

https.get('https://www.endeavoursliet.in/static/js/main.42a9618c.js', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        // Find arrays with objects that look like team members
        const matches = data.match(/fullName:"([^"]+)"/g);
        if (matches) {
            console.log("Found matches with fullName:", matches.slice(0, 50));
        }
        const matches2 = data.match(/position:"([^"]+)"/g);
        if (matches2) {
            console.log("Found matches with position:", matches2.slice(0, 50));
        }
        
    });
});
