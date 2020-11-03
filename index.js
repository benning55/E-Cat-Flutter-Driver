let loginTest = require('./Login_Senario/main');
let MchPriceOrder = require('./Mch_Level1_Senario/mchPriceOrder');
let MchFilter = require('./Mch_Level1_Senario/mchFilter');
let MchCompare = require('./Mch_Level1_Senario/mchCompare');
let MchOrderLevel2 = require('./Mch_Level2_Senario/mchOrderLevel2');
let MchShowToLevel1 = require('./Mch_Level2_Senario/mchShowTo1');
// let Mchlevel3Test = require('./Mch_Level3_Senario/main');
// let Mchlevel2Test = require('./Mch_Level2_Senario/main')
// let Mchlevel1Test = require('./Mch_Level1_Senario/main');
// let MchDetailTest = require('./Mch_Detail_Senario/main');

skip = false;

const osSpecificOps = {
    platformName: 'Android',
    deviceName: '4b283c1f9905',
    autoGrantPermissions: true,
    app: 'C:\\Users\\bmais\\Documents\\SeniorHomepro\\flutter_ecatalog\\build\\app\\outputs\\apk\\dev\\debug\\ecatalog-dev-debug-vn_1_0_1-vc_1-20201019_171810.apk'
}


const opts = {
    path: '/wd/hub/',
    port: 4723,
    capabilities: {
        ...osSpecificOps,
        automationName: 'Flutter'
    }
};

beforeEach(function () {
    if (skip) {
        this.skip();
    }
});

afterEach(async function () {
    if (this.currentTest.state == 'failed') {
        var imgName = (this.currentTest.parent.title).replace(/ /g, "_");
        var screenshotPath = 'C:\\Users\\bmais\\Documents\\SeniorHomepro\\E-Cat-Flutter_Driver\\images\\';
        await driver.saveScreenshot(screenshotPath + imgName + '.png');
        skip = true;
    }
});


// ทดสอบกับ Appium Flutter Driver 
// MchPriceOrder.test(opts);
// MchFilter.test(opts);
// MchCompare.test(opts);
// loginTest.loginFail(opts);
// loginTest.loginPass(opts);
// Mchlevel3Test.seeMainLevel3(opts);
// Mchlevel3Test.searchBar(opts);
// MchOrderLevel2.test(opts);
MchShowToLevel1.test(opts);
// Mchlevel2Test.testMch2ToMch1(opts);
// Mchlevel1Test.testMainLevel1(opts);
// Mchlevel1Test.mchFilterTest(opts);
// Mchlevel1Test.mchCompare1(opts);
// MchDetailTest.mchDetailTxt(opts);
// MchDetailTest.mchDetailTab(opts);
// MchDetailTest.mchDetailStock(opts);
// TestFluke.testFluke(osSpecificOps)


// after (async function (){
//     await driverWd.quit();
// });