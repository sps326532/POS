const Shop4 = {}

Shop4.shop = {
  name: '早安! 美味堡',
  address: '金門縣金湖鎮漁村 107 號',
  tel: '(082)336-643',
  items: {  "鐵路豬排": 55,
  "滑蛋": 30
},
  addons: {"抓餅": 0},
  isComeToShop: true,
  isMailToYou: false,
  isGoForYou: false
}

Shop4.save = function () {
  const shop = Shop4.shop
  Db.save('Shop4', shop)
  if (!Fire.app) return
  if (shop.id == null || shop.id.length === 0) {
    shop.id = Fire.addByPath('/shops/', shop)
  } else {
    Fire.setByPath('/shops/'+shop.id+'/', shop)
  }
}

Shop4.load = function () {
  Shop4.shop = Db.load('Shop4') || Shop4.shop
}

Shop.mainPage = function () {
  Shop4.load()
  // Ui.html('#header', ShopMain.headerHtml)
  // Ui.html('#menu', ShopMain.menuHtml)
  Ui.show(`
  <div>
    <button onclick="Pos.start()">新增訂單</button>
    <button onclick="Setting.start()">商店設定</button>
    <button onclick="Shop.todayReport()">本日報表</button>
    <button onclick="Report.start()">全部報表</button>
    <button onclick="Storage.start()">資料處理</button>
  </div>
  `)
  Ui.title(Shop4.shop.name)
}

Shop4.todayReport = function () {
  Report.start({range: Lib.dayRange(new Date())})
}