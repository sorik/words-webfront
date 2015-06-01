/* global require, module */

module.exports = function(grunt) {
  'use strict';

  grunt.initConfig ({
    ngconstant: {
      options: {
        name: 'config',
        dest: 'src/scripts/config.js'
      },
      dist: {
        constants: {
          NEWS_SERVER: {
            uri: 'http://news-server',
            port: 8005
          }
        }
      },
      local: {
        constants: {
          NEWS_SERVER: {
            uri: 'http://localhost',
            port: 8005
          }
        }
      },
      build: {

      }
    },
    run: {
      app: {
        args: [
          'src/app.js'
        ],
        options: {
          wait: false
        }
      }
    },
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['bower:install']
      },
      jsTest: {
        files: ['tests/unit/{,**/}*.js'],
        tasks: ['jshint:test', 'karma:unit']
      }
    },
    bower: {
      install: {
        options: {
          copy: false,
          verbose: true
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      source: {
        src: ['gruntfile.js', './src/scripts/{,*/}*.js', './src/database/{,*/}*.js']
      },
      test: {
        options: {
          jshintrc: './tests/.jshintrc'
        },
        src: ['./tests/{,**/}*.js']
      }
    },
    clean: {
      config: {
        src: ['src/scripts/config.js']
      },
      dist: {
        src: ['.tmp', 'dist/{,*/}*']
      }
    },
    useminPrepare: {
      html: 'src/index.html',
      options: {
        dest: 'dist',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },
    usemin: {
      html: ['dist/{,*/}*.html'],
      css: ['dist/styles/{,*}*.css']
    },
    concurrent: {
      dist: [
        'buildJs',
        'buildCss'
      ]
    },
    copy: {
      preDist: {
        expand: true,
        cwd: 'src/',
        src: 'styles/{,*/}*.css',
        dest: '.tmp/'
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['*.html', '{,**/}*.html'],
            dest: 'dist/'
          }
        ]
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        files: {
          'dist/scripts/scripts.js': ['src/scripts/{,*/}*.js'],
          'dist/scripts/vendor.js': ['bower_components/{,*/}*.js']
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! scripts <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'dist/scripts/',
            src: '*.js',
            dest: 'dist/scripts/'
          }
        ]
      }
    },
    autoprefixer: {
      options: {
        browers: ['last 1 versions']
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '.tmp/styles/',
            src: '{,*/}*.css',
            dest: '.tmp/styles/'
          }
        ]
      }
    },
    cssmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '.tmp/styles/',
            src: '{,*/}*.css',
            dest: 'dist/styles/'
          }
        ]
      }
    },
    filerev: {
      dist: {
        src: [
          'dist/scripts/{,*/}*.js',
          'dist/styles/{,*/}*.css',
        ]
      }
    },
    karma: {
      unit: {
        configFile: 'tests/karma.conf.js',
        singleRun: true
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('config-local',
    ['clean:config', 'ngconstant:local']);

  grunt.registerTask('config-dist',
    ['clean:config', 'ngconstant:dist']);

  grunt.registerTask('buildJs',
    ['useminPrepare', 'concat', 'uglify']);

  grunt.registerTask('buildCss',
    ['useminPrepare', 'autoprefixer', 'cssmin']);

  grunt.registerTask('serve-local',
    ['bower:install', 'jshint:source', 'config-local', 'run:app', 'watch']);

  grunt.registerTask('serve',
    ['bower:install', 'jshint:source', 'run:app', 'watch']);

  grunt.registerTask('test',
    ['jshint:test', 'config-local', 'karma:unit']);

  grunt.registerTask('build',
    ['jshint:source', 'bower:install', 'config-dist', 'clean:dist', 'copy:preDist', 'concurrent:dist', 'copy:dist', 'filerev', 'usemin']);
};
