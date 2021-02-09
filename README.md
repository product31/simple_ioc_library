# simple_ioc_library
Simple IOC Library

This script is a simple Javascript IoC library.

Register class

```javascript

const bucket = new Bucket()

bucket.book('setup', {key:value})
bucket.book('upload', Upload, ['setup']) 
bucket.single('logger', Logger, ['setup'])

```

Retrieve class from bucket


```javascript

container.get('setup')
container.get('upload') // New upload instance with setup from constructor 
container.get('logger') // Logger instance

```

## Run test

```
npm install
npm test
```
