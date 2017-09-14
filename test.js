var checkVal = new CheckValue();

			var localmsg = "";

			mui.plusReady(function() {
				//是否是第一次打开
				if(Fun_App.getdata("isOneOpen") == null) {
					Fun_App.storagedata('isOneOpen', 'yes')
					Fun_App.openWin('./guidePage.html', 'pop-in', '')
				}
				Fun_App.getdata("token") != ' ' && Fun_App.getdata("token") != null ? Fun_App.openWin('index.html', 'pop-in', '') : '';
				var ws = plus.webview.currentWebview();
				var uAccount = {
						uPwdOk: null,
						uNumberOk: null,
					},
					imgVcodeBox = document.querySelector("#imgVcode"),
					state = false;

				function checkInput() { //检测用户输入的手机号和密码
					var thisVal = "", //用户当前输入文本框的值
						thisType = ""; //获取当前input的类型
					var inputs = document.querySelectorAll("input");
					for(var i = 0; i < inputs.length; i++) {
						inputs[i].addEventListener("blur", function() {
							thisVal = this.value; //获取当前的value
							thisType = this.getAttribute("name");
							switch(thisType) {
								case "uNumber":
									uAccount.uNumberOk = checkVal.checkPhoneNum(thisVal);
									break;
								case "uPwd":
									uAccount.uNumberOk = checkVal.checkPwd(thisVal);
									break;
							}

						})
					}
				}
				checkInput()
				mui(".login_local").on("tap", "#buttom", function() {
					this.focus() //解决键盘问题
					uAccount.uPwdOk = document.getElementById("uPwd").value
					uAccount.uNumberOk = document.getElementById("uNumber").value
					var userData = {
						config: {
							"userName": uAccount.uNumberOk,
							"password": uAccount.uPwdOk,
							"clientId": plus.push.getClientInfo().clientid, //个推的clientId
							"deviceId": plus.device.uuid, //设备id
							"version": plus.runtime.innerVersion, //app版本
							"source": (plus.os.name == "Android") ? 1 : 2 //来源 1 Android ；2  iOS

						},
						fun_Success: function(data) {
							if(data.success) { //登录成功
								Fun_App.storagedata("token", data.data.token);
								Fun_App.storagedata("jobCode", data.data.jobCode); //当前账户的角色等级
								Fun_App.storagedata("shopType", data.data.shopType); //当前商铺的类型
								Fun_App.openWin("index.html", "pop-in");
							} else {
								mui.toast(data.message);
							}
							console.log(JSON.stringify(data));
						}
					}
					if(Fun_App.checkObjIsNull(uAccount, null) != false) {
						Fun_App.ExAjax("login", userData);
					} else {
						mui.toast("手机号,密码不能为空");
						return false;
					}
				});

				// 监听点击消息事件
				plus.push.addEventListener("click", function() {
					// 设置APP图标的角标
					plus.runtime.setBadgeNumber(0);
					//var payload = (plus.os.name == 'iOS') ? msg.payload : JSON.parse(msg.payload);
					//mui.alert("click" + localmsg);
					//mui.alert("click" + JSON.stringify(localmsg));
					switch(localmsg.type) {
						case 0:
							Fun_App.openWin('page/work/messageArticle.html', 'pop-in', '');
						break;
						case 1:
						case 2:
							var date = new Date(),
								dates;
							datas = date.getFullYear();
							datas += "-" + ((date.getMonth() + 1) <= 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1));
							datas += "-" + (date.getDate() <= 9 ? '0' + date.getDate() : date.getDate());
							Fun_App.openWin('page/order/orderdentail.html', 'pop-in', dates);
							break;
						case 3:
							Fun_App.openWin('page/work/budgetAdmin.html', 'pop-in', '');
							break;
						case 4:
							Fun_App.openWin('page/work/partyAdmin.html', 'pop-in', '');
							break;
						default:
							Fun_App.openWin('404.html', 'pop-in', '');
					}
					/*if(localmsg.type == 1) {
						//打开系统消息详情页面
						var date = new Date(),
							dates;
						datas = date.getFullYear();
						datas += "-" + ((date.getMonth() + 1) <= 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1));
						datas += "-" + (date.getDate() <= 9 ? '0' + date.getDate() : date.getDate());

						Fun_App.openWin('page/order/orderdentail.html', 'pop-in', dates);
					}
					if(localmsg.type == 0) {
						//打开商户消息详情页面
						Fun_App.openWin('page/work/messageArticle.html', 'pop-in', '');
					}*/
					console.log("点击本地创建消息启动：");
				}, false);

				// 监听在线消息事件
				plus.push.addEventListener("receive", function(msg) {
					if(Fun_App.getdata("token") != ' ' && Fun_App.getdata("token") != null) {
						logoutPushMsg(msg);
					}
				}, false);
			});
			mui("body").on("tap", ".forgetpassword", function() {
				Fun_App.openWin("./repwd.html", "pop-in", "");
			});

			//获取穿透参数
			function logoutPushMsg(msg) {
				if(msg.payload) {

					if(typeof(msg.payload) == "string") {
						//mui.alert("receive1:" + msg);
						//mui.alert("receive1:" + JSON.stringify(msg));
						localmsg = eval('(' + msg.content + ')');
						createLocalPushMsg(localmsg);
					} else {
						//mui.alert("receive2:" + msg);
						//mui.alert("receive2:" + JSON.stringify(msg));
						localmsg = JSON.parse(msg.content);
						createLocalPushMsg(localmsg);
					}

				} else {
					console.log("payload: undefined");
				}
			}

			//创建本地推送
			function createLocalPushMsg(content) {
				//mui.alert("createLocalPushMsg:" + content.title);
				//mui.alert("createLocalPushMsg:" + JSON.stringify(content.title));
				var options = {
					cover: false,
				};

				plus.push.createMessage(content.title, "LocalMSG", options);
				//	if(plus.os.name == "iOS") {
				//		mui.toast('*如果无法创建消息，请到"设置"->"通知"中配置应用在通知中心显示!');
				//	}

			}