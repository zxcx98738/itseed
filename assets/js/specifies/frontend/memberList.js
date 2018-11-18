$(".top").click(function() {
	$("html, body").animate({scrollTop: 0}, 500);
});



var list = document.querySelectorAll('.list-num');

$(".list-num").click(function(){
	if($(this).html()==1){
		changeList(first);
	}
	if($(this).html()==2){
		changeList(second);
	}
	if($(this).html()==3){
		changeList(third);
	}
	if($(this).html()==4){
		changeList(forth);
	}
	if($(this).html()==5){
		changeList(fifth);
	}
	if($(this).html()==6){
		changeList(sixth);
	}
	if($(this).html()==7){
		changeList(seventh);
	}
	if($(this).html()==8){
		changeList(eight);
	}
	if($(this).html()==9){
		changeList(nine);
	}
	if($(this).html()==10){
		changeList(ten);
	}
	if($(this).html()==11){
		changeList(eleven);
	}
	if($(this).html()==12){
		changeList(twelve);
	}
	if($(this).html()==13){
		changeList(thirteen);
	}
	if($(this).html()==14){
		changeList(fourteen);
	}
	if($(this).html()==15){
		changeList(fifteen);
	}
	$(".list-th>span").html($(this).html());
});

function changeList( list ){
	$("#member-content").html("");
	for(var i=0;i<list.length;i++){
		$("#member-content").append("<tr><td>"+list[i].name+"</td><td>"+list[i].school+"</td><td>"+list[i].dep+"</td></tr>");

	}
}

var first = [
	{
		name:"高培翔",
		school:"國立政治大學",
		dep:"企業管理系"
	},
	{
		name:"曾曉婷",
		school:"國立實踐大學",
		dep:"企業管理系"
	},
	{
		name:"段繼忠",
		school:"台北科大",
		dep:"工管所"
	},
	{
		name:"方超群",
		school:"政治大學",
		dep:"公行系"
	},
	{
		name:"周呈樺",
		school:"台灣藝大",
		dep:"圖傳系"
	},
	{
		name:"何明政",
		school:"文化大學",
		dep:"資科系"
	},
	{
		name:"沈庭禎",
		school:"台灣大學",
		dep:"會計系"
	},
	{
		name:"王俊凱",
		school:"政治大學",
		dep:"財管系"
	},
	{
		name:"許儒怡",
		school:"政治大學",
		dep:"國貿系"
	},
	{
		name:"吳進榮",
		school:"輔仁大學",
		dep:"管理所"
	},
	{
		name:"詹大千",
		school:"台灣大學",
		dep:"政治系"
	},
	{
		name:"詹庭芳",
		school:"台灣大學",
		dep:"外文系"
	},
	{
		name:"張雁翔",
		school:"交通大學",
		dep:"管科系"
	},
	{
		name:"蔡琮翔",
		school:"台灣大學",
		dep:"電機系"
	},
	{
		name:"藍健銘",
		school:"台灣大學",
		dep:"電機系"
	},
	{
		name:"蔡東昇",
		school:"交通大學",
		dep:"電物系"
	},
	{
		name:"陳姮螢",
		school:"台灣大學",
		dep:"國企系"
	},
	{
		name:"王治真",
		school:"台灣大學",
		dep:"國企系"
	},
	{
		name:"張世鋒",
		school:"文化大學",
		dep:"資傳所"
	},
	{
		name:"劉柏廷",
		school:"輔仁大學",
		dep:"哲系"
	},
	{
		name:"岑岡霖",
		school:"東吳大學",
		dep:"商數系"
	},
	{
		name:"鄭湘縈",
		school:"東吳大學",
		dep:"商數系"
	},
]
var second = [
	{
		name:"李佳泓",
		school:"交通大學",
		dep:"電控系"
	},
	{
		name:"陳彥如",
		school:"台灣大學",
		dep:"資管系"
	},
	{
		name:"黃重凱",
		school:"台灣大學",
		dep:"工科系"
	},
	{
		name:"張程鈞",
		school:"淡江大學",
		dep:"教科系"
	},
	{
		name:"陳正閔",
		school:"東吳大學",
		dep:"企管所"
	},
	{
		name:"梁文玉",
		school:"交通大學",
		dep:"管科系"
	},
	{
		name:"黃麒穎",
		school:"交通大學",
		dep:"機械系"
	},
	{
		name:"林俊成",
		school:"交通大學",
		dep:"工管系"
	},
	{
		name:"劉嘉皓",
		school:"政治大學",
		dep:"廣電所"
	},
	{
		name:"王培仲",
		school:"台灣大學",
		dep:"微生所"
	},
	{
		name:"陳琬瑜",
		school:"台灣師大",
		dep:"社教系"
	},
	{
		name:"陳顥仁",
		school:"台北科大",
		dep:"工管所"
	},
	{
		name:"洪韶彥",
		school:"清華大學",
		dep:"科管所"
	},
	{
		name:"蔡致蕙",
		school:"台灣藝大",
		dep:"視傳系"
	},
	{
		name:"古竹生",
		school:"清華大學",
		dep:"電機系"
	},
	{
		name:"許庭瑋",
		school:"台灣師大",
		dep:"資訊系"
	},
	{
		name:"王仕閔",
		school:"台灣大學",
		dep:"政治系"
	},
	{
		name:"劉虹麟",
		school:"政治大學",
		dep:"公行系"
	},
	{
		name:"劉筱筠",
		school:"台北大學",
		dep:"經研所"
	},
	{
		name:"李佳泓",
		school:"交通大學",
		dep:"電控系"
	},
	{
		name:"陳彥如",
		school:"台灣大學",
		dep:"資管系"
	},
	{
		name:"黃重凱",
		school:"台灣大學",
		dep:"工科系"
	},
]

