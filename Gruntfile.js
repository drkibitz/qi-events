"use strict";

module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            test: ['Gruntfile.js', 'Events.js', 'test/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        jsdoc: {
            all: {
                src: ['package.json', 'README.md', 'Events.js'],
                dest: 'build/artifacts/api'
            }
        },
        simplemocha: {
            test: { src: ['test/**/*.js'] }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-simple-mocha');

    grunt.registerTask('doc', ['jsdoc']);
    grunt.registerTask('test', ['jshint', 'simplemocha']);
    grunt.registerTask('default', ['test', 'doc']);
};
