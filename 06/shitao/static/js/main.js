function selectAllDels(){
    var allCheckBoxs=document.getElementsByName("preDelCheck");
    var desc=document.getElementById("allChecked");
    var selectOrUn=false;
    for (var i = 0;i < allCheckBoxs.length;i++){
        if(allCheckBoxs[i].checked){
            selectOrUn=true;
            break;
        }
    }
    if (selectOrUn){
        allUnchecked(allCheckBoxs);
    }else{
        allchecked(allCheckBoxs);
    }
}


function allchecked(allCheckBoxs){
    for (var i = 0;i < allCheckBoxs.length;i++){
        allCheckBoxs[i].checked = true;
    }
}

function  allUnchecked(allCheckBoxs){
    for (var i = 0;i < allCheckBoxs.length;i++){
        allCheckBoxs[i].checked = false;
    }
}


function fastop(id,servername){
    var serverid = id;
    var servername = servername;
    $("#serverid-fastop").empty();
    $("#servername-fastop").empty();
    $("#serverid-fastop").append(serverid);
    $("#servername-fastop").append(servername);
    $('#Modal-fastop').modal('show');
}


function fastopsubmit(){
    var serverid=$('#serverid-fastop').text();
    $.ajax({
        type: "POST",
        url: "/fastop",
        data: {"serverid": serverid},
        dataType: "json",
        success: function (data) {
            window.open('/opresults?Optype=fastop' + '&OP=' + data.OP + '&opid=' + data.opid + '&listLen=1');
        },
        error: function (data) {
            $('.h4-cusmodal').text('后台data返回错误');
            $('.cus-modal').modal('show');
        }
    })
}


function btnAction(){
    var CheckBoxs=$('input[name="preDelCheck"]:checked').eq(0).val();
    $("#operation").empty();
    $("#upload").empty();
    $('#selectoptype').val('op-select');
    if (CheckBoxs){
        $("#selectServer").empty();
        $('input[name="preDelCheck"]:checked').each(function(){
            var SName=$("#Servername-"+$(this).val()).text();
            $("#selectServer").append(' '+SName+' ');
        })
        $('#myModal').modal('show');
    }
    else{
        $('.cus-modal').modal('show');
    }
}

function app_change(e){
    document.getElementById("updateapp").value = e;
}

function db_change(e){
    document.getElementById("updatedb").value = e;
}

function selectoptype(){
    $("#operation").empty();
    $("#svnrevision").remove();
    $("#upload").empty();
    var optype=$("#selectoptype").val();
    var CheckBoxs=$('input[name="preDelCheck"]:checked').eq(0).val();
    var CHidlist = []
    if (CheckBoxs){
        $('input[name="preDelCheck"]:checked').each(function(){
            var CHid=$("#Channelid-"+$(this).val()).text();
            CHidlist.push(CHid);
        })
    }
    if (optype == "op-app") {
        if (CHidlist[0] == "500") {
            $("#operation").append('<select class="selectoperation form-control" onchange="selectappop()">' +
                '<option value="startlogin">启动login服</option>' +
                '<option value="stoplogin">关闭login服</option>' +
                '<option value="restartlogin">重启login服</option>' +
                '<option value="backuplogin">备份login服代码</option>' +
                '<option value="updatelogin">更新login服代码</option>' +
                '<option value="updategw">更新网关代码</option>' +
                '<option value="rollbacklogin">回滚login服代码</option>' +
                '<option value="buildlogin">编译提交login代码</option>' +
                '<option value="errorlog">10分钟内错误日志</option>' +
                '<option value="gamelog">login日志</option>' +
                '</select>');
        }
        else {
            $("#operation").append('<select class="selectoperation form-control" onchange="selectappop()">' +
                                             '<option value="startgame">启动game服</option>' +
                                             '<option value="stopgame">关闭game服</option>' +
                                             '<option value="restartgame">重启game服</option>' +
                                             '<option value="backupgame">备份game服代码</option>' +
                                             '<option value="updategame">更新game服代码</option>' +
                			     '<option value="updategw">更新网关代码</option>' +
                                             '<option value="rollbackgame">回滚game服代码</option>' +
                                             '<option value="buildgame">编译提交game代码</option>' +
                                             '<option value="errorlog">10分钟内错误日志</option>' +
                                             '<option value="load_config">重新加载配置文件</option>' +
                                             '<option value="load_d_charge_up">重新加载充值数据</option>' +
                                             '<option value="reload_scenario">重新载入动画和GVE</option>' +
                                             '<option value="reloaddb">重新加载d开头表</option>' +
                                             '<option value="reloadcmd">重新加载指令类</option>' +
                                             '<option value="reload_lua">重新加载Lua脚本</option>' +
                                             '<option value="gang_match_system_save">保存帮派战当天报名和比赛数据</option>' +
                                             '<option value="reload_gang_match_system">重新加载帮会比赛数据</option>' +
                                             '<option value="gang_match_system_day_heartbeat">帮派战日期变更心跳</option>' +
                                             '<option value="save_all_player">保存所有在线角色的数据</option>' +
                                             '<option value="gamelog">游戏日志</option>' +
                                         '</select>');
        }
    }
    else if (optype == "op-db"){
        if (CHidlist[0] == "500"){
            $("#operation").append('<select class="selectoperation form-control" onchange="selectdbop()">' +
                                             '<option value="backuplogin">备份hunterlogin库</option>' +
                                             '<option value="updatelogin">更新hunterlogin库</option>' +
                                             '<option value="checkbackuplogin">检查备份</option>' +
                                         '</select>');
        }
        else {
            $("#operation").append('<select class="selectoperation form-control" onchange="selectdbop()">' +
                                             '<option value="backupgame">备份huntergame库</option>' +
                                             '<option value="updategame">更新huntergame库</option>' +
                                             '<option value="checkbackupgame">检查备份</option>' +
                                         '</select>');
        }
    }
  else if (optype == "op-gw"){
	if (CHidlist[0] == "2000"){
		$("#operation").append('<select class="selectoperation form-control" onchange="selectdbop()">' +
                                             '<option value="restrtgw">重启网关</option>' +
                                         '</select>');
	}			

    }	
}


