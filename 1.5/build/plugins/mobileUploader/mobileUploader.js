/*
combined files : 

gallery/uploader/1.5/plugins/mobileUploader/xmppUtil
gallery/uploader/1.5/plugins/mobileUploader/qrcode
gallery/uploader/1.5/plugins/mobileUploader/mobileUploader

*/
KISSY.add('gallery/uploader/1.5/plugins/mobileUploader/xmppUtil',function(S){

    var XmppUtil = {

        begin : false,

        localMap : {

        },

        init : function(){


            var self = this;

            if(self.begin == true){
                return ;
            }

            self.begin = true;

            /**
             KISSY.TBC.umpp.register('1063', function(data) {
				// appid 涓烘偍鐨� mpp 搴旂敤 id
				console.log(data);
				alert("hi mpp");
				var d = data[0];
				var jsondata = KISSY.JSON.parse(d.content);
				var subType = jsondata.subType;
				var callbackData = jsondata.data;
				var qr = self.localMap[subType];
				var qrPara = qr.param;


				var messageType = jsondata.mtype;

				if(messageType && messageType == "appCancle"){
					qr.hide(qr);
					return ;
				}

				qrPara.xmppcallback({
					data : callbackData,
					bizMap : qrPara
				});
			});
             **/
            /****/
            KISSY.getScript('http://a.tbcdn.cn/p/xmpp/1.0/xmpp.js', function() {
                xmpp.register({
                    ctype: 'login', // 闀块摼鎺ョ被鍨�
                    appId: '1063', // 鐩稿叧搴旂敤 appId
                    subType: '1' // 鐩稿叧涓氬姟涓嬬殑娑堟伅绫诲瀷, 璇ラ」鍙€�
                }, function(data) {
                    // 鍥炶皟鍑芥暟
                    //console.log(data);
                    //alert("hi mpp");

                    var i = 0;
                    for(;i<data.length;i++){
                        var appid = data[i].t1;
                        if(appid == "1063"){
                            var d = data[i];
                            var jsondata = d.content;

                            if(typeof jsondata == "string"){
                                jsondata = KISSY.JSON.parse(jsondata);
                            }

                            var subType = jsondata.subType;
                            var callbackData = jsondata.data;
                            var qr = self.localMap[subType];
                            var qrPara = qr.param;

                            var messageType = jsondata.mtype;

                            if(messageType && messageType == "appCancle"){
                                qr.hide(qr);
                                return ;
                            }
                            qrPara.xmppcallback({
                                data : callbackData,
                                bizMap : qrPara
                            });
                        }

                    }

                });
            });



        },

        registerXmpp : function(subType,qrPara){
            this.localMap[subType]=qrPara;
        }
    };

    return XmppUtil;

});
KISSY.add('gallery/uploader/1.5/plugins/mobileUploader/qrcode',function(S, UA, XmppUtil){
    //UA.ie = 6; //JUST TRY
    var $=S.all,
        doc = $(document);

    var QRURL = "http://m.service.taobao.com/getQrCode.htm";
    var CheckAppUrl = "http://m.service.taobao.com/checkApp.htm";
    var QRApiUrl = "http://m.service.taobao.com/qrCodeApi.htm";
    var CSS = '.tb-qrcode-sb-mask-4-ie6{ border:none; position: absolute; left:0; top:0; width:1px; height:1px; background:red; filter: alpha(opacity=0); } .qrcode{font-family:simsun; position: absolute;}.qrcode .loading{width: 120px; height: 120px; background: url(http://img01.taobaocdn.com/tps/i1/T1cKm3XkRpXXXXXXXX-48-48.gif) center center no-repeat;border: 1px solid #eee;} .qrcode .qrcode-qr{background-color:#F7F7F7;border:1px solid #DDD; padding:10px;} .qrcode .qrcode-app{background-color: #f7f7f7;border: 1px solid #eee;padding: 25px 35px 21px 80px;width: 245px;background-image: url(http://gtms03.alicdn.com/tps/i3/T1LiuRFaFaXXcDFR2c-28-49.png);background-repeat: no-repeat;background-position: 25px 30px;}\
	.qrcode .app-title{color: #333;} .qrcode .app-body{color: #aaa;margin-top: 10px;} .qrcode .app-ft{text-align: right;margin-top: 15px;} .qrcode .app-ft a:hover{color: #ff6600;}\
	.qrcode .count-down, .qrcode .retry{display: inline-block; *display: inline;*zoom;width: 52px;margin-left: 12px;padding: 0 8px; line-height: 20px; cursor: pointer;text-align:center;background:#FCFCFC url(http://gtms04.alicdn.com/tps/i4/T1TgKSFiFbXXaJA2Ya-6-38.png) left top repeat-x; border: 1px solid #D0D0D0;} .retry:active{background-position:left bottom} .qrcode .count-down{padding: 0;border: 1px solid #d7d7d7;}\
	.qrcode .hd{padding:2px 0 10px;} .qrcode a{color:#36c;cursor:pointer;}.qrcode .bd,.qrcode .bd img{width:200px;height:200px;background:#fff;text-align:center;}.qrcode .ft{position:absolute;top:12px;right:11px;}.qrcode .ft a{display:inline-block;width:20px;height:21px;overflow:hidden;background-image:url(http://gtms02.alicdn.com/tps/i2/T12RORFmpXXXaeXpYa-20-42.png);}.qrcode .ft a:hover{background-position:0 -21px;}.qrcode .ft a span{visibility:hidden;}';

    var note1 = "%E6%8E%A8%E8%8D%90%E4%BD%BF%E7%94%A8%E6%B7%98%E5%AE%9DAPP%E6%89%AB%E6%8F%8F";
    var btname1 = "%E5%88%B7%E6%96%B0%E4%BA%8C%E7%BB%B4%E7%A0%81";
    var btname2 = "%E6%AD%A3%E5%9C%A8%E8%8E%B7%E5%8F%96%E4%BA%8C%E7%BB%B4%E7%A0%81..";

    var previewname = "%E5%A6%82%E6%9E%9C%E6%89%8B%E6%9C%BA%E7%AB%AF%E5%B7%B2%E6%8F%90%E7%A4%BA%E4%B8%8A%E4%BC%A0%E6%88%90%E5%8A%9F%EF%BC%8C%3C%2Fbr%3E%E8%AF%B7";
    var previewname2 = "%E7%82%B9%E6%AD%A4%E9%A2%84%E8%A7%88";


    var TPL='';
    TPL += '	<div class="qrcode">';
    TPL += '<div class="loading"></div>';
    TPL += '	</div>';

    var TPL_Qr_Code = '<div class="qrcode-qr"><div class="hd">\u63a8\u8350<a href="http://app.taobao.com/download/taoApps.htm?spm=a210u.1000832.297503.39.REFn4e&pageIndex=5" target="_blank">\u6dd8\u5b9d\u5ba2\u6237\u7aef</a>\u626b\u63cf<\/div>';
    TPL_Qr_Code += '<div class="bd">';
    TPL_Qr_Code += '<div><span class="J_qrimg">'+decodeURIComponent(btname2)+'</span></div>';
    TPL_Qr_Code += '</div>';
    TPL_Qr_Code += '<div class="ft">';
    TPL_Qr_Code += '<a href="#" class="J_close"><span>\u5173\u95ED</span></a>';
    TPL_Qr_Code += '</div>';
    TPL_Qr_Code += '<div style="margin-top:6px; text-align:center">'+decodeURIComponent(previewname)+'<a class="J_preview">'+decodeURIComponent(previewname2)+'</a></div>';
    TPL_Qr_Code += '</div></div>';

    var aname1 = "%E5%B7%B2%E7%BB%8F%E5%90%91%E4%BD%A0%E7%9A%84%E6%89%8B%E6%9C%BA%E5%8F%91%E9%80%81%E6%B6%88%E6%81%AF%EF%BC%8C%E6%89%93%E5%BC%80%E6%B6%88%E6%81%AF%E5%8F%AF%E4%BB%A5%E7%9B%B4%E6%8E%A5%E7%94%A8%E6%89%8B%E6%9C%BA%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87%EF%BC%81";
    var aname2 = "%E8%8B%A5%E9%95%BF%E6%97%B6%E9%97%B4%E6%B2%A1%E6%94%B6%E5%88%B0%E6%B6%88%E6%81%AF%EF%BC%8C%E5%85%88%E6%89%8B%E5%8A%A8%E5%BC%80%E5%90%AF%E6%B7%98%E5%AE%9D%E5%AE%A2%E6%88%B7%E7%AB%AF%EF%BC%8C%E5%86%8D%E7%82%B9%E5%87%BB%E6%8C%89%E9%92%AE%E9%87%8D%E5%8F%91%E6%B6%88%E6%81%AF";
    var aname3 = "%E9%87%8D%E8%AF%95";
    var aname4 = "%E6%94%BE%E5%BC%83%E4%BC%A0%E5%9B%BE";

    var TPL_APP = '<div class="qrcode-app"><div class="app-title"><h3>'+decodeURIComponent(aname1)+'</h3></div>';
    TPL_APP += '<div class="app-body"><span>'+decodeURIComponent(aname2)+'</span><span><span class="J_QrCountdown count-down" data-count="10"></span><button class="J_QrRetry retry" type="button" style="display: none;">\u91cd\u8bd5</button></span></div>';
    TPL_APP += '<div class="app-ft"><span><a href="#" class="J_App_Cancle">'+decodeURIComponent(aname4)+'</a></span></div></div>';


    var xmppUtil = XmppUtil;

    function QRCode(config){
        var param = {};
        var cfg = config||{};
        var biz = cfg.bizMap;
        delete cfg.bizMap;

        S.mix(param,cfg);
        S.each(biz,function(v,k){
            param["biz_"+k] = v;
        });
        if(!param.subType){
            param.subType = "qrcode"+S.guid();
        }

        if(param.title){
            param.title = encodeURIComponent(param.title);
        }

        this.callback = config.callback;

        this.param = param;
        this.isRender = false;
        this.isBind = false;

        var self = this;

        if(UA.ie == 6){
            self.$mask4ie6 = S.all('<iframe src="about:blank" style="display:none; left:-9999px; top:-9999px;" class="tb-qrcode-sb-mask-4-ie6" ></iframe>'); //keep it first...
            S.ready(function(){
                S.all('body').append(self.$mask4ie6);
            });
        }

    }


    S.augment(QRCode,S.EventTarget,{


        checkApp : function(){
            var self = this;
            if(self.param.daily ){
                CheckAppUrl = "http://m.service.daily.taobao.net/checkApp.htm";
            }
            self.param._tt=new Date().getTime();
            S.IO({
                dataType:'jsonp',
                url:CheckAppUrl,
                data:self.param,
                jsonpCallback:"CheckApp",
                success:function (data) {
                    var datajson = data;

                    self.param.qrid = datajson.qrid;
                    self.param.mk = datajson.mk;
                    self.param.t = datajson.t;

                    if(datajson.appResult && datajson.appResult ==true){
                        self.container.html(TPL_APP);
                        /****/
                        self.countDown( self.container.one('.J_QrCountdown'), function(){
                            self.container.one('.J_QrCountdown').hide();
                            self.container.one('.J_QrRetry').show();
                        } )
                        self.isCheckApp = true;
                        if(self.$mask4ie6){
                            self.$mask4ie6.css({"width":362,"height":173});
                        }
                        return ;
                    }else{
                        self.container.html(TPL_Qr_Code);
                        self.getQR();
                        if(self.$mask4ie6){
                            self.$mask4ie6.css({"width":222,"height":294});
                        }
                    }
                }
            });

        },



        countDown: function(target, callback){
            var self = this;

            var count = target.attr('data-count') || 10, curCount = count;
            target.html(curCount + "\u79d2");

            if(self.countdownInterval){
                clearInterval( self.countdownInterval );
            }

            self.countdownInterval = setInterval(function(){
                target.html( --curCount + "\u79d2" );
                if( curCount == '0' ){
                    clearInterval( self.countdownInterval );
                    callback();
                }
            }, 1000);
        },

        //鑾峰彇浜岀淮鐮佺殑鍦板潃
        getQR: function(){
            var self = this;

            //return QRURL+"?"+S.param(this.param);

            if(self.param.daily ){
                QRURL = "http://m.service.daily.taobao.net/getQrCode.htm";
            }
            self.param._tt=new Date().getTime();
            S.IO({
                dataType:'jsonp',
                url:QRURL,
                data:self.param,
                jsonpCallback:"QrCodeGetPic",
                success:function (data) {
                    var datajson = data;

                    var imgpanel = self.container.one(".J_qrimg");

                    var img = document.createElement("img");
                    img.onload = function(){
                        imgpanel.html("").append(img);
                    }
                    img.src=datajson.picurl;
                }
            });
        },
        render: function(){
            var self = this,
                container = $(TPL);

            S.DOM.addStyleSheet(CSS);
            $(document.body).append(container);
            self.container = container;
            //self.checkApp();
            self.isRender = true;
            self.bindEvent();
            self.xmpp();
        },

        bindEvent : function(){
            var self = this;
            if(self.param.daily ){
                QRApiUrl = "http://m.service.daily.taobao.net/qrCodeApi.htm";
            }

            self.container.delegate('click', '.J_QrRetry', function(e){
                //閲嶈瘯寮傛璇锋眰

                self.param.api = "retry";
                self.param._tt=new Date().getTime();

                S.IO({
                    dataType:'jsonp',
                    url:QRApiUrl,
                    data:self.param,
                    jsonpCallback:"QrCodeRetry",
                    success:function (data) {
                        var datajson = data;

                        self.container.one('.J_QrCountdown').show();
                        self.countDown( self.container.one('.J_QrCountdown'), function(){
                            //鍊掕鏃剁粨鏉�
                            self.container.one('.J_QrCountdown').hide();
                            self.container.one('.J_QrRetry').show();
                        })

                        self.container.one('.J_QrRetry').hide();
                    },
                    error: function(d){

                    }
                });
                /**
                 self.container.hide();
                 self.container.html(TPL_Qr_Code);
                 self.container.show();
                 self.getQR();
                 **/
                //閲嶈瘯寮傛璇锋眰
            });

            self.container.delegate('click', '.J_App_Cancle', function(e){


                //鍙栨秷寮傛璇锋眰

                if(self.param.daily ){
                    QRApiUrl = "http://m.service.daily.taobao.net/qrCodeApi.htm";
                }
                self.param.api = "cancle";
                self.param._tt=new Date().getTime();
                S.IO({
                    dataType:'jsonp',
                    url:QRApiUrl,
                    data:self.param,
                    jsonpCallback:"QrCodeCancle",
                    success:function (data) {
                        var datajson = data;
                        self.container.hide();
                        if(UA.ie == 6){
                            self.$mask4ie6.hide();
                        }
                    },
                    error: function(d){

                    }
                });

            });
            self.container.delegate('click', '.J_close', function(ev){
                ev.halt();
                self.container.hide();
                if(self.$mask4ie6){
                    self.$mask4ie6.css({"left":-9999,"top":-9999}).hide();
                }
            });
            /**
             self.container.delegate('click', '.J_refresh-img', function(ev){
				ev.halt();
				self.getQR();
			});
             **/
            self.container.delegate('click', '.J_preview', function(ev){
                ev.halt();
                self.previewUploadResult(self.param);
            });

        },

        show: function(){
            var self = this;
            if(!self.isRender){
                self.render();
            }

            self.container.html(TPL);
            self.checkApp();
            self.container.show();
            if(self.$mask4ie6){
                setTimeout(function(){
                    self.$mask4ie6.css({
                        left :self.container.css('left'),
                        top  :self.container.css('top')
                    }).show();
                });
            }



        },
        hide: function(_self){
            var self = _self || this;

            if(self.$mask4ie6){
                self.$mask4ie6.css({"left":-9999,"top":-9999}).hide();
            }
            self.container.hide();
            if(self.countdownInterval){
                clearInterval( self.countdownInterval );
            }
        },

        //娉ㄥ唽XMPP娑堟伅
        xmpp: function(){
            var self = this;
            xmppUtil.init();
            xmppUtil.registerXmpp(self.param.subType,self);

        },

        xmppcallback: function(data){

        },

        previewUploadResult : function(data){
            var self = this;
            S.IO({
                dataType:'jsonp',
                url:'http://m.service.taobao.com/previewUploadResult.htm',
                jsonpCallback:"getPreviewResult",
                data:{
                    qrid : data.qrid,
                    mk : data.mk
                },
                success:function (r) {
                    if(r.success==true){
                        if(r.data){
                            self.param.xmppcallback(r.data);
                        }
                    }

                },
                error: function(d){

                }
            });
        },

        offset: function(x,y){
            this.container.css({
                top:x,
                left:y
            })
        }

    });


    return QRCode;

},{
    requires: ['ua','./xmppUtil']
});