var third = [
	{
		name:'許家瑋',
		school:'大同大學',
		dep:'經營所'
	},
	{
		name:'曾筱芸',
		school:'中興大學',
		dep:'資科所'
	},
	{
		name:'溫珮妏',
		school:'中原大學',
		dep:'商設系'
	},
	{
		name:'張雅嵐',
		school:'中華大學',
		dep:'生資系'
	},
	{
		name:'李奕輝',
		school:'元智大學',
		dep:'國企系'
	},
	{
		name:'蕭培元',
		school:'台北科大',
		dep:'工管系'
	},
	{
		name:'楊智涵',
		school:'台灣大學',
		dep:'商研所'
	},
	{
		name:'梁玉婷',
		school:'台灣大學',
		dep:'資工所'
	},
	{
		name:'陳昌佑',
		school:'台灣大學',
		dep:'資管所'
	},
	{
		name:'黃心惟',
		school:'台灣大學',
		dep:'資管系'
	},
	{
		name:'鄭景瑋',
		school:'台灣大學',
		dep:'資管系'
	},
	{
		name:'賴建伸',
		school:'台灣大學',
		dep:'資管系'
	},
	{
		name:'謝夢蝶',
		school:'台灣大學',
		dep:'資管系'
	},
	{
		name:'楊博程',
		school:'台灣大學',
		dep:'電信所'
	},
	{
		name:'林昱呈',
		school:'台灣大學',
		dep:'電機系'
	},
	{
		name:'黃楚翔',
		school:'台灣大學',
		dep:'電機系'
	},
	{
		name:'溫英翔',
		school:'台灣大學',
		dep:'電機所'
	},
	{
		name:'曾靖淳',
		school:'台灣科大',
		dep:'資管系'
	},
	{
		name:'郭彥良',
		school:'玄奘大學',
		dep:'資科所'
	},
	{
		name:'王仲偉',
		school:'成功大學',
		dep:'化系'
	},
	{
		name:'李雅雯',
		school:'政治大學',
		dep:'企管系'
	},
	{
		name:'高嘉鴻',
		school:'清華大學',
		dep:'物理系'
	},
	{
		name:'劉璟霏',
		school:'清華大學',
		dep:'科管所'
	},
	{
		name:'錢 晟',
		school:'清華大學',
		dep:'原子系'
	},
	{
		name:'林妙徽',
		school:'清華大學',
		dep:'經濟系'
	},
	{
		name:'林宜賢',
		school:'清華大學',
		dep:'經濟系'
	},
	{
		name:'鄭元博',
		school:'清華大學',
		dep:'資工系'
	},
	{
		name:'官佳凱',
		school:'聖約翰大',
		dep:'企管系'
	},
	{
		name:'蕭伊玲',
		school:'嘉義大學',
		dep:'企管系'
	},
]


var forth =[
	{
		name:'陳怡真',
		school:'銘傳大學', 
		dep:'企業管理系'
	},
	{
		name:'王嫚謙',
		school:'台灣大學', 
		dep:'政治所'
	},
	{
		name:'蔡因因',
		school:'台灣科大', 
		dep:'資訊管理系'
	},
	{
		name:'呂瑾玟',
		school:'政治大學', 
		dep:'俄羅斯所'
	},
	{
		name:'葉菁萍',
		school:'台灣科大', 
		dep:'資訊管理系'
	},
	{
		name:'敖富琪',
		school:'台灣大學', 
		dep:'資訊管理系'
	},
	{
		name:'鍾安綾',
		school:'台灣大學', 
		dep:'財務金融系'
	},
	{
		name:'蔡宜娜',
		school:'台灣大學', 
		dep:'工商管理系'
	},
	{
		name:'黃琦芳',
		school:'台灣大學', 
		dep:'生物科技系'
	},
	{
		name:'王郁婷',
		school:'交通大學', 
		dep:'管理科學所'
	},
	{
		name:'賴怜均',
		school:'元智大學', 
		dep:'應用外語系'
	},
	{
		name:'賴盈如',
		school:'清華大學', 
		dep:'資訊工程系'
	},
	{
		name:'徐琬婷',
		school:'清華大學', 
		dep:'經濟系'
	},
	{
		name:'林宛柔',
		school:'清華大學', 
		dep:'經濟系'
	},
	{
		name:'張翔猛',
		school:'台灣科大', 
		dep:'資訊管理系'
	},
	{
		name:'廖晉毅',
		school:'臺灣大學', 
		dep:'財務金融系'
	},
	{
		name:'王佑哲',
		school:'台北科大', 
		dep:'電機工程系'
	},
	{
		name:'林宜儒',
		school:'政治大學', 
		dep:'資訊管理系'
	},
	{
		name:'呂政道',
		school:'政治大學', 
		dep:'風險管理與保險系'
	},
	{
		name:'林彥丞',
		school:'東吳大學', 
		dep:'企研所'
	},
	{
		name:'張　明',
		school:'台灣科大', 
		dep:'資訊工程系'
	},
	{
		name:'楊荏傑',
		school:'台灣大學', 
		dep:'政治系'
	},
	{
		name:'徐斌欽',
		school:'台灣大學', 
		dep:'化系'
	},
	{
		name:'王俊諺',
		school:'國防大學', 
		dep:'後勤管理所'
	},
	{
		name:'林俊安',
		school:'中央大學', 
		dep:'通訊系'
	},
	{
		name:'黃俊凱',
		school:'長庚大學',
		dep:'資訊工程系'
	}
]


