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
                    
    var getDataOfBarAndLine = function(opt){                        //折线图和饼图
        var axisData = opt.xAxis[0].data;
        if(!('data' in opt.xAxis[0])){                             //判断X轴和Y轴是否对调
            axisData = opt.yAxis[0].data;
        }
        var series = opt.series;
        var table = '<table class="table table-bordered">'+
                        '<tr><td></td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td></tr>'+
                        '<tr>'+
                            '<td>1</td>'+
                            '<td><input type="text"></td>';
                           
                        
        for(var i=0;i<series.length;i++){
            table += '<td><input type="text" value="'+series[i].name+'"></td>'
        }               
        
        if((11 - series.length)>0){
            for(var i=0;i<(11 - series.length);i++){
                table += '<td><input type="text" value=""></td>'
            }
        }
        
        table += '</tr>';
        
        for(var i=0;i<axisData.length;i++){
            table += '<tr>'+
                       '<td>'+(i+2)+'</td>'+
                        '<td><input type="text" value="'+axisData[i]+'"></td>'
                        for(var x=0;x<series.length;x++){
                            table += '<td><input type="text" value="'+series[x].data[i]+'"></td>'
                        }
                        if(11-series.length){
                            for(var x=0;x<(11-series.length);x++){
                                table += '<td><input type="text" value=""></td>'
                            }
                        }
                     +' </tr>';
        }
        
        for(var i=0;i<170;i++){
            table += '<tr>'+
                        '<td>'+(i+axisData.length+2)+'</td>'+
                            template+
                        '<td><input type="text" value=""></td>'+   
                        '<td><input type="text" value=""></td>'+
                     ' </tr>';
        }
        table += '</table>';
        return table;
    };
    
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
        getDataOfBarAndLine : getDataOfBarAndLine,
        getDataOfPie : getDataOfPie
	};
});