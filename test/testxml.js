/**
 * @author: youxiachai
 * @Date: 13-6-30
 * @version: 1.0
 * To change this template use File | Settings | File Templates.
 */
var toJson = require('xmljson').to_json;
var fs = require('fs');

var request = require('request');
function testParse (string) {
//    var xmlString = fs.readFileSync('test.txt').toString();
//
//
//// An XML string
//    var xml = xmlString;

    toJson(string, function (error, data) {
        var newsroot =data.oschina;
//        console.log(newsroot);
//        console.log(newsroot.pagesize);
//        console.log(newsroot.newslist.news);
    console.log(JSON.stringify(data));
//    for(var i=0; i < 20; i++){
//       // var ii = '1';
//        console.log(data.oschina.newslist.news[''+i]);
//    }

//    for(var i : d)
    });
}

function testNewApi () {
    request('http://www.oschina.net/action/api/news_list', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // Print the google web page.
            testParse(body);
        }
    })
}

//testNewApi();

//testParse(fs.readFileSync('test.txt').toString());


//testParse(fs.readFileSync('dongtan').toString());

var object = function () {
    console.log('create');
    var i =0 ;

    return function (obj) {
        console.log('reuse');
        i = obj;
        return  i;
    };
}();

console.log(object(123));
console.log(object(123));