function selectappop(){
    $("#svnrevision").remove();
    var optype=$("#selectoptype").val();
    var operation=$(".selectoperation").val();
    if (optype == "op-app"){
        if (operation == "rollbackgame" || operation == "rollbacklogin"){
            $("#operation").after('<p id="svnrevision"><input type="text" class="form-control" id="input-svnrevision" placeholder=""></p>')
        }
    }
}


function selectdbop(){
    $("#upload").empty();
    var optype=$("#selectoptype").val();
    var operation=$(".selectoperation").val();
    if (optype == "op-db"){
        if (operation == "updategame" || operation == "updatelogin") {
            $("#upload").append('<form action="" method="post" enctype="multipart/form-data"><div><input type="text" readonly="readonly" name="updatedb" id="updatedb"/>' +
                '<input type="file" name="btn_dbfile" id="btn_dbfile" style="display:none" onchange="db_change(this.value)"/>' +
                '<input type="button" value="浏 览" onclick="btn_dbfile.click();" name="get_file"/></div></form>');
        }
    }
}


function operationsubmit(){
    var optype=$("#selectoptype").val();
    var operation=$(".selectoperation").val();
    var svnrevision=$("#input-svnrevision").val();
    var updatedb=$("#btn_dbfile").val();
    var CheckBoxs=$('input[name="preDelCheck"]:checked').eq(0).val();
    var list=new Array();
    if (CheckBoxs){
        $('input[name="preDelCheck"]:checked').each(function(){
            var SIp=$("#Ip-"+$(this).val()).text();
            var Server=$("#Servername-"+$(this).val()).text();
            var Sdir=$("#Gamedir-"+$(this).val()).text();
            var SPort=$("#Gameport-"+$(this).val()).text();
            var Channelid=$("#Channelid-"+$(this).val()).text();
            var Opservername=$("#Opservername-"+$(this).val()).text();
            var Opdir=$("#Opdir-"+$(this).val()).text();
            list.push({'SIp':SIp,'Server':Server,'Sdir':Sdir,'SPort':SPort,'Opservername':Opservername,'Opdir':Opdir,'Optype':optype,'Channelid':Channelid,'Operation':operation,'Updatedb':updatedb,"svnrevision":svnrevision});
        })
    }
    if (optype == "op-select"){
        $('.h4-cusmodal').text('请选择操作类型');
        $('.cus-modal').modal('show');
    }
    else if (optype == "op-app") {
        if (list[0]['Channelid'] == "500"){
            if (operation == "gamelog") {
                for (i = 0; i < list.length; i++) {
                    if (list[i]['SPort'] == "10002") {
                        window.open('http://' + list[i]['SIp'] + '/logs/login1_log/')
                    }
                    else if (list[i]['SPort'] == "20002") {
                        window.open('http://' + list[i]['SIp'] + '/logs/login2_log/')
                    }
                    else {
                        window.open('http://' + list[i]['SIp'] + '/logs/')
                    }
                }
            }
            else if (operation == "rollbacklogin"){
                if (svnrevision == "") {
                    $('.h4-cusmodal').text('svn修正号不能为空');
                    $('.cus-modal').modal('show');
                }
                else {
                    var listLen = JSON.stringify(list.length);
                    var list = JSON.stringify(list);
                    $.ajax({
                        type: "POST",
                        url: "/operation",
                        data: {"list": list},
                        dataType: "json",
                        success: function (data) {
                            window.open('/opresults?Optype=' + data.Optype + '&Opclassify=app-login' + '&OP=' + data.OP + '&opid=' + data.opid + '&listLen=' + listLen);
                        },
                        error: function (data) {
                            $('.h4-cusmodal').text('后台data返回错误');
                            $('.cus-modal').modal('show');
                        }
                    })
                }
            }
            else {
                var listLen = JSON.stringify(list.length);
                var list = JSON.stringify(list);
                $.ajax({
                    type: "POST",
                    url: "/operation",
                    data: {"list": list},
                    dataType: "json",
                    success: function (data) {
                        window.open('/opresults?Optype=' + data.Optype + '&Opclassify=app-login' + '&OP=' + data.OP + '&opid=' + data.opid + '&listLen=' + listLen);
                    },
                    error: function (data) {
                        $('.h4-cusmodal').text('后台data返回错误');
                        $('.cus-modal').modal('show');
                    }
                })
            }
        }
        else {
            if (operation == "gamelog") {
                for (i = 0; i < list.length; i++) {
                    if (list[i]['SPort'] == "11800") {
                        window.open('http://' + list[i]['SIp'] + '/logs/game1_log/')
                    }
                    else if (list[i]['SPort'] == "21800") {
                        window.open('http://' + list[i]['SIp'] + '/logs/game2_log/')
                    }
                    else {
                        window.open('http://' + list[i]['SIp'] + '/logs/')
                    }
                }
            }
            else if (operation == "rollbackgame") {
                if (svnrevision == "") {
                    $('.h4-cusmodal').text('svn修正号不能为空');
                    $('.cus-modal').modal('show');
                }
                else {
                    var listLen = JSON.stringify(list.length);
                    var list = JSON.stringify(list);
                    $.ajax({
                        type: "POST",
                        url: "/operation",
                        data: {"list": list},
                        dataType: "json",
                        success: function (data) {
                            window.open('/opresults?Optype=' + data.Optype + '&Opclassify=app-game' + '&OP=' + data.OP + '&opid=' + data.opid + '&listLen=' + listLen);
                        },
                        error: function (data) {
                            $('.h4-cusmodal').text('后台data返回错误');
                            $('.cus-modal').modal('show');
                        }
                    })
                }
            }
            else {
                var listLen = JSON.stringify(list.length);
                var list = JSON.stringify(list);
                $.ajax({
                    type: "POST",
                    url: "/operation",
                    data: {"list": list},
                    dataType: "json",
                    success: function (data) {
                        window.open('/opresults?Optype=' + data.Optype + '&Opclassify=app-game' + '&OP=' + data.OP + '&opid=' + data.opid + '&listLen=' + listLen);
                    },
                    error: function (data) {
                        $('.h4-cusmodal').text('后台data返回错误');
                        $('.cus-modal').modal('show');
                    }
                })
            }
        }
    }
    else if (optype == "op-db"){
        if (list[0]['Channelid'] == "500") {
            var listLen = JSON.stringify(list.length);
            var list = JSON.stringify(list);
            if (operation == "updatelogin") {
                if (updatedb == "") {
                    $('.h4-cusmodal').text('请选择需要更新文件');
                    $('.cus-modal').modal('show');
                }
                else {
                    $.ajaxFileUpload({
                        url: "/operation",
                        data: {"list": list},
                        secureuri: false,
                        fileElementId: "btn_dbfile",
                        dataType: "json",
                        success: function (data) {
                            window.open('/opresults?Optype=' + data.Optype + '&Opclassify=db-login' + '&OP=' + data.OP + '&opid=' + data.opid + '&listLen=' + listLen);
                        },
                        error: function (data) {
                            $('.h4-cusmodal').text('后台data返回错误');
                            $('.cus-modal').modal('show');
                        }
                    });
                }
            }
            else {
                $.ajax({
                    type: "POST",
                    url: "/operation",
                    data: {"list": list},
                    dataType: "json",
                    success: function (data) {
                        window.open('/opresults?Optype=' + data.Optype + '&Opclassify=db-login' + '&OP=' + data.OP + '&opid=' + data.opid + '&listLen=' + listLen);
                    },
                    error: function (data) {
                        $('.h4-cusmodal').text('后台data返回错误');
                        $('.cus-modal').modal('show');
                    }
                })
            }
        }
        else {
            var listLen = JSON.stringify(list.length);
            var list = JSON.stringify(list);
            if (operation == "updategame") {
                if (updatedb == "") {
                    $('.h4-cusmodal').text('请选择需要更新文件');
                    $('.cus-modal').modal('show');
                }
                else {
                    $.ajaxFileUpload({
                        url: "/operation",
                        data: {"list": list},
                        secureuri: false,
                        fileElementId: "btn_dbfile",
                        dataType: "json",
                        success: function (data) {
                            window.open('/opresults?Optype=' + data.Optype + '&Opclassify=db-game' + '&OP=' + data.OP + '&opid=' + data.opid + '&listLen=' + listLen);
                        },
                        error: function (data) {
                            $('.h4-cusmodal').text('后台data返回错误');
                            $('.cus-modal').modal('show');
                        }
                    });
                }
            }
            else {
                $.ajax({
                    type: "POST",
                    url: "/operation",
                    data: {"list": list},
                    dataType: "json",
                    success: function (data) {
                        window.open('/opresults?Optype=' + data.Optype + '&Opclassify=db-game' + '&OP=' + data.OP + '&opid=' + data.opid + '&listLen=' + listLen);
                    },
                    error: function (data) {
                        $('.h4-cusmodal').text('后台data返回错误');
                        $('.cus-modal').modal('show');
                    }
                })
            }
        }
    }
}

