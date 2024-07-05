var snmp = require("net-snmp");

require("dotenv").config();

var session = snmp.createSession(
  process.env.IP_SW_ADDRESS,
  process.env.PASS_SNMP_SW
);

var oid = "1.3.6.1.2.1.2.2.1.2";

function doneCb(error) {
  if (error) console.error(error.toString());
}

function feedCb(varbinds) {
  for (var i = 0; i < varbinds.length; i++) {
    if (snmp.isVarbindError(varbinds[i]))
      console.error(snmp.varbindError(varbinds[i]));
    else console.log(varbinds[i].oid + "|" + varbinds[i].value);
  }
}

var maxRepetitions = 20;

// The maxRepetitions argument is optional, and will be ignored unless using
// SNMP verison 2c
session.subtree(oid, maxRepetitions, feedCb, doneCb);
