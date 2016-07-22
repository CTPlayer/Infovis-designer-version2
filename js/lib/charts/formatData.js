define(function(){    
    var template =  '<td><input type="text" value=""></td>'+
                    '<td><input type="text" value=""></td>'+
                    '<td><input type="text" value=""></td>'+
                    '<td><input type="text" value=""></td>'+
                    '<td><input type="text" value=""></td>'+
                    '<td><input type="text" value=""></td>'+
                    '<td><input type="text" value=""></td>'+
                    '<td><input type="text" value=""></td>'+
                    '<td><input type="text" value=""></td>'+
                    '<td><input type="text" value=""></td>';
                    
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
    }                
                    
    var getDataOfPie = function(opt){
        var legendData = opt.legend.data;
        var series = opt.series;
        
        var table = '<table class="table table-bordered">'+
                        '<tr><td></td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td></tr>'+
                        '<tr>'+
                            '<td>1</td>';
                            
                           
        for(var i=0;i<series.length;i++){
            for(var i=0;i<series.length;i++){
                table += '<td><input type="text" value=""></td>'+
                         '<td><input type="text" value="'+series[i].name+'"></td>'
            }
        }                
                              
        if((11 - series.length*2)>0){
            for(var i=0;i<(11 - series.length*2);i++){
                table += '<td><input type="text" value=""></td>'
            }
        }
        
        table += '</tr>';
        
        
        if(series.length>1){
            var length0 = series[0].data.length;
            var length1 = series[1].data.length;
            if(length0>length1||length0==length1){
                for(var i=0;i<length1;i++){
                    table += '<tr>'+
                           '<td>'+(i+2)+'</td>'+
                            '<td><input type="text" value="'+series[0].data[i].name+'"></td>'+
                            '<td><input type="text" value="'+series[0].data[i].value+'"></td>'+
                            '<td><input type="text" value="'+series[1].data[i].name+'"></td>'+
                            '<td><input type="text" value="'+series[1].data[i].value+'"></td>'+
                            '<td><input type="text" value=""></td>'+
                            '<td><input type="text" value=""></td>'+
                            '<td><input type="text" value=""></td>'+
                            '<td><input type="text" value=""></td>'+   
                            '<td><input type="text" value=""></td>'+
                            '<td><input type="text" value=""></td>'+
                            '<td><input type="text" value=""></td>'+   
                            '<td><input type="text" value=""></td>'+
                        ' </tr>';   
                }
                for(var i=length1;i<length0;i++){
                    table += '<tr>'+
                           '<td>'+(i+2)+'</td>'+
                            '<td><input type="text" value="'+series[0].data[i].name+'"></td>'+
                                template+
                        ' </tr>';
                }
                 for(var i=0;i<170;i++){
                    table += '<tr>'+
                                '<td>'+(i+length0+2)+'</td>'+
                                '<td><input type="text" value=""></td>'+
                                '<td><input type="text" value=""></td>'+
                                    template+
                             ' </tr>';
                }
                table += '</table>';
            }else if(length0<length1){
                for(var i=0;i<length0;i++){
                    table += '<tr>'+
                           '<td>'+(i+2)+'</td>'+
                            '<td><input type="text" value="'+series[0].data[i].name+'"></td>'+
                            '<td><input type="text" value="'+series[0].data[i].value+'"></td>'+
                            '<td><input type="text" value="'+series[1].data[i].name+'"></td>'+
                            '<td><input type="text" value="'+series[1].data[i].value+'"></td>'+
                            '<td><input type="text" value=""></td>'+
                            '<td><input type="text" value=""></td>'+
                            '<td><input type="text" value=""></td>'+
                            '<td><input type="text" value=""></td>'+   
                            '<td><input type="text" value=""></td>'+
                            '<td><input type="text" value=""></td>'+
                            '<td><input type="text" value=""></td>'+   
                            '<td><input type="text" value=""></td>'+
                        ' </tr>';   
                }
                for(var i=length0;i<length1;i++){
                    table += '<tr>'+
                           '<td>'+(i+2)+'</td>'+
                            '<td><input type="text" value=""></td>'+
                            '<td><input type="text" value=""></td>'+
                            '<td><input type="text" value="'+series[1].data[i].name+'"></td>'+
                            '<td><input type="text" value="'+series[1].data[i].value+'"></td>'+
                            '<td><input type="text" value=""></td>'+
                            '<td><input type="text" value=""></td>'+
                            '<td><input type="text" value=""></td>'+
                            '<td><input type="text" value=""></td>'+   
                            '<td><input type="text" value=""></td>'+
                            '<td><input type="text" value=""></td>'+
                            '<td><input type="text" value=""></td>'+   
                            '<td><input type="text" value=""></td>'+
                        ' </tr>';
                }
                 for(var i=0;i<170;i++){
                    table += '<tr>'+
                                '<td>'+(i+length1+2)+'</td>'+
                                '<td><input type="text" value=""></td>'+
                                '<td><input type="text" value=""></td>'+
                                    template+
                             ' </tr>';
                }
                table += '</table>';
            }
        }else{
            var length0 = series[0].data.length;
            for(var i=0;i<length0;i++){
                table += '<tr>'+
                       '<td>'+(i+2)+'</td>'+
                        '<td><input type="text" value="'+series[0].data[i].name+'"></td>'+
                        '<td><input type="text" value="'+series[0].data[i].value+'"></td>'+
                         template+
                    ' </tr>';   
            }
             for(var i=0;i<170;i++){
                table += '<tr>'+
                            '<td>'+(i+length0+2)+'</td>'+
                            '<td><input type="text" value=""></td>'+
                            '<td><input type="text" value=""></td>'+
                                template+                             
                         ' </tr>';
            }
            table += '</table>';
        }
        
        return table;
    }

	return {
        getDataOfPie : getDataOfPie,
        tableOfBar : tableOfBar
	};
});