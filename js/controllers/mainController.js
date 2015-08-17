
mainApp.controller('main', function ($scope,$rootScope,$route,$window,$routeParams,dataContent) {
	var dataX,dataY;
	var ar1 = [];
	var ar3 = [];
	dataContent.getData()
	.success(function (data){
		dataX = data.xaxis_data;
		dataY = data.yaxis_data;
		loadEcharts();
		//rebuild array from data
		for(var i = 0;i<dataY.length;i++){
			ar1.push(dataY[i][0]);
			var ar2 = [];
			ar2.push(dataY[i][2],dataY[i][1],dataY[i][3]);
			ar3.push(ar2);
		}
		console.log(ar1);
		console.log(ar3);

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
		        /*subtext: '纯属虚构'*/
		    },
		    tooltip : {
		        trigger: 'item',
		    },
		    legend: {
		    	show: false,
		        data:['上证指数', /*'随机数据'*/]
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
		        start : 0,
		        end : 10
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
		myChart.setTheme('macarons'); //macarons,infographic
	}
	);
}

});