function selectuserop(pagenum){
    $('.add-userop').remove();
    $('.div-pagination').remove();
    var selectuser=$('#selectuser').val();
    var starttime=$('.input-starttime').val();
    var stoptime=$('.input-stoptime').val();
    var startTimes=starttime.substring(0,10).split('-');
    var stopTimes=stoptime.substring(0,10).split('-');
    startTime=startTimes[1]+'-'+startTimes[2]+'-'+startTimes[0]+' '+starttime.substring(11,16)+':00';
    stopTime=stopTimes[1]+'-'+stopTimes[2]+'-'+stopTimes[0]+' '+stoptime.substring(11,16)+':00';
    var diff=(Date.parse(stopTime.replace("-", "/").replace("-", "/"))-Date.parse(startTime.replace("-", "/").replace("-", "/")))/3600/1000;
    if (selectuser == "用 户") {
        $('.h4-cusmodal').text('请选择要查询用户');
        $('.cus-modal').modal('show');
    }
    else if(starttime == "2014-11-20 00:00"){
        $('.h4-cusmodal').text('请选择开始时间');
        $('.cus-modal').modal('show');
    }
    else if(stoptime == "2014-11-20 00:00"){
        $('.h4-cusmodal').text('请选择结束时间');
        $('.cus-modal').modal('show');
    }
    else if(diff <= 0){
        $('.h4-cusmodal').text('结束时间必须大于开始时间');
        $('.cus-modal').modal('show');
    }
    else {
        $.ajax({
            type: "GET",
            url: "/selectuserop",
            data: {"selectuser": selectuser, "starttime": starttime, "stoptime": stoptime,"pagenum": pagenum},
            dataType: "json",
            success: function (data) {
                for (var i=0;i<data.length;i++){
                    var sdata = data[i]['selectdata'];
                    for (var j=0;j<sdata.length;j++) {
                        if (j == "0") {
                            url = '/opresults?OP=' + sdata[j].operation + '&opid=' + data[i].opid+'&listLen=' + sdata[j].serversum;
                            $(".tr-userop").after('<tr class="add-userop"><td>' + sdata[j].opid + '</td><td id = "serversum">'+sdata[j].serversum+'</td>'+'</td><td id = "sname'+sdata[j].opid+'">' + sdata[j].servername + '</td><td>' + sdata[j].operation + '</td><td>' + sdata[j].user + '</td><td>' + sdata[j].datetime + '</td><td><a href=' + url + ' target="_blank">查看</a></td></tr>');
                        }
                        else {
                            $('#sname'+sdata[j].opid+'').append(","+sdata[j].servername);
                        }
                    }
                }
                var currentpage = data[0].pagenum;
                var allpage = data[0].allpage;
                var priorpage = currentpage-1;
                var nextpage = currentpage+1;
                $(".tb-userop").after('<div class="div-pagination"><hr></hr><nav><ul class="pagination pull-right ul-pagination"><li class="laquo"><a class="page-a" onclick=selectuserop(1)>首页</a><a onclick=selectuserop('+priorpage+')>&laquo;</a></li><li class="active"><a class="realpage" onclick=selectuserop('+currentpage+')>'+currentpage+ '</a></li><li class="raquo"><a onclick=selectuserop('+nextpage+')>&raquo;</a><a class="page-a" onclick=selectuserop('+allpage+')>末页</a></li></ul></nav></div>');
                var realpage = $('.realpage').html();
                if (realpage == 1) {
                   $('.laquo').remove();
                }
                if (realpage == allpage) {
                    $('.raquo').remove();
                }
            },
            error: function (data) {
                $('.h4-cusmodal').text('后台data返回错误');
                $('.cus-modal').modal('show');
            }
        })
    }
}


