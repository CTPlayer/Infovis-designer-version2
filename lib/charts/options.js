define(function(){
	var makeBar01 = function(){
		var option = {
				title: {
				text: "各类型服装销量",
				 x:'center'
				},
				tooltip: {},
				legend: {
					data: ['销量'],
					top: 'bottom'
				},
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
				xAxis: {
					data: ['衬衫','羊毛衫','雪纺衫','裤子','高跟鞋','袜子']
				},
				yAxis: {},
				series: [{
					name: '销量',
					type: 'bar',
					data: [5, 20, 36, 10, 10, 20]
				}]			
		};
		
		return option;
	};
	
	var makeBar02 = function(){
		var option = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data:['邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
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
                    name:'邮件营销',
                    type:'bar',
                    stack: '广告',
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'联盟广告',
                    type:'bar',
                    stack: '广告',
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'视频广告',
                    type:'bar',
                    stack: '广告',
                    data:[150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name:'百度',
                    type:'bar',
                    stack: '搜索引擎',
                    data:[620, 732, 701, 734, 1090, 1130, 1120]
                },
                {
                    name:'谷歌',
                    type:'bar',
                    stack: '搜索引擎',
                    data:[120, 132, 101, 134, 290, 230, 220]
                },
                {
                    name:'必应',
                    type:'bar',
                    stack: '搜索引擎',
                    data:[60, 72, 71, 74, 190, 130, 110]
                },
                {
                    name:'其他',
                    type:'bar',
                    stack: '搜索引擎',
                    data:[62, 82, 91, 84, 109, 110, 120]
                }
            ]
		};		
		return option;
	};
    
    var makeBar03 = function(){
        var option = {
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
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: ['巴西','印尼','美国','印度','中国','世界人口(万)']
            },
            series: [
                {
                    name: '2011年',
                    type: 'bar',
                    data: [18203, 23489, 29034, 104970, 131744, 630230]
                },
                {
                    name: '2012年',
                    type: 'bar',
                    data: [19325, 23438, 31000, 121594, 134141, 681807]
                }
            ]
        };
        return option;
    };
    
    var makeBar04 = function(){
      var option = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['直接访问', '邮件营销','联盟广告','视频广告','搜索引擎']
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
            xAxis:  {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            series: [
                {
                    name: '直接访问',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [320, 302, 301, 334, 390, 330, 320]
                },
                {
                    name: '邮件营销',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '联盟广告',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '视频广告',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [150, 212, 201, 154, 190, 330, 410]
                },
                {
                    name: '搜索引擎',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [820, 832, 901, 934, 1290, 1330, 1320]
                }
            ]
        };
        return option;
    };
    
    var makeLine01 = function(){
        var option = {
            baseOption: {
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
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一','周二','周三','周四','周五','周六','周日']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'邮件营销',
                        type:'line',
                        stack: '总量',
                        data:[120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name:'联盟广告',
                        type:'line',
                        stack: '总量',
                        data:[220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name:'视频广告',
                        type:'line',
                        stack: '总量',
                        data:[150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name:'直接访问',
                        type:'line',
                        stack: '总量',
                        data:[320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name:'搜索引擎',
                        type:'line',
                        stack: '总量',
                        data:[820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            }
        };
        return option;
    };
    
    var makeLine02 = function(){
        var option = {
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
                    name:'邮件营销',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'联盟广告',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'视频广告',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name:'直接访问',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[320, 332, 301, 334, 390, 330, 320]
                },
                {
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
        };
        return option;
    };
    
    var makeLine03 = function(){
        var option = {
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
            xAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} °C'
                }
            },
            yAxis: {
                type: 'category',
                axisLine: {onZero: false},
                axisLabel: {
                    formatter: '{value} km'
                },
                boundaryGap: false,
                data: ['0', '10', '20', '30', '40', '50', '60', '70', '80']
            },
            series: [
                {
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
        };
        return option;
    };
    
    var makePie01 = function(){
        var option = {
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
        };
        return option;
    };
    
	var makePie02 = function(){
        var option = {
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
        };
        return option;
    };
    
    var makePie03 = function(){
        var option = {
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
                data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
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
                    selectedMode: 'single',
                    radius: [0, '40%'],

                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:335, name:'直达'},
                        {value:679, name:'营销广告'},
                        {value:1548, name:'搜索引擎'}
                    ]
                },
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['50%', '70%'],

                    data:[
                        {value:335, name:'直达'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1048, name:'百度'},
                        {value:251, name:'谷歌'},
                        {value:147, name:'必应'},
                        {value:102, name:'其他'}
                    ]
                }
            ]
        };
        return option;
    };
    
    var makePie04 = function(){
        var option = {
            title: {
                text: 'Customized Pie',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#ccc'
                }
            },

            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },

            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            series : [
                {
                    name:'访问来源',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:274, name:'联盟广告'},
                        {value:235, name:'视频广告'},
                        {value:400, name:'搜索引擎'}
                    ].sort(function (a, b) { return a.value - b.value}),
                    roseType: 'angle',
                    label: {
                        normal: {
                            textStyle: {
                                color: '#ccc'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: '#ccc'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#c23531',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        return option;
    };
    
    var makePie05 = function(){
        var option = {
            title : {
                text: '南丁格尔玫瑰图',
                subtext: '纯属虚构',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x : 'center',
                y : 'bottom',
                data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
            },
            toolbox: {
                show : true,
                feature : {
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            series : [
                {
                    name:'半径模式',
                    type:'pie',
                    radius : [20, 110],
                    center : ['25%', '50%'],
                    roseType : 'radius',
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    lableLine: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:[
                        {value:10, name:'rose1'},
                        {value:5, name:'rose2'},
                        {value:15, name:'rose3'},
                        {value:25, name:'rose4'},
                        {value:20, name:'rose5'},
                        {value:35, name:'rose6'},
                        {value:30, name:'rose7'},
                        {value:40, name:'rose8'}
                    ]
                },
                {
                    name:'面积模式',
                    type:'pie',
                    radius : [30, 110],
                    center : ['75%', '50%'],
                    roseType : 'area',
                    data:[
                        {value:10, name:'rose1'},
                        {value:5, name:'rose2'},
                        {value:15, name:'rose3'},
                        {value:25, name:'rose4'},
                        {value:20, name:'rose5'},
                        {value:35, name:'rose6'},
                        {value:30, name:'rose7'},
                        {value:40, name:'rose8'}
                    ]
                }
            ]
        };
        return option;
    };
    
    var makeMap01 = function(){
        var option = {
            title: {
                text: 'iphone销量',
                subtext: '纯属虚构',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data:['iphone3','iphone4','iphone5']
            },
            visualMap: {
                min: 0,
                max: 2500,
                left: 'left',
                top: 'bottom',
                text: ['高','低'],           // 文本，默认为数值文本
                calculable: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            series: [
                {
                    name: 'iphone3',
                    type: 'map',
                    mapType: 'china',
                    roam: false,
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:[
                        {name: '北京',value: 2000},
                        {name: '天津',value: 1800 },
                        {name: '上海',value: 2100},
                        {name: '重庆',value: 1232 },
                        {name: '河北',value: 800 },
                        {name: '河南',value: 400 },
                        {name: '云南',value: 200 },
                        {name: '辽宁',value: 1200 },
                        {name: '黑龙江',value: 900 },
                        {name: '湖南',value: 2100 },
                        {name: '安徽',value: 1800 },
                        {name: '山东',value: 1700 },
                        {name: '新疆',value: 600 },
                        {name: '江苏',value: 2300 },
                        {name: '浙江',value: 2200 },
                        {name: '江西',value: 1222 },
                        {name: '湖北',value: 1223 },
                        {name: '广西',value: 234 },
                        {name: '甘肃',value: 231 },
                        {name: '山西',value: 324 },
                        {name: '内蒙古',value: 222 },
                        {name: '陕西',value: 212 },
                        {name: '吉林',value: 1300 },
                        {name: '福建',value: 1500 },
                        {name: '贵州',value: 500 },
                        {name: '广东',value: 2000 },
                        {name: '青海',value: 330 },
                        {name: '西藏',value: 123 },
                        {name: '四川',value: 1422 },
                        {name: '宁夏',value: 322 },
                        {name: '海南',value: 999 },
                        {name: '台湾',value: 1999 },
                        {name: '香港',value: 2400 },
                        {name: '澳门',value: 2001 }
                    ]
                },
                {
                    name: 'iphone4',
                    type: 'map',
                    mapType: 'china',
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:[
                        {name: '北京',value: 2100 },
                        {name: '天津',value: 2000 },
                        {name: '上海',value: 2200 },
                        {name: '重庆',value: 1233 },
                        {name: '河北',value: 1231 },
                        {name: '安徽',value: 900 },
                        {name: '新疆',value: 402 },
                        {name: '浙江',value: 1800 },
                        {name: '江西',value: 500 },
                        {name: '山西',value: 300 },
                        {name: '内蒙古',value: 300 },
                        {name: '吉林',value: 1000 },
                        {name: '福建',value: 1700 },
                        {name: '广东',value: 1600 },
                        {name: '西藏',value: 100 },
                        {name: '四川',value: 800 },
                        {name: '宁夏',value: 200 },
                        {name: '香港',value: 2400 },
                        {name: '澳门',value: 2300 }
                    ]
                },
                {
                    name: 'iphone5',
                    type: 'map',
                    mapType: 'china',
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:[
                        {name: '北京',value: 2200 },
                        {name: '天津',value: 2000 },
                        {name: '上海',value: 2500 },
                        {name: '广东',value: 2300 },
                        {name: '台湾',value: 2050 },
                        {name: '香港',value: 2500 },
                        {name: '澳门',value: 2010}
                    ]
                }
            ]
        };
        return option;
    };
    
    var makeMap02 = function(){
        var option = {
            title: {
                text: 'World Population (2010)',
                subtext: 'from United Nations, Total population, both sexes combined, as of 1 July (thousands)',
                sublink: 'http://esa.un.org/wpp/Excel-Data/population.htm',
                left: 'center',
                top: 'top'
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    var value = (params.value + '').split('.');
                    value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
                            + '.' + value[1];
                    return params.seriesName + '<br/>' + params.name + ' : ' + value;
                }
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            visualMap: {
                min: 0,
                max: 1000000,
                text:['High','Low'],
                realtime: false,
                calculable: true,
                inRange: {
                    color: ['lightskyblue','yellow', 'orangered']
                }
            },
            series: [
                {
                    name: 'World Population (2010)',
                    type: 'map',
                    mapType: 'world',
                    roam: true,
                    itemStyle:{
                        emphasis:{label:{show:true}}
                    },
                    data:[
                        {name: 'Afghanistan', value: 28397.812},
                        {name: 'Angola', value: 19549.124},
                        {name: 'Albania', value: 3150.143},
                        {name: 'United Arab Emirates', value: 8441.537},
                        {name: 'Argentina', value: 40374.224},
                        {name: 'Armenia', value: 2963.496},
                        {name: 'French Southern and Antarctic Lands', value: 268.065},
                        {name: 'Australia', value: 22404.488},
                        {name: 'Austria', value: 8401.924},
                        {name: 'Azerbaijan', value: 9094.718},
                        {name: 'Burundi', value: 9232.753},
                        {name: 'Belgium', value: 10941.288},
                        {name: 'Benin', value: 9509.798},
                        {name: 'Burkina Faso', value: 15540.284},
                        {name: 'Bangladesh', value: 151125.475},
                        {name: 'Bulgaria', value: 7389.175},
                        {name: 'The Bahamas', value: 66402.316},
                        {name: 'Bosnia and Herzegovina', value: 3845.929},
                        {name: 'Belarus', value: 9491.07},
                        {name: 'Belize', value: 308.595},
                        {name: 'Bermuda', value: 64.951},
                        {name: 'Bolivia', value: 716.939},
                        {name: 'Brazil', value: 195210.154},
                        {name: 'Brunei', value: 27.223},
                        {name: 'Bhutan', value: 716.939},
                        {name: 'Botswana', value: 1969.341},
                        {name: 'Central African Republic', value: 4349.921},
                        {name: 'Canada', value: 34126.24},
                        {name: 'Switzerland', value: 7830.534},
                        {name: 'Chile', value: 17150.76},
                        {name: 'China', value: 1359821.465},
                        {name: 'Ivory Coast', value: 60508.978},
                        {name: 'Cameroon', value: 20624.343},
                        {name: 'Democratic Republic of the Congo', value: 62191.161},
                        {name: 'Republic of the Congo', value: 3573.024},
                        {name: 'Colombia', value: 46444.798},
                        {name: 'Costa Rica', value: 4669.685},
                        {name: 'Cuba', value: 11281.768},
                        {name: 'Northern Cyprus', value: 1.468},
                        {name: 'Cyprus', value: 1103.685},
                        {name: 'Czech Republic', value: 10553.701},
                        {name: 'Germany', value: 83017.404},
                        {name: 'Djibouti', value: 834.036},
                        {name: 'Denmark', value: 5550.959},
                        {name: 'Dominican Republic', value: 10016.797},
                        {name: 'Algeria', value: 37062.82},
                        {name: 'Ecuador', value: 15001.072},
                        {name: 'Egypt', value: 78075.705},
                        {name: 'Eritrea', value: 5741.159},
                        {name: 'Spain', value: 46182.038},
                        {name: 'Estonia', value: 1298.533},
                        {name: 'Ethiopia', value: 87095.281},
                        {name: 'Finland', value: 5367.693},
                        {name: 'Fiji', value: 860.559},
                        {name: 'Falkland Islands', value: 49.581},
                        {name: 'France', value: 63230.866},
                        {name: 'Gabon', value: 1556.222},
                        {name: 'United Kingdom', value: 62066.35},
                        {name: 'Georgia', value: 4388.674},
                        {name: 'Ghana', value: 24262.901},
                        {name: 'Guinea', value: 10876.033},
                        {name: 'Gambia', value: 1680.64},
                        {name: 'Guinea Bissau', value: 10876.033},
                        {name: 'Equatorial Guinea', value: 696.167},
                        {name: 'Greece', value: 11109.999},
                        {name: 'Greenland', value: 56.546},
                        {name: 'Guatemala', value: 14341.576},
                        {name: 'French Guiana', value: 231.169},
                        {name: 'Guyana', value: 786.126},
                        {name: 'Honduras', value: 7621.204},
                        {name: 'Croatia', value: 4338.027},
                        {name: 'Haiti', value: 9896.4},
                        {name: 'Hungary', value: 10014.633},
                        {name: 'Indonesia', value: 240676.485},
                        {name: 'India', value: 1205624.648},
                        {name: 'Ireland', value: 4467.561},
                        {name: 'Iran', value: 240676.485},
                        {name: 'Iraq', value: 30962.38},
                        {name: 'Iceland', value: 318.042},
                        {name: 'Israel', value: 7420.368},
                        {name: 'Italy', value: 60508.978},
                        {name: 'Jamaica', value: 2741.485},
                        {name: 'Jordan', value: 6454.554},
                        {name: 'Japan', value: 127352.833},
                        {name: 'Kazakhstan', value: 15921.127},
                        {name: 'Kenya', value: 40909.194},
                        {name: 'Kyrgyzstan', value: 5334.223},
                        {name: 'Cambodia', value: 14364.931},
                        {name: 'South Korea', value: 51452.352},
                        {name: 'Kosovo', value: 97.743},
                        {name: 'Kuwait', value: 2991.58},
                        {name: 'Laos', value: 6395.713},
                        {name: 'Lebanon', value: 4341.092},
                        {name: 'Liberia', value: 3957.99},
                        {name: 'Libya', value: 6040.612},
                        {name: 'Sri Lanka', value: 20758.779},
                        {name: 'Lesotho', value: 2008.921},
                        {name: 'Lithuania', value: 3068.457},
                        {name: 'Luxembourg', value: 507.885},
                        {name: 'Latvia', value: 2090.519},
                        {name: 'Morocco', value: 31642.36},
                        {name: 'Moldova', value: 103.619},
                        {name: 'Madagascar', value: 21079.532},
                        {name: 'Mexico', value: 117886.404},
                        {name: 'Macedonia', value: 507.885},
                        {name: 'Mali', value: 13985.961},
                        {name: 'Myanmar', value: 51931.231},
                        {name: 'Montenegro', value: 620.078},
                        {name: 'Mongolia', value: 2712.738},
                        {name: 'Mozambique', value: 23967.265},
                        {name: 'Mauritania', value: 3609.42},
                        {name: 'Malawi', value: 15013.694},
                        {name: 'Malaysia', value: 28275.835},
                        {name: 'Namibia', value: 2178.967},
                        {name: 'New Caledonia', value: 246.379},
                        {name: 'Niger', value: 15893.746},
                        {name: 'Nigeria', value: 159707.78},
                        {name: 'Nicaragua', value: 5822.209},
                        {name: 'Netherlands', value: 16615.243},
                        {name: 'Norway', value: 4891.251},
                        {name: 'Nepal', value: 26846.016},
                        {name: 'New Zealand', value: 4368.136},
                        {name: 'Oman', value: 2802.768},
                        {name: 'Pakistan', value: 173149.306},
                        {name: 'Panama', value: 3678.128},
                        {name: 'Peru', value: 29262.83},
                        {name: 'Philippines', value: 93444.322},
                        {name: 'Papua New Guinea', value: 6858.945},
                        {name: 'Poland', value: 38198.754},
                        {name: 'Puerto Rico', value: 3709.671},
                        {name: 'North Korea', value: 1.468},
                        {name: 'Portugal', value: 10589.792},
                        {name: 'Paraguay', value: 6459.721},
                        {name: 'Qatar', value: 1749.713},
                        {name: 'Romania', value: 21861.476},
                        {name: 'Russia', value: 21861.476},
                        {name: 'Rwanda', value: 10836.732},
                        {name: 'Western Sahara', value: 514.648},
                        {name: 'Saudi Arabia', value: 27258.387},
                        {name: 'Sudan', value: 35652.002},
                        {name: 'South Sudan', value: 9940.929},
                        {name: 'Senegal', value: 12950.564},
                        {name: 'Solomon Islands', value: 526.447},
                        {name: 'Sierra Leone', value: 5751.976},
                        {name: 'El Salvador', value: 6218.195},
                        {name: 'Somaliland', value: 9636.173},
                        {name: 'Somalia', value: 9636.173},
                        {name: 'Republic of Serbia', value: 3573.024},
                        {name: 'Suriname', value: 524.96},
                        {name: 'Slovakia', value: 5433.437},
                        {name: 'Slovenia', value: 2054.232},
                        {name: 'Sweden', value: 9382.297},
                        {name: 'Swaziland', value: 1193.148},
                        {name: 'Syria', value: 7830.534},
                        {name: 'Chad', value: 11720.781},
                        {name: 'Togo', value: 6306.014},
                        {name: 'Thailand', value: 66402.316},
                        {name: 'Tajikistan', value: 7627.326},
                        {name: 'Turkmenistan', value: 5041.995},
                        {name: 'East Timor', value: 10016.797},
                        {name: 'Trinidad and Tobago', value: 1328.095},
                        {name: 'Tunisia', value: 10631.83},
                        {name: 'Turkey', value: 72137.546},
                        {name: 'United Republic of Tanzania', value: 44973.33},
                        {name: 'Uganda', value: 33987.213},
                        {name: 'Ukraine', value: 46050.22},
                        {name: 'Uruguay', value: 3371.982},
                        {name: 'United States of America', value: 312247.116},
                        {name: 'Uzbekistan', value: 27769.27},
                        {name: 'Venezuela', value: 236.299},
                        {name: 'Vietnam', value: 89047.397},
                        {name: 'Vanuatu', value: 236.299},
                        {name: 'West Bank', value: 13.565},
                        {name: 'Yemen', value: 22763.008},
                        {name: 'South Africa', value: 51452.352},
                        {name: 'Zambia', value: 13216.985},
                        {name: 'Zimbabwe', value: 13076.978}
                    ]
                }
            ]
        };
        return option;
    };
    
    var makeMap03 = function(){
        var option = {
            title: {
                text: '香港18区人口密度 （2011）',
                subtext: '人口密度数据来自Wikipedia'
            },
            tooltip: {
                trigger: 'item'
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            visualMap: {
                min: 800,
                max: 50000,
                text:['High','Low'],
                realtime: false,
                calculable: true,
                inRange: {
                    color: ['lightskyblue','yellow', 'orangered']
                }
            },
            series: [
                {
                    name: '香港18区人口密度',
                    type: 'map',
                    mapType: '香港',
                    itemStyle:{
                        normal:{label:{show:true}},
                        emphasis:{label:{show:true}}
                    },
                    data:[
                        {name: '中西區', value: 20057},
                        {name: '灣仔區', value: 15477},
                        {name: '東區', value: 31686},
                        {name: '南區', value: 6992},
                        {name: '油尖旺區', value: 44045},
                        {name: '深水埗區', value: 40689},
                        {name: '九龍城區', value: 37659},
                        {name: '黃大仙區', value: 45180},
                        {name: '觀塘區', value: 55204},
                        {name: '葵青區', value: 21900},
                        {name: '荃灣區', value: 4918},
                        {name: '屯門區', value: 5881},
                        {name: '元朗區', value: 4178},
                        {name: '北區', value: 2227},
                        {name: '大埔區', value: 2180},
                        {name: '沙田區', value: 9172},
                        {name: '西貢區', value: 3368},
                        {name: '離島區', value: 806}
                    ]
                }
            ]
        };
        return option;
    };
    
    var makeMap04 = function(){
        var geoCoordMap = {
            '上海': [121.4648,31.2891],
            '东莞': [113.8953,22.901],
            '东营': [118.7073,37.5513],
            '中山': [113.4229,22.478],
            '临汾': [111.4783,36.1615],
            '临沂': [118.3118,35.2936],
            '丹东': [124.541,40.4242],
            '丽水': [119.5642,28.1854],
            '乌鲁木齐': [87.9236,43.5883],
            '佛山': [112.8955,23.1097],
            '保定': [115.0488,39.0948],
            '兰州': [103.5901,36.3043],
            '包头': [110.3467,41.4899],
            '北京': [116.4551,40.2539],
            '北海': [109.314,21.6211],
            '南京': [118.8062,31.9208],
            '南宁': [108.479,23.1152],
            '南昌': [116.0046,28.6633],
            '南通': [121.1023,32.1625],
            '厦门': [118.1689,24.6478],
            '台州': [121.1353,28.6688],
            '合肥': [117.29,32.0581],
            '呼和浩特': [111.4124,40.4901],
            '咸阳': [108.4131,34.8706],
            '哈尔滨': [127.9688,45.368],
            '唐山': [118.4766,39.6826],
            '嘉兴': [120.9155,30.6354],
            '大同': [113.7854,39.8035],
            '大连': [122.2229,39.4409],
            '天津': [117.4219,39.4189],
            '太原': [112.3352,37.9413],
            '威海': [121.9482,37.1393],
            '宁波': [121.5967,29.6466],
            '宝鸡': [107.1826,34.3433],
            '宿迁': [118.5535,33.7775],
            '常州': [119.4543,31.5582],
            '广州': [113.5107,23.2196],
            '廊坊': [116.521,39.0509],
            '延安': [109.1052,36.4252],
            '张家口': [115.1477,40.8527],
            '徐州': [117.5208,34.3268],
            '德州': [116.6858,37.2107],
            '惠州': [114.6204,23.1647],
            '成都': [103.9526,30.7617],
            '扬州': [119.4653,32.8162],
            '承德': [117.5757,41.4075],
            '拉萨': [91.1865,30.1465],
            '无锡': [120.3442,31.5527],
            '日照': [119.2786,35.5023],
            '昆明': [102.9199,25.4663],
            '杭州': [119.5313,29.8773],
            '枣庄': [117.323,34.8926],
            '柳州': [109.3799,24.9774],
            '株洲': [113.5327,27.0319],
            '武汉': [114.3896,30.6628],
            '汕头': [117.1692,23.3405],
            '江门': [112.6318,22.1484],
            '沈阳': [123.1238,42.1216],
            '沧州': [116.8286,38.2104],
            '河源': [114.917,23.9722],
            '泉州': [118.3228,25.1147],
            '泰安': [117.0264,36.0516],
            '泰州': [120.0586,32.5525],
            '济南': [117.1582,36.8701],
            '济宁': [116.8286,35.3375],
            '海口': [110.3893,19.8516],
            '淄博': [118.0371,36.6064],
            '淮安': [118.927,33.4039],
            '深圳': [114.5435,22.5439],
            '清远': [112.9175,24.3292],
            '温州': [120.498,27.8119],
            '渭南': [109.7864,35.0299],
            '湖州': [119.8608,30.7782],
            '湘潭': [112.5439,27.7075],
            '滨州': [117.8174,37.4963],
            '潍坊': [119.0918,36.524],
            '烟台': [120.7397,37.5128],
            '玉溪': [101.9312,23.8898],
            '珠海': [113.7305,22.1155],
            '盐城': [120.2234,33.5577],
            '盘锦': [121.9482,41.0449],
            '石家庄': [114.4995,38.1006],
            '福州': [119.4543,25.9222],
            '秦皇岛': [119.2126,40.0232],
            '绍兴': [120.564,29.7565],
            '聊城': [115.9167,36.4032],
            '肇庆': [112.1265,23.5822],
            '舟山': [122.2559,30.2234],
            '苏州': [120.6519,31.3989],
            '莱芜': [117.6526,36.2714],
            '菏泽': [115.6201,35.2057],
            '营口': [122.4316,40.4297],
            '葫芦岛': [120.1575,40.578],
            '衡水': [115.8838,37.7161],
            '衢州': [118.6853,28.8666],
            '西宁': [101.4038,36.8207],
            '西安': [109.1162,34.2004],
            '贵阳': [106.6992,26.7682],
            '连云港': [119.1248,34.552],
            '邢台': [114.8071,37.2821],
            '邯郸': [114.4775,36.535],
            '郑州': [113.4668,34.6234],
            '鄂尔多斯': [108.9734,39.2487],
            '重庆': [107.7539,30.1904],
            '金华': [120.0037,29.1028],
            '铜川': [109.0393,35.1947],
            '银川': [106.3586,38.1775],
            '镇江': [119.4763,31.9702],
            '长春': [125.8154,44.2584],
            '长沙': [113.0823,28.2568],
            '长治': [112.8625,36.4746],
            '阳泉': [113.4778,38.0951],
            '青岛': [120.4651,36.3373],
            '韶关': [113.7964,24.7028]
        };

        var BJData = [
            [{name:'北京'}, {name:'上海',value:95}],
            [{name:'北京'}, {name:'广州',value:90}],
            [{name:'北京'}, {name:'大连',value:80}],
            [{name:'北京'}, {name:'南宁',value:70}],
            [{name:'北京'}, {name:'南昌',value:60}],
            [{name:'北京'}, {name:'拉萨',value:50}],
            [{name:'北京'}, {name:'长春',value:40}],
            [{name:'北京'}, {name:'包头',value:30}],
            [{name:'北京'}, {name:'重庆',value:20}],
            [{name:'北京'}, {name:'常州',value:10}]
        ];

        var SHData = [
            [{name:'上海'},{name:'包头',value:95}],
            [{name:'上海'},{name:'昆明',value:90}],
            [{name:'上海'},{name:'广州',value:80}],
            [{name:'上海'},{name:'郑州',value:70}],
            [{name:'上海'},{name:'长春',value:60}],
            [{name:'上海'},{name:'重庆',value:50}],
            [{name:'上海'},{name:'长沙',value:40}],
            [{name:'上海'},{name:'北京',value:30}],
            [{name:'上海'},{name:'丹东',value:20}],
            [{name:'上海'},{name:'大连',value:10}]
        ];

        var GZData = [
            [{name:'广州'},{name:'福州',value:95}],
            [{name:'广州'},{name:'太原',value:90}],
            [{name:'广州'},{name:'长春',value:80}],
            [{name:'广州'},{name:'重庆',value:70}],
            [{name:'广州'},{name:'西安',value:60}],
            [{name:'广州'},{name:'成都',value:50}],
            [{name:'广州'},{name:'常州',value:40}],
            [{name:'广州'},{name:'北京',value:30}],
            [{name:'广州'},{name:'北海',value:20}],
            [{name:'广州'},{name:'海口',value:10}]
        ];

        var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                var fromCoord = geoCoordMap[dataItem[0].name];
                var toCoord = geoCoordMap[dataItem[1].name];
                if (fromCoord && toCoord) {
                    res.push({
                        fromName: dataItem[0].name,
                        toName: dataItem[1].name,
                        coords: [fromCoord, toCoord]
                    });
                }
            }
            return res;
        };

        var color = ['#a6c84c', '#ffa022', '#46bee9'];
        var series = [];
        [['北京', BJData], ['上海', SHData], ['广州', GZData]].forEach(function (item, i) {
            series.push({
                name: item[0] + ' Top10',
                type: 'lines',
                zlevel: 1,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.7,
                    color: '#fff',
                    symbolSize: 3
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 0,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            },
            {
                name: item[0] + ' Top10',
                type: 'lines',
                zlevel: 2,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0,
                    symbol: planePath,
                    symbolSize: 15
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 1,
                        opacity: 0.4,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            },
            {
                name: item[0] + ' Top10',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: '{b}'
                    }
                },
                symbolSize: function (val) {
                    return val[2] / 8;
                },
                itemStyle: {
                    normal: {
                        color: color[i]
                    }
                },
                data: item[1].map(function (dataItem) {
                    return {
                        name: dataItem[1].name,
                        value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                    };
                })
            });
        });

        var option = {
            backgroundColor: '#404a59',
            title : {
                text: '模拟迁徙',
                subtext: '数据纯属虚构',
                left: 'center',
                textStyle : {
                    color: '#fff'
                }
            },
            tooltip : {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                top: 'bottom',
                left: 'right',
                data:['北京 Top10', '上海 Top10', '广州 Top10'],
                textStyle: {
                    color: '#fff'
                },
                selectedMode: 'single'
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#323c48',
                        borderColor: '#404a59'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                }
            },
            series: series
        }; 
        return option;
    };
    
    var makeScatter01 = function(){
        var data = [
            [[28604,77,17096869,'Australia',1990],[31163,77.4,27662440,'Canada',1990],[1516,68,1154605773,'China',1990],[13670,74.7,10582082,'Cuba',1990],[28599,75,4986705,'Finland',1990],[29476,77.1,56943299,'France',1990],[31476,75.4,78958237,'Germany',1990],[28666,78.1,254830,'Iceland',1990],[1777,57.7,870601776,'India',1990],[29550,79.1,122249285,'Japan',1990],[2076,67.9,20194354,'North Korea',1990],[12087,72,42972254,'South Korea',1990],[24021,75.4,3397534,'New Zealand',1990],[43296,76.8,4240375,'Norway',1990],[10088,70.8,38195258,'Poland',1990],[19349,69.6,147568552,'Russia',1990],[10670,67.3,53994605,'Turkey',1990],[26424,75.7,57110117,'United Kingdom',1990],[37062,75.4,252847810,'United States',1990]],
            [[44056,81.8,23968973,'Australia',2015],[43294,81.7,35939927,'Canada',2015],[13334,76.9,1376048943,'China',2015],[21291,78.5,11389562,'Cuba',2015],[38923,80.8,5503457,'Finland',2015],[37599,81.9,64395345,'France',2015],[44053,81.1,80688545,'Germany',2015],[42182,82.8,329425,'Iceland',2015],[5903,66.8,1311050527,'India',2015],[36162,83.5,126573481,'Japan',2015],[1390,71.4,25155317,'North Korea',2015],[34644,80.7,50293439,'South Korea',2015],[34186,80.6,4528526,'New Zealand',2015],[64304,81.6,5210967,'Norway',2015],[24787,77.3,38611794,'Poland',2015],[23038,73.13,143456918,'Russia',2015],[19360,76.5,78665830,'Turkey',2015],[38225,81.4,64715810,'United Kingdom',2015],[53354,79.1,321773631,'United States',2015]]
        ];

        var option = {
            title: {
                text: '1990 与 2015 年各国家人均寿命与 GDP'
            },
            legend: {
                right: 10,
                data: ['1990', '2015']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            },
            yAxis: {
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                scale: true
            },
            series: [{
                name: '1990',
                data: data[0],
                type: 'scatter',
                symbolSize: function (data) {
                    return Math.sqrt(data[2]) / 5e2;
                },
                label: {
                    emphasis: {
                        show: true,
                        formatter: function (param) {
                            return param.data[3];
                        },
                        position: 'top'
                    }
                },
                itemStyle: {
                    normal: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(120, 36, 50, 0.5)',
                        shadowOffsetY: 5
                    }
                }
            }, {
                name: '2015',
                data: data[1],
                type: 'scatter',
                symbolSize: function (data) {
                    return Math.sqrt(data[2]) / 5e2;
                },
                label: {
                    emphasis: {
                        show: true,
                        formatter: function (param) {
                            return param.data[3];
                        },
                        position: 'top'
                    }
                },
                itemStyle: {
                    normal: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(25, 100, 150, 0.5)',
                        shadowOffsetY: 5
                    }
                }
            }]
        };
        return option;
    };
    
    var  makeScatter02 = function(){
        var data = [
             {name: '海门', value: 9},
             {name: '鄂尔多斯', value: 12},
             {name: '招远', value: 12},
             {name: '舟山', value: 12},
             {name: '齐齐哈尔', value: 14},
             {name: '盐城', value: 15},
             {name: '赤峰', value: 16},
             {name: '青岛', value: 18},
             {name: '乳山', value: 18},
             {name: '金昌', value: 19},
             {name: '泉州', value: 21},
             {name: '莱西', value: 21},
             {name: '日照', value: 21},
             {name: '胶南', value: 22},
             {name: '南通', value: 23},
             {name: '拉萨', value: 24},
             {name: '云浮', value: 24},
             {name: '梅州', value: 25},
             {name: '文登', value: 25},
             {name: '上海', value: 25},
             {name: '攀枝花', value: 25},
             {name: '威海', value: 25},
             {name: '承德', value: 25},
             {name: '厦门', value: 26},
             {name: '汕尾', value: 26},
             {name: '潮州', value: 26},
             {name: '丹东', value: 27},
             {name: '太仓', value: 27},
             {name: '曲靖', value: 27},
             {name: '烟台', value: 28},
             {name: '福州', value: 29},
             {name: '瓦房店', value: 30},
             {name: '即墨', value: 30},
             {name: '抚顺', value: 31},
             {name: '玉溪', value: 31},
             {name: '张家口', value: 31},
             {name: '阳泉', value: 31},
             {name: '莱州', value: 32},
             {name: '湖州', value: 32},
             {name: '汕头', value: 32},
             {name: '昆山', value: 33},
             {name: '宁波', value: 33},
             {name: '湛江', value: 33},
             {name: '揭阳', value: 34},
             {name: '荣成', value: 34},
             {name: '连云港', value: 35},
             {name: '葫芦岛', value: 35},
             {name: '常熟', value: 36},
             {name: '东莞', value: 36},
             {name: '河源', value: 36},
             {name: '淮安', value: 36},
             {name: '泰州', value: 36},
             {name: '南宁', value: 37},
             {name: '营口', value: 37},
             {name: '惠州', value: 37},
             {name: '江阴', value: 37},
             {name: '蓬莱', value: 37},
             {name: '韶关', value: 38},
             {name: '嘉峪关', value: 38},
             {name: '广州', value: 38},
             {name: '延安', value: 38},
             {name: '太原', value: 39},
             {name: '清远', value: 39},
             {name: '中山', value: 39},
             {name: '昆明', value: 39},
             {name: '寿光', value: 40},
             {name: '盘锦', value: 40},
             {name: '长治', value: 41},
             {name: '深圳', value: 41},
             {name: '珠海', value: 42},
             {name: '宿迁', value: 43},
             {name: '咸阳', value: 43},
             {name: '铜川', value: 44},
             {name: '平度', value: 44},
             {name: '佛山', value: 44},
             {name: '海口', value: 44},
             {name: '江门', value: 45},
             {name: '章丘', value: 45},
             {name: '肇庆', value: 46},
             {name: '大连', value: 47},
             {name: '临汾', value: 47},
             {name: '吴江', value: 47},
             {name: '石嘴山', value: 49},
             {name: '沈阳', value: 50},
             {name: '苏州', value: 50},
             {name: '茂名', value: 50},
             {name: '嘉兴', value: 51},
             {name: '长春', value: 51},
             {name: '胶州', value: 52},
             {name: '银川', value: 52},
             {name: '张家港', value: 52},
             {name: '三门峡', value: 53},
             {name: '锦州', value: 54},
             {name: '南昌', value: 54},
             {name: '柳州', value: 54},
             {name: '三亚', value: 54},
             {name: '自贡', value: 56},
             {name: '吉林', value: 56},
             {name: '阳江', value: 57},
             {name: '泸州', value: 57},
             {name: '西宁', value: 57},
             {name: '宜宾', value: 58},
             {name: '呼和浩特', value: 58},
             {name: '成都', value: 58},
             {name: '大同', value: 58},
             {name: '镇江', value: 59},
             {name: '桂林', value: 59},
             {name: '张家界', value: 59},
             {name: '宜兴', value: 59},
             {name: '北海', value: 60},
             {name: '西安', value: 61},
             {name: '金坛', value: 62},
             {name: '东营', value: 62},
             {name: '牡丹江', value: 63},
             {name: '遵义', value: 63},
             {name: '绍兴', value: 63},
             {name: '扬州', value: 64},
             {name: '常州', value: 64},
             {name: '潍坊', value: 65},
             {name: '重庆', value: 66},
             {name: '台州', value: 67},
             {name: '南京', value: 67},
             {name: '滨州', value: 70},
             {name: '贵阳', value: 71},
             {name: '无锡', value: 71},
             {name: '本溪', value: 71},
             {name: '克拉玛依', value: 72},
             {name: '渭南', value: 72},
             {name: '马鞍山', value: 72},
             {name: '宝鸡', value: 72},
             {name: '焦作', value: 75},
             {name: '句容', value: 75},
             {name: '北京', value: 79},
             {name: '徐州', value: 79},
             {name: '衡水', value: 80},
             {name: '包头', value: 80},
             {name: '绵阳', value: 80},
             {name: '乌鲁木齐', value: 84},
             {name: '枣庄', value: 84},
             {name: '杭州', value: 84},
             {name: '淄博', value: 85},
             {name: '鞍山', value: 86},
             {name: '溧阳', value: 86},
             {name: '库尔勒', value: 86},
             {name: '安阳', value: 90},
             {name: '开封', value: 90},
             {name: '济南', value: 92},
             {name: '德阳', value: 93},
             {name: '温州', value: 95},
             {name: '九江', value: 96},
             {name: '邯郸', value: 98},
             {name: '临安', value: 99},
             {name: '兰州', value: 99},
             {name: '沧州', value: 100},
             {name: '临沂', value: 103},
             {name: '南充', value: 104},
             {name: '天津', value: 105},
             {name: '富阳', value: 106},
             {name: '泰安', value: 112},
             {name: '诸暨', value: 112},
             {name: '郑州', value: 113},
             {name: '哈尔滨', value: 114},
             {name: '聊城', value: 116},
             {name: '芜湖', value: 117},
             {name: '唐山', value: 119},
             {name: '平顶山', value: 119},
             {name: '邢台', value: 119},
             {name: '德州', value: 120},
             {name: '济宁', value: 120},
             {name: '荆州', value: 127},
             {name: '宜昌', value: 130},
             {name: '义乌', value: 132},
             {name: '丽水', value: 133},
             {name: '洛阳', value: 134},
             {name: '秦皇岛', value: 136},
             {name: '株洲', value: 143},
             {name: '石家庄', value: 147},
             {name: '莱芜', value: 148},
             {name: '常德', value: 152},
             {name: '保定', value: 153},
             {name: '湘潭', value: 154},
             {name: '金华', value: 157},
             {name: '岳阳', value: 169},
             {name: '长沙', value: 175},
             {name: '衢州', value: 177},
             {name: '廊坊', value: 193},
             {name: '菏泽', value: 194},
             {name: '合肥', value: 229},
             {name: '武汉', value: 273},
             {name: '大庆', value: 279}
        ];
        var geoCoordMap = {
            '海门':[121.15,31.89],
            '鄂尔多斯':[109.781327,39.608266],
            '招远':[120.38,37.35],
            '舟山':[122.207216,29.985295],
            '齐齐哈尔':[123.97,47.33],
            '盐城':[120.13,33.38],
            '赤峰':[118.87,42.28],
            '青岛':[120.33,36.07],
            '乳山':[121.52,36.89],
            '金昌':[102.188043,38.520089],
            '泉州':[118.58,24.93],
            '莱西':[120.53,36.86],
            '日照':[119.46,35.42],
            '胶南':[119.97,35.88],
            '南通':[121.05,32.08],
            '拉萨':[91.11,29.97],
            '云浮':[112.02,22.93],
            '梅州':[116.1,24.55],
            '文登':[122.05,37.2],
            '上海':[121.48,31.22],
            '攀枝花':[101.718637,26.582347],
            '威海':[122.1,37.5],
            '承德':[117.93,40.97],
            '厦门':[118.1,24.46],
            '汕尾':[115.375279,22.786211],
            '潮州':[116.63,23.68],
            '丹东':[124.37,40.13],
            '太仓':[121.1,31.45],
            '曲靖':[103.79,25.51],
            '烟台':[121.39,37.52],
            '福州':[119.3,26.08],
            '瓦房店':[121.979603,39.627114],
            '即墨':[120.45,36.38],
            '抚顺':[123.97,41.97],
            '玉溪':[102.52,24.35],
            '张家口':[114.87,40.82],
            '阳泉':[113.57,37.85],
            '莱州':[119.942327,37.177017],
            '湖州':[120.1,30.86],
            '汕头':[116.69,23.39],
            '昆山':[120.95,31.39],
            '宁波':[121.56,29.86],
            '湛江':[110.359377,21.270708],
            '揭阳':[116.35,23.55],
            '荣成':[122.41,37.16],
            '连云港':[119.16,34.59],
            '葫芦岛':[120.836932,40.711052],
            '常熟':[120.74,31.64],
            '东莞':[113.75,23.04],
            '河源':[114.68,23.73],
            '淮安':[119.15,33.5],
            '泰州':[119.9,32.49],
            '南宁':[108.33,22.84],
            '营口':[122.18,40.65],
            '惠州':[114.4,23.09],
            '江阴':[120.26,31.91],
            '蓬莱':[120.75,37.8],
            '韶关':[113.62,24.84],
            '嘉峪关':[98.289152,39.77313],
            '广州':[113.23,23.16],
            '延安':[109.47,36.6],
            '太原':[112.53,37.87],
            '清远':[113.01,23.7],
            '中山':[113.38,22.52],
            '昆明':[102.73,25.04],
            '寿光':[118.73,36.86],
            '盘锦':[122.070714,41.119997],
            '长治':[113.08,36.18],
            '深圳':[114.07,22.62],
            '珠海':[113.52,22.3],
            '宿迁':[118.3,33.96],
            '咸阳':[108.72,34.36],
            '铜川':[109.11,35.09],
            '平度':[119.97,36.77],
            '佛山':[113.11,23.05],
            '海口':[110.35,20.02],
            '江门':[113.06,22.61],
            '章丘':[117.53,36.72],
            '肇庆':[112.44,23.05],
            '大连':[121.62,38.92],
            '临汾':[111.5,36.08],
            '吴江':[120.63,31.16],
            '石嘴山':[106.39,39.04],
            '沈阳':[123.38,41.8],
            '苏州':[120.62,31.32],
            '茂名':[110.88,21.68],
            '嘉兴':[120.76,30.77],
            '长春':[125.35,43.88],
            '胶州':[120.03336,36.264622],
            '银川':[106.27,38.47],
            '张家港':[120.555821,31.875428],
            '三门峡':[111.19,34.76],
            '锦州':[121.15,41.13],
            '南昌':[115.89,28.68],
            '柳州':[109.4,24.33],
            '三亚':[109.511909,18.252847],
            '自贡':[104.778442,29.33903],
            '吉林':[126.57,43.87],
            '阳江':[111.95,21.85],
            '泸州':[105.39,28.91],
            '西宁':[101.74,36.56],
            '宜宾':[104.56,29.77],
            '呼和浩特':[111.65,40.82],
            '成都':[104.06,30.67],
            '大同':[113.3,40.12],
            '镇江':[119.44,32.2],
            '桂林':[110.28,25.29],
            '张家界':[110.479191,29.117096],
            '宜兴':[119.82,31.36],
            '北海':[109.12,21.49],
            '西安':[108.95,34.27],
            '金坛':[119.56,31.74],
            '东营':[118.49,37.46],
            '牡丹江':[129.58,44.6],
            '遵义':[106.9,27.7],
            '绍兴':[120.58,30.01],
            '扬州':[119.42,32.39],
            '常州':[119.95,31.79],
            '潍坊':[119.1,36.62],
            '重庆':[106.54,29.59],
            '台州':[121.420757,28.656386],
            '南京':[118.78,32.04],
            '滨州':[118.03,37.36],
            '贵阳':[106.71,26.57],
            '无锡':[120.29,31.59],
            '本溪':[123.73,41.3],
            '克拉玛依':[84.77,45.59],
            '渭南':[109.5,34.52],
            '马鞍山':[118.48,31.56],
            '宝鸡':[107.15,34.38],
            '焦作':[113.21,35.24],
            '句容':[119.16,31.95],
            '北京':[116.46,39.92],
            '徐州':[117.2,34.26],
            '衡水':[115.72,37.72],
            '包头':[110,40.58],
            '绵阳':[104.73,31.48],
            '乌鲁木齐':[87.68,43.77],
            '枣庄':[117.57,34.86],
            '杭州':[120.19,30.26],
            '淄博':[118.05,36.78],
            '鞍山':[122.85,41.12],
            '溧阳':[119.48,31.43],
            '库尔勒':[86.06,41.68],
            '安阳':[114.35,36.1],
            '开封':[114.35,34.79],
            '济南':[117,36.65],
            '德阳':[104.37,31.13],
            '温州':[120.65,28.01],
            '九江':[115.97,29.71],
            '邯郸':[114.47,36.6],
            '临安':[119.72,30.23],
            '兰州':[103.73,36.03],
            '沧州':[116.83,38.33],
            '临沂':[118.35,35.05],
            '南充':[106.110698,30.837793],
            '天津':[117.2,39.13],
            '富阳':[119.95,30.07],
            '泰安':[117.13,36.18],
            '诸暨':[120.23,29.71],
            '郑州':[113.65,34.76],
            '哈尔滨':[126.63,45.75],
            '聊城':[115.97,36.45],
            '芜湖':[118.38,31.33],
            '唐山':[118.02,39.63],
            '平顶山':[113.29,33.75],
            '邢台':[114.48,37.05],
            '德州':[116.29,37.45],
            '济宁':[116.59,35.38],
            '荆州':[112.239741,30.335165],
            '宜昌':[111.3,30.7],
            '义乌':[120.06,29.32],
            '丽水':[119.92,28.45],
            '洛阳':[112.44,34.7],
            '秦皇岛':[119.57,39.95],
            '株洲':[113.16,27.83],
            '石家庄':[114.48,38.03],
            '莱芜':[117.67,36.19],
            '常德':[111.69,29.05],
            '保定':[115.48,38.85],
            '湘潭':[112.91,27.87],
            '金华':[119.64,29.12],
            '岳阳':[113.09,29.37],
            '长沙':[113,28.21],
            '衢州':[118.88,28.97],
            '廊坊':[116.7,39.53],
            '菏泽':[115.480656,35.23375],
            '合肥':[117.27,31.86],
            '武汉':[114.31,30.52],
            '大庆':[125.03,46.58]
        };

        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            return res;
        };

        var option = {
            backgroundColor: '#404a59',
            title: {
                text: '全国主要城市空气质量',
                subtext: 'data from PM25.in',
                sublink: 'http://www.pm25.in',
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip : {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                y: 'bottom',
                x:'right',
                data:['pm2.5'],
                textStyle: {
                    color: '#fff'
                }
            },
            toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#323c48',
                        borderColor: '#111'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                }
            },
            series : [
                {
                    name: 'pm2.5',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertData(data),
                    symbolSize: function (val) {
                        return val[2] / 10;
                    },
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#ddb926'
                        }
                    }
                },
                {
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData(data.sort(function (a, b) {
                        return b.value - a.value;
                    }).slice(0, 6)),
                    symbolSize: function (val) {
                        return val[2] / 10;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#f4e925',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 1
                }
            ]
        };
        return option;
    };
    
    var makeScatter03 = function(){
        var dataBJ = [
            [1,55,9,56,0.46,18,6,"良"],
            [2,25,11,21,0.65,34,9,"优"],
            [3,56,7,63,0.3,14,5,"良"],
            [4,33,7,29,0.33,16,6,"优"],
            [5,42,24,44,0.76,40,16,"优"],
            [6,82,58,90,1.77,68,33,"良"],
            [7,74,49,77,1.46,48,27,"良"],
            [8,78,55,80,1.29,59,29,"良"],
            [9,267,216,280,4.8,108,64,"重度污染"],
            [10,185,127,216,2.52,61,27,"中度污染"],
            [11,39,19,38,0.57,31,15,"优"],
            [12,41,11,40,0.43,21,7,"优"],
            [13,64,38,74,1.04,46,22,"良"],
            [14,108,79,120,1.7,75,41,"轻度污染"],
            [15,108,63,116,1.48,44,26,"轻度污染"],
            [16,33,6,29,0.34,13,5,"优"],
            [17,94,66,110,1.54,62,31,"良"],
            [18,186,142,192,3.88,93,79,"中度污染"],
            [19,57,31,54,0.96,32,14,"良"],
            [20,22,8,17,0.48,23,10,"优"],
            [21,39,15,36,0.61,29,13,"优"],
            [22,94,69,114,2.08,73,39,"良"],
            [23,99,73,110,2.43,76,48,"良"],
            [24,31,12,30,0.5,32,16,"优"],
            [25,42,27,43,1,53,22,"优"],
            [26,154,117,157,3.05,92,58,"中度污染"],
            [27,234,185,230,4.09,123,69,"重度污染"],
            [28,160,120,186,2.77,91,50,"中度污染"],
            [29,134,96,165,2.76,83,41,"轻度污染"],
            [30,52,24,60,1.03,50,21,"良"],
            [31,46,5,49,0.28,10,6,"优"]
        ];

        var dataGZ = [
            [1,26,37,27,1.163,27,13,"优"],
            [2,85,62,71,1.195,60,8,"良"],
            [3,78,38,74,1.363,37,7,"良"],
            [4,21,21,36,0.634,40,9,"优"],
            [5,41,42,46,0.915,81,13,"优"],
            [6,56,52,69,1.067,92,16,"良"],
            [7,64,30,28,0.924,51,2,"良"],
            [8,55,48,74,1.236,75,26,"良"],
            [9,76,85,113,1.237,114,27,"良"],
            [10,91,81,104,1.041,56,40,"良"],
            [11,84,39,60,0.964,25,11,"良"],
            [12,64,51,101,0.862,58,23,"良"],
            [13,70,69,120,1.198,65,36,"良"],
            [14,77,105,178,2.549,64,16,"良"],
            [15,109,68,87,0.996,74,29,"轻度污染"],
            [16,73,68,97,0.905,51,34,"良"],
            [17,54,27,47,0.592,53,12,"良"],
            [18,51,61,97,0.811,65,19,"良"],
            [19,91,71,121,1.374,43,18,"良"],
            [20,73,102,182,2.787,44,19,"良"],
            [21,73,50,76,0.717,31,20,"良"],
            [22,84,94,140,2.238,68,18,"良"],
            [23,93,77,104,1.165,53,7,"良"],
            [24,99,130,227,3.97,55,15,"良"],
            [25,146,84,139,1.094,40,17,"轻度污染"],
            [26,113,108,137,1.481,48,15,"轻度污染"],
            [27,81,48,62,1.619,26,3,"良"],
            [28,56,48,68,1.336,37,9,"良"],
            [29,82,92,174,3.29,0,13,"良"],
            [30,106,116,188,3.628,101,16,"轻度污染"],
            [31,118,50,0,1.383,76,11,"轻度污染"]
        ];

        var dataSH = [
            [1,91,45,125,0.82,34,23,"良"],
            [2,65,27,78,0.86,45,29,"良"],
            [3,83,60,84,1.09,73,27,"良"],
            [4,109,81,121,1.28,68,51,"轻度污染"],
            [5,106,77,114,1.07,55,51,"轻度污染"],
            [6,109,81,121,1.28,68,51,"轻度污染"],
            [7,106,77,114,1.07,55,51,"轻度污染"],
            [8,89,65,78,0.86,51,26,"良"],
            [9,53,33,47,0.64,50,17,"良"],
            [10,80,55,80,1.01,75,24,"良"],
            [11,117,81,124,1.03,45,24,"轻度污染"],
            [12,99,71,142,1.1,62,42,"良"],
            [13,95,69,130,1.28,74,50,"良"],
            [14,116,87,131,1.47,84,40,"轻度污染"],
            [15,108,80,121,1.3,85,37,"轻度污染"],
            [16,134,83,167,1.16,57,43,"轻度污染"],
            [17,79,43,107,1.05,59,37,"良"],
            [18,71,46,89,0.86,64,25,"良"],
            [19,97,71,113,1.17,88,31,"良"],
            [20,84,57,91,0.85,55,31,"良"],
            [21,87,63,101,0.9,56,41,"良"],
            [22,104,77,119,1.09,73,48,"轻度污染"],
            [23,87,62,100,1,72,28,"良"],
            [24,168,128,172,1.49,97,56,"中度污染"],
            [25,65,45,51,0.74,39,17,"良"],
            [26,39,24,38,0.61,47,17,"优"],
            [27,39,24,39,0.59,50,19,"优"],
            [28,93,68,96,1.05,79,29,"良"],
            [29,188,143,197,1.66,99,51,"中度污染"],
            [30,174,131,174,1.55,108,50,"中度污染"],
            [31,187,143,201,1.39,89,53,"中度污染"]
        ];

        var schema = [
            {name: 'date', index: 0, text: '日'},
            {name: 'AQIindex', index: 1, text: 'AQI指数'},
            {name: 'PM25', index: 2, text: 'PM2.5'},
            {name: 'PM10', index: 3, text: 'PM10'},
            {name: 'CO', index: 4, text: '一氧化碳（CO）'},
            {name: 'NO2', index: 5, text: '二氧化氮（NO2）'},
            {name: 'SO2', index: 6, text: '二氧化硫（SO2）'}
        ];


        var itemStyle = {
            normal: {
                opacity: 0.8,
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        };

        option = {
            backgroundColor: '#404a59',
            color: [
                '#dd4444', '#fec42c', '#80F1BE'
            ],
            legend: {
                y: 'top',
                data: ['北京', '上海', '广州'],
                textStyle: {
                    color: '#fff',
                    fontSize: 16
                }
            },
            grid: {
                x: '10%',
                x2: 150,
                y: '18%',
                y2: '10%'
            },
            tooltip: {
                padding: 10,
                backgroundColor: '#222',
                borderColor: '#777',
                borderWidth: 1,
                formatter: function (obj) {
                    var value = obj.value;
                    return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                        + obj.seriesName + ' ' + value[0] + '日：'
                        + value[7]
                        + '</div>'
                        + schema[1].text + '：' + value[1] + '<br>'
                        + schema[2].text + '：' + value[2] + '<br>'
                        + schema[3].text + '：' + value[3] + '<br>'
                        + schema[4].text + '：' + value[4] + '<br>'
                        + schema[5].text + '：' + value[5] + '<br>'
                        + schema[6].text + '：' + value[6] + '<br>';
                }
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'value',
                name: '日期',
                nameGap: 16,
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 14
                },
                max: 31,
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#eee'
                    }
                }
            },
            yAxis: {
                type: 'value',
                name: 'AQI指数',
                nameLocation: 'end',
                nameGap: 20,
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 16
                },
                axisLine: {
                    lineStyle: {
                        color: '#eee'
                    }
                },
                splitLine: {
                    show: false
                }
            },
            visualMap: [
                {
                    left: 'right',
                    top: '10%',
                    dimension: 2,
                    min: 0,
                    max: 250,
                    itemWidth: 30,
                    itemHeight: 120,
                    calculable: true,
                    precision: 0.1,
                    text: ['圆形大小：PM2.5'],
                    textGap: 30,
                    textStyle: {
                        color: '#fff'
                    },
                    inRange: {
                        symbolSize: [10, 70]
                    },
                    outOfRange: {
                        symbolSize: [10, 70],
                        color: ['rgba(255,255,255,.2)']
                    },
                    controller: {
                        inRange: {
                            color: ['#c23531']
                        },
                        outOfRange: {
                            color: ['#444']
                        }
                    }
                },
                {
                    left: 'right',
                    bottom: '5%',
                    dimension: 6,
                    min: 0,
                    max: 50,
                    itemHeight: 120,
                    calculable: true,
                    precision: 0.1,
                    text: ['明暗：二氧化硫'],
                    textGap: 30,
                    textStyle: {
                        color: '#fff'
                    },
                    inRange: {
                        colorLightness: [1, 0.5]
                    },
                    outOfRange: {
                        color: ['rgba(255,255,255,.2)']
                    },
                    controller: {
                        inRange: {
                            color: ['#c23531']
                        },
                        outOfRange: {
                            color: ['#444']
                        }
                    }
                }
            ],
            series: [
                {
                    name: '北京',
                    type: 'scatter',
                    itemStyle: itemStyle,
                    data: dataBJ
                },
                {
                    name: '上海',
                    type: 'scatter',
                    itemStyle: itemStyle,
                    data: dataSH
                },
                {
                    name: '广州',
                    type: 'scatter',
                    itemStyle: itemStyle,
                    data: dataGZ
                }
            ]
        };
        return option;
    };
    
    var makeRadar01 = function(){
        var option = {
            title: {
                text: '基础雷达图'
            },
            tooltip: {},
            legend: {
                data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            radar: {
                // shape: 'circle',
                indicator: [
                   { name: '销售（sales）', max: 6500},
                   { name: '管理（Administration）', max: 16000},
                   { name: '信息技术（Information Techology）', max: 30000},
                   { name: '客服（Customer Support）', max: 38000},
                   { name: '研发（Development）', max: 52000},
                   { name: '市场（Marketing）', max: 25000}
                ]
            },
            series: [{
                name: '预算 vs 开销（Budget vs spending）',
                type: 'radar',
                // areaStyle: {normal: {}},
                data : [
                    {
                        value : [4300, 10000, 28000, 35000, 50000, 19000],
                        name : '预算分配（Allocated Budget）'
                    },
                     {
                        value : [5000, 14000, 28000, 31000, 42000, 21000],
                        name : '实际开销（Actual Spending）'
                    }
                ]
            }]
        };
        return option;
    };
    
    var makeRadar02 = function(){
        var option = {
            title: {
                text: '浏览器占比变化',
                subtext: '纯属虚构',
                x:'right',
                y:'bottom'
            },
            tooltip: {
                trigger: 'item',
                backgroundColor : 'rgba(0,0,250,0.2)'
            },
            legend: {
                data: (function (){
                    var list = [];
                    for (var i = 1; i <=28; i++) {
                        list.push(i + 2000 + '');
                    }
                    return list;
                })()
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            visualMap: {
                color: ['red', 'yellow'],
                calculable: true
            },
            radar: {
               indicator : [
                   { text: 'IE8-', max: 400},
                   { text: 'IE9+', max: 400},
                   { text: 'Safari', max: 400},
                   { text: 'Firefox', max: 400},
                   { text: 'Chrome', max: 400}
                ]
            },
            series : (function (){
                var series = [];
                for (var i = 1; i <= 28; i++) {
                    series.push({
                        name:'浏览器（数据纯属虚构）',
                        type: 'radar',
                        symbol: 'none',
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                  width:1
                                }
                            },
                            emphasis : {
                                areaStyle: {color:'rgba(0,250,0,0.3)'}
                            }
                        },
                        data:[
                          {
                            value:[
                                (40 - i) * 10,
                                (38 - i) * 4 + 60,
                                i * 5 + 10,
                                i * 9,
                                i * i /2
                            ],
                            name: i + 2000 + ''
                          }
                        ]
                    });
                }
                return series;
            })()
        };
        return option;
    };
    
    var makeFunnel01 = function(){
        var option = {
            title: {
                text: '漏斗图',
                subtext: '纯属虚构'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}%"
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            legend: {
                data: ['展现','点击','访问','咨询','订单']
            },
            calculable: true,
            series: [
                {
                    name:'漏斗图',
                    type:'funnel',
                    left: '10%',
                    top: 60,
                    //x2: 80,
                    bottom: 60,
                    width: '80%',
                    // height: {totalHeight} - y - y2,
                    min: 0,
                    max: 100,
                    minSize: '0%',
                    maxSize: '100%',
                    sort: 'descending',
                    gap: 2,
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        },
                        emphasis: {
                            textStyle: {
                                fontSize: 20
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            length: 10,
                            lineStyle: {
                                width: 1,
                                type: 'solid'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#fff',
                            borderWidth: 1
                        }
                    },
                    data: [
                        {value: 60, name: '访问'},
                        {value: 40, name: '咨询'},
                        {value: 20, name: '订单'},
                        {value: 80, name: '点击'},
                        {value: 100, name: '展现'}
                    ]
                }
            ]
        };
        return option;
    };
    
    var makeFunnel02 = function(){
        var option = {
            title: {
                text: '漏斗图',
                subtext: '纯属虚构'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}%"
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            legend: {
                data: ['展现','点击','访问','咨询','订单']
            },
            series: [
                {
                    name: '预期',
                    type: 'funnel',
                    left: '10%',
                    width: '80%',
                    label: {
                        normal: {
                            formatter: '{b}预期'
                        },
                        emphasis: {
                            position:'inside',
                            formatter: '{b}预期: {c}%'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            opacity: 0.7
                        }
                    },
                    data: [
                        {value: 60, name: '访问'},
                        {value: 40, name: '咨询'},
                        {value: 20, name: '订单'},
                        {value: 80, name: '点击'},
                        {value: 100, name: '展现'}
                    ]
                },
                {
                    name: '实际',
                    type: 'funnel',
                    left: '10%',
                    width: '80%',
                    maxSize: '80%',
                    label: {
                        normal: {
                            position: 'inside',
                            formatter: '{c}%',
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        emphasis: {
                            position:'inside',
                            formatter: '{b}实际: {c}%'
                        }
                    },
                    itemStyle: {
                        normal: {
                            opacity: 0.5,
                            borderColor: '#fff',
                            borderWidth: 2
                        }
                    },
                    data: [
                        {value: 30, name: '访问'},
                        {value: 10, name: '咨询'},
                        {value: 5, name: '订单'},
                        {value: 50, name: '点击'},
                        {value: 80, name: '展现'}
                    ]
                }
            ]
        };
        return option;
    };
    
    var makeGauge01 = function(){
        var option = {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}%"
            },
            toolbox: {
                feature: {
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                {
                    name: '业务指标',
                    type: 'gauge',
                    detail: {formatter:'{value}%'},
                    data: [{value: 50, name: '完成率'}]
                }
            ]
        };
        return option;
    }
    
	return {
		makeBar01 : makeBar01,      //标准柱状图
		makeBar02 : makeBar02,      //堆积柱状图
        makeBar03 : makeBar03,      //标准条形图
        makeBar04 : makeBar04,      //堆积条形图    
        makeLine01 : makeLine01,    //标准折线图
        makeLine02 : makeLine02,    //堆积区域图
        makeLine03 : makeLine03,    //平滑折线图
        makePie01 : makePie01,      //标准饼图
        makePie02 : makePie02,      //标准环形图
        makePie03 : makePie03,      //嵌套环形图 
        makePie04 : makePie04,      //南丁格尔玫瑰图
        makePie05 : makePie05,      //双玫瑰图
        makeMap01 : makeMap01,      //标准中国地图
        makeMap02 : makeMap02,      //标准世界地图
        makeMap03 : makeMap03,      //香港地图
        makeMap04 : makeMap04,      //中国地图(扩展)
        makeScatter01 : makeScatter01,   //标准散点图
        makeScatter02 : makeScatter02,   //散点图与中国地图
        makeScatter03 : makeScatter03,   //散点图（值域漫游）
        makeRadar01 : makeRadar01,       //标准雷达图
        makeRadar02 : makeRadar02,       //雷达图（值域漫游）
        makeFunnel01 : makeFunnel01,     //标准漏斗图 
        makeFunnel02 : makeFunnel02,     //漏斗图(带辅助背景) 
        makeGauge01 : makeGauge01        //仪表盘
	};
});