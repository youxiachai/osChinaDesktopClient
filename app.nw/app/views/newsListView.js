/**
 * @author: youxiachai
 * @Date: 13-7-5
 * @version: 1.0
 * To change this template use File | Settings | File Templates.
 */
var app = app || {};


(function ($) {

    // type = 3 为博客
// type = 0 为新闻
    var oscDetails = function (newsData, callback) {
        var detail = '';
        var newsType = newsData.newstype;
        console.log(newsType);
        if (newsType.type === '0') {
            detail = 'http://www.oschina.net/action/api/news_detail?id=' + newsData.id;
        } else if (newsType.type === '3') {
            detail = 'http://www.oschina.net/action/api/blog_detail?id' + newsType.authoruid2;
        }
        console.log(detail);

        $.get(detail, callback);
    };

    app.NewsListView = Backbone.View.extend({
        el: $('body'),
        events: {
            'click ul#newslist2 li a': 'newsDetail'
        },
        // Cache the template function for a single item.
        template: _.template($('#newsList-template').html()),
        initialize: function () {
            //   this.listenTo(app.tweetList, 'all', this.render);
            this.listenTo(app.newsList, 'refresh', this.render);
            // this.listenTo(app.newsList, 'loadMore', this.loadMore);
            app.newsList.fetch({method: 'refresh'});
        },
        render: function () {
            console.log('render' + app.tweetList.length);
            $('#newslist2').html(this.template({newsList: app.newsList}));
            app.newsList.reset();

        },
        loadMore: function () {
            console.log('loadMore-->' + app.tweetList.length);
            $('#newslist2').append(this.template({newsList: app.newsList}));
            app.newsList.reset();
        },
        newsDetail: function (e) {
            e.preventDefault();
            var pos = this.$el.css('background-position').split(" ");
            console.log(pos);
            if (pos[0] === '0%' || pos[0] === '0' || pos[0] === '0px') {
                $('#panorama-scroll-next').click();
            }
            var newsId = $(e.currentTarget).attr('href')
            var newsData = JSON.parse(newsId);
            console.log(newsData);
            oscDetails(newsData, function (e) {
                var body = $(e).find('body').text();
                $('#newsDetail2').html(body);
            });
        }
    });
})(window.jQuery);