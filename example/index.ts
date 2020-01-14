import xiaojssdk from '../lib';
console.log(xiaojssdk);

class TestClass {
    call(tagName: string, param: object, callback: Function) {
        console.log(arguments);
        if (arguments.length <= 0) {
            throw new Error('arguments is not defined');
        }
    }
}

const testClass = new TestClass();

testClass.call('xxs', {name: 123}, () => {});
