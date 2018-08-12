[![Alt text](/assets/images/doc/view15th.png)
](http://www.itseed.tw)

## README目錄
* 基本介紹
  * [網站架構](#structure)
  * [後台系統](#backend)
  * [追蹤工具](#analytics)
* 開發者專區
  * [使用語言&工具](#tool)
  * [環境架設](#environment)
  * [伺服器教學](#server)
  * [專案架構](#system_content)

## 基本介紹

<a name="structure"></a>
網站架構
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
後台系統

* **入口**： => /backend
* **系統設定**：報名系統相關設定
* **文章管理**：網站內容的管理
* **帳戶管理**：使用者管理與權限設定
* **報名者資料**：當屆報名者個人資料與書審資料


<a name="analytics"></a>
追蹤工具
* **Google Analytics**
* **Hotjar**

## 開發者專區

<a name="tool"></a>

### 使用語言&工具

前端
> html, css, javascript  
   ejs (http://www.embeddedjs.com/)   
   less (http://lesscss.org/)   
   jQuery (https://jquery.com/)   
   Bootstrap (http://getbootstrap.com/)

後端
> Node.js 10.x (https://nodejs.org/)   
  Sails.js (http://sailsjs.org/)   
  MySQL (https://www.mysql.com/)

### 管理制度
版控規則  
1. 一個功能開一個分支，
2. 開發完自行 push 到 GitHub
3. 發 merge request 到 master 分支
4. 由需至少由一位開發員 code review 後才能 merge
5. 更新到線上官方網站

* 上線分支：master
* 開發分支命名：
  * 開發功能 => feature-<use_underline_to_describe_name>
  * Debug   => hotfix-<use_underline_to_describe_name>


專案管理

* trello：[資訊種子官方網站](https://trello.com/b/IGv87eCD/%E8%B3%87%E8%A8%8A%E7%A8%AE%E5%AD%90%E5%AE%98%E7%B6%B2%E5%9C%98%E9%9A%8A)
* 安裝 [EleGantt](https://elegantt.com/?ref=share) 工具顯示甘特圖
* 使用方式
  1. issue：一個功能開一張卡片
  2. 規劃研究中：被分配 issue後，研究並列出規格與資訊團隊討論，並訂出開發預計時限
  3. 開發中: 已經討論確定後的 issue 移動到此區代表開發中，並依照命名規則開新分支
  4. 審查區：已經 push 到GitHub的分支 並發 merge request 階段
  5. 二次修改：如審查未通過則移動到此區 Debug 後再回到 4.審查區
  6. 已上線：完成 merge 後並且手動更新到 官網伺服器上時，即可將卡片移到此區
* 卡片流程
issue => 規劃研究中
![](/assets/images/doc/EleGantt.png)
![](/assets/images/doc/trello.png)


<a name="environment"></a>
## 環境架設

1. **安裝 nodeJS 10.x版本**：http://nodejs.org/
2. **安裝 sails**：
```
  npm -g install sails
```
3. **下載專案**
```
  git clone https://github.com/ntcaitseed/itseed.git
```
4. **安裝模組**
```
  cd itseed
  npm install
```
5. 設定開發環境參數
- 複製 .env.copy 檔案到同目錄下並改名為 .env
- 將內容改為指定開發參數，請洽官網負責人索取

```
  googleLoginId=
  payLink=
  mysql_host= 
  mysql_port= 
  mysql_user= 
  mysql_password= 
  mysql_database=  
```

6. **開船囉**
```
  sails lift
```

7. **進入網站**

  [http://localhost:1337/](http://localhost:1337/)

<a name="server"></a>
### 伺服器教學

**VPS**：inode (https://www.linode.com/)  
**主機位址**：`106.187.46.113`  
**儲存庫路徑**：`/srv/www/itseed.tw/itseed`  
**帳號密碼**：請洽當前官網負責人 
* 15th 陳建宇 https://www.facebook.com/nick03008
* 15th 高聖哲 https://www.facebook.com/kk.chen.999

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

### 專案架構
<a name="system_content"></a>
![專案架構](/assets/images/doc/system_content.png)
![MVC架構](/assets/images/doc/MVC.png)

