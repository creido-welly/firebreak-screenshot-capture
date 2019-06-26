```
curl -u "katewelling1:mJw4wAKHVsRhZgoNQ7Df" -H "Content-Type: application/json" -H "Accept: application/json"  -d '{"browsers": [{"os": "Windows", "os_version": "7", "browser_version": "11.0", "browser": "ie"}], "url": "https://wellcome.ac.uk"}' https://www.browserstack.com/screenshots
```

Response

```
{
  "job_id": "1225b99c1a47aaccd39297aa8382ae7c445d2980",
  "screenshots": [
    {
      "os": "Windows",
      "os_version": "7",
      "browser_version": "11.0",
      "browser": "ie",
      "url": "https://wellcome.ac.uk",
      "id": "eeddabc7c5c93f53499a67cadea29c05bc2464ab",
      "state": "pending"
    }
  ],
  "callback_url": null,
  "win_res": "1024x768",
  "mac_res": "1024x768",
  "quality": "compressed",
  "wait_time": 5,
  "orientation": "portrait"
}
```

GET /screenshots/1225b99c1a47aaccd39297aa8382ae7c445d2980.json

i.e. go to https://www.browserstack.com/screenshots/1225b99c1a47aaccd39297aa8382ae7c445d2980.json

```
{
  "id": "1225b99c1a47aaccd39297aa8382ae7c445d2980",
  "state": "done",
  "callback_url": null,
  "win_res": "1024x768",
  "mac_res": "1024x768",
  "quality": "compressed",
  "wait_time": 5,
  "orientation": "portrait",
  "screenshots": [
    {
      "browser": "ie",
      "browser_version": "11.0",
      "os": "Windows",
      "os_version": "7",
      "device": null,
      "image_url": "https://www.browserstack.com/screenshots/1225b99c1a47aaccd39297aa8382ae7c445d2980/win7_ie_11.0.jpg",
      "thumb_url": "https://www.browserstack.com/screenshots/1225b99c1a47aaccd39297aa8382ae7c445d2980/thumb_win7_ie_11.0.jpg",
      "state": "done",
      "url": "https://wellcome.ac.uk",
      "orientation": null,
      "id": "eeddabc7c5c93f53499a67cadea29c05bc2464ab",
      "created_at": "2019-06-24 12:55:13 UTC"
    }
  ],
  "stopped": false
}
```
