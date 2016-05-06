 var authInterceptor = function ($q, $window, User) {
   return {
     request: function (config) {
       config.headers = config.headers || {};
       if ($window.sessionStorage.token) {
         config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
       }
       return config;
     },

     responseError: function (response) {
       if (response.status === 401) {
         response.data.error = "Login failed: Invalid username/password";
         $window.sessionStorage.clear();
         User.reset();
       }

       return response || $q.when(response);
     }
   };
 };

 angular.module('myModule').factory('authInterceptor', authInterceptor);
