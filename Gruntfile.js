/****************************************************************************
 * Copyright (C) 2015, bitmovin GmbH, All Rights Reserved
 *
 * Created on: 6/19/15
 * Author: Daniel Weinberger <daniel.weinberger@bitmovin.net>
 *
 * This source code and its use and distribution, is subject to the terms
 * and conditions of the applicable license agreement.
 ****************************************************************************/

module.exports = function(grunt) {
  var header = '/****************************************************************************\n' +
    '* Copyright (C) 2015, bitmovin GmbH, All Rights Reserved\n' +
    '*\n' +
    '* Author: Daniel Weinberger <daniel.weinberger@bitmovin.net>\n' +
    '*\n' +
    '* This source code and its use and distribution, is subject to the terms\n' +
    '* and conditions of the applicable license agreement.\n' +
    '****************************************************************************/\n';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    settings: grunt.file.readJSON('test/resources/settings.json'),

    concat: {
      options: {
        separator: '\n',
        banner: header + '\n(function(global) {\n',
        footer: '\n})(this);',
        stripBanners: true
      },
      debug: {
        src: [
          'src/RestClient.js',
          'src/Bitcodin.js',
          'src/Export.js'
        ],
        dest: 'bin/bitcodin.js'
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
            pattern: /'\{\{SETTINGS\}\}'/ig,
            replacement: '<%= JSON.stringify(settings) %>'
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
          ],
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'reports/coverage.json',
            report: [
              {
                type: 'lcov',
                options: {
                  dir: 'reports/coverage'
                }
              }, {
                type: 'text-summary'
              }
            ]
          },
          junit: {
            path: 'reports/junit'
          }
        }
      }
    },
    coveralls: {
      all: {
        src: 'reports/coverage/lcov.info'
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-coveralls');

  grunt.registerTask('test-with-coveralls', ['string-replace:insertApiKey', 'concat:debug', 'jasmine:dist', 'coveralls:all']);
  grunt.registerTask('test', ['string-replace:insertApiKey', 'concat:debug', 'jasmine:dist']);
};