/**
 * @fileoverview 手机上传
 * @author 剑平（明河）<minghe36@126.com>
 **/
KISSY.add('gallery/uploader/1.5/plugins/mobileUploader/mobileUploader',function(S, Node, Base,QR) {
    var EMPTY = '';
    var $ = Node.all;
    var DAILY_API = 'http://img01.daily.taobaocdn.net/consult/';
    var LINE_API = 'http://img02.taobaocdn.com/consult/';

    /**
     * $获取domain
     * @return {String}
     */
    function getDomain(){
        var host = arguments[1] || location.hostname;
        var da = host.split('.'), len = da.length;
        var deep = arguments[0]|| (len<3?0:1);
        if (deep>=len || len-deep<2)
            deep = len-2;
        return da.slice(deep).join('.');
    }

    /**
     * $是否是daily
     * @return {boolean}
     */
    function isDaily(){
        var domain = getDomain(-1);
        return domain == 'net';
    }

    function MobileUploader(config) {
        var self = this;
        //调用父类构造函数
        MobileUploader.superclass.constructor.call(self, config);
        self.set('userConfig',config);
    }
    S.extend(MobileUploader, Base, /** @lends MobileUploader.prototype*/{
        /**
         * 插件初始化
         * @private
         */
        pluginInitializer : function(uploader) {
            if(!uploader) return false;
            var self = this;
            self.set('uploader',uploader);
            var $target = self.get('target');
            if(!$target.length) return false;
            $target.on('click',self._clickHandler,self);
        },
        //单击“手机上传”
        _clickHandler:function(ev){
            var self = this;
            var qr = self._renderQR();
            if(!qr) return true;
            var $target = self.get('target');
            var xy = $target.offset();
            qr.show();
            qr.offset(xy.top,xy.left+$target.outerWidth()+10);
        },
        //初始化二维码实例
        _renderQR:function(){
            var self = this;
            var qr = self.get('qr');
            if(qr) return qr;
            var config = self._config();
            qr = new QR(config);
            self.set('qr',qr);
            return qr;
        },
        _config:function(){
            var self = this;
            var uploader = self.get('uploader');
            var auth = uploader.getPlugin('auth');
            var userConfig = self.get('userConfig');
            var config = userConfig;
            if(auth){
                var authConfig = {
                    //最大上传数
                    max: auth.get('max'),
                    //格式控制
                    type: auth.get('allowExts').replace(/,/g,'/')
                };
                config = S.merge(authConfig,userConfig);
            }
            var daily = isDaily();
            self.set('daily',daily);
            //图片地址路径
            var imageUrl = daily && DAILY_API || LINE_API;
            self.set('imageUrl',imageUrl);
            S.mix(config,{
                daily : daily,
                xmppcallback:function(ev){
                    self._xmppcallback(ev.data);
                }
            })
            return config;
        },
        //mpp消息推送出图片数据后执行的回调
        _xmppcallback:function(data){
            var self = this;
            if(!S.isArray(data)) return false;
            S.log('mpp返回的文件数据是：');
            S.log(data);
            var qr = self.get('qr');
            if(!qr) return false;
            qr.hide();
            var uploader = self.get('uploader');
            var queue = uploader.get('queue');
            var imageUrl = self.get('imageUrl');
            S.each(data,function(file){
                var result = {
                    name:file.name,
                    url:imageUrl + file.name
                };
                var file = queue.add(result);
                file.result = result;
                var index = queue.getFileIndex(file.id);
                queue.fileStatus(index,'success');
                uploader.fire('success',{index:index, file:file, result:result});
            });
        }
    }, {ATTRS : /** @lends MobileUploader*/{
        /**
         * 插件名称
         * @type String
         */
        pluginId:{
            value:'mobileUploader'
        },
        /**
         * 读取粘贴数据的节点元素，默认为document
         * @type NodeList
         */
        target:{
            value:EMPTY,
            getter:function(v){
                return $(v);
            }
        },
        uploader:{value:EMPTY},
        //用户的配置
        userConfig:{value:{}},
        //图片的路径
        imageUrl:{value:EMPTY},
        //二维码实例
        qr:{value:EMPTY}
    }})
    return MobileUploader;
}, {requires : ['node','base','./qrcode']});
/**
 * changes:
 * 明河：1.5
 *           - 新增插件
 */