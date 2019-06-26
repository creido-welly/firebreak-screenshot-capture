# Screenshot Capture - Firebreak w/c 24 June 2019

## Brief description of the idea:

Integrate visual regression testing or similar to help ensure layout is not adversely affected by code updates.

## Why is this important to you?

* Wellcome.ac.uk has to be accessible to a wide audience over a wide range of devices and browsers
([browser matrix](https://www.notion.so/wellcometrust/Browser-support-policy-22e61eb904f64456b39e584477e04c1d)).
* Manual testing is laborious and prone to human error (let's face it - it's dull). Any level of automation is useful. 

## Solution
The aim is to investigate a simple means of obtaining screenshots and save on human effort as opposed to setting up end to end testing and automated pixel checking. The result is a NodeJS app which queries the Browserstack API and returns device and browser screenshots based on a json config.

### Building a browser list
A json file listing available browsers can be viewed by going to `https://www.browserstack.com/screenshots/browsers.json`

Populate `browser-list.json` with required devices.

### Development
The tool is activated by running the following npm script from the project root

```
npm run vis
```


#### Localhost testing
The test on localhost Browserstack local binary should be downloaded from https://www.browserstack.com/local-testing#command-line and activated by running

```
 ./BrowserStackLocal --key <key> --local-identifier Test123
```


### Production

**TODO:** The intention is that the tool can be run by a continuous integration platform e.g. Circle CI to output screenshots e.g. to an AWS S3 bucket 


## Future development / TODO

* Default url list
* Handle multiple URLs
* Add to CI
* Add folder with timestamp or git commit to provide history for pinpointing when something went awry
* Timeout
