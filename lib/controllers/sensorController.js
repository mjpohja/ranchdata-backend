'use strict';

const Sensor = require('../models/sensor');
const Measurement = require('../models/measurement');

module.exports = {
	registerSensor: function(type, name) {
		return persistence.addSensor(type, name);
	},
	writeMeasurement: function(user, sensorSerial, value) {
		console.log("Writing measurement", user, sensorSerial, value);
		return Sensor.getSensorBySerial(user, sensorSerial)
			.then(sensor => {
				if (sensor !== undefined) {
                    return Measurement.createMeasurement(user, sensor.id, value);
				}
				else {
					return Sensor.createSensor(user, sensorSerial, '', '')
						.then(newSensorId => {
                            return Measurement.createMeasurement(user, newSensorId, value);
						});
				}
			});

    }
};
