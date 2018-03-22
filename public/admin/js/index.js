$(function () {
   var  picTableFirst=document.querySelector(".picTable:first-child");
    var firstCarts = echarts.init(picTableFirst);
    var option = {
        title: {
            text: '2017年注册人数'
        },
        tooltip: {},
        legend: {
            data:['数量']
        },
        xAxis: {
            data: ["阿迪","耐克","新百伦","李宁","361°","乔丹"]
        },
        yAxis: {},
        series: [{
            name: '数量',
            type: 'bar',
            data: [500, 2000, 360, 1000, 1000, 2900]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    firstCarts.setOption(option);

    var  picTableSecond=document.querySelector(".picTable:last-child");
    var secondCarts = echarts.init(picTableSecond);
    option = {
        backgroundColor: '#2c343c',

        title: {
            text: 'Customized Pie',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#ccc'
            }
        },

        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series : [
            {
                name:'访问来源',
                type:'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data:[
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:274, name:'联盟广告'},
                    {value:235, name:'视频广告'},
                    {value:400, name:'搜索引擎'}
                ].sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',
                label: {
                    normal: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#c23531',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    secondCarts.setOption(option);
});