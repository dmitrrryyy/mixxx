//
// Native Instruments Traktor Kontrol Z1 HID controller script for Mixxx 2.4
// Based on Traktor Kontrol S2 MK3 script by Michael Schmidt
// Author: djantti
//

var KontrolZ1 = new function() {
    this.controller = new HIDController();

    // Modifier state
    this.modePressed = false;

    // VuMeter
    this.vuLeftConnection = {};
    this.vuRightConnection = {};
    this.vuMeterThresholds = {"vu-30": (1 / 7), "vu-15": (2 / 7), "vu-6": (3 / 7), "vu-3": (4 / 7), "vu0": (5 / 7), "vu3": (6 / 7), "vu6": (7 / 7)};
};

KontrolZ1.init = function(_id) {
    KontrolZ1.id = _id;
    KontrolZ1.registerInputPackets();
    KontrolZ1.registerOutputPackets();
    print(KontrolZ1.id + " initialized");
};

KontrolZ1.registerInputPackets = function() {
    const message = new HIDPacket("message", 0x1, this.messageCallback);

    // Mode button
    this.registerInputButton(message, "[Controls]", "!mode", 0x1D, 0x2, this.modeHandler);

    // Headphone buttons
    this.registerInputButton(message, "[Channel1]", "!pfl", 0x1D, 0x10, this.headphoneHandler);
    this.registerInputButton(message, "[Channel2]", "!pfl", 0x1D, 0x1, this.headphoneHandler);

    // FX buttons
    this.registerInputButton(message, "[Channel1]", "!fx", 0x1D, 0x4, this.fxHandler);
    this.registerInputButton(message, "[Channel2]", "!fx", 0x1D, 0x8, this.fxHandler);

    // EQ knobs
    this.registerInputScaler(message, "[EqualizerRack1_[Channel1]_Effect1]", "parameter3", 0x3, 0xFFFF, this.parameterHandler);
    this.registerInputScaler(message, "[EqualizerRack1_[Channel1]_Effect1]", "parameter2", 0x5, 0xFFFF, this.parameterHandler);
    this.registerInputScaler(message, "[EqualizerRack1_[Channel1]_Effect1]", "parameter1", 0x7, 0xFFFF, this.parameterHandler);
    this.registerInputScaler(message, "[EqualizerRack1_[Channel2]_Effect1]", "parameter3", 0xD, 0xFFFF, this.parameterHandler);
    this.registerInputScaler(message, "[EqualizerRack1_[Channel2]_Effect1]", "parameter2", 0xF, 0xFFFF, this.parameterHandler);
    this.registerInputScaler(message, "[EqualizerRack1_[Channel2]_Effect1]", "parameter1", 0x11, 0xFFFF, this.parameterHandler);

    // FX knobs
    this.registerInputScaler(message, "[QuickEffectRack1_[Channel1]]", "super1", 0x9, 0xFFFF, this.parameterHandler);
    this.registerInputScaler(message, "[QuickEffectRack1_[Channel2]]", "super1", 0x13, 0xFFFF, this.parameterHandler);

    // Gain knobs
    this.registerInputScaler(message, "[Channel1]", "pregain", 0x1, 0xFFFF, this.parameterHandler);
    this.registerInputScaler(message, "[Channel2]", "pregain", 0xB, 0xFFFF, this.parameterHandler);

    // Headphone mix
    this.registerInputScaler(message, "[Master]", "headMix", 0x15, 0xFFFF, this.parameterHandler);

    // Volume faders
    this.registerInputScaler(message, "[Channel1]", "volume", 0x17, 0xFFFF, this.parameterHandler);
    this.registerInputScaler(message, "[Channel2]", "volume", 0x19, 0xFFFF, this.parameterHandler);

    // Crossfader
    this.registerInputScaler(message, "[Master]", "crossfader", 0x1B, 0xFFFF, this.parameterHandler);

    this.controller.registerInputPacket(message);

    // Soft takeover for all knobs and faders
    engine.softTakeover("[EqualizerRack1_[Channel1]_Effect1]", "parameter3", true);
    engine.softTakeover("[EqualizerRack1_[Channel1]_Effect1]", "parameter2", true);
    engine.softTakeover("[EqualizerRack1_[Channel1]_Effect1]", "parameter1", true);

    engine.softTakeover("[EqualizerRack1_[Channel2]_Effect1]", "parameter3", true);
    engine.softTakeover("[EqualizerRack1_[Channel2]_Effect1]", "parameter2", true);
    engine.softTakeover("[EqualizerRack1_[Channel2]_Effect1]", "parameter1", true);

    engine.softTakeover("[QuickEffectRack1_[Channel1]]", "super1", true);
    engine.softTakeover("[QuickEffectRack1_[Channel2]]", "super1", true);

    engine.softTakeover("[Channel1]", "pregain", true);
    engine.softTakeover("[Channel2]", "pregain", true);

    engine.softTakeover("[Master]", "headMix", true);

    engine.softTakeover("[Channel1]", "volume", true);
    engine.softTakeover("[Channel2]", "volume", true);

    engine.softTakeover("[Master]", "crossfader", true);
};

