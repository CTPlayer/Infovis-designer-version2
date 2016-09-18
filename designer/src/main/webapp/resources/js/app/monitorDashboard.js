require.config({
    baseUrl: 'js',
    paths: {
        "jquery": "lib/bootstrap/js/jquery-2.1.4.min",
        "echarts": "lib/charts/echarts.min"
    }
});

require(['jquery','echarts'], function($,echarts){
// 基于准备好的dom，初始化echarts实例
    var myChart_WeekWarning = echarts.init($('#analysis-week-warning')[0]);
    var myChart_top5 = echarts.init($('#analysis-top5')[0]);
    var myChart_warncategory = echarts.init($('#warning-category')[0]);


    // 指定图表的配置项和数据
    var option_weekwarning = {
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid:{
            show:false,
            top:10,
            bottom:20,
            left:40,
            right:5
        },
        xAxis : {
            splitLine:{
                show:false
            },
            axisLabel:{
                textStyle:{
                    color:'#818181',
                    fontSize : 10
                },
                interval:0
            },
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis : {
            splitLine:{
                show:false
            },
            axisLabel:{
                textStyle:{
                    color:'#818181',
                    fontSize : 10
                }
            }
        },
        series : [
            {
                name: '警告量',
                type: 'bar',
                itemStyle:{
                    normal:{
                        color:'#4bffd1'
                    }
                },
                barWidth : 10,
                barCategoryGap :'10',
                data: [5, 20, 36, 10, 10, 20,110]
            }
        ]
    };

    var option_top5 = {
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid:{
            show:false,
            top:20,
            bottom:10,
            left:80,
            right:5
        },
        xAxis : {
            position:'top',
            splitLine:{
                show:false
            },
            axisLabel:{
                textStyle:{
                    color:'#818181',
                    fontSize : 10
                }
            }
        },
        yAxis : {
            splitLine:{
                show:false
            },
            axisLabel:{
                textStyle:{
                    color:'#818181',
                    fontSize : 10
                },
                interval:0
            },
            data: ['阳光逆变器', '汇流箱', '升压变压器', '升压器', '逆变器']
        },
        series : [
            {
                name: '警告量',
                type: 'bar',
                itemStyle:{
                    normal:{
                        color:'#4bffd1'
                    }
                },
                barWidth : 10,
                barCategoryGap :'10',
                data: [5, 20, 36, 10, 10]
            }
        ]
    };


    var option_warn_category = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'horizontal',
            left: 'center',
            bottom:'0',
            data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                radius: ['20%', '50%'],
                avoidLabelOverlap: false,
                center:["50%","40%"],
                label: {
                    normal: {
                        show:true,
                        formatter:"{c}"
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
                        show: true
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



    // 使用刚指定的配置项和数据显示图表。
    myChart_WeekWarning.setOption(option_weekwarning);
    myChart_top5.setOption(option_top5);
    myChart_warncategory.setOption(option_warn_category);
});

