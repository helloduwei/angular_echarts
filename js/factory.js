
mainApp.factory('dataContent',['$http',function($http){
	return{

		getData:function(){
		return $http({
			method:'get',
			url:'data.json'
		})},


		}
	}
])




