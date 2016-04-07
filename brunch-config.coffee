order =
  # NOTE: djw - Order is important here!
  before: [
    "vendor/scripts/angular-1.4.7.js",
    "vendor/scripts/angular-route-1.4.7.js"
    "vendor/scripts/jquery-1.11.0.js",
    "vendor/scripts/underscore-1.5.2.js",
    "vendor/scripts/require-2.1.10.js",
    "vendor/scripts/gogo-require.js"
  ]
  after: [
    "test/vendor/scripts/mochaSetup.js",
    "test/vendor/scripts/angular-mocks-1.4.7.js"
  ]

exports.config =
  sourceMaps: true

  server:
    path: "server/Server.js"

  paths:
    watched: ["app", "test", "vendor"]
    public: "public"

  files:
    javascripts:
      joinTo:
        "js/app.js": /^app/
        "js/vendor.js": /^vendor/
        "test/app.js": /^app/
        "test/js/test.js": /^test(\\|\/)(?!vendor)/
        "test/js/vendor.js": /^test(\\|\/)(?=vendor)/
      order: order


    stylesheets:
      joinTo:
        "css/vendor.css": /^vendor/
        "css/app.css": /^app/


    templates:
      joinTo: "js/app.js"

  modules:
    definition: false
    wrapper: false

  plugins:
    autoReload:
          enabled:
              js: on
              css: on
              assets: on

    jshint:
      pattern: /^app(\\|\/).*\.js$/
      options:
        bitwise: true
        camelcase: false
        curly: true
        eqeqeq: true
        forin: true
        freeze: true
        immed: true
        indent: 2
        latedef: true
        maxlen: 120
        newcap: true
        noarg: true
        noempty: true
        nonew: true
        onevar: true
        quotmark: "single"
        sub: true
        trailing: true
        undef: true
        unused: true
        white: true
      globals:
        angular: true
        require: true
        module: true

    uglify:
      sourceMaps: false

  overrides:
    test:
      files:
        javascripts:
          joinTo:
            "js/vendor.js": /^vendor/
            "test/app.js": /^app/
            "test/js/test.js": /^test(\\|\/)(?!vendor)/
            "test/js/vendor.js": /^test(\\|\/)(?=vendor)/
          order: order

        stylesheets:
          joinTo:
            "test/css/vendor.css": /^test(\\|\/)(?=vendor)/

      plugins:
        jshint:
          pattern: /^test(\\|\/)(?!vendor).*\.js$/
          options:
            bitwise: true
            camelcase: false
            curly: true
            eqeqeq: true
            expr: true
            forin: true
            freeze: true
            immed: true
            indent: 2
            latedef: true
            maxlen: 120
            newcap: true
            noarg: true
            noempty: true
            nonew: true
            onevar: true
            phantom: true
            quotmark: "single"
            sub: true
            trailing: true
            undef: true
            unused: true
            white: true
          globals:
            afterEach: true
            angular: true
            beforeEach: true
            describe: true
            expect: true
            inject: true
            it: true
            mocha: true
            require: true
            sinon: true
