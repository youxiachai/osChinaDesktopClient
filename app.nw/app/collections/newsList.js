/**
 * @author: youxiachai
 * @Date: 13-7-5
 * @version: 1.0
 * To change this template use File | Settings | File Templates.
 */


var app = app || {};


//'http://www.oschina.net/action/api/tweet_list?uid=0&pageIndex=' + pageIndex + '&pageSize=' + pageSize;
(function () {
    var refresh = function (model, options) {
        var newsApi = model.url;
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
            model.add(newsList);
            model.trigger(options.method);
        });
    };


    var sync = function (method, model, options) {
        options || (options = {});
        console.log(options);
        console.log('NewsList.sync');
        switch (method) {
            case 'read':
                //综合资讯列表
                refresh(model, options);
                break;
        }
    };
    // News list
    var NewsList = Backbone.Collection.extend({
        model: app.News,
        url: 'http://www.oschina.net/action/api/news_list',
        sync: sync
    });

    // Create our global collection of **Tweets**.
    app.newsList = new NewsList();
})();