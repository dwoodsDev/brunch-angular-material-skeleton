describe('FlightDataController', function () {
  var FlightDataServiceMock,
    $rootScope,
    $q,
    $controller,
    FlightDataService;

  beforeEach(module('jaguarConfigPortal'));

  beforeEach(module(function($provide){
    FlightDataServiceMock = {};
    $provide.value('FlightDataService', FlightDataServiceMock);
  }));

  beforeEach(inject(function (_$controller_, _$rootScope_, _$q_, _FlightDataService_) {
    $rootScope = _$rootScope_;
    $q = _$q_;
    $controller = _$controller_;
    FlightDataService = _FlightDataService_;
  }));

  var createController = function() {
    $rootScope.$parent = {};

    return $controller('FlightDataController', {
      $scope: $rootScope
    });
  };

  describe('$scope.flightdata', function () {
    var fetchDeferred, flightDataModel = {};
    var channels = [
      {
        _id: 'rx1',
        enabled: true,
        label_filter: '125,260,252,56,204,310,311,312,320,213,270,74,75,113,300,301,302,303,304,305,306,307',
        parity: 'odd',
        promisc: true,
        speed: 'high'
      },
      {
        _id: 'rx2',
        enabled: false,
        label_filter: '',
        parity: 'even',
        promisc: false,
        speed: 'high'
      },
      {
        _id: 'rx3',
        enabled: false,
        label_filter: '',
        parity: 'none',
        promisc: false,
        speed: 'high'
      },
      {
        _id: 'rx4',
        enabled: false,
        label_filter: '',
        parity: 'none',
        promisc: false,
        speed: 'high'
      },
      {
        _id: 'rx5',
        enabled: false,
        label_filter: '',
        parity: 'none',
        promisc: false,
        speed: 'high'
      },
      {
        _id: 'rx6',
        enabled: false,
        label_filter: '',
        parity: 'none',
        promisc: false,
        speed: 'high'
      },
      {
        _id: 'rx7',
        enabled: false,
        label_filter: '',
        parity: 'none',
        promisc: false,
        speed: 'high'
      },
      {
        _id: 'tx1',
        enabled: false,
        parity: 'none',
        speed: 'high'
      },
      {
        _id: 'tx2',
        enabled: false,
        parity: 'none',
        speed: 'high'
      }
    ];
    var movingMaps= [
      {
        _id: 'acms',
        fixed_labels: '061,062,063'
      },
      {
        _id: 'air_temp',
        all_labels: '213,233',
        active_label: '213'
      },
      {
        _id: 'altitude',
        all_labels: '204',
        active_label: '204'
      },
      {
        _id: 'date',
        all_labels: '260',
        active_label: '260'
      },
      {
        _id: 'eta',
        all_labels: '056',
        active_label: '056'
      },
      {
        _id: 'fusion',
        fixed_labels: '223'
      },
      {
        _id: 'gama',
        fixed_labels: '074,075,113,300-307'
      },
      {
        _id: 'gmt',
        all_labels: '125,150',
        active_label: '150'
      },
      {
        _id: 'ground_speed',
        all_labels: '312,012',
        active_label: '312'
      },
      {
        _id: 'latitude',
        all_labels: '310,110,010',
        active_label: '310'
      },
      {
        _id: 'longitude',
        all_labels: '311,111,011',
        active_label: '311'
      },
      {
        _id: 'magnetic_heading',
        all_labels: '320,014',
        active_label: '014'
      },
      {
        _id: 'map',
        source: 'rs232',
        sources: 'a429,rs232'
      },
      {
        _id: 'origdest',
        source: 'fusion',
        sources: 'gama,acms,proline21,fusion'
      },
      {
        _id: 'proline21',
        fixed_labels: '361,362,365,366'
      },
      {
        _id: 'timetogo',
        all_labels: '002,252,352',
        active_label: '252'
      },
      {
        _id: 'wow',
        all_labels: '270',
        active_label: '270',
        bit: '15',
        active_when: '1'
      }
    ];
    var rs232 = [
      {
        _id: 'port1',
        device: '/dev/ttyUSB1',
        baud: '9600',
        bits: 8,
        parity: 'N',
        stop: 1
      }
    ];
    var wowMon = [
      {
        _id: 'wow',
        source: 'a429',
        sources: 'discrete,a429'
      }
    ];

    flightDataModel.channels = channels;
    flightDataModel.movingMaps = movingMaps;
    flightDataModel.rs232 = rs232;
    flightDataModel.wowMon = wowMon;

    beforeEach(function() {
      fetchDeferred = $q.defer();
      FlightDataServiceMock.fetch = function() {
        return fetchDeferred.promise;
      };
      createController();
    });

    describe('on success of FlightDataService #fetch()', function () {
      it('should set #flightData ', function() {
        expect($rootScope.flightData).to.be.undefined;

        fetchDeferred.resolve(flightDataModel);
        $rootScope.$apply();

        expect($rootScope.flightData).to.be.equal(flightDataModel);
      });

      it('should set #breadcrumb of the parent scope on success of FlightDataService #fetch()', function() {
        var parentScope = $rootScope.$parent;

        expect(parentScope.breadcrumb).to.be.undefined;

        fetchDeferred.resolve(flightDataModel);
        $rootScope.$apply();

        expect(parentScope.breadcrumb).to.equal('Flight Data');
      });
    });

    describe('on failure of FlightDataService #fetch()', function () {
      it('should not set #arinc when FlightDataService #fetch() fails', function () {
        fetchDeferred.reject();
        $rootScope.$apply();

        expect($rootScope.flightData).to.be.undefined;
      });
    });
  });
});
