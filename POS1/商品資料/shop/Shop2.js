const Shop2 = {}

Shop2.shop = {
  name: '早安! 美味堡',
  address: '金門縣金湖鎮漁村 107 號',
  tel: '(082)336-643',
  items: {  "卡拉雞腿蛋": 65,
  "鐵路豬排蛋": 65,
  "勳雞蛋": 60,
  "肉排蛋(漢堡肉)": 60,
  "鮪魚蛋": 55
},
  addons: {"總匯三明治": 0},
  isComeToShop: true,
  isMailToYou: false,
  isGoForYou: false
}

Shop2.save = function () {
  const shop = Shop2.shop
  Db.save('Shop2', shop)
  if (!Fire.app) return
  if (shop.id == null || shop.id.length === 0) {
    shop.id = Fire.addByPath('/shops/', shop)
  } else {
    Fire.setByPath('/shops/'+shop.id+'/', shop)
  }
}

Shop2.load = function () {
  Shop2.shop = Db.load('Shop2') || Shop2.shop
}

Shop.mainPage = function () {
  Shop2.load()
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
  Ui.title(Shop2.shop.name)
}

Shop2.todayReport = function () {
  Report.start({range: Lib.dayRange(new Date())})
}