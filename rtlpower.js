module.exports = function(RED) {
    "use strict";
    var spawn = require('child_process').spawn;

    function RtlPowerNode(n) {
        RED.nodes.createNode(this, n);
        var node = this;

        node.on('input', function(msg) {
            // Récupération des paramètres à partir du message d'entrée
            var low = msg.low || "default_low_value";
            var high = msg.high || "default_high_value";
            var bw = msg.bw || "default_bw_value";
            var time = msg.time || 10;
            var gain = msg.gain || "default_gain_value";

            var cmd = "rtl_power";
            var args = ["-i", time, "-g", gain, "-f", low + ":" + high + ":" + bw];

            try {
                var child = spawn(cmd, args);
                
                // Le reste du code reste le même
                
            } catch(err) {
                // Gestion des erreurs
            }
        });

        // ... (la gestion des événements 'close', 'stdout', 'stderr' peut rester la même)
    }

    RED.nodes.registerType("rtlpower", RtlPowerNode);
}
