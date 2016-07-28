define(['knockout', 'echarts'],function(ko, echarts){
	var bindConfig = function(option){
		var title = option.title[0];
		self.titleContent = ko.observable(title.text);     
		self.titleTop = ko.observable(title.top);			 
		self.titleLeft = ko.observable(title.left);        
		self.titleFontFamily = ko.observableArray(["SimSun","Microsoft YaHei","sans-serif","SimHei","KaiTi"]);   
		self.selectedFontFamily = ko.observable(title.textStyle.fontFamily);
		self.titleFontSize = ko.observable(title.textStyle.fontSize);
		self.titleFontWeight = ko.observableArray(["normal","bold","bolder","lighter"]);
		self.selectedFontWeight = ko.observable(title.textStyle.fontWeight);
		self.titleFontStyle = ko.observableArray(["normal","italic","oblique"]);
		self.selectedFontStyle = ko.observable(title.textStyle.fontStyle);
		self.titleFontColor = ko.observable(title.textStyle.color)

		self.subtitleContent = ko.observable(title.subtext);     
		self.subtitleFontFamily = ko.observableArray(["SimSun","Microsoft YaHei","sans-serif","SimHei","KaiTi"]);   
		self.subselectedFontFamily = ko.observable(title.subtextStyle.fontFamily);
		self.subtitleFontSize = ko.observable(title.subtextStyle.fontSize);
		self.subtitleFontWeight = ko.observableArray(["normal","bold","bolder","lighter"]);
		self.subselectedFontWeight = ko.observable(title.subtextStyle.fontWeight);
		self.subtitleFontStyle = ko.observableArray(["normal","italic","oblique"]);
		self.subselectedFontStyle = ko.observable(title.subtextStyle.fontStyle);

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

		var series = option.series[0]
		self.seriesBarGap = ko.observable(series.barGap);
		self.seriesBarShowLabel = ko.observableArray(["显示","不显示"]);
		if(series.label.normal.show == false){
			self.selectedSeriesBarShowLabel = ko.observable("不显示");
		}else if(series.label.normal.show == true){
			self.selectedSeriesBarShowLabel = ko.observable("显示");
		}

		var grid = option.grid[0]
		self.gridTop = ko.observable(grid.top);
		self.gridBottom = ko.observable(grid.bottom);
		self.gridLeft = ko.observable(grid.left);
		self.gridRight = ko.observable(grid.right);

		var optionChart = echarts.init(document.getElementById("optionContainer"));
		ko.computed(function(){
			//title
			option.title[0].text = self.titleContent();
			option.title[0].top = self.titleTop();
			option.title[0].left = self.titleLeft();
			option.title[0].textStyle.fontFamily = self.selectedFontFamily();
			option.title[0].textStyle.fontSize = self.titleFontSize();
			option.title[0].textStyle.fontWeight = self.selectedFontWeight();
			option.title[0].textStyle.fontStyle = self.selectedFontStyle();
			option.title[0].textStyle.color  = self.titleFontColor();
			//suntitle
			option.title[0].subtext = self.subtitleContent();
			option.title[0].subtextStyle.fontFamily = self.subselectedFontFamily();
			option.title[0].subtextStyle.fontSize = self.subtitleFontSize();
			option.title[0].subtextStyle.fontWeight = self.subselectedFontWeight();
			option.title[0].subtextStyle.fontStyle = self.subselectedFontStyle();
			//legend
			if(self.selectedLegendShow() == "不显示"){
				option.legend[0].show = false;
			}else if(self.selectedLegendShow() == "显示"){
				option.legend[0].show = true;
			}
			option.legend[0].top = self.legendTop();
			option.legend[0].left = self.legendLeft();
			console.log(self.selectedLegendOrient());
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
			//tooltip
			if(self.selectedToolTipShow() == "不显示"){
				option.tooltip[0].show = false;
			}else if(self.selectedToolTipShow() == "显示"){
				option.tooltip[0].show = true;
			}
			option.tooltip[0].borderWidth = parseInt(self.tooltipBorderWidth());
			option.tooltip[0].textStyle.fontFamily = self.tooltipFontFamily();
			option.tooltip[0].textStyle.fontSize = parseInt(self.tooltipFontSize());
			option.tooltip[0].textStyle.fontWeight = self.tooltipFontWeight();
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
			option.grid[0].top = self.gridTop();
			option.grid[0].left = self.gridLeft();
			option.grid[0].right = self.gridRight();
			option.grid[0].bottom = self.gridBottom();
			
			optionChart.setOption(option,true);
		});
	};


	return {
		bindConfig : bindConfig
	}
});