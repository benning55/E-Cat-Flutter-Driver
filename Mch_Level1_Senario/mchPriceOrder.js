const wdio = require("webdriverio");
var path = require('path'),
    wd = require('wd'),
    WdAndroid = require('wd-android');
const {
    byValueKey,
    byText,
    byType,
    pageBack
} = require('appium-flutter-finder');
const expect = require('chai').expect;

const test = function (opts) {

    describe('Initial Mch Level1 ลำดับราคาสินค้า', function () {

        before(function () {
            skip = false;
        });

        // afterEach(async function () {
        //     if (this.currentTest.state == 'failed') {
        //         var imgName = (this.currentTest.parent.title).replace(/ /g, "_");
        //         var screenshotPath = 'C:\\Users\\bmais\\Documents\\SeniorHomepro\\E-Cat-Flutter_Driver\\images\\mch1\\';
        //         console.log(screenshotPath+imgName+'.png');
        //         await driver.saveScreenshot(screenshotPath + imgName + '.png');
        //         skip = true;
        //     }
        // });

        describe('เช็คเรียงราคา Default', function(){
            
            before(function () {
                skip = false;
            });

            it('Start Application', async function() {
                this.timeout(50000);
                driver = await wdio.remote(opts);
    
                usernameField = byValueKey('usernameTxt');
                passwordField = byValueKey('passwordTxt');
                loginButton = byValueKey('loginBtn');
    
                await driver.elementSendKeys(usernameField, "551503");
                await driver.elementSendKeys(passwordField, "551505");
                await driver.elementClick(loginButton);
                await driver.execute('flutter:waitForAbsent', loginButton);
            });
    
            it('ตาม Default เรียงราคาจากน้อยไปหามาก', async function () {
                this.timeout(50000);
                var listTest = [];
                var listReal = [];
                var listSorted;
                var i;
                await driver.execute('flutter:scroll', byType('ListView'), {
                    dx: 10,
                    dy: -550,
                    durationMilliseconds: 120,
                    frequency: 60
                });
                await driver.elementClick(byValueKey('catThree13'));
                totalbtn = byValueKey('totalSubBtn0');
                // await driver.elementClick(totalbtn);
                await driver.elementClick(byText('เครื่องยกน้ำหนัก'));
                await driver.execute('flutter:waitForAbsent', totalbtn);
                for (i = 0; i < 10; i++) {
                    driver.execute('flutter:scrollUntilVisible', byValueKey('mchListView'), {
                        item: byValueKey("mchPrice" + i.toString()),
                        dxScroll: 10,
                        dyScroll: -100
                    });
                    priceTxt = byValueKey("mchPrice" + i.toString());
                    listTest[i] = await driver.getElementText(priceTxt);
                }
                console.log(listTest);
                for (i = 0; i < listTest.length; i++) {
                    var tmp = (listTest[i].substring(0, listTest[i].length - 4)).split(",");
                    listReal[i] = parseFloat(tmp[0] + tmp[1]);
                }
                console.log(listReal);
                listSorted = listReal.sort(function (a, b) {
                    return a - b
                });
                expect(listReal).to.equal(listSorted);
            });
        });

        describe('Close Session', function () {

            before(function () {
                skip = false;
            });
    
            it('Close session', function () {
                driver.deleteSession();
            });
        });

    });

}

module.exports = {
    test,
}