KontrolZ1.registerInputButton = function(message, group, name, offset, bitmask, callback) {
    message.addControl(group, name, offset, "B", bitmask);
    message.setCallback(group, name, callback);
};

KontrolZ1.registerInputScaler = function(message, group, name, offset, bitmask, callback) {
    message.addControl(group, name, offset, "H", bitmask);
    message.setCallback(group, name, callback);
};

KontrolZ1.registerOutputPackets = function() {
    const output = new HIDPacket("output", 0x80);

    output.addOutput("[Controls]", "mode", 0x13, "B");

    output.addOutput("[Channel1]", "pfl", 0xF, "B");
    output.addOutput("[Channel2]", "pfl", 0x10, "B");

    output.addOutput("[Channel1]", "play_indicator", 0x11, "B");
    output.addOutput("[Channel2]", "play_indicator", 0x14, "B");

    output.addOutput("[QuickEffectRack1_[Channel1]]", "enabled", 0x12, "B");
    output.addOutput("[QuickEffectRack1_[Channel2]]", "enabled", 0x15, "B");

    output.addOutput("[Channel1]", "vu-30", 0x1, "B");
    output.addOutput("[Channel1]", "vu-15", 0x2, "B");
    output.addOutput("[Channel1]", "vu-6", 0x3, "B");
    output.addOutput("[Channel1]", "vu-3", 0x4, "B");
    output.addOutput("[Channel1]", "vu0", 0x5, "B");
    output.addOutput("[Channel1]", "vu3", 0x6, "B");
    output.addOutput("[Channel1]", "vu6", 0x7, "B");

    output.addOutput("[Channel2]", "vu-30", 0x8, "B");
    output.addOutput("[Channel2]", "vu-15", 0x9, "B");
    output.addOutput("[Channel2]", "vu-6", 0xA, "B");
    output.addOutput("[Channel2]", "vu-3", 0xB, "B");
    output.addOutput("[Channel2]", "vu0", 0xC, "B");
    output.addOutput("[Channel2]", "vu3", 0xD, "B");
    output.addOutput("[Channel2]", "vu6", 0xE, "B");

    this.controller.registerOutputPacket(output);

    engine.makeConnection("[QuickEffectRack1_[Channel1]]", "enabled", this.outputHandler);
    engine.makeConnection("[QuickEffectRack1_[Channel2]]", "enabled", this.outputHandler);

    engine.makeConnection("[Channel1]", "pfl", this.outputHandler);
    engine.makeConnection("[Channel2]", "pfl", this.outputHandler);

    this.vuLeftConnection = engine.makeUnbufferedConnection("[Channel1]", "vu_meter", this.vuMeterHandler);
    this.vuRightConnection = engine.makeUnbufferedConnection("[Channel2]", "vu_meter", this.vuMeterHandler);

    KontrolZ1.lightDeck(false);
}

