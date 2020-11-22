const user = {
    nickname: 'nightwatch' + new Date().getTime(),
    password: 'nightwatch'
};

module.exports = {
    'User can register' : function (browser) {
        browser
            .url('http://localhost:3000/')
            .waitForElementVisible('body')
            .assert.visible('body')
            .click('a[href="/registration"]')
            .waitForElementVisible('div.registration-view')
            .assert.visible('div.registration-view')
            .setValue('input[name]="nickname"', user.nickname)
            .setValue('input[name]="password"', user.password)
            .submitForm('form')
            .waitForElementVisible('div.styles.successMessage')
            .assert.containsText('div.styles.successMessage', 'Success!')
            .end();
    }
};
