var snmp = require("net-snmp");

require("dotenv").config();

var session = snmp.createSession(
  process.env.IP_SW_ADDRESS,
  process.env.PASS_SNMP_SW
);

var oids = ["1.3.6.1.2.1.2.2.1.2.1"];

session.get(oids, function (error, varbinds) {
  if (error) {
    console.error(error);
  } else {
    for (var i = 0; i < varbinds.length; i++) {
      if (snmp.isVarbindError(varbinds[i])) {
        console.error(snmp.varbindError(varbinds[i]));
      } else {
        console.log(varbinds[i].oid + " = " + varbinds[i].value);
      }
    }
  }
  session.close();
});

session.trap(snmp.TrapType.LinkDown, function (error) {
  if (error) {
    console.error(error);
  }
});
