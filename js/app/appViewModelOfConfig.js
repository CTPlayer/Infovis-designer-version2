define(['knockout', 'echarts'],function(ko, echarts){
	var bindConfig = function(option){
		var title = option.title[0];
		self.titleContent = ko.observable(title.text);     //标题内容
		self.titleTop = ko.observable(title.top);			 //标题上边距
		self.titleLeft = ko.observable(title.left);        //标题左边距
		self.titleFontFamily = ko.observableArray(["SimSun","Microsoft YaHei","sans-serif","SimHei","KaiTi"]);   //标题字体
		self.selectedFontFamily = ko.observable(title.textStyle.fontFamily);
		self.titleFontSize = ko.observable(title.textStyle.fontSize);
		self.titleFontWeight = ko.observableArray(["normal","bold","bolder","lighter"]);
		self.selectedFontWeight = ko.observable(title.textStyle.fontWeight);
		self.titleFontStyle = ko.observableArray(["normal","italic","oblique"]);
		self.selectedFontStyle = ko.observable(title.textStyle.fontStyle);

		var optionChart = echarts.init(document.getElementById("optionContainer"));
		ko.computed(function(){
			option.title[0].text = self.titleContent();
			option.title[0].top = self.titleTop();
			option.title[0].left = self.titleLeft();
			option.title[0].textStyle.fontFamily = self.selectedFontFamily();
			option.title[0].textStyle.fontSize = self.titleFontSize();
			option.title[0].textStyle.fontWeight = self.selectedFontWeight();
			option.title[0].textStyle.fontStyle = self.selectedFontStyle();
			optionChart.setOption(option,true);
		});
	};

	return {
		bindConfig : bindConfig
	}
});