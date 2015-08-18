
mainApp.factory('dataContent',['$http',function($http){
	return{

		getData:function(){
		return $http({
			method:'JSONP',
			url:'http://vpn.zealink.com/VDAL2?CodeID=StockMarket&Format=JSON&@沪深股票日行情=402447' + '&callback=JSON_CALLBACK'
		})},


		}
	}
])