function addnewserver() {
    $('.resultsinfo').remove();
    var length = $("#table-envinit tr").length;
    $("#table-envinit").append('<tr>'+
                                '<td>'+length+'</td>'+
                                '<td>'+
                                    '<input type="text" class="form-control input-envinit" id="newserverip'+length+'" placeholder="">'+
                                '</td>'+
                                '<td>'+
                                    '<input type="text" class="form-control input-envinit" id="newpuppetagent'+length+'" placeholder="test.puppetgc.com">'+
                                '</td>'+
                                '<td></td>'+
                            '</tr>'
    )
}


function delnewserver(){
    $('.resultsinfo').remove();
    var length = $("#table-envinit tr").length;
    if (length<=2){
        $('#button-envinit').after('<div class="resultsinfo"><div class="alert alert-danger" role="alert">已经是最后一行！</div></div>')
    }else {
        $("tr:last").remove();
    }
}


function runprog(){
    $('#porg-envinit').show();
    var num=1;
    var myInterval = setInterval(function(){
        if (num > 90){
            clearInterval(myInterval);
        }else{
            $('.progress-bar').text(num+'%');
            $('.progress-bar').css('width', num+'%');
            num +=1;
        }
    },2000)
}


function envinit(){
    $('.resultsinfo').remove();
    var list=new Array();
    var iplist=new Array();
    var palist=new Array();
    var length = $("#table-envinit tr").length;
    var ipval = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    var ipnum = 0;
    var ipvalidnum = 0;
    var puppetagentnum = 0;
    for (var num = 1;num <= length-1; num++) {
        var newserverip = $('#newserverip'+num+'').val().replace(/(^\s*)|(\s*$)/g, "");
        var newpuppetagent = $('#newpuppetagent'+num+'').val().replace(/(^\s*)|(\s*$)/g, "");
        list.push({"newserverip":newserverip,"newpuppetagent":newpuppetagent});
        iplist.push(newserverip);
        palist.push(newpuppetagent);
        var valid = newserverip.match(ipval);
        if (newserverip == ""){
            $('.h4-cusmodal').text('ip地址不能为空');
            $('.cus-modal').modal('show');
            ipnum +=1;
        }
        else if (valid == null){
            $('.h4-cusmodal').text('ip地址无效');
            $('.cus-modal').modal('show');
            ipvalidnum +=1;
        }
        else if (newpuppetagent == ""){
            $('.h4-cusmodal').text('puppet客户端域名不能为空');
            $('.cus-modal').modal('show');
            puppetagentnum +=1;
        }
        else{
            ipnum +=0;
            ipvalidnum +=0;
            puppetagentnum +=0;
        }
    }
    iplist = jQuery.unique(iplist.sort());
    palist = jQuery.unique(palist.sort());
    if (ipnum != 0){
        $('.h4-cusmodal').text('ip地址不能为空');
        $('.cus-modal').modal('show');
    }
    else if (ipvalidnum != 0){
        $('.h4-cusmodal').text('ip地址无效');
        $('.cus-modal').modal('show');
    }
    else if (puppetagentnum != 0){
        $('.h4-cusmodal').text('puppet客户端域名不能为空');
        $('.cus-modal').modal('show');
    }
    else if (iplist.length != list.length){
        $('.h4-cusmodal').text('ip地址不能重复');
        $('.cus-modal').modal('show');
    }
    else if (palist.length != list.length){
        $('.h4-cusmodal').text('puppet客户端域名不能重复');
        $('.cus-modal').modal('show');
    }
    else {
        var listLen = JSON.stringify(list.length);
        var list = JSON.stringify(list);
        $.ajax({
            type: "POST",
            url: "/envinit",
            data: {"list":list},
            dataType: "json",
            success: function (data) {
                if (data['success'] == "true"){
                    window.open('/opresults?OP=' + data.OP + '&opid=' + data.opid + '&listLen='+listLen+'');
                }
                else {
                    $('#button-envinit').after('<div class="resultsinfo"><div class="alert alert-danger" role="alert">'+data['error']+'</div></div>')
                }
            },
            error: function (data){
                $('.h4-cusmodal').text('后台data返回错误');
                $('.cus-modal').modal('show');
            }
        })
    }
}


