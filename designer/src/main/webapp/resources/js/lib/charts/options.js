define(function(){
	var makeAllOptions = function(){
		var allOptions = {
            head: {
                version: 1.0,
                engine: "echarts",
                useMap: false
            },
            body: {
                data: [
                    {
                        id: "datasetOfBar",
                        layout: [
                            {
                                id: "bar01",
                                backgroundColor: "white",
                                title: {
                                    text: "各类型服装销量",
                                    subtext : "数据纯属虚构"
                                },
                                tooltip: {
                                    textStyle: {
                                        fontSize: "14"
                                    }
                                },
                                legend: {
                                    data: ['销量'],
                                    left: "100",
                                    top: "30",
                                    itemGap:10
                                },
                                toolbox: {
                                    feature: {
                                        saveAsImage: {}
                                    }
                                },
                                xAxis: [{
                                    data: ['衬衫','羊毛衫','雪纺衫','裤子','高跟鞋','袜子']
                                }],
                                yAxis: [{}],
                                series: [{
                                    label:{
                                        normal:{
                                            show:false
                                        }
                                    },
                                    name: '销量',
                                    type: 'bar',
                                    data: [5,20,36,10,10,20]
                                }]
                            },
                            {
                                id: "bar02",
                                backgroundColor: "white",
                                title: {
                                    text: "各浏览器占比"
                                },
                                tooltip : {
                                    trigger: 'axis',
                                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                    }
                                },
                                legend: {
                                    data:['邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他'],
                                    itemGap:10
                                },
                                toolbox: {
                                    feature: {
                                        saveAsImage: {}
                                    }
                                },
                                grid: {
                                    left: '3%',
                                    right: '4%',
                                    bottom: '3%',
                                    containLabel: true
                                },
                                xAxis : [
                                    {
                                        type : 'category',
                                        data : ['周一','周二','周三','周四','周五','周六','周日']
                                    }
                                ],
                                yAxis : [
                                    {
                                        type : 'value'
                                    }
                                ],
                                series : [
                                    {
                                        label:{
                                            normal:{
                                                show:false
                                            }
                                        },
                                        name:'邮件营销',
                                        type:'bar',
                                        stack: '广告',
                                        data:[120, 132, 101, 134, 90, 230, 210]
                                    },
                                    {
                                        label:{
                                            normal:{
                                                show:false
                                            }
                                        },
                                        name:'联盟广告',
                                        type:'bar',
                                        stack: '广告',
                                        data:[220, 182, 191, 234, 290, 330, 310]
                                    },
                                    {
                                        label:{
                                            normal:{
                                                show:false
                                            }
                                        },
                                        name:'视频广告',
                                        type:'bar',
                                        stack: '广告',
                                        data:[150, 232, 201, 154, 190, 330, 410]
                                    },
                                    {
                                        label:{
                                            normal:{
                                                show:false
                                            }
                                        },
                                        name:'百度',
                                        type:'bar',
                                        stack: '搜索引擎',
                                        data:[620, 732, 701, 734, 1090, 1130, 1120]
                                    },
                                    {
                                        label:{
                                            normal:{
                                                show:false
                                            }
                                        },
                                        name:'谷歌',
                                        type:'bar',
                                        stack: '搜索引擎',
                                        data:[120, 132, 101, 134, 290, 230, 220]
                                    },
                                    {
                                        label:{
                                            normal:{
                                                show:false
                                            }
                                        },
                                        name:'必应',
                                        type:'bar',
                                        stack: '搜索引擎',
                                        data:[60, 72, 71, 74, 190, 130, 110]
                                    },
                                    {
                                        label:{
                                            normal:{
                                                show:false
                                            }
                                        },
                                        name:'其他',
                                        type:'bar',
                                        stack: '搜索引擎',
                                        data:[62, 82, 91, 84, 109, 110, 120]
                                    }
                                ]
                            },
                            {
                                id: "bar03",
                                backgroundColor: "white",
                                title: {
                                    text: '世界人口总量',
                                    subtext: '数据来自网络'
                                },
                                tooltip: {
                                    trigger: 'axis',
                                    axisPointer: {
                                        type: 'shadow'
                                    }
                                },
                                legend: {
                                    data: ['2011年', '2012年']
                                },
                                toolbox: {
                                    feature: {
                                        saveAsImage: {}
                                    }
                                },
                                grid: {
                                    left: '3%',
                                    right: '4%',
                                    bottom: '3%',
                                    containLabel: true
                                },
                                xAxis: [{
                                    type: 'value',
                                    boundaryGap: [0, 0.01]
                                }],
                                yAxis: [{
                                    type: 'category',
                                    data: ['巴西','印尼','美国','印度','中国','世界人口(万)']
                                }],
                                series: [
                                    {
                                        label:{
                                            normal:{
                                                show:false
                                            }
                                        },
                                        name: '2011年',
                                        type: 'bar',
                                        data: [18203, 23489, 29034, 104970, 131744, 630230]
                                    },
                                    {
                                        label:{
                                            normal:{
                                                show:false
                                            }
                                        },
                                        name: '2012年',
                                        type: 'bar',
                                        data: [19325, 23438, 31000, 121594, 134141, 681807]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: "datasetOfLine",
                        layout: [
                            {
                                id: "line01",
                                backgroundColor: "white",
                                title: {
                                    text: '折线图堆叠'
                                },
                                tooltip: {
                                    trigger: 'axis'
                                },
                                legend: {
                                    data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
                                },
                                grid: {
                                    left: '3%',
                                    right: '4%',
                                    bottom: '3%',
                                    containLabel: true
                                },
                                toolbox: {
                                    feature: {
                                        saveAsImage: {}
                                    }
                                },
                                xAxis: [{
                                    type: 'category',
                                    boundaryGap: false,
                                    data: ['周一','周二','周三','周四','周五','周六','周日']
                                }],
                                yAxis: [{
                                    type: 'value'
                                }],
                                series: [
                                    {
                                        itemStyle: {
                                            normal: {
                                                opacity: 1
                                            }
                                        },
                                        label:{
                                            normal:{
                                                show:false
                                            }
                                        },
                                        name:'邮件营销',
                                        type:'line',
                                        stack: '总量',
                                        data:[120, 132, 101, 134, 90, 230, 210]
                                    },
                                    {
                                        itemStyle: {
                                            normal: {
                                                opacity: 1
                                            }
                                        },
                                        label:{
                                            normal:{
                                                show:false
                                            }
                                        },
                                        name:'联盟广告',
                                        type:'line',
                                        stack: '总量',
                                        data:[220, 182, 191, 234, 290, 330, 310]
                                    },
                                    {
                                        itemStyle: {
                                            normal: {
                                                opacity: 1
                                            }
                                        },
                                        label:{
                                            normal:{
                                                show:false
                                            }
                                        },
                                        name:'视频广告',
                                        type:'line',
                                        stack: '总量',
                                        data:[150, 232, 201, 154, 190, 330, 410]
                                    },
                                    {
                                        itemStyle: {
                                            normal: {
                                                opacity: 1
                                            }
                                        },
                                        label:{
                                            normal:{
                                                show:false
                                            }
                                        },
                                        name:'直接访问',
                                        type:'line',
                                        stack: '总量',
                                        data:[320, 332, 301, 334, 390, 330, 320]
                                    },
                                    {
                                        itemStyle: {
                                            normal: {
                                                opacity: 1
                                            }
                                        },
                                        label:{
                                            normal:{
                                                show:false
                                            }
                                        },
                                        name:'搜索引擎',
                                        type:'line',
                                        stack: '总量',
                                        data:[820, 932, 901, 934, 1290, 1330, 1320]
                                    }
                                ]
                            },
                            {
                                id: "line02",
                                backgroundColor: "white",
                                title: {
                                    text: '堆叠区域图'
                                },
                                tooltip : {
                                    trigger: 'axis'
                                },
                                legend: {
                                    data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
                                },
                                toolbox: {
                                    feature: {
                                        saveAsImage: {}
                                    }
                                },
                                grid: {
                                    left: '3%',
                                    right: '4%',
                                    bottom: '3%',
                                    containLabel: true
                                },
                                xAxis : [
                                    {
                                        type : 'category',
                                        boundaryGap : false,
                                        data : ['周一','周二','周三','周四','周五','周六','周日']
                                    }
                                ],
                                yAxis : [
                                    {
                                        type : 'value'
                                    }
                                ],
                                series : [
                                    {
                                        label:{
                                            normal:{
                                                show:false
                                            }
                                        },
                                        itemStyle: {
                                            normal: {
                                                opacity: 1
                                            }
                                        },
                                        name:'邮件营销',
                                        type:'line',
                                        stack: '总量',
                                        areaStyle: {normal: {}},
                                        data:[120, 132, 101, 134, 90, 230, 210]
                                    },
                                    {
                                        label:{
                                            normal:{
                                                show:false
                                            }
                                        },
                                        itemStyle: {
                                            normal: {
                                                opacity: 1
                                            }
                                        },
                                        name:'联盟广告',
                                        type:'line',
                                        stack: '总量',
                                        areaStyle: {normal: {}},
                                        data:[220, 182, 191, 234, 290, 330, 310]
                                    },
                                    {
                                        label:{
                                            normal:{
                                                show:false
                                            }
                                        },
                                        itemStyle: {
                                            normal: {
                                                opacity: 1
                                            }
                                        },
                                        name:'视频广告',
                                        type:'line',
                                        stack: '总量',
                                        areaStyle: {normal: {}},
                                        data:[150, 232, 201, 154, 190, 330, 410]
                                    },
                                    {
                                        label:{
                                            normal:{
                                                show:false
                                            }
                                        },
                                        itemStyle: {
                                            normal: {
                                                opacity: 1
                                            }
                                        },
                                        name:'直接访问',
                                        type:'line',
                                        stack: '总量',
                                        areaStyle: {normal: {}},
                                        data:[320, 332, 301, 334, 390, 330, 320]
                                    },
                                    {
                                        label:{
                                            normal:{
                                                show:false
                                            }
                                        },
                                        itemStyle: {
                                            normal: {
                                                opacity: 1
                                            }
                                        },
                                        name:'搜索引擎',
                                        type:'line',
                                        stack: '总量',
                                        label: {
                                            normal: {
                                                show: true,
                                                position: 'top'
                                            }
                                        },
                                        areaStyle: {normal: {}},
                                        data:[820, 932, 901, 934, 1290, 1330, 1320]
                                    }
                                ]
                            },
                            {
                                id: "line03",
                                backgroundColor: "white",
                                title: {
                                    text: '高度/气温变化图'
                                },
                                legend: {
                                    data:['高度(km)与气温(°C)变化关系']
                                },
                                tooltip: {
                                    trigger: 'axis',
                                    formatter: "Temperature : <br/>{b}km : {c}°C"
                                },
                                grid: {
                                    left: '3%',
                                    right: '4%',
                                    bottom: '3%',
                                    containLabel: true
                                },
                                toolbox: {
                                    feature: {
                                        saveAsImage: {}
                                    }
                                },
                                xAxis: [{
                                    type: 'value',
                                    axisLabel: {
                                        formatter: '{value} °C'
                                    }
                                }],
                                yAxis: [{
                                    type: 'category',
                                    axisLine: {onZero: false},
                                    axisLabel: {
                                        formatter: '{value} km'
                                    },
                                    boundaryGap: false,
                                    data: ['0', '10', '20', '30', '40', '50', '60', '70', '80']
                                }],
                                series: [
                                    {
                                        itemStyle: {
                                            normal: {
                                                opacity: 1
                                            }
                                        },
                                        label:{
                                            normal:{
                                                show:false
                                            }
                                        },
                                        name: '高度(km)与气温(°C)变化关系',
                                        type: 'line',
                                        smooth: true,
                                        lineStyle: {
                                            normal: {
                                                width: 3,
                                                shadowColor: 'rgba(0,0,0,0.4)',
                                                shadowBlur: 10,
                                                shadowOffsetY: 10
                                            }
                                        },
                                        data:[15, -50, -56.5, -46.5, -22.1, -2.5, -27.7, -55.7, -76.5]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: "datasetOfPie",
                        layout: [
                            {
                                id: "pie01",
                                backgroundColor: "white",
                                title : {
                                    text: '某站点用户访问来源',
                                    subtext: '纯属虚构',
                                    x:'center'
                                },
                                tooltip : {
                                    trigger: 'item',
                                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                                },
                                legend: {
                                    orient: 'vertical',
                                    left: 'left',
                                    data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                                },
                                toolbox: {
                                    feature: {
                                        saveAsImage: {}
                                    }
                                },
                                series : [
                                    {
                                        name: '访问来源',
                                        type: 'pie',
                                        radius : '55%',
                                        center: ['50%', '60%'],
                                        data:[
                                            {value:335, name:'直接访问'},
                                            {value:310, name:'邮件营销'},
                                            {value:234, name:'联盟广告'},
                                            {value:135, name:'视频广告'},
                                            {value:1548, name:'搜索引擎'}
                                        ],
                                        itemStyle: {
                                            emphasis: {
                                                shadowBlur: 10,
                                                shadowOffsetX: 0,
                                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                id: "pie02",
                                backgroundColor: "white",
                                title : {
                                    text: '某站点用户访问来源',
                                    subtext: '纯属虚构',
                                    x:'center'
                                },
                                tooltip: {
                                    trigger: 'item',
                                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                                },
                                legend: {
                                    orient: 'vertical',
                                    x: 'left',
                                    data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                                },
                                toolbox: {
                                    feature: {
                                        saveAsImage: {}
                                    }
                                },
                                series: [
                                    {
                                        name:'访问来源',
                                        type:'pie',
                                        radius: ['50%', '70%'],
                                        avoidLabelOverlap: false,
                                        label: {
                                            normal: {
                                                show: false,
                                                position: 'center'
                                            },
                                            emphasis: {
                                                show: true,
                                                textStyle: {
                                                    fontSize: '30',
                                                    fontWeight: 'bold'
                                                }
                                            }
                                        },
                                        labelLine: {
                                            normal: {
                                                show: false
                                            }
                                        },
                                        data:[
                                            {value:335, name:'直接访问'},
                                            {value:310, name:'邮件营销'},
                                            {value:234, name:'联盟广告'},
                                            {value:135, name:'视频广告'},
                                            {value:1548, name:'搜索引擎'}
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
		};
		
		return allOptions;
	};
    
	return {
        makeAllOptions : makeAllOptions
	};
});