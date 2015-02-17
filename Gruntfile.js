'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      all: {
        files: [
          {
            expand: true, cwd: 'bower_components/backbone',
            src: ['backbone.js'], dest: 'public/lib'
          },
          {
            expand: true, cwd: 'bower_components/handlebars.js/lib',
            src: ['handlebars.js'], dest: 'public/lib'
          },
          {
            expand: true, cwd: 'bower_components/underscore',
            src: ['underscore.js'], dest: 'public/lib'
          }
        ]
      }
    },
    clean: {
      lib: {
        src: [
          'public/lib',
          'public/css/lib'
        ]
      }
    },
    watch: {
      js: {
        files: ['Gruntfile.js', 'app.js', 'app/**/*.js', 'public/js/**', 'test/**/*.js'],
        tasks: ['jshint'],
        options: {
          livereload: {
            port: 9000
          }        
        }
      },
      html: {
        files: ['public/views/**', 'app/views/**'],
        options: {
          livereload: {
            port: 9000
          }
        }
      },
      css: {
        files: ['public/css/**'],
        options: {
          livereload: {
            port: 9000
          }     
        }
      }
    },
    jshint: {
      all: {
        src: ['Gruntfile.js', 'app/**/*.js', 'app/**/**/*.js', 'app/**/**/**/*.js','public/js/**'],
        options: {
            jshintrc: true
        }
      }
    },
    nodemon: {
      app: {
        script: 'app/app/app.js',
        options: {
          args: [],
          ext: 'js',
          delayTime: 1,
          env: {
            dev: {
              NODE_ENV: 'development',
              PORT: 3000
            }
          },
          cwd: __dirname
        }
      },
      api: {
        script: 'app/api/app.js',
        options: {
          args: [],
          ext: 'js',
          delayTime: 1,
          env: {
            dev: {
              NODE_ENV: 'development',
              PORT: 3001
            }
          },
          cwd: __dirname
        }
      },
    },
    concurrent: {
      app: {
        tasks: ['nodemon:app'],
        options: {
          logConcurrentOutput: true
        }
      },
      api: {
        tasks: ['nodemon:api', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
      
    },
    mochaTest: {
      options: {
        reporter: 'spec',
        require: 'app.js'
      },
      src: ['test/mocha/**.js', 'app/controllers/order.js']
    },
    env: {
      dev: {
        NODE_ENV: 'development'
      },
      test: {
        NODE_ENV: 'test',
        MONGODB_URI: 'localhost/rendr-test'
      }
    },
    handlebars: {
      compile: {
        options: {
          namespace: false,
          commonjs: true,
          processName: function(filename) {
            return filename.replace('app/templates/', '').replace('.hbs', '');
          }
        },
        src: "app/templates/**/*.hbs",
        dest: "app/templates/compiledTemplates.js",
        filter: function(filepath) {
          var filename = path.basename(filepath);
          // Exclude files that begin with '__' from being sent to the client,
          // i.e. __layout.hbs.
          return filename.slice(0, 2) !== '__';
        }
      }
    },
    
    browserify: {
      options: {
        debug: true,
        alias: [
          'node_modules/rendr-handlebars/index.js:rendr-handlebars'
        ],
        aliasMappings: [
          {
            cwd: 'app/',
            src: ['**/*.js'],
            dest: 'app/'
          }
        ],
        shim: {
          jquery: {
            path: 'assets/vendor/jquery-1.9.1.min.js',
            exports: '$'
          }
        }
      },
      app: {
        src: [ 'app/**/*.js' ],
        dest: 'public/mergedAssets.js'
      },
      tests: {
        src: [
          'test/helper.js',
          'test/app/**/*.js'
        ],
        dest: 'public/testBundle.js'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-env');

  // Making grunt default to force in order not to break the project.
  grunt.option('force', true);

  // app task(s).
  grunt.registerTask('app', ['clean:lib', 'copy:all', 'env:dev', 'jshint', 'concurrent:app']);

  // api task(s).
  grunt.registerTask('api', ['clean:lib', 'copy:all', 'env:dev', 'jshint', 'concurrent:api']);
};
