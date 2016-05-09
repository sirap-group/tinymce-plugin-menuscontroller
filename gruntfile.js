module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt)

  grunt.initConfig({
    standard: {
      options: { format: false },
      gruntfile: { src: ['gruntfile.js'] },
      js: { src: ['plugin.js'] }
    },
    uglify: {
      dist: { files: { 'plugin.min.js': ['plugin.js'] } }
    },
    watch: {
      package: {
        files: 'package.json',
        options: { reload: true }
      },
      gruntfile: {
        files: 'gruntfile.js',
        tasks: ['standard:gruntfile'],
        options: {reload: true}
      },
      js: {
        files: ['plugin.js'],
        tasks: ['standard:js'],
        options: {reload: true}
      }
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json', 'bower.json'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: false,
        regExp: false
      }
    }
  })

  grunt.registerTask('default', ['standard', 'watch'])
  grunt.registerTask('build', ['standard', 'uglify'])
}