KontrolZ1.modeHandler = function(field) {
    KontrolZ1.modePressed = field.value;
    KontrolZ1.outputHandler(field.value, field.group, "mode");
};

KontrolZ1.headphoneHandler = function(field) {
    if (field.value === 0) {
        return;
    }
    // Go to cue and stop when modifier is active
    if (KontrolZ1.modePressed) {
        engine.setValue(field.group, "cue_gotoandstop", field.value);
    } else {
        script.toggleControl(field.group, "pfl");
    }
};

KontrolZ1.fxHandler = function(field) {
    if (field.value === 0) {
        // Always clear play indicator on button release
        KontrolZ1.controller.setOutput(field.group, "play_indicator", 0x0, true);
        return;
    }
    // Control playback when modifier is active
    if (KontrolZ1.modePressed) {
        // Match play indicator (red led) brightness to fx indicator (blue led)
        current = engine.getValue("[QuickEffectRack1_" + field.group + "]", "enabled") ? 0x7F : 0xA;
        KontrolZ1.controller.setOutput(field.group, "play_indicator", current, true);
        script.toggleControl(field.group, "play");
    } else {
        script.toggleControl("[QuickEffectRack1_" + field.group + "]", "enabled");
    }
};

KontrolZ1.vuMeterHandler = function(value, group, _key) {
    const vuKeys = Object.keys(KontrolZ1.vuMeterThresholds);
    for (let i = 0; i < vuKeys.length; ++i) {
        // Avoid spamming HID by only sending last LED update
        const last = i === (vuKeys.length - 1);
        if (KontrolZ1.vuMeterThresholds[vuKeys[i]] > value) {
            KontrolZ1.controller.setOutput(group, vuKeys[i], 0x00, last);
        } else {
            KontrolZ1.controller.setOutput(group, vuKeys[i], 0x7E, last);
        }
    }
};

KontrolZ1.parameterHandler = function(field) {
    engine.setParameter(field.group, field.name, field.value / 4095);
}

KontrolZ1.outputHandler = function(value, group, key) {
    if (value === 0 || value === false) {
        // Off value (dimmed)
        ledValue = 0xA;
    } else if (value === 1 || value === true) {
        // On value
        ledValue = 0x7F;
    }
    KontrolZ1.controller.setOutput(group, key, ledValue, true);
};

KontrolZ1.lightDeck = function(switchOff) {
    let softLight = 0xA;
    let fullLight = 0x7F;

    if (switchOff) {
        softLight = 0x00;
        fullLight = 0x00;
    }

    KontrolZ1.controller.setOutput("[Controls]", "mode", softLight, true);

    current = engine.getValue("[QuickEffectRack1_[Channel1]]", "enabled") ? fullLight : softLight;
    KontrolZ1.controller.setOutput("[QuickEffectRack1_[Channel1]]", "enabled", current, true);
    current = engine.getValue("[QuickEffectRack1_[Channel2]]", "enabled") ? fullLight : softLight;
    KontrolZ1.controller.setOutput("[QuickEffectRack1_[Channel2]]", "enabled", current, true);

    current = engine.getValue("[Channel1]", "pfl") ? fullLight : softLight;
    KontrolZ1.controller.setOutput("[Channel1]", "pfl", current, true);
    current = engine.getValue("[Channel2]", "pfl") ? fullLight : softLight;
    KontrolZ1.controller.setOutput("[Channel2]", "pfl", current, true);
}

KontrolZ1.messageCallback = function(packet, data) {
    for (const name in data) {
        if (Object.hasOwnProperty.call(data, name)) {
            KontrolZ1.controller.processButton(data[name]);
        }
    }
}

KontrolZ1.shutdown = function() {
    // Deactivate all LEDs
    KontrolZ1.lightDeck(true);
    print(KontrolZ1.id + " shut down");
};

KontrolZ1.incomingData = function(data, length) {
    KontrolZ1.controller.parsePacket(data, length);
};
