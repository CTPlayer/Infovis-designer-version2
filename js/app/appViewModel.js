define(['knockout', 'echarts'],function(ko, echarts){
        
    var bindTable = function(option){
        var lgd = option.legend[0].data;      //图例数据
        var axis = option.xAxis[0].data;       //x轴数据
        var ser = option.series;                //series部分

        //将基础数据从option中抽取组装
        var initialData01 = [];
        for(var x=0;x<axis.length;x++){
            var value = [];
            for(var y=0;y<lgd.length;y++){
                value.push(ser[y].data[x]);
            }
            initialData01.push({name: axis[x],value: value});
        }

        var initialData02 = [];
        for(var i=0;i<lgd.length;i++){
            initialData02.push({legend: lgd[i]});
        }

        //绑定并观察
        var data = [];                                  //声明一个空数组，将每一个对象绑定观察后添加到此数组中
        for(var i=0;i<initialData01.length;i++){
            var value = [];                                                             //对应不同列的值
            for(var x=0;x<initialData01[i].value.length;x++){
                value.push({v:ko.observable(initialData01[i].value[x])});               //v对应数组value中每一项的值
            }
            data.push({name: ko.observable(initialData01[i].name),value: value,index: (i+2)});
        }

        var tip = []
        for(var i=0;i<initialData02.length;i++){
            tip.push({legend: ko.observable(initialData02[i].legend)});
        }

        self.contacts = ko.observableArray(data);       //对数组进行监控
        self.legends = ko.observableArray(tip);
        
        var optionChart = echarts.init(document.getElementById("optionContainer"));
        //每次被观察的数据变动后调用下列方法
        ko.computed(function(){
            var Axis = [];
            for(var i=0;i<ko.toJS(self.contacts()).length;i++){
               Axis.push(ko.toJS(self.contacts())[i].name);
            }

            var legends = [];
            for(var i=0;i<ko.toJS(self.legends()).length;i++){
                legends.push(ko.toJS(self.legends())[i].legend);    
                option.series[i].name = ko.toJS(self.legends())[i].legend;            
            }

            for(var i=0;i<ko.toJS(self.legends()).length;i++){
                var data = [];
                for(var y=0;y<ko.toJS(self.contacts()).length;y++){
                    data.push(ko.toJS(self.contacts())[y].value[i].v);
                 }
                option.series[i].data = data;
            }
            
            option.xAxis[0].data = Axis;
            option.legend[0].data = legends; 
            optionChart.setOption(option,true);
        })
    };
    
    return {
        bindTable : bindTable
    }
});