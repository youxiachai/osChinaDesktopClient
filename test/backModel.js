/**
 * @author: youxiachai
 * @Date: 13-7-4
 * @version: 1.0
 * To change this template use File | Settings | File Templates.
 */

var Backbone = require('backbone');
var _ = require('underscore');

var object = {};

_.extend(object, Backbone.Events);

object.on("alert", function(msg) {
    console.log("alert-->" + msg);
});

object.trigger("alert", "an event");
