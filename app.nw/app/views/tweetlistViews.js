/**
 * @author: youxiachai
 * @Date: 13-7-5
 * @version: 1.0
 * To change this template use File | Settings | File Templates.
 */
var app = app || {};

(function ($) {

    app.TweetListView = Backbone.View.extend({
        el: $('body'),
        events: {
            'click ul#dongtanlist li a' : 'show'
        },
        // Cache the template function for a single item.
        template: _.template($('#tweet-template').html()),
        initialize: function () {
            //   this.listenTo(app.tweetList, 'all', this.render);
            this.listenTo(app.tweetList, 'refresh', this.render);
            this.listenTo(app.tweetList, 'loadMore', this.loadMore);
            app.tweetList.fetch({index: '0', pageSize: '20', method: 'refresh'});
        },
        render: function () {
            console.log('render' + app.tweetList.length);
            $('#dongtanlist').html(this.template({tweets: app.tweetList}));
            app.tweetList.reset();

        },
        loadMore: function () {
            console.log('loadMore-->' + app.tweetList.length);
            $('#dongtanlist').append(this.template({tweets: app.tweetList}));
            app.tweetList.reset();
        },
        show: function (e) {
//            console.log(e);
//            alert('show');
        }
    });
})(window.jQuery);