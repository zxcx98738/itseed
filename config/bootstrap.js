/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  AboutNTCA.create({
    title: "新北市電腦商業同業公會（NTCA）簡介",
    content: "<h3><span style=\"font-family: 微軟正黑體;\"><span style=\"color: inherit; font-size: 18px; line-height: 1.1;\">一、發展緣起：</span><br></span></h3><p><span style=\"font-family: 微軟正黑體;\">本會成立於1987年，由新北市資訊相關廠商所組成，目前會員廠商已從硬體製造為主，逐漸擴展至軟體發展、通訊電信以及數位內容廠商，會務服務亦多元化發展，為臺灣資訊產業發展重要的推手。二十餘年來本會在多屆理監事及會員的熱心企劃及參與下，不斷提升會員服務品質，擴大參與政府各項專案計畫。同時為協助會員進軍國際市場，每年均帶領國內資通訊及數位內容廠商至國外參展，有效協助會員拓展商機。<br><br>本會主要會員代表均為業界重量級企業代表，包含威健實業、精英電腦、宏遠電訊、臺灣微軟、鴻海精密工業、大宇資訊、國眾電腦、明日工作室、鈺德科技等，目前會員廠商已累積超過2,200家，更涵蓋電腦、通訊、網路多媒體、資訊服務及數位內容等產業。<br><br></span></p><h4><span style=\"font-family: 微軟正黑體;\">二、主要任務：</span></h4><p><span style=\"font-family: 微軟正黑體;\">‧數位內容產業國際拓銷計畫：<br>本會承接工業局數位內容產業國際行銷專案多年，協助動漫畫及遊戲公司作品利用國際參展、比賽，及拓銷型態，融入國際市場，利用參訪參考其他國家製作技術、提高產品製作水準，並行銷全球。此外，協助廠商擴大國際創作視野，同時提供良好的國際宣傳機會，強化我國數位內容產品之國際地位與知名度，以爭取國際訂單。<br><br>‧本會辦理之數位內容活動：<br>香港數位內容拓銷團、東京TAF動畫展、越南數位內容拓銷團、上海數位內容拓銷團、德國萊比錫電玩展、東京TGS電玩展、MIPCOM法國坎城影視節、新加坡ATF亞洲影視論壇、中國互連網展會暨論壇大會。<br><br>‧公會發起籌組臺北動漫聯盟TACA，以協助並推動數字娛樂產業之發展為宗旨，集結臺灣之漫畫創作者；動畫遊戲開發商；電視媒體制作者共同組成，以促成華人數位娛樂產業技術開發與業務推廣，加強國際資源之連結。<br><br>‧資訊種子學苑：<br>為快速整合社會資源，降低業界對於剛進入職場之社會新鮮人的教育成本，強化國家發展實力而成立此學苑，培育科技領域「知識＋項目管理＋熱誠奉獻」全方位人才。<br><br></span></p><h4><span style=\"font-family: 微軟正黑體;\">三、連絡信息：</span></h4><p><span style=\"font-family: 微軟正黑體;\">‧NTCA會址：10452 台北市中山區民權西路19號9樓<br>‧電話：(02)2598-7495#109<br>‧傳真：(02)2598-7492<br>‧NTCA網址：<a href=\"http://www.ntca.org.tw/\" style=\"background-image: initial; background-attachment: initial; background-size: initial; background-origin: initial; background-clip: initial; background-position: 0px 0px; background-repeat: initial;\">http://www.ntca.org.tw</a></span></p>\r\n            \r\n        ",
    status: "P",
  }).exec(function(){

  });

  AboutITSeed.create({
    title: "計畫簡介",
    content: "<p><h3>ㄧ、緣起與動機</h3><p>2003年，有鑑於每年大專以上畢業生人數不斷增加，然而根據當時產業趨勢顯示，IT產業的人才缺口並沒有因此被補足，顯示出在瞬息萬變的IT領域中，學生的專業素養不足以因應市場需求，導致社會及企業對現今大學生之評價有下滑之趨勢，同年6月，新北市電腦同業公會經過嚴密、周詳的思考，決定創立一個有效整合性的學習平台，提供給有志投身IT產業的青年學子們專業的實務訓練與寶貴的產業實戰經驗，第一屆資訊種子培訓計畫應運而生。<br><br>培訓計畫成立至今，結業學員陸續投入不同產業服務及創業，將從資訊種子學習到的正向積極精神，在台灣各行各業裡逐漸發酵，慢慢地向上捲動起一股創新改革的力量。<br><br></p><h3>二、培訓宗旨</h3><p>資訊種子學苑整合社會資源進行完整、宏觀的課程薰陶及實務訓練，期許結業學員獲得基礎資訊知識、培養正確職場態度、提高思考深度及廣度，並累積產業人脈存摺，以降低業界對即將進入職場之社會新鮮人的教育成本，強化國家創意創新產業發展實力，培育具<span class=\"red\">「資訊知識＋專案管理＋熱誠奉獻」</span>的全方位人才。<br><br></p><img src=\"http://www.itseed.tw/image/core.png\" alt=\"\" style=\"display: block; width: 50%; float: right;\"><h3>三、培訓特色</h3><p>• 跨領域融合：全國各大專校院不同背景科系學員<br>• 跨世代交流：學員、學長姐、講師長期密集互動<br>• 理論實務並進：專業授課、專案實作、企業參訪<br>• 國際視野拓展：海外學術交流與企業參訪<br><br></p><h3>四、培訓成員</h3><p>全國大專校院大學部三年級至碩士班一年級在學生。參加學生在經過書審及面試後，即可參與為期一年的免費培訓計畫，經委員會審核通過結訓者，將獲頒「資訊種子培訓計畫結業證書」，目前培訓計畫已經進入第十一屆，累計培養300多位校友投入相關產業並有非常亮眼的發展成績。<br><br>資訊種子學苑校友會在2009年成立，以「回饋」為核心，輔以「校友情感連結」、「在職進修研習」、「人才網絡連繫」、「樂活資訊分享」為發展目標，除了舉辦講座提供校友們職場經驗分享的平台,更積極籌備各項活動拉近跨屆校友的距離，並運用自籌校友會經費贊助資訊種子培訓計畫的專案活動。<br><br></p><h3>五、培訓說明</h3><p>(一)<a style=\"background-image: initial; background-attachment: initial; background-size: initial; background-origin: initial; background-clip: initial; background-position: 0px 0px; background-repeat: initial;\">靜態講座</a><br>邀請各領域專業人士擔任講師，進行一百分鐘的課程，分享其創業歷程、人生經驗與商場策略，讓學員們提早了解業界生態，以及具備邁向成功之條件和獨到思維。<br><br>(二)動態活動<br><a style=\"background-image: initial; background-attachment: initial; background-size: initial; background-origin: initial; background-clip: initial; background-position: 0px 0px; background-repeat: initial;\">【企業參訪】</a><br>走訪知名企業，與第一線專業團隊直接交流，了解企業文化、工作方式及戰鬥氛圍。<br><br><a style=\"background-image: initial; background-attachment: initial; background-size: initial; background-origin: initial; background-clip: initial; background-position: 0px 0px; background-repeat: initial;\">【專案參與及操作】</a><br>提供展覽規劃、研討會舉辦及成果發表等實作機會，培養團隊合作精神及實踐課程所學。<br><br><a style=\"background-image: initial; background-attachment: initial; background-size: initial; background-origin: initial; background-clip: initial; background-position: 0px 0px; background-repeat: initial;\">【海外參訪】</a><br>為期一週海外行程，透過兩岸學術交流、國際企業踏訪，瞭解兩岸人才優勢及專長，並從中體認兩岸學生想法上的差異，以國際視野共尋未來發展的交集。<br><br><a href=\"http://www.itseed.tw/#\" style=\"background-image: initial; background-attachment: initial; background-size: initial; background-origin: initial; background-clip: initial; background-position: 0px 0px; background-repeat: initial;\">【社交聯誼】</a><br>不定期舉辦各式活動，維持同屆情誼、串連跨屆互動、加強講師交流，讓資種家庭成員彼此更加熟悉、鼓勵切磋，以建立深厚友誼並廣拓人脈基礎。</p><br><h3>六、校友會-人才資料庫的建立</h3>如今資訊種子培訓人數已超過300餘人，同時許多結業學員也陸續投入業界工作貢獻社會，為了有效整合歷屆學員的情感及人力資源，成為跨領域人才智庫與人脈串連平台，以提供國內資通訊產業更多人力資源，因此資種校友會也應運而生，凡是資種結業的學員均屬資種校友會，而目前資種校友會會長為三屆曾筱芸學姐。&nbsp;<br><h3>七、目前已結業學員發展近況</h3><img src=\"http://www.itseed.tw/image/job.jpg\" alt=\"\" style=\"display: block; width: 100%;\">\r\n            \r\n        </p><p><br></p>",
    status: "P",
  }).exec(function(){

  });

  MemberList.create({
    title: "第一屆",
    content: "<table class=\"table table-striped text-center\"><thead><tr><th class=\"col-md-2 text-center\">姓　名</th><th class=\"col-md-10 text-center\">校　系</th></tr></thead><tbody><tr><td>高培翔</td><td>政治大學 企管系</td></tr><tr><td>曾曉婷</td><td>實踐大學 企管系</td></tr><tr><td>段繼忠</td><td>台北科大 工管所</td></tr><tr><td>方超群</td><td>政治大學 公行系</td></tr><tr><td>周呈樺</td><td>台灣藝大 圖傳系</td></tr><tr><td>何明政</td><td>文化大學 資科系</td></tr><tr><td>沈庭禎</td><td>台灣大學 會計系</td></tr><tr><td>王俊凱</td><td>政治大學 財管系</td></tr><tr><td>許儒怡</td><td>政治大學 國貿系</td></tr><tr><td>吳進榮</td><td>輔仁大學 管理所</td></tr><tr><td>詹大千</td><td>台灣大學 政治系</td></tr><tr><td>詹庭芳</td><td>台灣大學 外文系</td></tr><tr><td>張雁翔</td><td>交通大學 管科系</td></tr><tr><td>蔡琮翔</td><td>台灣大學 電機系</td></tr><tr><td>藍健銘</td><td>台灣大學 電機系</td></tr><tr><td>蔡東昇</td><td>交通大學 電物系</td></tr><tr><td>陳姮螢</td><td>台灣大學 國企系</td></tr><tr><td>王治真</td><td>台灣大學 國企系</td></tr><tr><td>張世鋒</td><td>文化大學 資傳所</td></tr><tr><td>劉柏廷</td><td>輔仁大學 哲學系</td></tr><tr><td>岑岡霖</td><td>東吳大學 商數系</td></tr><tr><td>鄭湘縈</td><td>東吳大學 商數系</td></tr></tbody></table>",
    status: "P",
    order: 1
  }).exec(function(){

  });

  MemberList.create({
    title: "第二屆",
    content: "<table class=\"table table-striped text-center\"><thead><tr><th class=\"col-md-2 text-center\">姓　名</th><th class=\"col-md-10 text-center\">校　系</th></tr></thead><tbody><tr><td>李佳泓</td><td>交通大學 電控系</td></tr><tr><td>陳彥如</td><td>台灣大學 資管系</td></tr><tr><td>黃重凱</td><td>台灣大學 工科系</td></tr><tr><td>張程鈞</td><td>淡江大學 教科系</td></tr><tr><td>陳正閔</td><td>東吳大學 企管所</td></tr><tr><td>梁文玉</td><td>交通大學 管科系</td></tr><tr><td>黃麒穎</td><td>交通大學 機械系</td></tr><tr><td>林俊成</td><td>交通大學 工管系</td></tr><tr><td>劉嘉皓</td><td>政治大學 廣電所</td></tr><tr><td>王培仲</td><td>台灣大學 微生所</td></tr><tr><td>陳琬瑜</td><td>台灣師大 社教系</td></tr><tr><td>陳顥仁</td><td>台北科大 工管所</td></tr><tr><td>洪韶彥</td><td>清華大學 科管所</td></tr><tr><td>蔡致蕙</td><td>台灣藝大 視傳系</td></tr><tr><td>古竹生</td><td>清華大學 電機系</td></tr><tr><td>許庭瑋</td><td>台灣師大 資訊系</td></tr><tr><td>王仕閔</td><td>台灣大學 政治系</td></tr><tr><td>劉虹麟</td><td>政治大學 公行系</td></tr><tr><td>劉筱筠</td><td>台北大學 經研所</td></tr><tr><td>李佳泓</td><td>交通大學 電控系</td></tr><tr><td>陳彥如</td><td>台灣大學 資管系</td></tr><tr><td>黃重凱</td><td>台灣大學 工科系</td></tr></tbody></table>",
    status: "P",
    order: 2
  }).exec(function(){

  });

  CourseList.create({
    title: "第一屆",
    content: "<h3><span style=\"font-weight: bold;\">上學期</span></h3><table class=\"table table-striped\"><thead><tr><th class=\"col-md-2 text-center\">時　間</th><th class=\"col-md-6 text-center\">課　程　內　容</th><th class=\"col-md-4 text-center\">講　師</th></tr></thead><tbody><tr><td>2003/10/18</td><td>台灣資訊科技產業的現況與未來發展</td><td>精英電腦 許明仁 副董事長 / 本會榮譽理事長</td></tr><tr><td>2003/10/18</td><td>團隊學 Who To Do?團隊溝通與管理</td><td>百略醫學教育基金會 陳於志 執行長</td></tr><tr><td>2003/11/01</td><td>亞洲電腦遊戲產業的現況與未來</td><td>大宇資訊 李永進 董事長 / 本會理事</td></tr><tr><td>2S003/11/15</td><td>IA資訊家電產業大未來</td><td>欣龍資訊 黃宗信 總經理</td></tr><tr><td>2003/11/15</td><td>資訊情報蒐集、分析與運用</td><td>拓墣產業研究所 陳清文 所長</td></tr><tr><td>2003/11/29</td><td>人才學 -IT職場人力資源需求分析</td><td>就業情報資訊 翁靜玉 董事長</td></tr><tr><td>2003/11/29</td><td>兩岸軟體產業的發展與依存</td><td>資訊工業策進會 許良光 顧問</td></tr><tr><td>2003/12/13</td><td>行動智慧裝置未來發展潛力</td><td>台灣微軟 亞洲區嵌入式系統事業群 吳勝雄 執行副總</td></tr><tr><td>2003/12/27</td><td>企劃學 (Project Management) How To Do?大型電腦展企劃~從創意力到執行力</td><td>林偉正 專案經理 / 臺北縣電腦公會</td></tr><tr><td>2003/12/27</td><td>將藝術美學帶入科技產業</td><td>戴醒凡 美術系教授兼計算中心主任 / 國立台灣藝術大學</td></tr><tr><td>2004/1/10</td><td>消費性電子產品的成功行銷模式</td><td>張運揚 副總經理 / 英資達股份有限公司 / 本會理事</td></tr><tr><td>2004/1/10</td><td>期末心得分享座談</td><td>公會教育訓練組</td></tr></tbody></table>  <h3><span style=\"font-weight: bold;\">下學期</span></h3><table class=\"table table-striped\"><thead><tr><th class=\"col-xs-2\" style=\"text-align: center; width: 141px;\">時　間</th><th class=\"col-xs-6\" style=\"text-align: center; width: 421px;\">課　程　內　容</th><th class=\"col-xs-4\" style=\"text-align: center; width: 280px;\">講　師</th></tr></thead><tbody><tr><td>2004/2/21</td><td>專案報告</td><td>公會教育訓練組</td></tr><tr><td>2004/3/6</td><td>將藝術美學帶入科技產業</td><td>國立台灣藝術大學 戴醒凡 美術系教授兼計算中心主任</td></tr><tr><td>2004/3/21</td><td>企業經營者的思維與格局--從遊戲產業成功經營談起</td><td>大宇資訊 李永進 董事長 / 本會理事</td></tr><tr><td>2004/4/3</td><td>承先啟後談資策會在台灣資訊產業的角色及功能</td><td>資訊工業策進會 林逢慶 執行長</td></tr><tr><td>2004/4/17</td><td>縮短數位城鄉差距</td><td>李鳴飛處長 / 資策會教育訓練處</td></tr><tr><td>2004/5/1</td><td>行動裝置與行動服務的整合應用-從okwap熱銷談起</td><td>葉力銓 協理 / 英業達股份有限公司</td></tr><tr><td>2004/5/15</td><td>企業參訪</td><td>中影-梁祝的製作與分工</td></tr><tr><td>2004/5/29</td><td>兩岸青年競爭力分析-談大陸青年與台灣學子的差異</td><td>陳芬玉 總幹事 / 臺北縣電腦商業同業公會</td></tr><tr><td>2004/5/29</td><td>結訓典禮</td><td>公會教育訓練組</td></tr></tbody></table>",
    status: "P",
    order: 1
  }).exec(function(){

  });

  Video.create({
  	title: "【資訊種子-面試篇】文字",
  	content: "<br><h4><a href=\"https://www.youtube.com/watch?v=P3p_1krD7t8&amp;feature=youtu.be\" style=\"background-image: initial; background-attachment: initial; background-size: initial; background-origin: initial; background-clip: initial; background-position: 0px 0px; background-repeat: initial; font-family: 微軟正黑體;\">【資訊種子-面試篇】</a></h4><h4><p><span style=\"font-family: 微軟正黑體;\">決定。加入資訊種子<br>想要了解最新的IT資訊嗎？<br>想要得到業界的一手消息嗎？<br>想要出國與海外的學生交流嗎？<br>想要找到一群來自各校各系的夥伴嗎？<br>上網搜尋「資訊種子」，我們正在找你！<br><a href=\"http://www.itseed.tw/#\" style=\"background-image: initial; background-attachment: initial; background-size: initial; background-origin: initial; background-clip: initial; background-position: 0px 0px; background-repeat: initial;\">【報名資訊】</a><br>招生對象：升大三至升研究所碩一各領域<br>報名日期：6/2(一)至7/27(日)</span></p><p><span style=\"font-family: 微軟正黑體;\"><a href=\"http://www.itseed.tw/\" style=\"background-image: initial; background-attachment: initial; background-size: initial; background-origin: initial; background-clip: initial; background-position: 0px 0px; background-repeat: initial;\">【資訊種子官方網站】&nbsp;</a><br><a href=\"http://www.facebook.com/iloveitseed\" style=\"background-image: initial; background-attachment: initial; background-size: initial; background-origin: initial; background-clip: initial; background-position: 0px 0px; background-repeat: initial;\">【資訊種子粉絲專頁】&nbsp;</a></span><br></p></h4>\r\n            \r\n        \r\n            \r\n        ",
    status: "P",
    order: 1
  }).exec(function(){

  });

  Video.create({
    title: "【資訊種子-面試篇】影片",
    content: "<p><br></p><div class=\"embed-responsive embed-responsive-16by9\"><iframe class=\"embed-responsive-item\" src=\"https://www.youtube.com/embed/P3p_1krD7t8\" frameborder=\"0\" allowfullscreen=\"\"></iframe></div><p><br></p>",
    status: "P",
    order: 2
  }).exec(function(){

  });

  Video.create({
    title: "【資訊種子-改變篇】影片",
    content: "<p><br></p><div class=\"embed-responsive embed-responsive-16by9\"><iframe class=\"embed-responsive-item\" src=\"https://www.youtube.com/embed/cGxq1kTEAx0\" frameborder=\"0\" allowfullscreen=\"\"></iframe></div><p><br></p>",
    status: "P",
    order: 3
  }).exec(function(){

  });

  Video.create({
    title: "【資訊種子-改變篇】文字",
    content: "<br><h4><a href=\"https://www.youtube.com/watch?v=cGxq1kTEAx0\" style=\"background-image: initial; background-attachment: initial; background-size: initial; background-origin: initial; background-clip: initial; background-position: 0px 0px; background-repeat: initial;\">【資訊種子-改變篇】</a></h4><p>A Decision give you more Grow and Change !!<br><br><a href=\"http://www.itseed.tw/#\" style=\"background-image: initial; background-attachment: initial; background-size: initial; background-origin: initial; background-clip: initial; background-position: 0px 0px; background-repeat: initial;\">【資訊種子的精神】</a><br>資訊種子的精神就是「Sharing」。在培訓期間，能與來自各校各系的夥伴頻繁且緊密地互動，這樣的夥伴關係也延伸到業界的校友會學長姐們，以及公會的產業界長輩，使得彼此間形成一個強大的關係網絡。這樣的關係網絡在過去十一年來不斷的持續的成長，進而刺激學員多元的發展與創新。</p>\r\n            \r\n        ",
    status: "P",
    order: 4
  }).exec(function(){

  });

  cb();
};
