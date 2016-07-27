define(function(){    
    var tableOfBar = function(){
        var table = '<table class="table table-bordered">'+
                        '<tr><td></td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td></tr>'+
                        '<tr>'+
                            '<td>1</td>'+
                            '<td><input ></td>'+
                            '<!-- ko foreach: legends -->'+
                                '<td><input data-bind="value: legend, valueUpdate: \'keyup\'"></td>'+
                            '<!-- /ko -->'+
                            '<td><input ></td>'+
                            '<td><input ></td>'+
                            '<td><input ></td>'+
                            '<td><input ></td>'+
                            '<td><input ></td>'+
                            '<td><input ></td>'+
                        '</tr>'+  
                        '<!-- ko foreach: contacts -->'+
                         '<tr>'+
                            '<td data-bind="text: index"></td>'+
                            '<td><input data-bind="value: name, valueUpdate: \'keyup\'"></td>'+
                            '<!-- ko foreach: {data : value} -->'+
                            '<td><input data-bind="value: v, valueUpdate: \'keyup\'"></td>'+
                            '<!-- /ko -->'+
                            '<td><input ></td>'+
                            '<td><input ></td>'+
                            '<td><input ></td>'+
                            '<td><input ></td>'+
                            '<td><input ></td>'+
                            '<td><input ></td>'+
                        '</tr>'+
                        '<!-- /ko -->'+
                    '</table>';
        return table;    
    }; 

    var configOfBar = function(){
        var config = ['<div class="tab-pane active" id="option01">',
                            '<div>',
                                '<span style="color:#5D5BA8;margin-top;10px;">主标题</span>',
                                '<hr style="margin-top:10px;">',
                                '<form role="form">',
                                    '<div class="form-group form-group-sm">',
                                        '<label >内容&nbsp;&nbsp;</label>',
                                        '<input class="form-control" data-bind="value: titleContent, valueUpdate: \'keyup\'">',
                                    '</div>',
                                    '<div class="form-group form-group-sm">',
                                        '<label >上边距&nbsp;&nbsp;</label>',
                                        '<input type="number" class="form-control" data-bind="value: titleTop, valueUpdate: \'keyup\'">',
                                    '</div>',
                                    '<div class="form-group form-group-sm">',
                                        '<label >左边距&nbsp;&nbsp;</label>',
                                        '<input type="number" class="form-control" data-bind="value: titleLeft, valueUpdate: \'keyup\'">',
                                    '</div>',
                                    '<div class="form-group form-group-sm">',
                                        '<label >字体&nbsp;&nbsp;</label>',
                                        '<select class="form-control" data-bind="options: titleFontFamily, value: selectedFontFamily, valueUpdate: \'keyup\'"></select>',
                                    '</div>',
                                    '<div class="form-group form-group-sm">',
                                        '<label >字号&nbsp;&nbsp;</label>',
                                        '<input type="number" class="form-control" data-bind="value: titleFontSize, valueUpdate: \'keyup\'">',
                                    '</div>',
                                    '<div class="form-group form-group-sm">',
                                        '<label >粗细&nbsp;&nbsp;</label>',
                                        '<select class="form-control" data-bind="options: titleFontWeight, value: selectedFontWeight, valueUpdate: \'keyup\'"></select>',
                                    '</div>',
                                    '<div class="form-group form-group-sm">',
                                        '<label >风格&nbsp;&nbsp;</label>',
                                        '<select class="form-control" data-bind="options: titleFontStyle, value: selectedFontStyle, valueUpdate: \'keyup\'"></select>',
                                    '</div>',
                                '</form>',
                            '</div>',
                      '</div>',
                      '<div class="tab-pane" id="option02">配置2.</div>',
                      '<div class="tab-pane" id="option03">配置3.</div>',
                      '<div class="tab-pane" id="option04">配置3.</div>'].join("");

        return config;
    };
                    
	return {
        tableOfBar : tableOfBar,
        configOfBar : configOfBar
	};
});