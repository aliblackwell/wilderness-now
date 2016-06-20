module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    respimg: {
      default: {
        files: [{
          expand: true,
          cwd: 'cdn/test',
          src: ['**.jpg'],
          dest: 'cdn_for_upload/activities/'
          }]
        }
      }
  });

  grunt.loadNpmTasks('grunt-respimg');

  grunt.registerTask('default', ['respimg']);
};