var fifth = [
	{
		name:'劉安蓉',
		school:'台灣科大',
		dep:'資訊管理系'
	},
	{
		name:'劉曉盈',
		school:'長庚大學',
		dep:'醫務管理系'
	},
	{
		name:'廖彗吟',
		school:'台北科大',
		dep:'工商管理系'
	},
	{
		name:'廖晨雅',
		school:'台灣大學',
		dep:'會計系'
	},
	{
		name:'李姿慧',
		school:'台灣科大',
		dep:'電子所'
	},
	{
		name:'李浩瑜',
		school:'台灣大學',
		dep:'資訊管理系'
	},
	{
		name:'林佳慧',
		school:'台灣大學',
		dep:'生物科技系'
	},
	{
		name:'林育竹',
		school:'長庚大學',
		dep:'資訊管理系'
	},
	{
		name:'楊斯涵',
		school:'台灣大學',
		dep:'醫學檢驗生物技術系'
	},
	{
		name:'童偲媁',
		school:'政治大學',
		dep:'資訊管理系'
	},
	{
		name:'紀芷芸',
		school:'台灣大學',
		dep:'農業化系'
	},
	{
		name:'翁瑜璘',
		school:'中央大學',
		dep:'網路學習科技研究所'
	},
	{
		name:'蔡炘蓉',
		school:'台灣大學',
		dep:'經濟系'
	},
	{
		name:'詹慧慈',
		school:'台灣大學',
		dep:'微生物所'
	},
	{
		name:'陳怡君',
		school:'台灣科大',
		dep:'資訊管理系'
	},
	{
		name:'高若馨',
		school:'中央大學',
		dep:'地球科系'
	},
	{
		name:'張毓容',
		school:'長庚大學',
		dep:'資訊管理系'
	},
	{
		name:'柳佳林',
		school:'台北科大',
		dep:'電機工程所'
	},
	{
		name:'吳鴻慶',
		school:'台灣大學',
		dep:'財務金融系'
	},
	{
		name:'周哲揚',
		school:'台灣大學',
		dep:'經濟系'
	},
	{
		name:'張家豪',
		school:'台北科大',
		dep:'電機工程系'
	},
	{
		name:'徐郁昇',
		school:'台灣師大',
		dep:'科技所'
	},
	{
		name:'曹瀚勻',
		school:'台灣大學',
		dep:'生命科系'
	},
	{
		name:'林挺正',
		school:'台灣大學',
		dep:'電機工程系'
	},
	{
		name:'梁耀升',
		school:'東吳大學',
		dep:'企業管理系'
	},
	{
		name:'程仲駿',
		school:'長庚大學',
		dep:'資訊管理系'
	},
	{
		name:'胡佳寧',
		school:'台灣大學',
		dep:'電機工程系'
	},
	{
		name:'蕭創元',
		school:'台北科大',
		dep:'資訊工程所'
	},
	{
		name:'林彥希',
		school:'台灣大學',
		dep:'社會系'
	},
	{
		name:'陳洪典',
		school:'台灣科大',
		dep:'電子工程所'
	},
	{
		name:'陳鴻彬',
		school:'台灣科大',
		dep:'高分子系'
	}
]

var sixth = [
	{
		name:'劉玉棋',
		school:'台灣科大', 
		dep:'資管系'
	},
	{
		name:'陳威豪',
		school:'中央大學', 
		dep:'企管系'
	},
	{
		name:'蘇怡萍',
		school:'長庚大學', 
		dep:'資工系'
	},
	{
		name:'王姿婷',
		school:'政治大學', 
		dep:'科管所'
	},
	{
		name:'陳立興',
		school:'台灣大學', 
		dep:'圖資所'
	},
	{
		name:'蔡松昇',
		school:'台灣大學', 
		dep:'電機系'
	},
	{
		name:'林培茵',
		school:'台北科大', 
		dep:'商管所'
	},
	{
		name:'林淑娟',
		school:'中央大學', 
		dep:'資管系'
	},
	{
		name:'張肯維',
		school:'台灣大學', 
		dep:'經濟系'
	},
	{
		name:'秦子閔',
		school:'清華大學', 
		dep:'科管所'
	},
	{
		name:'陳思諭',
		school:'中原大學', 
		dep:'資管系'
	},
	{
		name:'傅文欽',
		school:'台灣科大', 
		dep:'機械所'
	},
	{
		name:'張朝凱',
		school:'台灣師大', 
		dep:'資教所'
	},
	{
		name:'蔡孟筠',
		school:'台北科大', 
		dep:'商管所'
	},
	{
		name:'詹雅淇',
		school:'台灣科大', 
		dep:'電資學士班'
	},
	{
		name:'翁思敏',
		school:'政治大學', 
		dep:'勞工所'
	},
	{
		name:'沈秀蓉',
		school:'台灣科大', 
		dep:'資管所'
	},
	{
		name:'孔貞貽',
		school:'台北大學', 
		dep:'財政系'
	},
	{
		name:'梁智澎',
		school:'台灣科大', 
		dep:'化工系'
	},
	{
		name:'孫景瑄',
		school:'政治大學', 
		dep:'財政系'
	},
	{
		name:'張舜傑',
		school:'世新大學', 
		dep:'資管所'
	},
	{
		name:'李妍皓',
		school:'臺灣師大', 
		dep:'工業科技教育系'
	},
	{
		name:'黃筱涵',
		school:'元智大學', 
		dep:'資管系'
	},
	{
		name:'鍾政宏',
		school:'台灣大學', 
		dep:'醫工所'
	},
	{
		name:'蔡佩蓉',
		school:'中正大學', 
		dep:'企管系'
	},
	{
		name:'石明儒',
		school:'台北教大', 
		dep:'教育傳播與科技所'
	}
];

