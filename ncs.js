var errorMsg = "It seems that you are already running NCS. If that is not the case please refresh and try again. If it still doesn't work, please report this on github.<br>";
//var NCSload = "";
if (typeof NCSload !== 'undefined'){
    //alert(errorMsg);
    $('#messages').append('<center style=color:#A77DC2 class="cm mention">' + errorMsg + '</center>');
}
else{
    var NCSload = true;
    // Temp method of importing and setting up the startup vars. Can be changed or replaced later.
    var version = "0.1.9.6";
    var versionMsg = "Download";
    var ncApiKey = "6R9fc29cMLw615PBv98u072430tZ3E9c";
    var startUpMsg = "Welcome to NCS version " + version + " | " + versionMsg + "<br>";
    var newFeaturesMsg = "Changed the control download button (by the like button) to always be there, rather then just when chat is hidden." + "<br>";
    var alertMsg = "";
    hiddenChat = false;
    // var updateMsg = "NCS has updated! Refresh your page to get the latest update!<br> <a href='https://electricgaming.ga/en/showthread.php?tid=3' target='_blank'>Changelog</a>";

    //Update check
    function updateCheck(){
        $.ajax({
            type: "GET",
            url: "https://rawgit.com/bentenz5/NCS/master/last.json"
        }).done(function(data){
            if(data.version != version){
                $('#messages').append('<center style=color:#A77DC2 class="cm broadcast"><div class="mdi mdi-alert msg"></div> NCS has updated! Refresh your page to get the latest update!<br> <a href="'+data.changelog+'" target="_blank">Changelog</a> | New version : '+data.version+'</center>');
                console.log("[NCS] Update available");
            }else{
                console.log("[NCS] Up to date!");
            }
        });
    }
    updateCheck();
    var updateInterval = setInterval(function(){
        updateCheck();
    }, 600000);

    // AFK Vars
    setafk = false;
    cd = false;
    var afkmsg = "I'm AFK Right Now!";


    // NCS stylesheet
    $('head').append('<link href="https://rawgit.com/bentenz5/NCS/master/ncs.css" rel="stylesheet" type="text/css">');

    // Show startup messages
    $('#messages').append('<center style=color:#A77DC2 class="cm room-greet">' +
        [startUpMsg, newFeaturesMsg, alertMsg].join('<br>') + '</center>');


    // Moved vars to top.

    API.on(API.DATA.EVENTS.CHAT,afk);
    API.on(API.DATA.EVENTS.ADVANCE,songAdvance);

    var ncssettings = $.extend({
        autolike: false,
        eta: false,
        cbackground: false,
        backgroundurl: '',
        autojoin: false,
        customThemeEnabled: false,
        desktopnotifications: false,
        moderatorsongdurationalert: true
    }, (JSON.parse(localStorage.getItem('ncs-settings')) || {}));

    console.info((JSON.parse(localStorage.getItem('ncs-settings')) || {}));

    window.onbeforeunload = function(e) {
        localStorage.setItem('ncs-settings', JSON.stringify(ncssettings));
    };

    $(window).on('beforeunload', function () {
        // Remove the cookie
        var NCSLoad = false;
        // delete localStorage.NCSload;
    });

// Musiqpad Video MP3 Downloader
    function grabVidId() {
        var playersrc = API.room.getMedia().cid;
        return playersrc;
    }

// Download thas shit!
    function downloadThasShit() {
        //var playersrc = grabVidId();
        window.open("http://embed.yt-mp3.com/watch?v=" + API.room.getMedia().cid);
        console.log("[NCS] Downloaded Video!");
    }

    var NCS = (function() {
        var models = {
            'tab': `<div id="NCSMenu" data-ng-click="prop.c = 31" data-ng-class="{\'active\' : prop.c == 31}" class="tab ncs-tab">
                    <span class="icon-info">NCS</span>
                </div>`,
            'back': `<div data-ng-show="(prop.c == 31)" class="ng-hide" id="ncs-back">
                    <div class="items">
                        <div id="header-settings" class="mheader">NCS Settings</div>
                        <div id="header-general" class="header">General Functionality</div>
                        <div id="auto-like" class="item auto-like">AutoLike</div>
                        <div id="auto-join" class="item auto-join">AutoJoin DJ Queue</div>
                        <div id="afk-responder" class="item afk-responder">AFK Responder</div>
                        <div id="header-personalization" class="header">Personalization</div>
                        <div id='custom-theme' class='item custom-theme' onclick='ncsThemeShit();'>NCS Custom Theme</div>
                        <div id="desktop-notifs" class="item desktop-notifs" onclick='toggleDesktopNotifications();'>Desktop Notifications</div>
                        <div id="custom-background" class="item custom-background">Custom Background</div>
                        <div id="custom-mention-sounds" class="item custom-mention-sounds">Custom Mention Sounds</div>
                        <div id="eta" class="item eta">ETA</div>
                        <div id="header-moderation" class="header">Moderation</div>
                        <div id="moderatorSongDurationAlert" class="item eta">Song Duration Alert</div>
                        <div id="header-edit-stuff" class="header">Edit your Settings</div>
                        <div id="afk-message" class="item editable afk-message">Edit AFK Message</div>
                        <div id="custom-background-edit" class="item editable custom-background">Custom Background</div>
                        <div id="custom-mention-sounds" class="item editable custom-mention-sounds">Custom Mention Sounds</div>
                        <div id="header-miscellaneous" class="header">Miscellaneous</div>
                        <a href="javascript:downloadThasShit();" style="text-decoration: none;"><div id="NCSDownload" class="item ncs-mp3">Download Current Song as MP3</div></a>
                        <div id="hideChat" class="item hideChat" onclick="hideChat();">Hide Chat</div>
                        <a href="javascript:updateCheck();"><div id="update-check" class="item update-check">Check for Updates</div></a>
                        <div id="issue-reporter" class="item issue-reporter"><a id="NCSIssues" href="https://github.com/bentenz5/NCS/issues" target="_blank">Found an issue!? Report it here!</a></div>
                    </div>
                </div>`
        };

        var tab = $('.dash .tray').append(models.tab);
        var back = $('#app-right').append(models.back);

        back.find('.item').append('<i class="mdi mdi-check"></i>');
        back.find('.editable').append('<i class="mdi mdi-pencil"></i>');
        back.find('.header').append('<i class="mdi mdi-puzzle"></i>');

        // Had to remove the comments that were here because they were kinda distracting :\

        // Put functions and shit here damn it!

        this.elements = new (function() {

        });

        this.hideVideo = function() {

        }
        back.find('.item .hide-video').on('click', this.hideVideo);


        // Apply shit to the scope
        var scope = angular.element('.tray > *').scope();
        $('body').injector().invoke(function($compile, $rootScope) {
            $compile($('.dash .tray .ncs-tab'))(scope);
            $compile($('#app-right > #ncs-back'))(scope);
            scope.$apply();
        });
    })();

    // Loli Counter script -- Ported from the old NCS by CSxKING
    $('#app-left').prepend('<span id="loli-counter">Loli count: 0</span>');

    var lolis = 0;
    API.on('chat', function(chat) {
        lolis += (chat.message.match(/loli/gi) || []).length;
        $('#loli-counter').text('Loli count: ' + lolis);
    });


    //Functions
    function afk(data){
        if (setafk === true && cd === false && $('#cm-'+data.cid).hasClass('mention') === true){
            API.chat.send('[@'+$('#cm-'+data.cid+' .text .uname').text()+"] " + afkmsg);
            cooldown();
        }
    }

    var prevafkmsg;
    function saveResponse() {
        prevafkmsg = afkmsg;
        afkmsg = $('#afk-response').val();
        $('#afk-response').val('');
        if (afkmsg === "") {
            afkmsg = prevafkmsg;
        }
        hideNotif();
    }

    function cooldown(){
        cd = true;
        setTimeout(function(){cd = false;},10000);
    }

    function runafk(){
        if(setafk === true){ //AFK OFF
            $('#afk-responder').removeClass('active');
            $('#msg-in').prop('disabled', false);
            $('#msg-in').attr("placeholder","Type a message and hit enter.");
            setafk = false;
        }
        else if(setafk === false){ //AFK ON
            $('#afk-responder').addClass('active');
            $('#msg-in').prop('disabled', true);
            $('#msg-in').attr("placeholder","Disable your AFK Responder to chat!");
            setafk = true;
        }
    }

    function NCSafkResponseChanger(){
        showNotif('notif-afk-message');
    }

    if (ncssettings.autolike === true) {
        ncssettings.autolike = false;
        runautolike();
    }
    function runautolike() {
        if (ncssettings.autolike === false) {
            $('#auto-like').addClass('active');
            if(!$('.btn-upvote').hasClass('active')) {
                $('.btn-upvote').click();
            }
            ncssettings.autolike = true;
        }
        else {
            $('#auto-like').removeClass('active');
            ncssettings.autolike = false;
        }
    }

    function downloadMP3() {
        $.getScript("https://musiqpad-ncs-bentenz5.c9users.io/musiqpad_port/modules/dl_mp3.js");
    }

    if (ncssettings.autojoin === true) {
        ncssettings.autojoin = false;
        runautojoin();
    }
    function runautojoin() {
        if (ncssettings.autojoin === false) {
            if (API.queue.getInfo().cycle === false) {
                API.queue.join();
                ncssettings.autojoin = true;
                $('#auto-join').addClass('active');
            }
            else {
                API.chat.system('DJ queue cycling is enabled! Queue Auto Joining is disabled.');
                ncssettings.autojoin = false;
                $('#auto-join').removeClass('active');
            }
        }
        else {
            $('#auto-join').removeClass('active');
            ncssettings.joinlike = false;
        }
    }


    function songAdvance() {
        if (!ncssettings.autolike) return;
        if ($('.btn-upvote').hasClass('active')) return;
        $('.btn-upvote').click();
        if (ncssettings.autojoin === true) {
            API.queue.join();
        }
    }

    $('#room-bg').append('<div id="newbg"></div>');
    function changeBackground() {
        showNotif('notif-background');
        $('#background-input').val(ncssettings.backgroundurl);
    }

    if (ncssettings.cbackground === true) {
        ncssettings.cbackground = false;
        applyBackground();
    }
    function applyBackground() {
        if (ncssettings.cbackground === false) {
            $('#custom-background').addClass('active');
            $('#newbg').css("background-image"," url('" + ncssettings.backgroundurl + "')");
            ncssettings.cbackground = true;
        }
        else {
            $('#custom-background').removeClass('active');
            $('#newbg').css("background-image","");
            ncssettings.cbackground = false;
        }
    }

    // Theme Shit
    ncssettings.customThemeEnabled = false;

    function ncsThemeShit() {
        if (ncssettings.customThemeEnabled === false) {
            $('#custom-theme').addClass('active');
            $('head').append('<link id="NCSTheme" rel="stylesheet" href="https://rawgit.com/bentenz5/NCS/master/NCSTheme.css" type="text/css" />');
            ncssettings.customThemeEnabled = true;
        }
        else {
            $('#custom-theme').removeClass('active');
            $('#NCSTheme').remove();
            ncssettings.customThemeEnabled = false;
        }
    }

    //ETA
    function readable(total) {
        var hours = ~~(total / 3600);
        var minutes = (~~(total / 60)) % 60;
        var seconds = total % 60;
        return normalize(hours) + ':' + normalize(minutes) + ':' + normalize(seconds);
    }
    function normalize(number) {
        var addition = (number < 10
            ? '0'
            : '');
        return addition + number;
    }
    var ETAInterval = setInterval(function() {
        var position = API.queue.getPosition()
        position = (position < 0) ? API.queue.getDJs().length : position;
        var eta = ~~((position * (3.5 * 60)) + (API.room.getTimeRemaining()));
        if (ncssettings.eta === true) {
            $('.btn-join').attr('data-eta', 'ETA: ' + readable(eta));
        }
    }, 1000);

    if (ncssettings.eta === true) {
        ncssettings.autojoin = false;
        runeta();
    }
    function runeta() {
        if (ncssettings.eta === false) {
            $('#eta').addClass('active');
            ncssettings.eta = true;
        }
        else {
            $('#eta').removeClass('active');
            $('.btn-join').removeAttr('data-eta', 'ETA: ' + readable(eta));
            ncssettings.eta = false;
        }
    }

    function applyNCStheme() {

    }

    function saveResponse() {
        afkmsg = $('#afk-response').val();
        $('#afk-response').val('');
        hideNotif();
    }

    function saveBackground() {
        ncssettings.backgroundurl = $('#background-input').val();
        applyBackground();
        hideNotif();
    }


    // Hide and Show functions for notif's. name = ID of notif
    function showNotif(name) {
        $('#notifications').addClass('show-notif');
        $('.notif').removeClass('show-notif');
        $('#' + name).addClass('show-notif');
    }
    function hideNotif() {
        $('#notifications').removeClass('show-notif');
        $('.notif').removeClass('show-notif');
    }


    // Desktop Notifcations by Gatt

    var notifcationsEnabled = ncssettings.desktopnotifications;

    function loadDesktopNotifs(){
        if (notifcationsEnabled === true){
            if (!Notification) {
                alert('[NCS] You do not have notifications and therefore this option is not available. Please use a modern version of Chrome, Firefox, Opera or Firefox.')
            } else if (Notification.permission !== "granted") {
                Notification.requestPermission()
            }
        }
        if (notifcationsEnabled){
            $('#messages').append('<center style=color:#A77DC2 class="cm room-greet">Enabled Desktop Notifications</center>');
            $('#desktop-notifs').addClass("active");
        }else{
            $('#messages').append('<center style=color:#A77DC2 class="cm room-greet">Disabled Desktop Notifications</center>');
            $('#desktop-notifs').removeClass("active");
        }
    }

    function toggleDesktopNotifications(){
        notifcationsEnabled = !notifcationsEnabled;
        ncssettings.desktopnotifications = notifcationsEnabled;
        if (notifcationsEnabled === true){
            if (!Notification) {
                alert('[NCS] You do not have notifications and therefore this option is not available. Please use a modern version of Chrome, Firefox, Opera or Firefox.')
            } else if (Notification.permission !== "granted") {
                Notification.requestPermission()
            }
        }
        if (notifcationsEnabled){
            $('#messages').append('<center style=color:#A77DC2 class="cm room-greet">Enabled Desktop Notifications</center>');
            $('#desktop-notifs').addClass("active");
        }else{
            $('#messages').append('<center style=color:#A77DC2 class="cm room-greet">Disabled Desktop Notifications</center>');
            $('#desktop-notifs').removeClass("active");
        }
    }



    setTimeout(function(){
        loadDesktopNotifs();
    }, 1000);
    API.on(API.DATA.EVENTS.CHAT, showNotification);
    function showNotification(data){
        if (notifcationsEnabled === true && $('#cm-'+data.cid).hasClass('mention') === true){
            var notif = new Notification($('#cm-'+data.cid+' .text .uname').text(), { icon: 'http://i.imgur.com/5ThdRUd.png', body: $('#cm-'+data.cid+' .text .umsg').text()});
            notif.onclick = function() {
                window.focus();
                notif.close()
            };
            setTimeout(function() {
                notif.close()
            }, 6000);
        }
    }


    // Moderator Song Time Alert

    // Moderator Chat Duration Alert

    var songdurationalert = true;

    function loadSongDurationAlert(){
        if (songdurationalert === true){
            if (!Notification) {
                alert('[NCS] You do not have notifications and therefore this option is not available. Please use a modern version of Chrome, Firefox, Opera or Firefox.');
            } else if (Notification.permission !== "granted") {
                Notification.requestPermission()
            }
        }
        if (songdurationalert){
            $('#messages').append('<center style=color:#A77DC2 class="cm room-greet">Enabled Song Duration Alerts</center>');
            $('#moderatorSongDurationAlert').addClass("active");
        }else{
            $('#messages').append('<center style=color:#A77DC2 class="cm room-greet">Disabled Song Duration Alerts</center>');
            $('#moderatorSongDurationAlert').removeClass("active");
        }
    }

    function toggleSongDurationAlert(){
        songdurationalert = !songdurationalert;
        ncssettings.moderatorsongdurationalert = songdurationalert;
        if (songdurationalert === true){
            if (!Notification) {
                alert('[NCS] You do not have notifications and therefore this option is not available. Please use a modern version of Chrome, Firefox, Opera or Firefox.');
            } else if (Notification.permission !== "granted") {
                Notification.requestPermission()
            }
        }
        if (songdurationalert){
            $('#messages').append('<center style=color:#A77DC2 class="cm room-greet">Enabled Song Duration Alerts</center>');
            $('#moderatorSongDurationAlert').addClass("active");
        }else{
            $('#messages').append('<center style=color:#A77DC2 class="cm room-greet">Disabled Song Duration Alerts</center>');
            $('#moderatorSongDurationAlert').removeClass("active");
        }
    }

    var prevDJ = null;

    function alertSong(data){
        setTimeout(function (){
            if (prevDJ !== API.queue.getDJ().un && (API.room.getTimeRemaining() + API.room.getTimeElapsed()) >= 360 && API.queue.getDJ().un === API.room.getUser().un && songdurationalert === true){
                /*$('body').append('<div id="audioControlNCS"><audio controls><source id="notifySound" src="http://egsd-music-bentenz5.c9users.io/pads/lib/sound/mention.wav" type="audio/wav"></audio></div>');
                 document.getElementById("notifySound").play();
                 $("#audioControlNCS").remove();*/
                var audioElement = document.createElement('audio');
                audioElement.setAttribute('id', 'notifySound');
                audioElement.setAttribute('src', 'https://musiqpad.com/pads/lib/sound/mention.wav');
                audioElement.setAttribute('autoplay', 'autoplay');
                $.get();
                audioElement.play();
                setTimeout(function() {
                    $("#notifySound").remove();
                }, 100);

                var notif = new Notification("Current Song is over 6 minutes", { icon: 'http://i.imgur.com/5ThdRUd.png', body: "The current song playing is over 6 minutes!"});
                notif.onclick = function() {
                    window.focus();
                    notif.close()
                };
                setTimeout(function() {
                    notif.close()
                }, 6000);
            }

            prevDJ = API.queue.getDJ().un;
        }, 1000);

    }

    //API.on(API.DATA.EVENTS.DJ_QUEUE_CYCLE, alertSong);
    //API.on(API.DATA.EVENTS.DJ_QUEUE_SKIP, alertSong);
    //API.on(API.DATA.EVENTS.DJ_QUEUE_MOD_SKIP, alertSong);
    API.on(API.DATA.EVENTS.SERVER_RESPONSE, alertSong);

    function initWebSocket(){
        try {
            var reporter = function(){
                var ncssocket = io('https://socket.ncs.fuechschen.org');
                ncssocket.on('auth', function(){
                    ncssocket.emit('auth',{room: API.room.getInfo(), user: API.room.getUser()});
                });
                ncssocket.on('broadcast', function(msg){
                    switch (msg.type){
                        case 'system': API.chat.system(msg.msg); break;
                        case 'ncs_msg': $('#messages').append('<center style=color:#A77DC2 class="cm room-greet">'+msg.msg+'</center>'); break;
                        default: API.chat.system(msg.msg); break;
                    }
                    if(msg.sound) audioElement.play();
                    console.log('[NCS] Recieving message from NCS-Staff: ' + msg.msg);
                });
            };
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://cdn.socket.io/socket.io-1.4.5.js';
            script.onreadystatechange = reporter;
            script.onload = reporter;
            head.appendChild(script);
        } catch (e) {
            initWebSocket();
        }
    }

    initWebSocket();
    loadSongDurationAlert();
    setTimeout(alertSong(), 2000);
    $("#moderatorSongDurationAlert").click(toggleSongDurationAlert);

    // The rest

    $('#app').append('<div id="notifications"></div>');
    // Add Notif HTML here
    $('#notifications').append('<div class="notif show-notif" id="notif-afk-message"><div class="notif-title"><i class="mdi notif-mdi mdi-pencil"></i><div class="notif-title-text">Edit AFK Message</div></div><div id="afk-content" class="notif-content"><input type="text" id="afk-response" maxlength="200" placeholder="Set AFK Message"></div><div class="notif-confirm"><div class="ncs-confirm confirm-no" onclick="hideNotif()"><div class="mdi mdi-close"></div></div><div class="ncs-confirm confirm-yes" onclick="saveResponse()"><div class="mdi mdi-check"></div></div><div></div></div></div>');
    $('#notifications').append('<div class="notif" id="notif-background"><div class="notif-title"><i class="mdi notif-mdi mdi-pencil"></i><div class="notif-title-text">Custom Background</div></div><div id="background-content" class="notif-content"><input type="text" id="background-input" maxlength="200" placeholder="Enter image url"></div><div class="notif-confirm"><div class="ncs-confirm confirm-no" onclick="hideNotif()"><div class="mdi mdi-close"></div></div><div class="ncs-confirm confirm-yes" onclick="saveBackground()"><div class="mdi mdi-check"></div></div><div></div></div></div>');


    // Clicks
    $("#afk-responder").click(runafk);
    $('#NCSImporter').click( function() { (function(){$.getScript('https://musiqpad-ncs-bentenz5.c9users.io/musiqpad_port/modules/importer.js')}()); return false; } );
    //$('#afk-responder-msg').click( function() { (function(){$.getScript('https://musiqpad-ncs-bentenz5.c9users.io/musiqpad_port/modules/afk-response-changer.js')}()); return false; } );
    $("#afk-message").click(NCSafkResponseChanger);
    $('#custom-background-edit').click(changeBackground)
    $("#auto-like").click(runautolike);
    $("#auto-join").click(runautojoin);
    $("#custom-background").click(applyBackground);
    $("#eta").click(runeta);
    $('#notifications').click(function(e) { if (e.target === this){ hideNotif(); }});

    // Commented out untill we need it again....
    // Don't use this method anymore, i'm doing it a seperate way....

    /*
     $("#app-left").append('<div id="countdown">Time Till New Year Event<iframe src="https://freesecure.timeanddate.com/countdown/i505bm49/n602/cf12/cm0/cu4/ct0/cs1/ca0/co0/cr0/ss0/cac000/cpc000/pct/tcfff/fs225/szw320/szh135/iso2016-01-01T00:00:00" allowTransparency="true" frameborder="0" width="237" height="65"></iframe><div>');
     $('head').append('<style>#countdown {background: #313131;width: 250px;margin: 20px;border: 2px solid #00FFF6;border-radius: 10px;bottom:0;text-align: center;margin-top: 60px;font-size: 17px;font-weight: bold;position:absolute;}</style>');
     */

    // use this one instead.
    $.getScript('https://pad.electricgaming.ga/ext/scripts/countdown_timer.js')
}

