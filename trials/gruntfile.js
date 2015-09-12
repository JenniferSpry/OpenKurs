'use strict';
var mountFolder = function(connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var projectConfig = {
    app: 'app',
    dist: 'dist',//distribution
    tmp: '.tmp'
  };

  // Project configuration.
  grunt.initConfig({
    project: projectConfig,
    pkg: grunt.file.readJSON('package.json'), //package.json inhalte laden zum so nutzen: <%= pkg.name %>
    tag: {
      banner: '/*!\n' +
      ' * <%= pkg.name %>\n' +
      ' * <%= pkg.title %>\n' +
      ' * @author <%= pkg.author %>\n' +
      ' * @version <%= pkg.version %>\n' +
      ' */\n'
    },
    /** tasks **/
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: [
          'Gruntfile.js', 
          '<%= project.app %>/js/**/*.js'
        ],
        tasks: ['jshint', 'jscs']
      },
      sass: { // wenn sich ein sass file ändert, führe sass:dev aus
        files: '<%= project.app %>/css/**/*.scss',
        tasks: ['sass:dev']
      },
      bower: {
        files: '<%= project.app %>/bower.json',
        tasks: ['wiredep']
      },
      html: {
        files: ['<%= project.app %>/**/*.html']
      }
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= project.app %>'
          ]
        }
      }
    },
    clean: { // ordner/ dateien löschen
      dist: {
        files: [{
          dot: true,
          src: [
          '.tmp',
          '<%= project.dist %>/*',
          '!<%= project.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      all: [
        'Gruntfile.js',
        '<%= project.app %>/js/{,*/}*.js', 
        '!<%= project.app %>/js/analytics.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    jscs: {
      src: [
        'Gruntfile.js', 
        '<%= project.app %>/js/{,*/}*.js', 
        '!<%= project.app %>/js/analytics.js'],
      options: {
        config: '.jscsrc'
      }
    },
    sass: { // einzelne scss files in style includen
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          '<%= project.app %>/css/style.css': '<%= project.app %>/css/style.scss'
        }
      },
      dist: {
        options: {
          style: 'expanded'//,
          //banner: '<%= tag.banner %>'
        },
        files: {
          '<%= project.dist %>/css/style.css': '<%= project.app %>/css/style.scss'
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= project.app %>',
          dest: '<%= project.dist %>',
          src: [
            '*.html',
            'fonts/**/*.*',
            'img/{,*/}*.*',
            'js/**/*.html'
          ]
        }]
      }
    },
    useminPrepare: {
      html: '<%= project.app %>{,*/}*.html',
      options: {
        dest: '<%= project.dist %>'
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      // dist configuration is provided by useminPrepare
      dist: {}
    },
    cssmin: {
      dist: {
        files: {
          '<%= project.dist %>/css/style.css': ['<%= project.dist %>/css/style.css']
        }
      }
    },
    ngAnnotate: {
      app: {
        files: {
          '<%= project.tmp %>/concat/js/app.js': ['<%= project.tmp %>/concat/js/app.js']
        }
      }
    },
    uglify: {
      options: {
        banner: '<%= tag.banner %>'
      },
      // dist configuration is provided by useminPrepare
      dist: {}
    },
    filerev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 10
      },
      assets: {
        files: [{
          src: [
            //'<%= project.dist %>/img/*.{jpg,jpeg,gif,png,svg,ico}',
            '<%= project.dist %>/js/*.js',
            '<%= project.dist %>/css/*.css'
            ]
        }]
      }        
    },
    usemin: {
      html: ['<%= project.dist %>/**/*.html'],
      options: {
        basedir: '<%= project.dist %>',
        dirs: ['<%= project.dist %>']
      }
    },
    wiredep: { // import bower sources into index.html
      app: {
        src: '<%= project.app %>/index.html',
        exclude: ['bower_components/bootstrap-sass-official/assets/javascripts']
      }
    }
  });

  grunt.registerTask('serve', [
    'sass:dev', // css minifizieren und in dist/css speichern
    'clean:server', // .tmp files löschen
    'connect:livereload',
    'watch'
    ]);

  grunt.registerTask('build', [
    'clean:dist', // dist ordner leeren
    'jshint', // js files auf fehler prüfen
    'copy', // copy alles nicht anderweitig behandelte
    'sass:dist', // css minifizieren und in dist/css speichern
    //'uncss', // remove unused css
    'useminPrepare',
    'concat:generated', // css files concatinieren nach useminPrepare vorgaben; in .tmp/concat/js/app.js speichen
    'cssmin:dist',
    'ngAnnotate', // angular safe minimier vorbehandlung
    'uglify:generated', // js-dateien in dist optimieren
    'filerev', // name files with hash
    'usemin',
    'clean:server'
    ]);

  grunt.registerTask('default', ['build']);

};
