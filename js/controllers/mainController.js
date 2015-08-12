
mainApp.controller('main', function ($scope,$rootScope,$route,$window,$routeParams,dataContent) {
	var dataX,dataY;
	dataContent.getData()
	.success(function (data){
		dataX = data.xaxis_data;
		dataY = data.yaxis_data;
		loadEcharts();
	})
	.error(function (err){
		console.log(err)
	})

function loadEcharts(){
	require.config({
		paths:{
			echarts:'http://echarts.baidu.com/build/dist'
		}
	});

	require(
	[
		'echarts',
		'echarts/chart/k',
		'echarts/chart/scatter'
	],
	function (ec){
		var myChart = ec.init(document.getElementById('main'));
		
		option = {
			backgroundColor:'#fff',
			color:'#730000',
			calculable:true,
		    title : {
		        text: '动态数据',
		        subtext: '纯属虚构'
		    },
		    tooltip : {
		        trigger: 'item',
		    },
		    legend: {
		        data:['上证指数', /*'随机数据'*/]
		    },
		    toolbox: {
		        show : true,
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
		        },
		        {
		            type : 'value',
		            max:100,
		            scale: true
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            scale:true,
		            splitNumber: 5,
		            boundaryGap: [0.05, 0.05]
		        },
		        {
		            type : 'value',
		            splitNumber: 5,
		            scale: true
		        }
		    ],
		    series : [
		        {
		            name:'上证指数',
		            type:'k',
		            data:dataY
		        }
		    ]
	};
		myChart.setOption(option);
		myChart.setTheme('');
	}
	);
}

});



