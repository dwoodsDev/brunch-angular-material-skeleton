order =
  before: [
    'vendor/scripts/angular-1.5.0.js',
    'vendor/scripts/angular-route-1.5.0.js'
  ]
  after: [
    'test/vendor/scripts/jquery-2.2.3.js',
    'test/vendor/scripts/require-2.2.0.js',
    'test/vendor/scripts/requireSetup.js',
    'test/vendor/scripts/mocha-2.4.5.js',
    'test/vendor/scripts/mochaSetup.js',
    'test/vendor/scripts/angular-mocks-1.4.7.js'
    'test/vendor/scripts/angular-material-mocks-1.0.7.js'
  ]

exports.config =
  sourceMaps: true

  paths:
    watched: ['app', 'test', 'vendor']
    public: 'public'

  conventions:
    vendor: /(^node_modules|vendor)[\\/]/

  files:
    javascripts:
      joinTo:
        'js/app.js': /^app/
        'js/vendor.js': /^(vendor)/
        'test/app.js': /^app/
        'test/js/test.js': /^test(\\|\/)(?!vendor)/
        'test/js/vendor.js': /^test(\\|\/)(?=vendor)/
      order: order


    stylesheets:
      joinTo:
        'css/app.css': /^app/
        'css/vendor.css': /^node_modules/


    templates:
      joinTo: 'js/app.js'

  modules:
    definition: 'commonjs',
    wrapper: false

  npm:
    styles:
      'angular-material': ['angular-material.css']

  plugins:
    stylus:
      includeCss: true

    uglify:
      sourceMaps: false

  overrides:
    test:
      files:
        javascripts:
          joinTo:
            'js/vendor.js': /^(vendor|node_modules)/
            'test/app.js': /^app/
            'test/js/test.js': /^test(\\|\/)(?!vendor)/
            'test/js/vendor.js': /^test(\\|\/)(?=vendor)/
          order: order

        stylesheets:
          joinTo:
            'test/css/vendor.css': /^test(\\|\/)(?=vendor)/