function serverdetailinfo(serverid){
    $('.add-serverdetailinfo').remove();
    $.ajax({
        type: "POST",
        url: "/serverdetailinfo",
        data: {"serverid":serverid},
        dataType: "json",
        success: function (data) {
            if (data['success'] == "true") {
                    var serverdata = data['hostdata'];
                    $('.serverdetailinfo-tr').after('<tr class="add-serverdetailinfo"><td>cpu</td><td>'+serverdata['cpu']+'</td></tr>');
                    $('.serverdetailinfo-tr').after('<tr class="add-serverdetailinfo"><td>硬盘</td><td>'+serverdata['disksize']+'</td></tr>');
                    $('.serverdetailinfo-tr').after('<tr class="add-serverdetailinfo"><td>内存</td><td>'+serverdata['memorysize']+'</td></tr>');
                    $('.serverdetailinfo-tr').after('<tr class="add-serverdetailinfo"><td>游戏状态</td><td>'+serverdata['status']+'</td></tr>');
                    $('.serverdetailinfo-tr').after('<tr class="add-serverdetailinfo"><td>游戏渠道id</td><td>'+serverdata['channelid']+'</td></tr>');
                    $('.serverdetailinfo-tr').after('<tr class="add-serverdetailinfo"><td>游戏组id</td><td>'+serverdata['zoneid']+'</td></tr>');
                    $('.serverdetailinfo-tr').after('<tr class="add-serverdetailinfo"><td>执行脚本服名</td><td>'+serverdata['opservername']+'</td></tr>');
                    $('.serverdetailinfo-tr').after('<tr class="add-serverdetailinfo"><td>执行脚本目录</td><td>'+serverdata['opdir']+'</td></tr>');
                    $('.serverdetailinfo-tr').after('<tr class="add-serverdetailinfo"><td>redis端口</td><td>'+serverdata['redisport']+'</td></tr>');
                    $('.serverdetailinfo-tr').after('<tr class="add-serverdetailinfo"><td>mysql端口</td><td>'+serverdata['dbport']+'</td></tr>');
                    $('.serverdetailinfo-tr').after('<tr class="add-serverdetailinfo"><td>游戏端口</td><td>'+serverdata['gameport']+'</td></tr>');
                    $('.serverdetailinfo-tr').after('<tr class="add-serverdetailinfo"><td>游戏目录</td><td>'+serverdata['gamedir']+'</td></tr>');
                    $('.serverdetailinfo-tr').after('<tr class="add-serverdetailinfo"><td>内网ip</td><td>'+serverdata['lanip']+'</td></tr>');
                    $('.serverdetailinfo-tr').after('<tr class="add-serverdetailinfo"><td>外网ip</td><td>'+serverdata['ip']+'</td></tr>');
                    $('.serverdetailinfo-tr').after('<tr class="add-serverdetailinfo"><td>游戏服名</td><td>'+serverdata['servername']+'</td></tr>');
                    $('.serverdetailinfo-tr').after('<tr class="add-serverdetailinfo"><td>id</td><td>'+serverdata['id']+'</td></tr>');
                    $('.serverdetailinfo-modal').modal('show');
//                    for (var key in data['hostdata']){
//                        $('.serverdetailinfo-tr').after('<tr class="add-serverdetailinfo"><td>'+key+'</td><td>'+data['hostdata'][key]+'</td></tr>');
//                        $('.serverdetailinfo-modal').modal('show');
//                    }
            }
            else {
                $('.h4-cusmodal').text(data['error']);
                $('.cus-modal').modal('show');
            }
        },
        error: function (data) {
            $('.h4-cusmodal').text('后台data返回错误');
            $('.cus-modal').modal('show');
        }
    })
}


