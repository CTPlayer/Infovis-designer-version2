define(['knockout', 'infovis'],function(ko, infovis){
        
    var bindTableAndConfigOfBarAndLine = function(option,engine){
        var type = option.series[0].type;
        var initialData01 = [];           //数据格式： {value:[...],name:...}
        var initialData02 = [];           //数据格式： {legend:...}

        var lgd = option.legend[0].data;      //图例数据
        var axis;                             //轴数据
        if("data" in option.xAxis[0]){
            axis = option.xAxis[0].data;
        }else{
            axis = option.yAxis[0].data;
        }
        var ser = option.series;                //series部分

        //将基础数据从option中抽取组装
        for(var x=0;x<axis.length;x++){
            var value = [];
            for(var y=0;y<lgd.length;y++){
                value.push(ser[y].data[x]);
            }
            initialData01.push({name: axis[x],value: value});
        }

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

        var title = option.title[0];
        self.titleContent = ko.observable(title.text);     
        self.titleTop = ko.observable(title.top);
        self.titleLeft = ko.observableArray(["left","center","right"]);
        self.selectedLeft = ko.observable(title.left);
        self.titleFontFamily = ko.observableArray(["SimSun","Microsoft YaHei","sans-serif","SimHei","KaiTi"]);   
        self.selectedFontFamily = ko.observable(title.textStyle.fontFamily);
        self.titleFontSize = ko.observable(title.textStyle.fontSize);
        self.titleFontWeight = ko.observableArray(["normal","bold","bolder","lighter"]);
        self.selectedFontWeight = ko.observable(title.textStyle.fontWeight);
        self.titleFontStyle = ko.observableArray(["normal","italic","oblique"]);
        self.selectedFontStyle = ko.observable(title.textStyle.fontStyle);
        self.titleFontColor = ko.observable(title.textStyle.color);
        $("#titleFontColor").spectrum({
            color: title.textStyle.color,
            change: function(color) {
                self.titleFontColor(color.toHexString());
            }
        });

        self.subtitleContent = ko.observable(title.subtext);
        self.subtitleLocation = ko.observableArray(["left","center","right"]);
        self.subselectedLocation = ko.observable(title.textAlign);
        self.subtitleFontFamily = ko.observableArray(["SimSun","Microsoft YaHei","sans-serif","SimHei","KaiTi"]);   
        self.subselectedFontFamily = ko.observable(title.subtextStyle.fontFamily);
        self.subtitleFontSize = ko.observable(title.subtextStyle.fontSize);
        self.subtitleFontWeight = ko.observableArray(["normal","bold","bolder","lighter"]);
        self.subselectedFontWeight = ko.observable(title.subtextStyle.fontWeight);
        self.subtitleFontStyle = ko.observableArray(["normal","italic","oblique"]);
        self.subselectedFontStyle = ko.observable(title.subtextStyle.fontStyle);
        self.subtitleFontColor = ko.observable(title.subtextStyle.color);
        $("#subtitleFontColor").spectrum({
            color: title.subtextStyle.color,
            change: function(color) {
                self.subtitleFontColor(color.toHexString());
            }
        });

        var legend = option.legend[0];
        self.legendShow = ko.observableArray(["显示","不显示"]);
        if(legend.show == false){
            self.selectedLegendShow = ko.observable("不显示");
        }else if(legend.show == true){
            self.selectedLegendShow = ko.observable("显示");
        }
        self.legendTop = ko.observable(legend.top);
        self.legendLeft = ko.observable(legend.left);
        self.legendOrient = ko.observableArray(["横向","纵向"]);
        if(legend.orient = "horizontal"){
            self.selectedLegendOrient = ko.observable("横向");
        }else if(legend.orient = "vertical"){
            self.selectedLegendOrient = ko.observable("纵向");
        }
        self.legendItemGap = ko.observable(legend.itemGap);
        self.legendIcon = ko.observableArray(["rect","circle","roundRect","triangle","diamond","pin","arrow"]);
        self.selectedLegendIcon = ko.observable(legend.icon);
        self.legendFontFamily = ko.observableArray(["SimSun","Microsoft YaHei","sans-serif","SimHei","KaiTi"]);
        self.selectedLegendFontFamily = ko.observable(legend.textStyle.fontFamily);
        self.legendFontSize = ko.observable(legend.textStyle.fontSize);
        self.legendFontWeight = ko.observableArray(["normal","bold","bolder","lighter"]);
        self.selectedLegendFontWeight = ko.observable(legend.textStyle.fontWeight);
        self.legendFontColor = ko.observable(legend.textStyle.color);
        $("#legendFontColor").spectrum({
            color: legend.textStyle.color,
            change: function(color) {
                self.legendFontColor(color.toHexString());
            }
        });

        var tooltip = option.tooltip[0];
        self.tooltipShow = ko.observableArray(["显示","不显示"]);
        if(tooltip.show == false){
            self.selectedToolTipShow = ko.observable("不显示");
        }else if(tooltip.show == true){
            self.selectedToolTipShow = ko.observable("显示");
        }
        self.tooltipBorderWidth = ko.observable(tooltip.borderWidth);
        self.tooltipFontFamily = ko.observableArray(["SimSun","Microsoft YaHei","sans-serif","SimHei","KaiTi"]);
        self.selectedToolTipFontFamily = ko.observable(tooltip.textStyle.fontFamily);
        self.tooltipFontSize = ko.observable(tooltip.textStyle.fontSize);
        self.tooltipFontWeight = ko.observableArray(["normal","bold","bolder","lighter"]);
        self.selectedToolTipFontWeight = ko.observable(tooltip.textStyle.fontWeight);
        self.tooltipBorderColor = ko.observable(tooltip.borderColor);
        $("#tooltipBorderColor").spectrum({
            color: tooltip.borderColor,
            change: function(color) {
                self.tooltipBorderColor(color.toHexString());
            }
        });
        self.tooltipBackgroundColor = ko.observable(tooltip.backgroundColor);
        $("#tooltipBackgroundColor").spectrum({
            color: tooltip.backgroundColor,
            change: function(color) {
                self.tooltipBackgroundColor(color.toHexString());
            }
        });
        self.tooltipFontColor = ko.observable(tooltip.textStyle.color);
        $("#tooltipFontColor").spectrum({
            color: tooltip.textStyle.color,
            change: function(color) {
                self.tooltipFontColor(color.toHexString());
            }
        });

        var series = option.series[0];
        self.seriesBarGap = ko.observable(series.barGap);
        self.seriesBarShowLabel = ko.observableArray(["显示","不显示"]);
        if(series.label.normal.show == false){
            self.selectedSeriesBarShowLabel = ko.observable("不显示");
        }else if(series.label.normal.show == true){
            self.selectedSeriesBarShowLabel = ko.observable("显示");
        }

        var grid = option.grid[0];
        self.gridTop = ko.observable(grid.top);
        self.gridBottom = ko.observable(grid.bottom);
        self.gridLeft = ko.observable(grid.left);
        self.gridRight = ko.observable(grid.right);

        var optionChart = engine.chart.init(document.getElementById("optionContainer"));
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

            if("data" in option.xAxis[0]){
                option.xAxis[0].data = Axis;
            }else{
                option.yAxis[0].data = Axis;
            }
            option.legend[0].data = legends;


            //title
            option.title[0].text = self.titleContent();
            option.title[0].top = self.titleTop();
            option.title[0].left = self.selectedLeft();
            option.title[0].textStyle.fontFamily = self.selectedFontFamily();
            option.title[0].textStyle.fontSize = self.titleFontSize();
            option.title[0].textStyle.fontWeight = self.selectedFontWeight();
            option.title[0].textStyle.fontStyle = self.selectedFontStyle();
            option.title[0].textStyle.color  = self.titleFontColor();

            //subtitle
            option.title[0].subtext = self.subtitleContent();
            option.title[0].textAlign = self.subselectedLocation();
            option.title[0].subtextStyle.fontFamily = self.subselectedFontFamily();
            option.title[0].subtextStyle.fontSize = self.subtitleFontSize();
            option.title[0].subtextStyle.fontWeight = self.subselectedFontWeight();
            option.title[0].subtextStyle.fontStyle = self.subselectedFontStyle();
            option.title[0].subtextStyle.color  = self.subtitleFontColor();

            //legend
            if(self.selectedLegendShow() == "不显示"){
                option.legend[0].show = false;
            }else if(self.selectedLegendShow() == "显示"){
                option.legend[0].show = true;
            }
            option.legend[0].top = self.legendTop();
            option.legend[0].left = self.legendLeft();
            if(self.selectedLegendOrient() == "横向"){
                option.legend[0].orient = "horizontal";
            }else if(self.selectedLegendOrient() == "纵向"){
                option.legend[0].orient = "vertical";
            }
            option.legend[0].itemGap = parseInt(self.legendItemGap());
            option.legend[0].icon = self.selectedLegendIcon();
            option.legend[0].textStyle.fontFamily = self.selectedLegendFontFamily();
            option.legend[0].textStyle.fontSize = parseInt(self.legendFontSize());
            option.legend[0].textStyle.fontWeight = self.selectedLegendFontWeight();
            option.legend[0].textStyle.color = self.legendFontColor();

            //tooltip
            if(self.selectedToolTipShow() == "不显示"){
                option.tooltip[0].show = false;
            }else if(self.selectedToolTipShow() == "显示"){
                option.tooltip[0].show = true;
            }
            option.tooltip[0].borderWidth = parseInt(self.tooltipBorderWidth());
            option.tooltip[0].textStyle.fontFamily = self.selectedToolTipFontFamily();
            option.tooltip[0].textStyle.fontSize = parseInt(self.tooltipFontSize());
            option.tooltip[0].textStyle.fontWeight = self.selectedToolTipFontWeight();
            option.tooltip[0].borderColor = self.tooltipBorderColor();
            option.tooltip[0].backgroundColor = self.tooltipBackgroundColor();
            option.tooltip[0].textStyle.color = self.tooltipFontColor();

            //series
            option.series[0].barGap = self.seriesBarGap();
            if(self.selectedSeriesBarShowLabel() == "不显示"){
                for(var i=0;i<option.series.length;i++){
                    option.series[i].label.normal.show = false;
                } 
            }else if(self.selectedSeriesBarShowLabel() == "显示"){
                for(var i=0;i<option.series.length;i++){
                    option.series[i].label.normal.show = true;
                } 
            }

            //grid
            option.grid[0].top = self.gridTop()+'%';
            option.grid[0].left = self.gridLeft()+'%';
            option.grid[0].right = self.gridRight()+'%';
            option.grid[0].bottom = self.gridBottom()+'%';

            optionChart.setOption(option,true);
        })
    };

    var bindTableAndConfigOfPie = function(option,engine){
        var type = option.series[0].type;
        var initialData01 = [];
        var initialData02 = [];

        var series = option.series[0];
        for(var i=0;i<series.data.length;i++){
            initialData01.push({value: [series.data[i].value],name: series.data[i].name});
        }
        initialData02.push({legend: series.name});

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

        var title = option.title[0];
        self.titleContent = ko.observable(title.text);
        self.titleTop = ko.observable(title.top);
        self.titleLeft = ko.observableArray(["left","center","right"]);
        self.selectedLeft = ko.observable(title.left);
        self.titleFontFamily = ko.observableArray(["SimSun","Microsoft YaHei","sans-serif","SimHei","KaiTi"]);
        self.selectedFontFamily = ko.observable(title.textStyle.fontFamily);
        self.titleFontSize = ko.observable(title.textStyle.fontSize);
        self.titleFontWeight = ko.observableArray(["normal","bold","bolder","lighter"]);
        self.selectedFontWeight = ko.observable(title.textStyle.fontWeight);
        self.titleFontStyle = ko.observableArray(["normal","italic","oblique"]);
        self.selectedFontStyle = ko.observable(title.textStyle.fontStyle);
        self.titleFontColor = ko.observable(title.textStyle.color);
        $("#titleFontColor").spectrum({
            color: title.textStyle.color,
            change: function(color) {
                self.titleFontColor(color.toHexString());
            }
        });

        self.subtitleContent = ko.observable(title.subtext);
        self.subtitleLocation = ko.observableArray(["left","center","right"]);
        self.subselectedLocation = ko.observable(title.textAlign);
        self.subtitleFontFamily = ko.observableArray(["SimSun","Microsoft YaHei","sans-serif","SimHei","KaiTi"]);
        self.subselectedFontFamily = ko.observable(title.subtextStyle.fontFamily);
        self.subtitleFontSize = ko.observable(title.subtextStyle.fontSize);
        self.subtitleFontWeight = ko.observableArray(["normal","bold","bolder","lighter"]);
        self.subselectedFontWeight = ko.observable(title.subtextStyle.fontWeight);
        self.subtitleFontStyle = ko.observableArray(["normal","italic","oblique"]);
        self.subselectedFontStyle = ko.observable(title.subtextStyle.fontStyle);
        self.subtitleFontColor = ko.observable(title.subtextStyle.color);
        $("#subtitleFontColor").spectrum({
            color: title.subtextStyle.color,
            change: function(color) {
                self.subtitleFontColor(color.toHexString());
            }
        });

        var legend = option.legend[0];
        self.legendShow = ko.observableArray(["显示","不显示"]);
        if(legend.show == false){
            self.selectedLegendShow = ko.observable("不显示");
        }else if(legend.show == true){
            self.selectedLegendShow = ko.observable("显示");
        }
        self.legendTop = ko.observable(legend.top);
        self.legendLeft = ko.observable(legend.left);
        self.legendOrient = ko.observableArray(["横向","纵向"]);
        if(legend.orient = "horizontal"){
            self.selectedLegendOrient = ko.observable("横向");
        }else if(legend.orient = "vertical"){
            self.selectedLegendOrient = ko.observable("纵向");
        }
        self.legendItemGap = ko.observable(legend.itemGap);
        self.legendIcon = ko.observableArray(["rect","circle","roundRect","triangle","diamond","pin","arrow"]);
        self.selectedLegendIcon = ko.observable(legend.icon);
        self.legendFontFamily = ko.observableArray(["SimSun","Microsoft YaHei","sans-serif","SimHei","KaiTi"]);
        self.selectedLegendFontFamily = ko.observable(legend.textStyle.fontFamily);
        self.legendFontSize = ko.observable(legend.textStyle.fontSize);
        self.legendFontWeight = ko.observableArray(["normal","bold","bolder","lighter"]);
        self.selectedLegendFontWeight = ko.observable(legend.textStyle.fontWeight);
        self.legendFontColor = ko.observable(legend.textStyle.color);
        $("#legendFontColor").spectrum({
            color: legend.textStyle.color,
            change: function(color) {
                self.legendFontColor(color.toHexString());
            }
        });

        var tooltip = option.tooltip[0];
        self.tooltipShow = ko.observableArray(["显示","不显示"]);
        if(tooltip.show == false){
            self.selectedToolTipShow = ko.observable("不显示");
        }else if(tooltip.show == true){
            self.selectedToolTipShow = ko.observable("显示");
        }
        self.tooltipBorderWidth = ko.observable(tooltip.borderWidth);
        self.tooltipFontFamily = ko.observableArray(["SimSun","Microsoft YaHei","sans-serif","SimHei","KaiTi"]);
        self.selectedToolTipFontFamily = ko.observable(tooltip.textStyle.fontFamily);
        self.tooltipFontSize = ko.observable(tooltip.textStyle.fontSize);
        self.tooltipFontWeight = ko.observableArray(["normal","bold","bolder","lighter"]);
        self.selectedToolTipFontWeight = ko.observable(tooltip.textStyle.fontWeight);
        self.tooltipBorderColor = ko.observable(tooltip.borderColor);
        $("#tooltipBorderColor").spectrum({
            color: tooltip.borderColor,
            change: function(color) {
                self.tooltipBorderColor(color.toHexString());
            }
        });
        self.tooltipBackgroundColor = ko.observable(tooltip.backgroundColor);
        $("#tooltipBackgroundColor").spectrum({
            color: tooltip.backgroundColor,
            change: function(color) {
                self.tooltipBackgroundColor(color.toHexString());
            }
        });
        self.tooltipFontColor = ko.observable(tooltip.textStyle.color);
        $("#tooltipFontColor").spectrum({
            color: tooltip.textStyle.color,
            change: function(color) {
                self.tooltipFontColor(color.toHexString());
            }
        });

        var series = option.series[0];
        self.seriesBarGap = ko.observable(series.barGap);
        self.seriesBarShowLabel = ko.observableArray(["显示","不显示"]);
        if(series.label.normal.show == false){
            self.selectedSeriesBarShowLabel = ko.observable("不显示");
        }else if(series.label.normal.show == true){
            self.selectedSeriesBarShowLabel = ko.observable("显示");
        }
        self.gridCenter = ko.observable(series.center);
        

        var optionChart = engine.chart.init(document.getElementById("optionContainer"));

        ko.computed(function(){
            var legends = [];
            for(var i=0;i<ko.toJS(self.legends()).length;i++){
                legends.push(ko.toJS(self.legends())[i].legend);
                option.series[i].name = ko.toJS(self.legends())[i].legend;
            }

            option.legend[0].data = legends;
            var value = [];
            for(var i=0;i<ko.toJS(self.contacts()).length;i++){
                value.push({name: ko.toJS(self.contacts())[i].name,value: ko.toJS(self.contacts())[i].value[0].v});
            }
            option.series[0].data = value;

            //title
            option.title[0].text = self.titleContent();
            option.title[0].top = self.titleTop();
            option.title[0].left = self.selectedLeft();
            option.title[0].textStyle.fontFamily = self.selectedFontFamily();
            option.title[0].textStyle.fontSize = self.titleFontSize();
            option.title[0].textStyle.fontWeight = self.selectedFontWeight();
            option.title[0].textStyle.fontStyle = self.selectedFontStyle();
            option.title[0].textStyle.color  = self.titleFontColor();

            //subtitle
            option.title[0].subtext = self.subtitleContent();
            option.title[0].textAlign = self.subselectedLocation();
            option.title[0].subtextStyle.fontFamily = self.subselectedFontFamily();
            option.title[0].subtextStyle.fontSize = self.subtitleFontSize();
            option.title[0].subtextStyle.fontWeight = self.subselectedFontWeight();
            option.title[0].subtextStyle.fontStyle = self.subselectedFontStyle();
            option.title[0].subtextStyle.color  = self.subtitleFontColor();

            //legend
            if(self.selectedLegendShow() == "不显示"){
                option.legend[0].show = false;
            }else if(self.selectedLegendShow() == "显示"){
                option.legend[0].show = true;
            }
            option.legend[0].top = self.legendTop();
            option.legend[0].left = self.legendLeft();
            if(self.selectedLegendOrient() == "横向"){
                option.legend[0].orient = "horizontal";
            }else if(self.selectedLegendOrient() == "纵向"){
                option.legend[0].orient = "vertical";
            }
            option.legend[0].itemGap = parseInt(self.legendItemGap());
            option.legend[0].icon = self.selectedLegendIcon();
            option.legend[0].textStyle.fontFamily = self.selectedLegendFontFamily();
            option.legend[0].textStyle.fontSize = parseInt(self.legendFontSize());
            option.legend[0].textStyle.fontWeight = self.selectedLegendFontWeight();
            option.legend[0].textStyle.color = self.legendFontColor();

            //tooltip
            if(self.selectedToolTipShow() == "不显示"){
                option.tooltip[0].show = false;
            }else if(self.selectedToolTipShow() == "显示"){
                option.tooltip[0].show = true;
            }
            option.tooltip[0].borderWidth = parseInt(self.tooltipBorderWidth());
            option.tooltip[0].textStyle.fontFamily = self.selectedToolTipFontFamily();
            option.tooltip[0].textStyle.fontSize = parseInt(self.tooltipFontSize());
            option.tooltip[0].textStyle.fontWeight = self.selectedToolTipFontWeight();
            option.tooltip[0].borderColor = self.tooltipBorderColor();
            option.tooltip[0].backgroundColor = self.tooltipBackgroundColor();
            option.tooltip[0].textStyle.color = self.tooltipFontColor();

            //series
            option.series[0].barGap = self.seriesBarGap();
            if(self.selectedSeriesBarShowLabel() == "不显示"){
                for(var i=0;i<option.series.length;i++){
                    option.series[i].label.normal.show = false;
                }
            }else if(self.selectedSeriesBarShowLabel() == "显示"){
                for(var i=0;i<option.series.length;i++){
                    option.series[i].label.normal.show = true;
                }
            }
            option.series[0].center = self.gridCenter()+'%';


            optionChart.setOption(option,true);
        })
    };
    
    return {
        bindTableAndConfigOfBarAndLine : bindTableAndConfigOfBarAndLine,
        bindTableAndConfigOfPie : bindTableAndConfigOfPie
    }
});