var seventh = [
	{
		name:'陳識傑',
		school:'中正大學', 
		dep:'企研所'
	},
	{
		name:'程紹幃',
		school:'元智大學', 
		dep:'工管系'
	},
	{
		name:'王皓',		
		school:'台灣大學 ',
		dep:'生物環境系統工程系'
	},
	{
		name:'吳蕙盈',
		school:'政治大學', 
		dep:'英文系'
	},
	{
		name:'徐繼興',
		school:'清華大學', 
		dep:'電機系'
	},
	{
		name:'黃建誠',
		school:'台灣科大', 
		dep:'科管所'
	},
	{
		name:'鍾頡',		
		school:'台灣大學 ',
		dep:'工工所'
	},	
	{
		name:'林浩崴',
		school:'台灣大學', 
		dep:'資工所'
	},
	{
		name:'張桂慈',
		school:'政治大學', 
		dep:'公行所'
	},
	{
		name:'范瑋凌',
		school:'政治大學', 
		dep:'國貿所'
	},
	{
		name:'劉智偉',
		school:'台灣科大', 
		dep:'電子工程系'
	},
	{
		name:'楊媛婷',
		school:'台北大學', 
		dep:'企管所'
	},
	{
		name:'陳奕中',
		school:'台北科大', 
		dep:'電機系'
	},
	{
		name:'劉約辰',
		school:'台灣大學', 
		dep:'材料系'
	},
	{
		name:'李虹儀',
		school:'台灣大學', 
		dep:'經濟系'
	},
	{
		name:'柯捷方',
		school:'台灣大學', 
		dep:'農經系'
	},
	{
		name:'陳玟伶',
		school:'台北科大', 
		dep:'化工系'
	},
	{
		name:'魏取向',
		school:'政治大學', 
		dep:'資管所'
	},
	{
		name:'林伯彥',
		school:'清華大學', 
		dep:'經濟系'
	},
	{
		name:'蔡蕙如',
		school:'台灣科大', 
		dep:'資管所'
	},
	{
		name:'林美貞',
		school:'台北科大', 
		dep:'應用英語系'
	},
	{
		name:'王聖傑',
		school:'台灣大學', 
		dep:'電信工程所'
	},
	{
		name:'蔡永興',
		school:'政治大學', 
		dep:'廣電系'
	},
	{
		name:'王佩雯',
		school:'清華大學', 
		dep:'材料所'
	},
	{
		name:'劉孟芳',
		school:'元智大學', 
		dep:'資傳系'
	},
	{
		name:'陳怡文',
		school:'政治大學', 
		dep:'新聞系'
	},
	{
		name:'溫宗憲',
		school:'台灣大學', 
		dep:'電機系'
	},
	{
		name:'洪瑞苹',
		school:'台北教大', 
		dep:'英文系'
	},
	{
		name:'蘇尉池',
		school:'台灣師大', 
		dep:'科技應用系'
	},
	{
		name:'陳怡茹',
		school:'政治大學', 
		dep:'資管系'
	},
	{
		name:'李政宏',
		school:'中原大學', 
		dep:'資工系'
	},
	{
		name:'張瑜珊',
		school:'世新大學', 
		dep:'新聞所'
	},
	{
		name:'薛仲翔',
		school:'台灣大學', 
		dep:'電機系'
	},
	{
		name:'吳佩珊',
		school:'台北大學', 
		dep:'企管系'
	},
	{
		name:'林依婷',
		school:'台北大學', 
		dep:'企管所'
	}
]

var eight = [
	{
		name:'張凱迪',
		school:'台灣大學',
		dep:' 政治系'
	},
	{
		name:'吳怡萱',
		school:'國北教大',
		dep:' 數學暨資訊教育系'
	},
	{
		name:'甘嘉莉',
		school:'北科大 ',
		dep:'資工所'
	},
	{
		name:'黃富隆',
		school:'台科大 ',
		dep:'工商業設計系'
	},
	{
		name:'唐偉峻',
		school:'政治大學',
		dep:' 國貿系'
	},
	{
		name:'葉進隆',
		school:'北科大 ',
		dep:'電子系'
	},
	{
		name:'黃首翰',
		school:'海洋大學',
		dep:' 資工系'
	},
	{
		name:'黃盈盈',
		school:'輔仁大學',
		dep:' 企管系'
	},
	{
		name:'廖芷微',
		school:'清華大學',
		dep:' 計量財務金融系'
	},
	{
		name:'葉家含',
		school:'東吳大學',
		dep:' 音樂系'
	},
	{
		name:'謝孟庭',
		school:'台北大學',
		dep:' 應外系'
	},
	{
		name:'蔡仲恩',
		school:'北科大 ',
		dep:'英文系'
	},
	{
		name:'劉光倫',
		school:'台灣大學',
		dep:' 化工系'
	},
	{
		name:'蘇莞筑',
		school:'台科大 ',
		dep:'科管所'
	},
	{
		name:'翁維陽',
		school:'台師大 ',
		dep:'社會教育系'
	},
	{
		name:'陳沛鈞',
		school:'政治大學',
		dep:' 國貿所'
	},
	{
		name:'吳宗倫',
		school:'台師大 ',
		dep:'數系'
	},
	{
		name:'孫瑞駿',
		school:'長庚大學',
		dep:' 資工系'
	},
	{
		name:'黃閔綉',
		school:'交通大學',
		dep:' 管理科學系'
	},
	{
		name:'林吾軒',
		school:'長庚大學',
		dep:' 資工系'
	},
	{
		name:'黃資婉',
		school:'政治大學',
		dep:' 國貿所'
	},
	{
		name:'鐘柏鈞',
		school:'台科大 ',
		dep:'資管所'
	},
	{
		name:'梁馨文',
		school:'政治大學',
		dep:' 金融系'
	},
	{
		name:'姚柏安',
		school:'交通大學',
		dep:' 多媒體所'
	},
	{
		name:'喻大成',
		school:'台灣大學',
		dep:' 農業經濟所'
	},
	{
		name:'林德森',
		school:'國北教大',
		dep:' 數位科技設計系'
	},
	{
		name:'張簡文昇',
		school:'陽明大學',
		dep:' 生物醫學資訊所'
	},
	{
		name:'簡豪廷',
		school:'台科大 ',
		dep:'企管所'
	},
	{
		name:'陳佩君',
		school:'台灣大學',
		dep:' 電機系'
	},
	{
		name:'蕭雯澤',
		school:'政治大學',
		dep:' 外交系'
	},
	{
		name:'林柏彥',
		school:'台灣大學',
		dep:' 電信所'
	},
	{
		name:'邱芷畇',
		school:'政治大學',
		dep:' 民族系'
	},
	{
		name:'林國偉',
		school:'台灣大學',
		dep:' 電機系'
	},
	{
		name:'孫惠鈴',
		school:'北科大 ',
		dep:'經營管理系'
	},
	{
		name:'李昱君',
		school:'輔仁大學',
		dep:' 護理系'
	},
	{
		name:'呂孟謙',
		school:'台灣大學',
		dep:' 光電所'
	}
];