function selectchangetype(){
    $('#addserver').remove();
    $('#updateserver').remove();
    $('#deleteserver').remove();
    var selectchangetype = $('#selectchangetype').val();
    if (selectchangetype == "addserver"){
        $('.div-detailinfo').append(''+
            '<div id="addserver">'+
                '<h4 class="p_changetype">添 加 游 戏 服</h4>'+
                '<div class="form-horizontal form-changeserver">'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="serverid" class="col-sm-2 control-label label-server">游戏id</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="serverid" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="serverip" class="col-sm-2 control-label label-server">ip地址</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="serverip" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="servername" class="col-sm-2 control-label label-server">游戏服名</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="servername" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="channelid" class="col-sm-2 control-label label-server">游戏渠道id</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="channelid" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="zoneid" class="col-sm-2 control-label label-server">游戏组id</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="zoneid" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="gamedir" class="col-sm-2 control-label label-server">游戏目录</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="gamedir" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="gameport" class="col-sm-2 control-label label-server">游戏端口</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="gameport" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="opdir" class="col-sm-2 control-label label-server">执行脚本目录</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="opdir" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="opservername" class="col-sm-2 control-label label-server">执行脚本服名</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="opservername" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="lanip" class="col-sm-2 control-label label-server">内网ip</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="lanip" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="dbport" class="col-sm-2 control-label label-server">mysql端口</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="dbport" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="redisport" class="col-sm-2 control-label label-server">redis端口</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="redisport" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="memorysize" class="col-sm-2 control-label label-server">内存</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="memorysize" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="disksize" class="col-sm-2 control-label label-server">硬盘</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="disksize" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="cpu" class="col-sm-2 control-label label-server">cpu</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="cpu" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver button-changeserver" id="button-addserver">'+
                    '<div class="col-sm-offset-2 col-sm-10">'+
                        '<button class="btn btn-primary btn-lg btn-custom" onclick="addserver()" data-target="#myModal">'+
                            '添加'+
                        '</button>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
            '</div>'
        );
    }
    else if (selectchangetype == "updateserver"){
        $('.div-detailinfo').append(''+
            '<div id="updateserver">'+
                '<h4 class="p_changetype">更 改 游 戏 服</h4>'+
                '<div class="form-horizontal form-changeserver">'+
                  '<div class="form-group form-changeserver">'+
                  '<label for="oldserverid" class="col-sm-2 control-label label-server">原游戏id</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="oldserverid" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="newserverid" class="col-sm-2 control-label label-server">新游戏id</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="newserverid" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="newserverip" class="col-sm-2 control-label label-server">新ip地址</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="newserverip" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="newservername" class="col-sm-2 control-label label-server">新游戏服名</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="newservername" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="newchannelid" class="col-sm-2 control-label label-server">新游戏渠道id</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="newchannelid" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="newzoneid" class="col-sm-2 control-label label-server">新游戏组id</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="newzoneid" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="newgamedir" class="col-sm-2 control-label label-server">新游戏目录</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="newgamedir" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="newgameport" class="col-sm-2 control-label label-server">新游戏端口</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="newgameport" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="newopdir" class="col-sm-2 control-label label-server">新执行脚本目录</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="newopdir" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="newopservername" class="col-sm-2 control-label label-server">新执行脚本服名</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="newopservername" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="newlanip" class="col-sm-2 control-label label-server">内网ip</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="newlanip" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="newdbport" class="col-sm-2 control-label label-server">mysql端口</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="newdbport" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="newredisport" class="col-sm-2 control-label label-server">redis端口</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="newredisport" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="newmemorysize" class="col-sm-2 control-label label-server">内存</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="newmemorysize" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="newdisksize" class="col-sm-2 control-label label-server">硬盘</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="newdisksize" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="newcpu" class="col-sm-2 control-label label-server">cpu</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="newcpu" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver button-changeserver" id="button-updateserver">'+
                    '<div class="col-sm-offset-2 col-sm-10">'+
                        '<button class="btn btn-primary btn-lg btn-custom" onclick="updateserver()" data-target="#myModal">'+
                            '更改'+
                        '</button>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
            '</div>'
        );
    }
    else if (selectchangetype == "deleteserver"){
        $('.div-detailinfo').append(''+
            '<div id="deleteserver">'+
                '<h4 class="p_changetype">删 除 游 戏 服</h4>'+
                '<div class="form-horizontal form-changeserver">'+
                  '<div class="form-group form-changeserver">'+
                    '<label for="deleteserverid" class="col-sm-2 control-label label-server">游戏id</label>'+
                    '<div class="col-sm-2 div-col">'+
                      '<input type="text" class="form-control input-server" id="deleteserverid" placeholder="">'+
                    '</div>'+
                  '</div>'+
                  '<div class="form-group form-changeserver button-changeserver" id ="button-deleteserver">'+
                    '<div class="col-sm-offset-2 col-sm-10">'+
                        '<button class="btn btn-primary btn-lg btn-custom" onclick="deleteserver()" data-target="#myModal">'+
                            '删除'+
                        '</button>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
            '</div>'
        )
    }
}