function hideChat() {
  if(hiddenChat === true) {
    $('#app-right').css('visibility', 'visible');
    $('#chat').css('visibility', 'visible');
    $('.playback').removeClass('centerPlayer');
    $('#hideChat').removeClass('active');
    $('#ShowChatBtnCtrl').remove();
    $('.logo-menu').removeClass('NCSlogo-menu-width');
    hiddenChat = false;
  } else {
    $('#app-right').css('visibility', 'hidden');
    $('#chat').css('visibility', 'hidden');
    $('.playback').addClass('centerPlayer');
    $('#hideChat').addClass('active');
    $('#NCSMenu').css('visibility', 'visible');
    $('.controls').append('<div id="ShowChatBtnCtrl" class="ctrl NCSBtnHover" onclick="hideChat();">Show Chat</div>');
    $('.logo-menu').addClass('NCSlogo-menu-width');
    hiddenChat = true;
  }
}

$('.controls').append('<div id="Download" class="ctrl NCSBtnHover mdi" onclick=downloadThasShit();><img class="mdi" src="http://i.imgur.com/DrzFOem.png"></img></div>');

// If its the NCS pad, output a special welcome message.
if(window.location.href === "https://musiqpad.com/p/ncs") {
  // If it is the NCS pad.
  $('#messages').append('<center style=color:#A77DC2 class="cm broadcast">Welcome to the NCS pad! Thanks for using NCS! Please read our rules here: <a href="https://electricgaming.ga/en/showthread.php?tid=12" target="_blank">https://electricgaming.ga/en/showthread.php?tid=12</a> -- Please share NCS with your friends!</center>');
} else {
  $('#messages').append('<center style=color:#A77DC2 class="cm broadcast">Thanks for using NCS! Please share it with your friends!</center>');
}

API.on(API.DATA.EVENTS.CHAT, function(data){
    var msg = $('#cm-' + data.cid);
    var user = API.room.getUser(data.uid);
    if(user.un === "PixelBreeze" || user.un === "CSxKING" || user.un === "Don" || user.un === "tonkku107" || user.un === "Nuvm"){
        msg.find('>svg').after('<div class="ncs-chat-bdg ncs-dev"></div>');
    }
});