var nine = [
{	
	name:'廖薏淳',
	school:'台灣大學',
	dep: '圖書資訊系'
},
{
	name: "賴亮芸",
	school: '台科大',
	dep: '工業設計系'
},
{
	name:'陳怡真',
	school:'東吳大學',
	dep: '法律系'
},
{
	name:'葉庭吟',
	school:'台灣科技大學',
	dep:'工業設計系'
},
{
	name:'蔡岳宏',
	school:'中正大學',
	dep: '成人教育系'
},
{
	name:'張芝凡',
	school:'台灣大學',
	dep: '日文系'
},
{
	name:'謝明倫',
	school:'台灣大學',
	dep: '電機系'
},
{
	name:'常宗翼',
	school:'台灣科技大學',
	dep:'企管所'
},
{
	name:'吳奐廷',
	school:'政治大學',
	dep: '國貿系'
},
{
	name:'許怡蕙',
	school:'台灣大學',
	dep: '資管所'
},
{
	name:'郭瀚智',
	school:'台灣大學',
	dep: '資管系'
},
{
	name:'余佳晏',
	school:'國立台北教育大學',
	dep:'教育系'
},
{
	name:'張峰鳴',
	school:'台灣大學',
	dep: '電機所'
},
{
	name:'李彥霖',
	school:'長庚大學',
	dep: '資工系'
},
{
	name:'陳均旻',
	school:'中央大學',
	dep: '英美語文系'
},
{
	name:'王俊淇',
	school:'台北醫學',
	dep: '醫檢暨生技所'
},
{
	name:'賴怡真',
	school:'台灣師範大學',
	dep:'科技應用與人力資源發展系'
},
{
	name:'官瑀晴',
	school:'台灣大學',
	dep: '圖書資訊系'
},
{
	name:'魏佑霖',
	school:'台灣大學',
	dep: '農經所'
},
{
	name:'張智傑',
	school:'交通大學',
	dep: '環境工程所'
},
{
	name:'曾怡寧',
	school:'清華大學',
	dep: '科管所'
},
{
	name:'林雯萱',
	school:'臺灣師範大學',
	dep:'美術系'
},
{
	name:'郭彥均',
	school:'台灣大學',
	dep: '中文系'
},
{
	name:'郭泰頤',
	school:'台灣大學',
	dep: '資管所'
},
{
	name:'鐘詩淵',
	school:'政治大學',
	dep: '資管系'
},
{
	name:'張毓庭',
	school:'台灣大學',
	dep: '電機系'
},
{
	name:'廖育萱',
	school:'台灣大學',
	dep: '資管系'
},
{
	name:'張國豐',
	school:'臺灣師範大學',
	dep:'公民教育與活動領導系'
},
{
	name:'陳冠如',
	school:'清華大學',
	dep: '經濟系'
},
{
	name:'李珈蓉',
	school:'政治大學',
	dep: '經濟系'
},
{
	name:'張孝誠',
	school:'陽明大學',
	dep: '醫系'
}
];



var ten = [
{
	name:'林恩如',
	school:'政治大學', 
	dep:'教育所'
},
{
	name:'黃博裕',
	school:'台灣大學', 
	dep:'電信所'
},
{
	name:'曾建勳',
	school:'台灣大學', 
	dep:'資訊管理系'
},
{
	name:'詹凱雯',
	school:'東吳大學', 
	dep:'會計系'
},
{
	name:'鐘婉文',
	school:'交通大學', 
	dep:'財政所'
},
{
	name:'吳蕙如',
	school:'台灣大學', 
	dep:'資訊管理系'
},
{
	name:'陳奇婕',
	school:'中央大學', 
	dep:'資訊管理所'
},
{
	name:'賴裕文',
	school:'台灣大學', 
	dep:'物理所'
},
{
	name:'邱毓軒',
	school:'台灣科技大學',
	dep:'資訊管理所'
},
{
	name:'陳裕友',
	school:'政治大學', 
	dep:'國貿系'
},
{
	name:'張瀞文',
	school:'清華大學', 
	dep:'計量財務金融系'
},
{
	name:'潘怡安',
	school:'淡江大學', 
	dep:'國企系'
},
{
	name:'黃若璇',
	school:'台灣大學', 
	dep:'農業經濟系'
},
{
	name:'黃曼薇',
	school:'台灣師範大學',
	dep:'應用電子科技系'
},
{
	name:'何宸瑩',
	school:'東吳大學', 
	dep:'國貿系'
},
{
	name:'趙崇佑',
	school:'長庚大學', 
	dep:'資訊管理系'
},
{
	name:'陳致宇',
	school:'長庚科技大學',
	dep:'資訊管理系'
},
{
	name:'吳耀中',
	school:'東吳大學', 
	dep:'化系'
},
{
	name:'徐曼寧',
	school:'台灣科技大學',
	dep:'應外所'
},
{
	name:'顏正淵',
	school:'臺灣師範大學',
	dep:'公民教育與活動領導系'
},
{
	name:'蘇芸生',
	school:'台灣大學', 
	dep:'圖書資訊系'
},
{
	name:'林柏君',
	school:'輔仁大學', 
	dep:'資訊管理系'
},
{
	name:'官羽柔',
	school:'東吳大學', 
	dep:'國貿系'
},
{
	name:'李哲瑩',
	school:'清華大學', 
	dep:'物理所'
},
{
	name:'吳桂榛',
	school:'東吳大學', 
	dep:'會計系'
},
{
	name:'謝家珍',
	school:'長庚大學', 
	dep:'資訊管理系'
},
{
	name:'蔡孟錡',
	school:'台灣大學', 
	dep:'資訊管理系'
},
{
	name:'曹雯涵',
	school:'陽明大學', 
	dep:'醫學工程所'
},
{
	name:'呂政毅',
	school:'台灣科技大學',
	dep:'企管系'
},
{
	name:'賴惟仁',
	school:'中央大學', 
	dep:'資管系'
},
{
	name:'陳柏豪',
	school:'台灣大學', 
	dep:'電機系'
},
{
	name:'潘長杰',
	school:'台北科技大學',
	dep:'經營管理所'
},
{
	name:'劉盈秀',
	school:'台灣大學', 
	dep:'資訊管理系'
},
{
	name:'陳冠勻',
	school:'長庚科技大學',
	dep:'資訊管理系'
}
];



