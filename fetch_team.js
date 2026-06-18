import https from 'https';

https.get('https://www.endeavoursliet.in/static/js/main.42a9618c.js', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        let members = [];
        const regex = /{"name":"([^"]+)","position":"([^"]+)"(?:,"image":"([^"]*)")?(?:,"email":"([^"]*)")?(?:,"linkedin":"([^"]*)")?}/g;
        let match;
        while ((match = regex.exec(data)) !== null) {
            members.push({name: match[1], position: match[2], image: match[3], email: match[4], linkedin: match[5]});
        }
        
        console.log("Team members list:");
        console.log(JSON.stringify(members, null, 2));
    });
});
