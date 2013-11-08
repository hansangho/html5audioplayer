module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat:{
      options: {
        separator: ';',
        stripBanners: true,
        banner: '/* update: <%= grunt.template.today("yyyy-mm-dd HH:MM:ss TT") %> */\n'
      },
      dist: {
        src: ['src/util.js', 'src/<%= pkg.name %>.js'],
        dest: 'build/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '/*!\n'+
                '	project: <%= pkg.name %>\n'+
                '	update: <%= grunt.template.today("yyyy-mm-dd HH:MM:ss TT") %>\n'+
                '	author: <%= pkg.author %>\n'+
                '*/\n'
      },
      dist: {
        files: {
          'build/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>'],
          'examples/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    jshint: {
    }

  });

  for (var key in grunt.file.readJSON("package.json").devDependencies) {
    if (key !== "grunt" && key.indexOf("grunt") === 0) grunt.loadNpmTasks(key);
  }

  grunt.registerTask('default', ['concat', 'uglify']);

};