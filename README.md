[![Alt text](/assets/images/doc/view15th.png)
](http://www.itseed.tw)

## README目錄
* 基本介紹
  * [網站架構](#structure)
  * [後台系統](#backend)
* 開發者專區
  * [使用語言&工具](#tool)
  * [環境架設](#environment)
  * [伺服器教學](#server)
  * [待解決問題及未開發功能](#issue)

## 基本介紹

<a name="structure"></a>
> 網站架構
* 首頁 => /
* 資種起源 
  * 計畫簡介 => /aboutITSeed
  * 公會簡介 => /aboutNTCA
  * 歷屆名單 => /memberList
  * 組織架構 
    * 基本組織架構 => /studentIntro
    * 專案組支架構 => /projectIntro
* 培訓計畫
  * 講座課程 => /courseInfo
  * 企業參訪 => /businessVisit
  * 六大實作
    * tuv => /tuv
    * 春酒 => /spring
    * 職涯 => /careers
    * 招生 => /new
    * 海參 => /overseaVisit
    * 結業 => /end
* 經驗分享 => /sharing
* 實習心得 => /careerList
* 招生訊息
  * 招生資訊 => /regInfo
  * 說明會 => /seminar
  * 工作坊 => /workshop
* 常見問題 => /faq
* 會員頁面

<a name="backend"></a>
> 後台系統

* **入口**： => /backend
* **系統設定**：報名系統相關設定
* **文章管理**：網站內容的管理
* **帳戶管理**：使用者管理與權限設定
* **報名者資料**：當屆報名者個人資料與書審資料


## 開發者專區

<a name="tool"></a>
### 使用語言&工具
>前端
>> html, css, javascript  
   ejs (http://www.embeddedjs.com/)   
   less (http://lesscss.org/)   
   jQuery (https://jquery.com/)   
   Bootstrap (http://getbootstrap.com/)

>後端
>> Node.js 10.x (https://nodejs.org/)   
   Sails.js (http://sailsjs.org/)   
   MySQL (https://www.mysql.com/)

### 版本控制
* git (https://git-scm.com/)
* git-flow (https://github.com/petervanderdoes/gitflow)

### 專案管理
* trello (https://trello.com)

<a name="environment"></a>
## 環境架設

1. **安裝 nodeJS**

  http://nodejs.org/

2. **安裝 sails**

  `npm -g install sails`

3. **下載專案**

  `git clone https://github.com/b00705008/itseed.git`

4. **安裝模組**

  `npm install`

5. **開船囉**

  `sails lift`

6. **進入網站**

  [http://localhost:1337/](http://localhost:1337/)

<a name="server"></a>
## 伺服器教學
* **VPS**

  linode (https://www.linode.com/)

* **主機位址**

  `106.187.46.113`

* **帳號密碼**

  請洽
  
  11th 張文源 https://www.facebook.com/casey.chang.106
  
  12th 陳凱鵬 https://www.facebook.com/kk.chen.999

* **儲存庫路徑**

  `/srv/www/itseed.tw/itseed`

### 常用指令
**執行專案**

```
cd /srv/www/itseed.tw/itseed
forever start app.js
```

**停止專案**

```
cd /srv/www/itseed.tw/itseed
forever stop app.js
```

<a name="issue"></a>
## 待解決問題及未開發功能

<a name="issue_1"></a>

* **帳戶管理**

  包括帳戶的權限設定、測試帳戶的刪除、不同屆的帳戶管理等等功能

<a name="issue_2"></a>

* **屆數設定**

  目前的設計是會自動設定當屆新註冊帳號的屆數，報名者無須自行填寫。
  這在一般情形下不會有任何問題，但若報名者隔屆再次使用同一帳號報名時，便會出現問題:
	  
    1. 後台「報名者資料」顯示當屆報名者的清單時不會出現前屆註冊的帳號
	  
    2. 報名者前屆所上傳的資料會被覆蓋，書審時無法作為參考

* **忘記密碼**

  使用者忘記密碼時，重設密碼及發送郵件的功能
	
* **社群登入**

  直接使用FB帳號註冊及登入的功能

* **編輯器外掛元件**

  更多的自訂插件

* **前端優化**

  圖片壓縮、延遲載入...



* 測試