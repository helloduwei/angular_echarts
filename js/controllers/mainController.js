
mainApp.controller('main', function ($scope,$rootScope,$route,$window,$routeParams,dataContent) {
	$scope.loading = true;
	//refresh when device turn
	window.onorientationchange = function(){
		window.location.reload(true);
}
	//fetch data
	var datas = [],
		ar_date = [],
		ar_k = [],
		ar_num = [];
	var _code = '';
	dataContent.getData()
	.success(function (data){
		datas = data.Table;
		//rebuild array from data
		_code = datas[0].证券代码;
		for(var i = 0;i<datas.length;i++){
			ar_date.push(datas[i].交易日期);
			ar_num.push((datas[i].成交量)/10000);
			var ar_holder = [];
			ar_holder.push(parseFloat(datas[i].开盘价),parseFloat(datas[i].收盘价),parseFloat(datas[i].最低价),parseFloat(datas[i].最高价));
			ar_k.push(ar_holder);
		}
		loadEcharts(_code,ar_date,ar_k,ar_num);
		$scope.loading = false;
	})
	.error(function (err){
		console.log(err)
	})

	//require echarts
	function loadEcharts(title,dataX,data_k,data_num){
		require.config({
			paths:{
				echarts:'http://echarts.baidu.com/build/dist'
			}
		});

		require(
		[
			'echarts',
			'echarts/chart/bar',
			'echarts/chart/k',
		],
		function (ec){
			var myChart = ec.init(document.getElementById('main'));
			
			option = {
				calculable:false,
			    title : {
			        text: '证券代码：' + title,
			        x:'center',
			        y:'top'
			        /*subtext: '纯属虚构'*/
			    },
			    tooltip : {
			        trigger: 'item',
			    },
			    legend: {
			    	show: true,
			        data:['k线( 开/收/低/高 )', '成交量( /万 )'],
			        x:'center',
			        y:35
			    },
			    toolbox: {
			        show : false,
			        feature : {
			            mark : {show: true},
			            dataView : {show: true, readOnly: false},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    dataZoom : {
			        show : true,
			        realtime: true,
			        start : 50,
			        end : 100
			    },
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : true,
			            data : dataX
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            scale:true,
			            min:4,
			            splitNumber: 5,
			            boundaryGap: [0.05, 0.05]
			        },
			        {
			            type : 'value',
			            scale: true,
			            min:0,
			            max:200000,
			            boundaryGap: [0.05, 0.05] 
			        }
			    ],
			    series : [
			        {
			            name:'k线( 开/收/低/高 )',
			            type:'k',
			            data:data_k
			        },{
			            name:'成交量( /万 )',
			            type:'bar',
			            yAxisIndex:1,
			            data:data_num
			        }
			    ]
		};
			myChart.setOption(option);
			myChart.setTheme('macarons'); //macarons,infographic
		}
		);
	}

});



