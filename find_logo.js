import https from 'https';

https.get('https://www.endeavoursliet.in/', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        let imgMatches = data.match(/<img[^>]*>/g);
        console.log("Images found:", imgMatches);
        
        let slietMatches = data.match(/[^"]*sliet[^"]*\.(png|jpg|jpeg|svg|gif|webp)/gi);
        console.log("Potential sliet images:", slietMatches);
    });
});
