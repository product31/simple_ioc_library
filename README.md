# simple_ioc_library
Simple IOC Library

This script is a simple Javascript IoC library.

Register class

```javascript

const bucket = new Bucket()

bucket.book('setup', {key:value})
bucket.book('upload', Upload, ['setup']) 
bucket.limit('logger', Logger, ['setup'])

```

Retrieve class from bucket


```javascript

bucket.retrieve('setup')
bucket.retrieve('upload') // New upload instance with setup from constructor 
bucket.retrieve('logger') // Logger instance

```

## Run test

```
npm install
npm test
```
