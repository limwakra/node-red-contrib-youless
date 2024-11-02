# node-red-contrib-youless

Energy measurements from the Youless LS120 device

Enter your device ip and optional password in the node settings. Attach a node to the measurements output. Each value type is sent in a separate message with value payload and topics as described below.

<img width="507" alt="Scherm­afbeelding 2024-11-02 om 18 48 07" src="https://github.com/user-attachments/assets/172345f7-ac8d-4ad2-aa87-fd61d7fd49ea">



The following values are reported:


* tm: time
* net: net value from n1 + n2 - p1 - p2
* pwr: actual power
* ts0: Time stamp s0 
* cs0: s0 meter kWh
* ps0: Power computed s0
* p1: Imported kWh Low tarif
* p2: Imported kWh High tarif
* p0: p1 + p2 total
* n1: Exported kWh Low tarif
* n2: Exported kWh High tarif
* n0: n1 + n2 total
* gas: Gas meter in m3
* gts:
* wtr: Water in m3

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