eleven = [
	{
		name:'王孝群',
		school:'台灣大學', 
		dep:'物理所'
	},
	{
		name:'石佩昀',
		school:'東吳大學', 
		dep:'經濟系'
	},
	{
		name:'吳佩容',
		school:'輔仁大學', 
		dep:'新聞傳播系'
	},
	{
		name:'李曜任',
		school:'中央大學', 
		dep:'英文系'
	},
	{
		name:'杜怡萱',
		school:'長庚大學', 
		dep:'資訊管理系'
	},
	{
		name:'林佳龍',
		school:'台灣科技大學',
		dep:'機械工程系'
	},
	{
		name:'林明毅',
		school:'台灣科技大學',
		dep:'資訊管理系'
	},
	{
		name:'林欣瑜',
		school:'國立台北教育大學',
		dep:'心理與諮商所'
	},
	{
		name:'邱靖倢',
		school:'台灣科技大學',
		dep:'電子工程系'
	},
	{
		name:'侯詠齡',
		school:'政治大學', 
		dep:'資訊管理系'
	},
	{
		name:'紀宇軒',
		school:'政治大學', 
		dep:'資訊管理系'
	},
	{
		name:'胡騏久',
		school:'輔仁大學', 
		dep:'大眾傳播系'
	},
	{
		name:'范智凱',
		school:'台灣科技大學',
		dep:'企業管理系'
	},
	{
		name:'陳昕蘭',
		school:'臺灣大學', 
		dep:'財務金融系'
	},
	{
		name:'彭怡翔',
		school:'臺北大學', 
		dep:'經濟系'
	},
	{
		name:'黃詩媛',
		school:'東吳大學', 
		dep:'英國語文系'
	},
	{
		name:'常心瀚',
		school:'東吳大學', 
		dep:'企業管理所'
	},
	{
		name:'溫婉涵',
		school:'中央大學', 
		dep:'資訊管理系'
	},
	{
		name:'楊斯任',
		school:'實踐大學', 
		dep:'應用外語系'
	},
	{
		name:'盧琇暐',
		school:'東華大學', 
		dep:'國際企業系'
	},
	{
		name:'游翔琳',
		school:'中央大學', 
		dep:'產業經濟所'
	},
	{
		name:'張馨尹',
		school:'台灣大學', 
		dep:'材料系'
	},
	{
		name:'詹博雯',
		school:'台灣大學', 
		dep:'資訊管理系'
	},
	{
		name:'陳又綾',
		school:'淡江大學', 
		dep:'資訊傳播系'
	},
	{
		name:'張文源',
		school:'台灣大學', 
		dep:'資訊管理系'
	},
	{
		name:'曾郁琇',
		school:'交通大學', 
		dep:'企業管理所'
	},
	{
		name:'許佳萍',
		school:'臺灣科技大學',
		dep:'資訊工程系'
	},
	{
		name:'蔡宇軒',
		school:'政治大學', 
		dep:'傳播學士學位學程'
	},
	{
		name:'鄭永珍',
		school:'中央大學', 
		dep:'資訊管理系'
	},
	{
		name:'薛聖譯',
		school:'淡江大學', 
		dep:'資訊管理系'
	},
	{
		name:'謝筱俞',
		school:'交通大學', 
		dep:'管理科學所'
	},
	{
		name:'陳韋伶',
		school:'淡江大學', 
		dep:'產業經濟系'
	},
	{
		name:'陳俊宇',
		school:'臺灣大學', 
		dep:'圖書資訊系'
	},
	{
		name:'翁嘉妤',
		school:'長庚大學', 
		dep:'資訊管理系'
	},
	{
		name:'郭薏新',
		school:'長庚大學', 
		dep:'工商管理系'
	}
]




var twelve = [
	{
		name:'葉御元',
		school:'中原大學', 
		dep:'資訊管理系'
	},
	{
		name:'謝慧霖',
		school:'台灣大學', 
		dep:'化系'
	},
	{
		name:'簡子翔',
		school:'中央大學', 
		dep:'資訊管理系'
	},
	{
		name:'蔡奕敏',
		school:'臺北教育大學',
		dep:'資訊科系'
	},
	{
		name:'胡柏榕',
		school:'交通大學', 
		dep:'機械工程所'
	},
	{
		name:'游明臻',
		school:'臺北大學', 
		dep:'公共行政系'
	},
	{
		name:'陳右臻',
		school:'中央大學', 
		dep:'資訊管理系'
	},
	{
		name:'黃詩晴',
		school:'淡江大學', 
		dep:'國際企業系'
	},
	{
		name:'黃雅琪',
		school:'淡江大學', 
		dep:'公共行政系'
	},
	{
		name:'卓宛瑩',
		school:'清華大學', 
		dep:'工科系'
	},
	{
		name:'張元真',
		school:'政治大學', 
		dep:'資訊管理系'
	},
	{
		name:'陳宥辰',
		school:'台灣大學', 
		dep:'電子工程所'
	},
	{
		name:'徐宇凡',
		school:'致理技術學院',
		dep:'商務科技管理所'
	},
	{
		name:'曾宇晨',
		school:'台灣大學', 
		dep:'資訊管理系'
	},
	{
		name:'吳蜜雪',
		school:'臺北商業大學',
		dep:'會計資訊系'
	},
	{
		name:'賈慧中',
		school:'台灣大學', 
		dep:'農經系'
	},
	{
		name:'陳楷鵬',
		school:'台灣大學', 
		dep:'資訊管理所'
	},
	{
		name:'林靜怡',
		school:'政治大學', 
		dep:'社會所'
	},
	{
		name:'陳炯翰',
		school:'台灣科技大學',
		dep:'資訊管理系'
	},
	{
		name:'張玲涓',
		school:'臺北教育大學',
		dep:'文創系'
	},
	{
		name:'鄭湘蓉',
		school:'淡江大學', 
		dep:'資訊工程系'
	},
	{
		name:'陳羿廷',
		school:'台灣科技大學',
		dep:'電機系'
	},
	{
		name:'周楷鐘',
		school:'長庚大學', 
		dep:'資訊管理系'
	},
	{
		name:'陳冠穎',
		school:'台灣大學', 
		dep:'資訊管理所'
	},
	{
		name:'林俞珊',
		school:'中央大學', 
		dep:'資訊管理系'
	},
	{
		name:'鄭聖諺',
		school:'台灣科技大學',
		dep:'工商業設計系'
	},
	{
		name:'陳隆翔',
		school:'台灣大學', 
		dep:'資訊管理系'
	},
	{
		name:'陳怡臻',
		school:'東華大學', 
		dep:'國際企業系'
	},
	{
		name:'楊博凱',
		school:'銘傳大學', 
		dep:'餐旅管理系'
	},
	{
		name:'郭展境',
		school:'臺北大學', 
		dep:'企研所'
	},
	{
		name:'陳怡卉',
		school:'長庚大學', 
		dep:'資訊管理系'
	},
	{
		name:'石庭維',
		school:'淡江大學', 
		dep:'資訊管理系'
	},
	{
		name:'陳彥淇',
		school:'淡江大學', 
		dep:'管理科學系'
	},
	{
		name:'余曉雯',
		school:'政治大學', 
		dep:'資訊管理所'
	},
	{
		name:'張怡琛',
		school:'元智大學', 
		dep:'資傳系設計組'
	}
]




