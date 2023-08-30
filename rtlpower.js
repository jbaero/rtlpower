module.exports = function(RED) {
    "use strict";
    var spawn = require('child_process').spawn;

    function RtlPowerNode(n) {
        RED.nodes.createNode(this, n);
        var node = this;

        node.on('input', function(msg) {
            var low = msg.payload.low || "default_low_value";
            var high = msg.payload.high || "default_high_value";
            var bw = msg.payload.bw || "default_bw_value";
            var time = msg.payload.time || 10;
            var gain = msg.payload.gain || "default_gain_value";

            var cmd = "rtl_power";
            var args = ["-i", time, "-g", gain, "-f", low + ":" + high + ":" + bw];

            try {
                var child = spawn(cmd, args);

                child.stdout.on('data', function (data) {
                    // Même logique que dans le code original pour gérer la sortie standard
                });

                child.stderr.on('data', function (data) {
                    // Même logique que dans le code original pour gérer les erreurs
                });

                child.on('close', function (code, signal) {
                    // Même logique que dans le code original pour gérer la fermeture du processus
                });

                child.on('error', function (err) {
                    // Même logique que dans le code original pour gérer les erreurs
                });

            } catch(err) {
                // Gestion des erreurs, par exemple :
                node.error(err);
                node.status({fill:"red",shape:"ring",text:"error"});
            }
        });

        node.on("close", function(done) {
            if (node.child != null) {
                var tout = setTimeout(function() {
                    node.child.kill("SIGKILL");
                    done();
                }, 3000);
                node.child.on('exit', function() {
                    if (tout) { clearTimeout(tout); }
                    done();
                });
                if (RED.settings.verbose) { node.log("rtl_power stopped"); }
            } else { 
                setTimeout(function() { done(); }, 100); 
            }
            node.status({});
        });
    }

    RED.nodes.registerType("rtlpower", RtlPowerNode);
};