function addserver(){
    $('.resultsinfo').remove();
    var serverid = $("#serverid").val().replace(/(^\s*)|(\s*$)/g, "");
    var serverip = $("#serverip").val().replace(/(^\s*)|(\s*$)/g, "");
    var servername = $("#servername").val().replace(/(^\s*)|(\s*$)/g, "");
    var channelid = $("#channelid").val().replace(/(^\s*)|(\s*$)/g, "");
    var zoneid = $("#zoneid").val().replace(/(^\s*)|(\s*$)/g, "");
    var gamedir = $("#gamedir").val().replace(/(^\s*)|(\s*$)/g, "");
    var gameport = $("#gameport").val().replace(/(^\s*)|(\s*$)/g, "");
    var opdir = $("#opdir").val().replace(/(^\s*)|(\s*$)/g, "");
    var opservername = $("#opservername").val().replace(/(^\s*)|(\s*$)/g, "");
    var lanip = $("#lanip").val().replace(/(^\s*)|(\s*$)/g, "");
    var dbport = $("#dbport").val().replace(/(^\s*)|(\s*$)/g, "");
    var redisport = $("#redisport").val().replace(/(^\s*)|(\s*$)/g, "");
    var memorysize = $("#memorysize").val().replace(/(^\s*)|(\s*$)/g, "");
    var disksize = $("#disksize").val().replace(/(^\s*)|(\s*$)/g, "");
    var cpu = $("#cpu").val().replace(/(^\s*)|(\s*$)/g, "");
    if (serverid == "") {
        $('.h4-cusmodal').text('游戏id不能为空');
        $('.cus-modal').modal('show');
    }
    else if (serverip == "") {
        $('.h4-cusmodal').text('ip地址不能为空');
        $('.cus-modal').modal('show');
    }
    else if (servername == "") {
        $('.h4-cusmodal').text('游戏服名不能为空');
        $('.cus-modal').modal('show');
    }
    else if (channelid == "") {
        $('.h4-cusmodal').text('游戏渠道id不能为空');
        $('.cus-modal').modal('show');
    }
    else if (zoneid == "") {
        $('.h4-cusmodal').text('游戏组id不能为空');
        $('.cus-modal').modal('show');
    }
    else if (gamedir == "") {
        $('.h4-cusmodal').text('游戏目录不能为空');
        $('.cus-modal').modal('show');
    }
    else if (gameport == "") {
        $('.h4-cusmodal').text('游戏端口不能为空');
        $('.cus-modal').modal('show');
    }
    else if (opdir == "") {
        $('.h4-cusmodal').text('执行脚本目录不能为空');
        $('.cus-modal').modal('show');
    }
    else if (opservername == "") {
        $('.h4-cusmodal').text('执行脚本服名不能为空');
        $('.cus-modal').modal('show');
    }
    else if (lanip == "") {
        $('.h4-cusmodal').text('内网ip不能为空');
        $('.cus-modal').modal('show');
    }
    else if (dbport == "") {
        $('.h4-cusmodal').text('mysql端口不能为空');
        $('.cus-modal').modal('show');
    }
    else if (memorysize == "") {
        $('.h4-cusmodal').text('内存不能为空');
        $('.cus-modal').modal('show');
    }
    else if (disksize == "") {
        $('.h4-cusmodal').text('硬盘不能为空');
        $('.cus-modal').modal('show');
    }
    else if (cpu == "") {
        $('.h4-cusmodal').text('cpu不能为空');
        $('.cus-modal').modal('show');
    }
    else {
        $.ajax({
            type: "POST",
            url: "/addserver",
            data: {"serverid":serverid,"serverip":serverip,"servername":servername,"channelid":channelid,"zoneid":zoneid,"gamedir":gamedir,"gameport":gameport,"opdir":opdir,"opservername":opservername,"lanip":lanip,"dbport":dbport,"redisport":redisport,"memorysize":memorysize,"disksize":disksize,"cpu":cpu},
            dataType: "json",
            success: function (data) {
                if (data['success'] == "true"){
                    $('#button-addserver').after('<div class="resultsinfo"><div class="alert alert-success" role="alert">'+data['error']+'</div></div>')
                }
                else {
                    $('#button-addserver').after('<div class="resultsinfo"><div class="alert alert-danger" role="alert">'+data['error']+'</div></div>')
                }
            },
            error: function (data){
                $('.h4-cusmodal').text('后台data返回错误');
                $('.cus-modal').modal('show');
            }
        })
    }
}


