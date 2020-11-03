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

    describe('Initial Mch Level1 เปรียบเทียบ', function () {

        before(function () {
            skip = false;
        });

        afterEach(async function () {
            if (this.currentTest.state == 'failed') {
                var imgName = (this.currentTest.parent.title).replace(/ /g, "_");
                var screenshotPath = 'C:\\Users\\bmais\\Documents\\SeniorHomepro\\E-Cat-Flutter_Driver\\images\\mch1\\';
                console.log(screenshotPath+imgName+'.png');
                await driver.saveScreenshot(screenshotPath + imgName + '.png');
                skip = true;
            }
        });

        describe('เช็คการนำสินค้าเข้าสู่เปรียบเทียบ', function(){
            
            before(function () {
                skip = false;
            });

            it('Start Application', async function() {
                this.timeout(60000);
                driver = await wdio.remote(opts);

                usernameField = byValueKey('usernameTxt');
                passwordField = byValueKey('passwordTxt');
                loginButton = byValueKey('loginBtn');

                await driver.elementSendKeys(usernameField, "551503");
                await driver.elementSendKeys(passwordField, "551505");
                await driver.elementClick(loginButton);
                await driver.execute('flutter:waitForAbsent', loginButton);
                await driver.execute('flutter:scroll', byType('ListView'), {
                    dx: 10,
                    dy: -550,
                    durationMilliseconds: 120,
                    frequency: 60
                });
                await driver.elementClick(byValueKey('catThree13'));
                await driver.execute('flutter:scrollIntoView', byValueKey('lstViewVertical'), byValueKey('totalSubBtn2'), {alignment: 0.0});
                await driver.elementClick(byValueKey('totalSubBtn2'));
                await driver.execute('flutter:waitForAbsent', byValueKey('totalSubBtn2'));
            });
    
            describe('เช็คว่าสินค้าเข้าช่องเปรียบเทียบ', function(){

                before(function () {
                    skip = false;
                });

                it('กดเช็คช่องเปรียบเทียบและขึ้น 1/3', async function () {
                    this.timeout(300 * 10000);
                    await driver.elementClick(byValueKey('compareCheck0'));
                    expect(await driver.getElementText(byValueKey('compare1'))).to.include('1/3');          
                });
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
