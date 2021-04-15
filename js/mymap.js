

let world = echarts.init($('.map .geo')[0])
world.setOption(option_world_get,'chalk', {renderer: 'canvas'})

let pie = echarts.init($('.pie')[0]);
pie.setOption(option_pie_get, 'chalk', {renderer: 'canvas'});

let line = echarts.init($('.lines .line')[0]);
line.setOption(option_line_all, 'chalk', {renderer: 'canvas'})

let line2 = echarts.init($('.lines2 .line')[0]);
line2.setOption(option_line_all2, 'chalk',{renderer: 'canvas'})

let doubleline = echarts.init($('.doubleline .line')[0]);
doubleline.setOption(option_doubleline_all,'chalk', {renderer: 'canvas'})

let newsData = []


$(document).ready(function(){
    let mapTitle = $(".map .title")
    let btn_group = $(".map .btn-group>a")
    const btn_get = $(".map .btn-group>a:eq(0)")
    const btn_death = $(".map .btn-group>a:eq(1)")
    const btn_health = $(".map .btn-group>a:eq(2)")
    //累积确诊
    $(".map .btn-group>a:eq(0)").click(function(){
        btn_get.addClass("active").siblings().removeClass('active')
        mapTitle.text("累积确诊人数")
        world.setOption(option_world_get,'chalk', {renderer: 'canvas'})
        pie.setOption(option_pie_get, 'chalk', {renderer: 'canvas'});
    })
    //累积死亡
    $(".map .btn-group>a:eq(1)").click(function(){
        btn_death.addClass('active').siblings().removeClass('active')
        mapTitle.text("累积死亡人数")
        world.setOption(option_world_death,'chalk', {renderer: 'canvas'})
        pie.setOption(option_pie_death, 'chalk', {renderer: 'canvas'});
    })
    //累积治愈
    $(".map .btn-group>a:eq(2)").click(function(){
        btn_health.addClass('active').siblings().removeClass('active')
        mapTitle.text("累积治愈人数")
        world.setOption(option_world_health,'chalk', {renderer: 'canvas'})
        pie.setOption(option_pie_health, 'chalk', {renderer: 'canvas'});
    })

    $(".map .btn-group>a:eq(0)").click()

    $.getJSON('http://cdn.zjhwork.xyz/vsfileserver/keyword.json',data=> {
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



    //事件委托
    $('.news').on('click', ' a', function () {
        //点击当前的a 加类名 active  他的兄弟删除类名
        $(this).addClass('active').siblings().removeClass('active');
        //获取一一对应的下标 
        var index = $(this).index();
        //选取content 然后狗日对应下标的 显示   当前的兄弟.content隐藏
        $('.content').eq(index).show().siblings('.content').hide();
    });
    //滚动
    //原理：把marquee下面的子盒子都复制一遍 加入到marquee中
    //      然后动画向上滚动，滚动到一半重新开始滚动
    //因为选取的是两个marquee  所以要遍历
    $('.news .marquee').each(function (index, dom) {
        //将每个 的所有子级都复制一遍
        var rows = $(dom).children().clone();
        //再将新的到的加入原来的
        $(dom).append(rows);
    });
})