function updateserver(){
    $('.resultsinfo').remove();
    var oldserverid = $("#oldserverid").val().replace(/(^\s*)|(\s*$)/g, "");
    var newserverid = $("#newserverid").val().replace(/(^\s*)|(\s*$)/g, "");
    var newserverip = $("#newserverip").val().replace(/(^\s*)|(\s*$)/g, "");
    var newservername = $("#newservername").val().replace(/(^\s*)|(\s*$)/g, "");
    var newchannelid = $("#newchannelid").val().replace(/(^\s*)|(\s*$)/g, "");
    var newzoneid = $("#newzoneid").val().replace(/(^\s*)|(\s*$)/g, "");
    var newgamedir = $("#newgamedir").val().replace(/(^\s*)|(\s*$)/g, "");
    var newgameport = $("#newgameport").val().replace(/(^\s*)|(\s*$)/g, "");
    var newopdir = $("#newopdir").val().replace(/(^\s*)|(\s*$)/g, "");
    var newopservername = $("#newopservername").val().replace(/(^\s*)|(\s*$)/g, "");
    var newlanip = $("#newlanip").val().replace(/(^\s*)|(\s*$)/g, "");
    var newdbport = $("#newdbport").val().replace(/(^\s*)|(\s*$)/g, "");
    var newredisport = $("#newredisport").val().replace(/(^\s*)|(\s*$)/g, "");
    var newmemorysize = $("#newmemorysize").val().replace(/(^\s*)|(\s*$)/g, "");
    var newdisksize = $("#newdisksize").val().replace(/(^\s*)|(\s*$)/g, "");
    var newcpu = $("#newcpu").val().replace(/(^\s*)|(\s*$)/g, "");
    if (oldserverid == "") {
        $('.h4-cusmodal').text('原游戏id不能为空');
        $('.cus-modal').modal('show');
    }
    else if (newserverid == ""){
        $('.h4-cusmodal').text('新游戏id不能为空');
        $('.cus-modal').modal('show');
    }
    else if (newserverip == ""){
        $('.h4-cusmodal').text('新游戏ip不能为空');
        $('.cus-modal').modal('show');
    }
    else if (newservername == ""){
        $('.h4-cusmodal').text('新游戏服名不能为空');
        $('.cus-modal').modal('show');
    }
    else if (newchannelid == ""){
        $('.h4-cusmodal').text('新游戏渠道id不能为空');
        $('.cus-modal').modal('show');
    }
    else if (newzoneid == ""){
        $('.h4-cusmodal').text('新游戏组id不能为空');
        $('.cus-modal').modal('show');
    }
    else if (newgamedir == ""){
        $('.h4-cusmodal').text('新游戏目录不能为空');
        $('.cus-modal').modal('show');
    }
    else if (newgameport == ""){
        $('.h4-cusmodal').text('新游戏端口不能为空');
        $('.cus-modal').modal('show');
    }
    else if (newopdir == ""){
        $('.h4-cusmodal').text('新执行脚本目录不能为空');
        $('.cus-modal').modal('show');
    }
    else if (newopservername == ""){
        $('.h4-cusmodal').text('新执行脚本服名不能为空');
        $('.cus-modal').modal('show');
    }
    else if (newlanip == "") {
        $('.h4-cusmodal').text('新内网ip不能为空');
        $('.cus-modal').modal('show');
    }
    else if (newdbport == "") {
        $('.h4-cusmodal').text('新mysql端口不能为空');
        $('.cus-modal').modal('show');
    }
    else if (newmemorysize == "") {
        $('.h4-cusmodal').text('新内存不能为空');
        $('.cus-modal').modal('show');
    }
    else if (newdisksize == "") {
        $('.h4-cusmodal').text('新硬盘不能为空');
        $('.cus-modal').modal('show');
    }
    else if (newcpu == "") {
        $('.h4-cusmodal').text('新cpu不能为空');
        $('.cus-modal').modal('show');
    }
    else {
        $.ajax({
            type: "POST",
            url: "/updateserver",
            data: {"oldserverid":oldserverid,"newserverid":newserverid,"newserverip":newserverip,"newservername":newservername,"newchannelid":newchannelid,"newzoneid":newzoneid,"newgamedir":newgamedir,"newgameport":newgameport,"newopdir":newopdir,"newopservername":newopservername,"newlanip":newlanip,"newdbport":newdbport,"newredisport":newredisport,"newmemorysize":newmemorysize,"newdisksize":newdisksize,"newcpu":newcpu},
            dataType: "json",
            success: function (data) {
                if (data['success'] == "true"){
                    $('#button-updateserver').after('<div class="resultsinfo"><div class="alert alert-success" role="alert">'+data['error']+'</div></div>')
                }
                else {
                    $('#button-updateserver').after('<div class="resultsinfo"><div class="alert alert-danger" role="alert">'+data['error']+'</div></div>')
                }
            },
            error: function (data){
                $('.h4-cusmodal').text('后台data返回错误');
                $('.cus-modal').modal('show');
            }
        })
    }
}


function deleteserver(){
    $('.resultsinfo').remove();
    var deleteserverid = $('#deleteserverid').val();
    if (deleteserverid == "") {
        $('.h4-cusmodal').text('游戏id不能为空');
        $('.cus-modal').modal('show');
    }
    else {
        $.ajax({
            type: "POST",
            url: "/deleteserver",
            data: {"deleteserverid":deleteserverid},
            dataType: "json",
            success: function (data) {
                if (data['success'] == "true"){
                    $('#button-deleteserver').after('<div class="resultsinfo"><div class="alert alert-success" role="alert">'+data['error']+'</div></div>')
                }
                else {
                    $('#button-deleteserver').after('<div class="resultsinfo"><div class="alert alert-danger" role="alert">'+data['error']+'</div></div>')
                }
            },
            error: function (data){
                $('.h4-cusmodal').text('后台data返回错误');
                $('.cus-modal').modal('show');
            }
        })
    }
}
