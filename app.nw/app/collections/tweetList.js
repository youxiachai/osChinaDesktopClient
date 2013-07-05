/**
 * @author: youxiachai
 * @Date: 13-7-5
 * @version: 1.0
 * To change this template use File | Settings | File Templates.
 */


var app = app || {};


//'http://www.oschina.net/action/api/tweet_list?uid=0&pageIndex=' + pageIndex + '&pageSize=' + pageSize;
(function () {
    var refresh = function (model, options){
        var tweetsApi =  model.url(options.index, options.pageSize);
        console.log('read-->' + tweetsApi);
        $.get(tweetsApi, function (e) {
            console.log('ajax-->');
            var tweetCount = $(e).find('tweetCount').text();
            var tweets = new Array();
            $(e).find('tweet').each(function (index, element) {
                var tweet = {};
                tweet.id = $(element).find('id').text();
                tweet.portrait = $(element).find('portrait').text();
                tweet.author = $(element).find('author').text();
                tweet.autorid = $(element).find('authorid').text();
                tweet.body = $(element).find('body').text();
                tweet.commentCount = $(element).find('commentCount').text();
                tweet.commentCount = $(element).find('pubDate').text();
                tweet.imgSmall = $(element).find('imgSmall').text();
                tweet.imgBig = $(element).find('imgBig').text();
                //  console.log(tweet);
                tweets.push(tweet);
            });
            model.add(tweets);
            model.trigger(options.method);
        });
    };

    var loadMore = function (model, options){

    };

    var sync = function (method, model, options) {
        options || (options = {});
        console.log(options);
        console.log('TweetList.sync');
        switch (method) {
            case 'read':

                //动弹列表
                refresh(model, options);
                break;
        }
    };
    // Tweet list
    var TweetList = Backbone.Collection.extend({
        model: app.Tweet,
        url: function(pageIndex, pageSize){
            return'http://www.oschina.net/action/api/tweet_list?uid=0&pageIndex=' + pageIndex + '&pageSize=' + pageSize;
        },
        sync: sync
    });

    // Create our global collection of **Tweets**.
    app.tweetList = new TweetList();
})();