var thirteen = [
	{
		name:'唐 薇',       
		school:'清華大學', 
		dep:'經濟系'
	},
	{
		name:'蒲冠吉',
		school:'台灣大學', 
		dep:'心理系研究所'
	},
	{
		name:'曾子芸',
		school:'長庚大學', 
		dep:'資訊管理系'
	},
	{
		name:'張慧慈',
		school:'台北大學', 
		dep:'公共行政暨政策系'
	},
	{
		name:'周卓徵',
		school:'清華大學', 
		dep:'工程與系統科系'
	},
	{
		name:'薛翔文',       
		school:'長庚大學', 
		dep:'醫務管理系'
	},
	{
		name:'林宜穎',       
		school:'淡江大學', 
		dep:'管理科學系'
	},
	{
		name:'鄭濡萱',       
		school:'輔仁大學', 
		dep:'生命科系'
	},
	{
		name:'莊佳宜',       
		school:'政治大學', 
		dep:'科技管理與智慧財產研究所'
	},
	{
		name:'廖芷寧',       
		school:'臺北大學', 
		dep:'公共行政暨政策系'
	},
	{
		name:'翁珮玲',       
		school:'台灣大學', 
		dep:'資訊管理系研究所'
	},
	{
		name:'張懷彬',       
		school:'台灣大學', 
		dep:' 財務金融系'
	},
	{
		name:'彭証鴻',       
		school:'中央大學', 
		dep:' 資訊管理系'
	},
	{
		name:'葉柏良',       
		school:'臺北教育大學', 
		dep:'教育經營與管理系'
	},
	{
		name:'麥蕙蓮',       
		school:'臺北大學', 
		dep:' 經濟系'
	},
	{
		name:'林均洋',       
		school:'台灣大學', 
		dep:' 機械工程系研究所'
	},
	{
		name:'楊雁婷',       
		school:'政治大學', 
		dep:' 會計系'
	},
	{
		name:'王靖婷',       
		school:'臺北商業大學', 
		dep:'企業管理系'
	},
	{
		name:'吳鴻毅',       
		school:'清華大學', 
		dep:' 工程與系統科系'
	},
	{
		name:'黃浩銘',       
		school:'實踐大學', 
		dep:' 資訊管理系'
	},
	{
		name:'簡立昕',       
		school:'東華大學', 
		dep:' 資訊管理系'
	},
	{
		name:'張博堯',       
		school:'台灣科技大學', 
		dep:'資訊管理系'
	},
	{
		name:'林裕翔',       
		school:'政治大學', 
		dep:' 國家發展所'
	},
	{
		name:'陳珮穎',       
		school:'淡江大學', 
		dep:' 資訊與圖書館系'
	},
	{
		name:'廖芳盈',       
		school:'台灣藝術大學', 
		dep:'雕塑系'
	},
	{
		name:'張盈禎',       
		school:'台灣科技大學', 
		dep:'資訊管理系研究所'
	},
	{
		name:'黃禹棻',       
		school:'臺北大學', 
		dep:' 企業管理系'
	},
	{
		name:'許庭瑜',       
		school:'政治大學', 
		dep:' 經濟系研究所'
	},
	{
		name:'吳沛璇',       
		school:'臺灣大學', 
		dep:' 資訊管理系'
	},
	{
		name:'宋進益',       
		school:'政治大學', 
		dep:' 國際經營與貿易系'
	},
	{
		name:'徐薇茹',       
		school:'臺北大學', 
		dep:' 經濟系'
	},
	{
		name:'賴冠廷',       
		school:'臺灣大學', 
		dep:' 資訊管理系'
	},
	{
		name:'邱芮毅',       
		school:'台灣師範大學', 
		dep:'科技應用與人力資源發展系'
	},
	{
		name:'林瑜禎',       
		school:' 淡江大學', 
		dep:'管理科學系'
	}
];
var fourteen = [
	{
		name: "鄭宇婷",
		school: "臺灣科技大學",
		dep: "電子工程系"
	},
	{
		name: "吳宜修",
		school: "臺北大學",
		dep: "經濟系"
	},
	{
		name: "魏佑容",
		school: "臺灣大學",
		dep: "農業經濟系"
	},
	{
		name: "劉宭守",
		school: "中央大學",
		dep: "資訊管理系"
	},
	{
		name: "莊志朋",
		school: "淡江大學",
		dep: "管理科學系"
	},
	{
		name: "郭士庭",
		school: "臺灣大學",
		dep: "資訊管理所"
	},
	{
		name: "易政霖",
		school: "淡江大學",
		dep: "管理科學系"
	},
	{
		name: "黃雲",
		school: "臺北大學",
		dep: "經濟系"
	},
	{
		name: "劉皪",
		school: "政治大學",
		dep: "資訊管理系"
	},
	{
		name: "李沛璇",
		school: "臺灣大學",
		dep: "國際企業系"
	},
	{
		name: "施心茹",
		school: "政治大學",
		dep: "企業管理系"
	},
	{
		name: "翁子崴",
		school: "清華大學",
		dep: "科技管理所"
	},
	{
		name: "林書攸",
		school: "臺灣大學",
		dep: "資訊管理系"
	},
	{
		name: "黃建翰",
		school: "政治大學",
		dep: "資訊管理系"
	},
	{
		name: "韓宜庭",
		school: "淡江大學",
		dep: "教育科技系"
	},
	{
		name: "吳少午",
		school: "元智大學",
		dep: "資訊傳播系"
	},
	{
		name: "陳姿臻",
		school: "東吳大學",
		dep: "政治系"
	},
	{
		name: "張簡翊珽",
		school: "中正大學",
		dep: "企業管理系"
	},
	{
		name: "謝宛蓁",
		school: "臺灣科技大學",
		dep: "工商業設計系"
	},
	{
		name: "蕭惟心",
		school: "清華大學",
		dep: "數系"
	},
	{
		name: "謝欣芸",
		school: "臺灣大學",
		dep: "工商管理系  英文專班"
	},
	{
		name: "張睿君",
		school: "臺灣大學",
		dep: "資訊管理系"
	},
	{
		name: "林柏聿",
		school: "輔仁大學",
		dep: "資訊管理系"
	},
	{
		name: "陳威宇",
		school: "長庚大學",
		dep: "醫務管理系"
	},
	{
		name: "陳冠瑋",
		school: "臺北科技大學",
		dep: "創新設計所"
	},
	{
		name: "陳呈祐",
		school: "中央大學",
		dep: "資訊管理系"
	},
	{
		name: "賴品竹",
		school: "臺灣大學",
		dep: "國際企業系"
	},
	{
		name: "徐佑昀",
		school: "臺灣大學",
		dep: "圖書資訊系"
	},
	{
		name: "林秉橙",
		school: "元智大學",
		dep: "資訊管理系"
	},
	{
		name: "黃琬淳",
		school: "臺灣大學",
		dep: "外國語文系雙修動物科技系"
	},
	{
		name: "蔡曜宇",
		school: "臺灣大學",
		dep: "資訊管理所"
	}
];
var fifteen = [
	{
		name: "高聖哲",
		school: "臺灣科技大學",
		dep: "資訊管理系"
	},
	{
		name: "張少謙",
		school: "臺灣師範大學",
		dep: "教育系"
	},
	{
		name: "陳莉羚",
		school: "政治大學",
		dep: "資訊管理系"
	},
	{
		name: "李宛儒",
		school: "中央大學",
		dep: "經濟系"
	},
	{
		name: "杜佳穎",
		school: "淡江大學",
		dep: "管理科學系"
	},
	{
		name: "簡智緯",
		school: "淡江大學",
		dep: "資訊與圖書管理系"
	},
	{
		name: "廖文豪",
		school: "臺灣大學",
		dep: "會計系"
	},
	{
		name: "黃國禎",
		school: "臺灣科技大學",
		dep: "資訊管理系"
	},
	{
		name: "郭容榕",
		school: "政治大學",
		dep: "國際經營與貿易系"
	},
	{
		name: "黃家儀",
		school: "文化大學",
		dep: "資訊管理系"
	},
	{
		name: "陳瑀婕",
		school: "清華大學",
		dep: "經濟系"
	},
	{
		name: "黃俊友",
		school: "臺北大學",
		dep: "經濟系"
	},
	{
		name: "黃薏瑄",
		school: "臺灣師範大學",
		dep: "社會教育研究所"
	},
	{
		name: "汪峻志",
		school: "臺灣科技大學",
		dep: "企業管理系"
	},
	{
		name: "楊舒媛",
		school: "臺灣大學",
		dep: "資訊工程系"
	},
	{
		name: "王昇",
		school: "臺灣科技大學",
		dep: "機械工程研究所"
	},
	{
		name: "高嘉涓",
		school: "中央大學",
		dep: "資訊管理系"
	},
	{
		name: "張安媞",
		school: "淡江大學",
		dep: "管理科學系"
	},
	{
		name: "洪肇男",
		school: "政治大學",
		dep: "國際經營與貿易系"
	},
	{
		name: "吳懿璇",
		school: "臺北大學",
		dep: "經濟系"
	},
	{
		name: "黃鶴聞",
		school: "臺灣大學",
		dep: "經濟系"
	},
	{
		name: "潘冠樺",
		school: "政治大學",
		dep: "經濟系"
	},
	{
		name: "呂紹靖",
		school: "臺北大學",
		dep: "金融與合作經營系"
	},
	{
		name: "張嘉芬",
		school: "逢甲大學",
		dep: "行銷系"
	},
	{
		name: "陳奕儒",
		school: "輔仁大學",
		dep: "資訊管理系"
	},
	{
		name: "陳建宇",
		school: "臺灣科技大學",
		dep: "機械工程系"
	},
	{
		name: "賈加平",
		school: "臺灣科技大學",
		dep: "資訊管理研究所"
	},
	{
		name: "張家惟",
		school: "臺灣師範大學",
		dep: "社會教育系"
	},
	{
		name: "陳睿言",
		school: "政治大學",
		dep: "資訊管理系"
	},
	{
		name: "蕭文惠",
		school: "臺灣科技大學",
		dep: "管理學士班"
	},
	{
		name: "宋隆維",
		school: "臺灣大學",
		dep: "經濟系"
	},
	{
		name: "蔡承裕",
		school: "淡江大學",
		dep: "財務金融系"
	},
	{
		name: "蔡佩誼",
		school: "輔仁大學",
		dep: "企業管理系"
	},
	{
		name: "洪丞柔",
		school: "中原大學",
		dep: "化學工程系"
	}
];
changeList(fifteen);

