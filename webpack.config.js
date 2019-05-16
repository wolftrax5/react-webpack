/*
 *  This step is to define what build process webpack will use.
 *  This depend on the mode defined on the scripts, it can be: 
 *  --mode production
 *  --mode development
 * 
 */

 function webpackConfiguration(env) {
     if(env === 'production' || env === 'development') {
         // This will require the config file. I.E. ./production.config.js
         return require('./' + env + '.config.js');
     }
     else {
         console.log('The environment can only be "production" or "development", ' + env + ' is not defined');
     }
 }
 
 module.exports = webpackConfiguration;