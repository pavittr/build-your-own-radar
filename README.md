[![Build Status](https://travis-ci.org/capgemini-psdu/build-your-own-radar.svg?branch=master)](https://travis-ci.org/capgemini-psdu/build-your-own-radar)

A library that generates an interactive radar, inspired by [thoughtworks.com/radar](http://thoughtworks.com/radar).

## How To Use

Data is loaded from the data.json file located inside the repo, so to update contents you need to update that file.

### Setting up your data

The data is stored in a JSON file in the `_blips` directory. The data structure is of the form:

```
[
  {
    "name": "Apache HTTP server",
    "ring": "deprecate",
    "quadrant": "platforms",
    "capability": "good",
    "description": "Still the most widely used web server on the internet but there is good evidence that it is significantly less performant than newer alternatives such as Nginx for serving static content (thread-based execution model). Most departments are now using Nginx/other for new deployments.\n<br/><br/>Demand from: <ul><li><strong>HO</strong> - DTP</li></ul>"
  }
]
```

Updates to data in this folder will show live once pushed to master through the CI/CD pipeline.

Note: the quadrants of the radar, and the order of the rings inside the radar will be drawn based on the order they appear in the JSON data.

The application uses [webpack](https://webpack.github.io/) to package dependencies and minify all .js and .scss files.

### Running the application in development

```
git clone git@github.com:capgemini-psdu/build-your-own-radar.git
npm install
npm test
npm run dev
```

The application uses webpack-dev-server to listen on localhost:8080. This will also watch the .js and .css files and rebuild on file changes.

### Don't want to install node? Run with one line docker

     $ docker run -p 8080:8080 -v $PWD:/app -w /app -it node:7.3.0 /bin/sh -c 'npm install && npm run dev'

## Contribute

All tasks are defined in `package.json`.

Pull requests are welcome; please write tests whenever possible.

## Run on AWS

The production service runs by hosting the built files in an S3 bucket. This is updated on pushes to master using a Travis deploy integration.

### Set up the necessary AWS infra

The app is currently deployed via an Amazon S3 bucket configured for web hosting. This may change as server side content is added.

#### Create an S3 bucket

Remember that, if you plan on redirecting requests from a DNS entry via AWS Route 53, then the name of the bucket must match the DNS entry you intend to serve from.

#### S3 Bucket Policy

The S3 bucket must be configured with a GetObject security policy matching the one below:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::<BUCKET_NAME_GOES_HERE>/*"
        }
    ]
}
```

### Configuring Travis

The Travis S3 integration requires the following properties:

- S3 bucket name - set in .travis.yaml
- Access key ID - set as an evironment variable in the build as `AWS_ACCESS_KEY_ID`
- Access key Secret - set as an environment variable in the build as `AWS_ACCESS_KEY_SECRET`

Be sure to check that the region is also set correctly.

Finally validate that the TechRadar is running correctly by checkign for updates at: http://techradar.capgemini-psdu.com/
