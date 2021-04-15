
let china = echarts.init($('.map .geo')[0])
china.setOption(option_china_map_get,'dark', {renderer: 'canvas'})

let pie = echarts.init($('.pie')[0]);
pie.setOption(option_china_pie_get, 'chalk', {renderer: 'canvas'});

let doubleline = echarts.init($('.doubleline .line')[0]);
doubleline.setOption(option_china_doubleline_all,'chalk', {renderer: 'canvas'})

$(document).ready(function(){
    $.getJSON('http://cdn.zjhwork.xyz/vsfileserver/chinese_keyword.json',data=> {
        newsData = data.data;
        console.log(newsData);
        newsData.forEach(item=> {
                const time = item["时间"];
                const href = item["链接"];
                const from = item["数据来源"];
                const title = item["标题"];
                const dom = `<div class="row">
                        <span class="col">${from}</span>
                        <span class="col"><a  href="${href}">${title}</a></span>
                        <span class="col">${dateFormat("YYYY-mm-dd", new Date(time))}</span>
                        <span class="icon-dot"></span>
                    </div>`;
                $(".news .marquee").append($(dom));

            });
    })
})