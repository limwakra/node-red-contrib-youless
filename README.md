# node-red-contrib-youless

Energy measurements from the Youless LS120 device

Enter your device ip and optional password in the node settings. Attach a node to the measurements output. Each value type is sent in a separate message with value payload and topics as described below.

In the node config field "page" you can enter the followed options: <br />
`/e?f=j/`  /// this shows the upload values from the json /e page on the Youless. <br />
`/f?f=j/`  /// info info per phase /f page in json. <br />
`/a?f=j/`  /// status info report. <br />
`/d?f=j/`  /// system info: Mac Firmware version.  <br />

The following values are reported (based on LS120 device):

* cnt: counter in kWh
* pwr: Pwer consumption in Watt
* lvl: moving average level (intensity of reflected light on analog meters)
* dev: deviation of reflection
* det: 
* con: connection status
* sts: Time until next status update with online monitoring
* cs0: kWh counter of S0 input
* ps0: Computed power
* raw: raw 10-bit light reflection level (without averaging)

