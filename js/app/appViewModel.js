define(['knockback'],function(kb){
    var viewmodel = function(){
        bob = new Backbone.Model({name: 5,name: 6})
        //fred = new Backbone.Model({name: 'Fred'})
       // house = new Backbone.Model({
         // occupants: new Backbone.Collection([bob, fred])
        //})
        //bob.set({livesIn: house})
        //fred.set({livesIn: house})
        
        var view_model = kb.viewModel(bob)
        
        return view_model;
    }
    
    var viewModel01 = function(){
       /* var axisData = opt.xAxis[0].data;
        if(!('data' in opt.xAxis[0])){                             //判断X轴和Y轴是否对调
            axisData = opt.yAxis[0].data;
        }
        var series = opt.series;*/
        
        model01 = new Backbone.Model({l1: '销量'})
        model02 = new Backbone.Model({
                                        "x1": "村衫",
                                        "x2": "羊毛衫",
                                        "x3": "雪纺衫",
                                        "x4": "裤子",
                                        "x5": "高跟鞋",
                                        "x6": "袜子"
                                    })
        model03 = new Backbone.Model({x1s1: 5,x2s1: 20,x3s1: 36,x4s1: 10,x5s1: 10,x6s1: 20})
        
        model = new Backbone.Model({
            occupants: new Backbone.Collection([model01, model02, model03])
        })
        
        var view_model = kb.viewModel(model);
        
        return view_model;
    }
    
    return {
        viewmodel : viewmodel,
        viewModel01 : viewModel01
    }
});