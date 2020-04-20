
var https =require('https');
var fs =require('fs');

var privateKey  = fs.readFileSync('src/serverkey/private.key','utf8');
var certificate = fs.readFileSync('src/serverkey/certificate.crt');
var caBundle = fs.readFileSync('src/serverkey/ca_bundle.crt');






module.exports = {
    
    devServer: {
        disableHostCheck: true,
        host: '0.0.0.0',
        public: 'meisken.ddns.net:8081',   
        https:{
            key:privateKey,
            cert:certificate,
            ca:caBundle
        },
        /*
        hot: false,
        liveReload: false
        */
    },
    
    
   
}