# node-red-contrib-youless

Energy measurements from the Youless LS120 device

Enter your device ip and optional password in the node settings. Attach a node to the measurements output. Each value type is sent in a separate message with value payload and topics as described below.*not for the /e 

In the node config field "page" you can enter the followed options: <br />
`/e?f=j/`  /// this shows the upload values from the json /e page on the Youless. <br />
`/f?f=j/`  /// info info per phase /f page in json. <br />
`/a?f=j/`  /// status info report. <br />
`/d?f=j/`  /// system info: Mac Firmware version.  <br />

<img width="518" alt="Schermafbeelding 2022-10-11 om 19 50 08" src="https://user-images.githubusercontent.com/97366516/195363021-750808f4-ce29-41af-a6cf-4c03b2f528cb.png">

The following values are reported `/a?f=j/`<br />:

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

The following values are reported with`/e?f=j/`:

* tm: time
* net: net value from n1 + n2 - p1 - p2
* pwr: actual power
* ts0: Time stamp s0 
* cs0: s0 meter kWh
* ps0: Power computed s0
* p1: Dilverded kWh Low tarif
* p2: Dilverded kWh High tarif
* n1: Concumed kWh Low tarif
* n2: Concumed kWh High tarif
* gas: Gas meter in m3
* gts: 

The following values are reported with`/f?f=j/`:

* ver: P1 port version
* tr: Tarrif (1 or 2)
* i1: Ampère Phase 1
* i2: Ampère Phase 2
* i3: Ampère Phase 3
* v1: Voltage Phase 1
* v2: Voltage Phase 2
* v3: Voltage Phase 3
* l1: Watt's Phase 1
* l2: Watt's Phase 2
* l3: Watt's Phase 3

The following values are reported with`/d?f=j/`:

* model: Youless model
* fw: Firmware version (available from firmware version 1.5.3)
* mac: mac address from the Youless


