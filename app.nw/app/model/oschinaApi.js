/**
 * @author: youxiachai
 * @Date: 13-7-2
 * @version: 1.0
 * To change this template use File | Settings | File Templates.
 */

//动弹列表
var oscTweets = function ($, pageIndex, pageSize, temlp) {
//    'http://www.oschina.net/action/api/tweet_list?uid=0&pageIndex=0&pageSize=20'
    var tweetsApi = 'http://www.oschina.net/action/api/tweet_list?uid=0&pageIndex=' + pageIndex + '&pageSize=' + pageSize;
    $.get(tweetsApi, function (e) {
        var tweetCount = $(e).find('tweetCount').text();
        var tweets = new Array();
        $(e).find('tweet').each(function (index, element) {
//                console.log('' + index);
//                console.log($(element).find('id').text());
            var tweet = {};
            tweet.id = $(element).find('id').text();
            tweet.portrait = $(element).find('portrait').text();
            tweet.autor = $(element).find('author').text();
            tweet.autorid = $(element).find('authorid').text();
            tweet.body = $(element).find('body').text();
            tweet.commentCount = $(element).find('commentCount').text();
            tweet.commentCount = $(element).find('pubDate').text();
            tweet.imgSmall = $(element).find('imgSmall').text();
            tweet.imgBig = $(element).find('imgBig').text();
            //  console.log(tweet);
            tweets.push(tweet);
        });
        //  console.log(tweets);

        var itemTemplate = new EJS({url: temlp.url})
        if (temlp.update) {
            console.log('update' + temlp.update);
            console.log(itemTemplate.render({tweets: tweets, tweetCount: tweetCount }));
            var html = itemTemplate.render({tweets: tweets, tweetCount: tweetCount });
            $('#' + temlp.id).append(html);
        } else {
            document.getElementById(temlp.id).innerHTML = itemTemplate.render({tweets: tweets, tweetCount: tweetCount });
        }
    });
}
/**
 * 综合资讯
 * @param $
 * @param temlp
 */
var oscNewsList = function ($, temlp) {
    var newsApi = 'http://www.oschina.net/action/api/news_list';
    $.get(newsApi, function (data) {
        console.log(data);
        var catalog = $(data).find('catalog').text();
        var newsList = new Array();
        $(data).find('news').each(function (index, el) {
            var news = {};
            news.id = $(el).find('id').text();
            news.title = $(el).find('title').text();
            news.commentCount = $(el).find('commentCount').text();
            news.author = $(el).find('author').text();
            news.authorid = $(el).find('authorid').text();
            news.pubDate = $(el).find('pubData').text();
            news.newstype = {type: $(el).find('type').text(), authoruid2: $(el).find('authoruid2').text()};
            newsList.push(news);
        });
        console.log(newsList);


        var itemTemplate = new EJS({url: temlp.url})
        document.getElementById(temlp.id).innerHTML = itemTemplate.render({newsList: newsList});
    });
}

//http://www.oschina.net/action/api/news_detail


