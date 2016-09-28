(function () {
  'use strict';

  angular
    .module('quiz')
    .service('QuizService', QuizService);

  // var url = '/api/quiz';
  var url = 'quizList.json';
  QuizService.$inject = ['$http', '$q'];

  function QuizService($http, $q) {
    return {
      getQuizzes: getQuizzes,
      getQuiz: getQuiz
    };

    // returns a list of all of the quizzes
    function getQuizzes() {
      var deferred = $q.defer();

      $http.get(url).then(
        function (response) {
          deferred.resolve(response.data);
        },
        function (response) {
          console.log("Error: status = " + response.status  + ", " + response.statusText);
          deferred.reject(response);
        });
      return deferred.promise;
    }

    // returns a quiz
    function getQuiz(id) {
      // kids, don't do this at home this was a bad way to pull one quiz and not have to use mockHTTP
      var myUrl = url + '?q=' + id;
      var deferred = $q.defer();

      $http.get(myUrl).then(
        function (response) {
          // this is very brittle code
          var id = +response.config.url.split("=")[1];
          // using filter instead of find since find() is ES6 and may not be available
          deferred.resolve(response.data.filter(function(a){ return a._id == id})[0]);
        },
        function (response) {
          console.log("Error: status = " + response.status  + ", " + response.statusText);
          deferred.reject(response);
        });
      return deferred.promise;
    }
  }
}());