'use strict';
var exec = require('child_process').exec;
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        watch: {
            run : {
                files: 'app.nw/*',
                tasks: ['run']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('default', ['watch']);

    grunt.registerTask('run', 'Run node-webkit app', function () {
        exec('nw app.nw');
    });

};
