define(['knockout', 'echarts'],function(ko, echarts){
        
    var bindTable = function(option){
        var initialData01 = [{name: "村衫",value: 5},{name: "羊毛衫",value: 20},{name: "雪纺衫",value: 36},{name: "裤子",value: 10},
                             {name: "高跟鞋",value: 10},{name: "袜子",value: 20}]

        var initialData02 = {legend: "销量"} 

        var data = [];                                  //声明一个空数组，将每一个对象绑定观察后添加到此数组中
        for(var i=0;i<initialData01.length;i++){
            data.push({name: ko.observable(initialData01[i].name),value: ko.observable(initialData01[i].value)});
        }

        self.contacts = ko.observableArray(data);       //对数组进行监控

        var optionChart = echarts.init(document.getElementById("optionContainer"));
        ko.computed(function(){
            var Axis = [];
            for(var i=0;i<ko.toJS(self.contacts()).length;i++){
               Axis.push(ko.toJS(self.contacts())[i].name);
            }

            option.xAxis[0].data = Axis;
            option.series[0].data = ko.toJS(self.contacts());   
            optionChart.setOption(option);
        })
    };
    
    return {
        bindTable : bindTable
    }
});