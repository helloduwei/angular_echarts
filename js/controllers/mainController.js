
mainApp.controller('main', function ($scope,$rootScope,$route,$window,$routeParams,dataContent) {
	var datas = [];
	var ar_date = [];
	var ar_k = [];
	dataContent.getData()
	.success(function (data){
		
		datas = data.Table;
		//rebuild array from data
		for(var i = 0;i<datas.length;i++){
			ar_date.push(datas[i].交易日期);
			var ar_holder = [];
			ar_holder.push(datas[i].开盘价,datas[i].收盘价,datas[i].最低价,datas[i].最高价);
			ar_k.push(ar_holder);
		}
		/*console.log(ar_date);
		console.log(ar_k);*/
		loadEcharts(ar_date,ar_k);

	})
	.error(function (err){
		console.log(err)
	})

function loadEcharts(dataX,dataY){
	require.config({
		paths:{
			echarts:'http://echarts.baidu.com/build/dist'
		}
	});

	require(
	[
		'echarts',
		'echarts/chart/k',
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



