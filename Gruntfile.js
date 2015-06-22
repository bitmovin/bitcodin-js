/****************************************************************************
 * Copyright (C) 2015, bitmovin GmbH, All Rights Reserved
 *
 * Created on: 6/19/15
 * Author: Reinhard Grandl   <reinhard.grandl@bitmovin.net>
 *         Daniel Weinberger <daniel.weinberger@bitmovin.net>
 *
 * This source code and its use and distribution, is subject to the terms
 * and conditions of the applicable license agreement.
 ****************************************************************************/

module.exports = function(grunt) {
  var header = '/****************************************************************************\n' +
    '* Copyright (C) 2015, bitmovin GmbH, All Rights Reserved\n' +
    '*\n' +
    '* This source code and its use and distribution, is subject to the terms\n' +
    '* and conditions of the applicable license agreement.\n' +
    '****************************************************************************/\n';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    settings: grunt.file.readJSON('test/resources/settings.json'),

    concat: {
      options: {
        separator: ';\n',
        banner: header + '\n(function(global) {\n',
        footer: 'global.BitcodinApi = BitcodinApi;\n})(this);',
        stripBanners: true
      },
      debug: {
        src: 'src/**/*.js',
        dest: 'debug/<%= pkg.name %>.js'
      }
    },
    watch: {
      local: {
        files: [
          'src/**/*.*',
          'test/**/*.*',
          '!node_modules/**',
          '!_SpecRunner.html'
        ],
        options: {
          livereload: true
        },
        tasks: ['test']
      }
    },
    'string-replace': {
      insertApiKey: {
        files: {
          'dist/': [
            'test/**'
          ]
        },
        options: {
          replacements: [{
            pattern: /\{\{API_KEY\}\}/ig,
            replacement: '<%= settings.apikey %>'
          }]
        }
      }
    },
    jasmine: {
      app: {
        src: [
          'src/**/*.js'
        ],
        options: {
          helpers: 'test/helpers/**/*.js',
          specs: 'test/**/*Spec.js',
          outfile: 'test/SpecRunner.html',
          keepRunner: true,
          polyfills: [
            'libs/es6-promise.js'
          ]
        }
      },
      dist: {
        src: [
          'src/**/*.js'
        ],
        options: {
          helpers: 'dist/test/helpers/**/*.js',
          specs: 'dist/test/**/*Spec.js',
          outfile: 'dist/test/SpecRunner.html',
          keepRunner: true,
          polyfills: [
            'libs/es6-promise.js'
          ]
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-string-replace');

  grunt.registerTask('test', ['string-replace:insertApiKey', 'concat:debug', 'jasmine:dist']);
};
