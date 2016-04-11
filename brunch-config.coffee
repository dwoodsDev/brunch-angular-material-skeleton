order =
  after: [
    'test/vendor/scripts/mochaSetup.js',
    'test/vendor/scripts/angular-mocks-1.4.7.js'
  ]

exports.config =
  sourceMaps: true

  server:
    path: 'server/Server.js'

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
    definition: false,
    wrapper: false

  npm:
    styles:
      'angular-material': ['angular-material.css']

  plugins:
    babel:
      presets: ['es2015']

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

      modules:
        definition: false,
        wrapper: false

      npm:
        styles:
          mocha: ['mocha.css']

        stylus:
          includeCss: true
