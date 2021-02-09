import Bucket from '../Bucket'

describe('Create a bucket', () => {


    test('create bucket and class', () => {
        const bucket = new Bucket()
        const setup = class Setup {
            constructor() {
                this.value = 1
            }
        }

        bucket.book('setup', setup)
        const setupInstance = bucket.retrieve('setup')
        expect(setupInstance.value).toBe(1)
    })


    test('create bucket and new class instance', () => {
        const bucket = new Bucket()
        const setup = class Setup {
            constructor() {
                this.value = 1
            }
        }
        bucket.book('setup', setup)
        const setupInstance = bucket.retrieve('setup')
        setupInstance.value = 2
        expect(setupInstance.value).toBe(2)

        const newSetupInstance = bucket.retrieve('setup')
        expect(newSetupInstance.value).toBe(1)
    })



    test('resolve dependants', () => {

        const bucket = new Bucket()

        const testObject = {
            test: 'setup'
        }
        const setup = class Setup {
            constructor(testObject) {
                this.testObject = testObject
            }
        }
        bucket.book('testObject', testObject)
        bucket.book('setup', setup, ['testObject'])
        const setupInstance = bucket.retrieve('setup')
        expect(setupInstance.testObject.test).toBe('setup')

    })


    test('resolve class', () => {

        const bucket = new Bucket()

        const setup = class Setup {
            constructor(testObject) {
                this.value = 1
            }
        }
        bucket.limit('setup', setup)

        const setupInstance = bucket.retrieve('setup')
        expect(setupInstance.value).toBe(1)
        setupInstance.value = 2
        const setupInstance2 = bucket.retrieve('setup')
        expect(setupInstance2.value).toBe(2)
    })


    test('resolve a new class with dependants', () => {

        const bucket = new Bucket()
        const limit = class LimitClass {
            constructor() {
                this.value = 1
            }
        }

        const setup = class Setup {
            constructor(limit) {
                this.limit = limit
            }
        }

        bucket.limit('limit', limit)
        bucket.book('setup', setup, ['limit'])

        const setupInstance = bucket.retrieve('setup')
        setupInstance.limit.value = 2

        const setupInstance2 = bucket.retrieve('setup')
        expect(setupInstance2.limit.value).toBe(2)
    })

})
