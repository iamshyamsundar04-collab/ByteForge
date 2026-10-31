// ============================================================
// data.js  -  shared by all pages
// 1) the equipment list   2) small helpers to save/load bookings
// ============================================================

// Each equipment is a simple object. To add new equipment, copy one block.
const equipmentList = [
  // ---------------- PHYSICS LAB ----------------
  {
    id: "phy-resistor", lab: "Physics", name: "Resistor (10 kΩ Precision)",
    assetId: "PHY-RES-0108", location: "Physics Lab, Block 28", custodian: "Prof. T. Harris",
    description: "A resistor opposes the flow of electric current. It limits current and divides voltage in a circuit, like a speed breaker for electricity.",
    specs: ["Resistance: 10 kΩ", "Tolerance: ±0.01 %", "Power rating: 0.25 W", "Temperature coefficient: ±2 ppm/°C"],
    usage: ["Check the colour code or label for the value.", "Fix the resistor firmly on the breadboard.", "Connect it in series with the circuit.", "Measure voltage or current with a multimeter."],
    safety: ["Never exceed the power rating (0.25 W).", "Do not touch the resistor while the circuit is on - it can get hot.", "Switch off the supply before changing connections."],
    manual: "https://learn.sparkfun.com/tutorials/resistors"
  },
  {
    id: "phy-rheostat", lab: "Physics", name: "Rheostat",
    assetId: "PHY-RHE-0112", location: "Physics Lab, Block 28", custodian: "Prof. T. Harris",
    description: "A variable resistor used to change the current in a circuit smoothly by sliding a contact along a resistance wire.",
    specs: ["Resistance: 0 - 50 Ω", "Current rating: 2 A", "Type: Wire wound, sliding contact"],
    usage: ["Connect one fixed end and the slider terminal in the circuit.", "Start with maximum resistance.", "Slide the contact slowly to change the current."],
    safety: ["Do not exceed the 2 A current rating.", "The body becomes hot - do not touch it.", "Keep it away from water."],
    manual: "https://www.cyberphysics.co.uk/topics/electricity/higher_electricity/potentialDivider.html"
  },
  {
    id: "phy-multimeter", lab: "Physics", name: "Multimeter",
    assetId: "PHY-MUL-0120", location: "Physics Lab, Block 28", custodian: "Dr. R. Singh",
    description: "Measures voltage, current and resistance using one instrument.",
    specs: ["DC voltage: up to 600 V", "DC current: up to 10 A", "Resistance: up to 40 MΩ", "Display: 3½ digit LCD"],
    usage: ["Plug the black probe in COM and the red probe in the correct socket.", "Turn the dial to the quantity you want to measure.", "Touch the probes to the circuit and read the display."],
    safety: ["Never measure resistance in a live circuit.", "Select a higher range first, then reduce it.", "Do not touch the metal tips of the probes."],
    manual: "https://learn.sparkfun.com/tutorials/how-to-use-a-multimeter"
  },
  {
    id: "phy-vernier", lab: "Physics", name: "Vernier Caliper",
    assetId: "PHY-VER-0131", location: "Physics Lab, Block 28", custodian: "Dr. R. Singh",
    description: "A precision tool to measure length, inner diameter and outer diameter of small objects.",
    specs: ["Range: 0 - 150 mm", "Least count: 0.02 mm", "Material: Stainless steel"],
    usage: ["Close the jaws and check the zero error.", "Place the object between the jaws.", "Read the main scale, then add the vernier scale reading."],
    safety: ["Do not apply too much force on the jaws.", "Keep it clean and dry.", "Return it to its box after use."],
    manual: "https://www.labkafe.com/blog/physics-laboratory-equipment-a-complete-list-of-important-equipment-and-their-uses/"
  },
  {
    id: "phy-screwgauge", lab: "Physics", name: "Screw Gauge",
    assetId: "PHY-SCR-0135", location: "Physics Lab, Block 28", custodian: "Dr. R. Singh",
    description: "Measures very small thicknesses such as wire diameter or sheet thickness.",
    specs: ["Range: 0 - 25 mm", "Least count: 0.01 mm", "Ratchet stop: Yes"],
    usage: ["Find the zero error first.", "Place the object between the studs.", "Turn only the ratchet until it clicks.", "Read the pitch scale and circular scale."],
    safety: ["Always use the ratchet, never over-tighten.", "Do not drop the instrument.", "Keep the studs clean."],
    manual: "https://www.labkafe.com/blog/physics-laboratory-equipment-a-complete-list-of-important-equipment-and-their-uses/"
  },
  {
    id: "phy-prism", lab: "Physics", name: "Glass Prism",
    assetId: "PHY-PRI-0140", location: "Physics Lab, Block 28", custodian: "Prof. T. Harris",
    description: "A triangular piece of glass used to study refraction and dispersion of light.",
    specs: ["Prism angle: 60°", "Material: Crown glass", "Refractive index: about 1.52"],
    usage: ["Place the prism on a white paper.", "Draw its outline.", "Pass a ray of light and mark the incident and emergent rays."],
    safety: ["Hold the prism only by its edges.", "Glass can break - handle gently.", "Do not look directly at the light source."],
    manual: "https://www.labkafe.com/blog/physics-laboratory-equipment-a-complete-list-of-important-equipment-and-their-uses/"
  },
  {
    id: "phy-sonometer", lab: "Physics", name: "Sonometer",
    assetId: "PHY-SON-0148", location: "Physics Lab, Block 28", custodian: "Dr. R. Singh",
    description: "Used to study the vibrations of a stretched string and find the frequency of a tuning fork.",
    specs: ["Wire length: 100 cm", "Wooden sound box", "Two movable bridges"],
    usage: ["Fix the wire and hang weights on one end.", "Strike the tuning fork and place it on the box.", "Move the bridge until resonance is heard."],
    safety: ["Do not overload the wire with heavy weights.", "Keep your face away from the wire.", "Use a rubber pad to strike the tuning fork."],
    manual: "https://www.labkafe.com/blog/physics-laboratory-equipment-a-complete-list-of-important-equipment-and-their-uses/"
  },
  {
    id: "phy-meterbridge", lab: "Physics", name: "Meter Bridge",
    assetId: "PHY-MBR-0152", location: "Physics Lab, Block 28", custodian: "Prof. T. Harris",
    description: "Works on the Wheatstone bridge principle to find an unknown resistance.",
    specs: ["Wire length: 100 cm", "Material: Manganin wire", "Includes a jockey and galvanometer"],
    usage: ["Connect the known and unknown resistances in the gaps.", "Touch the jockey on the wire.", "Find the null point (zero deflection) and note its length."],
    safety: ["Do not keep the jockey pressed on the wire for long.", "Use low current only.", "Switch off the key after each reading."],
    manual: "https://www.labkafe.com/blog/physics-laboratory-equipment-a-complete-list-of-important-equipment-and-their-uses/"
  },

  // ---------------- ELECTRONICS LAB ----------------
  {
    id: "ele-oscilloscope", lab: "Electronics", name: "Digital Oscilloscope",
    assetId: "ELE-OSC-0201", location: "Electronics Lab, Block 30", custodian: "Dr. A. Kumar",
    description: "Shows how a voltage signal changes with time as a waveform on the screen.",
    specs: ["Bandwidth: 100 MHz", "Channels: 2", "Sample rate: 1 GSa/s", "Display: 7 inch colour"],
    usage: ["Connect the probe to the channel input.", "Attach the probe ground clip to circuit ground.", "Press AUTO to see the signal.", "Adjust time/div and volts/div."],
    safety: ["Never exceed the maximum input voltage.", "Always connect the ground clip first.", "Do not block the ventilation holes."],
    manual: "https://www.scribd.com/doc/282618512/Laboratories-Equipment-for-Electrical-engineering"
  },
  {
    id: "ele-funcgen", lab: "Electronics", name: "Function Generator",
    assetId: "ELE-FGN-0205", location: "Electronics Lab, Block 30", custodian: "Dr. A. Kumar",
    description: "Produces sine, square and triangular waves of different frequencies for testing circuits.",
    specs: ["Frequency: 1 Hz - 10 MHz", "Waveforms: Sine, Square, Triangle", "Output: 20 Vpp max"],
    usage: ["Select the waveform type.", "Set the frequency and amplitude.", "Connect the output to the circuit using a BNC cable."],
    safety: ["Do not short the output terminals.", "Start with a low amplitude.", "Turn the output off before changing the circuit."],
    manual: "https://www.scribd.com/doc/282618512/Laboratories-Equipment-for-Electrical-engineering"
  },
  {
    id: "ele-psu", lab: "Electronics", name: "DC Power Supply",
    assetId: "ELE-PSU-0210", location: "Electronics Lab, Block 30", custodian: "Prof. S. Mehta",
    description: "Gives a steady, adjustable DC voltage and current to power electronic circuits.",
    specs: ["Output: 0 - 30 V", "Current: 0 - 5 A", "Display: Digital voltmeter and ammeter"],
    usage: ["Set the voltage knob to zero.", "Connect the output leads to the circuit.", "Switch on and slowly increase the voltage."],
    safety: ["Check polarity (+ / -) before switching on.", "Set the current limit first.", "Switch off before touching the circuit."],
    manual: "https://www.scribd.com/doc/282618512/Laboratories-Equipment-for-Electrical-engineering"
  },
  {
    id: "ele-breadboard", lab: "Electronics", name: "Breadboard Kit",
    assetId: "ELE-BRD-0214", location: "Electronics Lab, Block 30", custodian: "Prof. S. Mehta",
    description: "A solderless board for building and testing circuits quickly.",
    specs: ["830 tie points", "Includes jumper wires", "Supports 22 AWG wire"],
    usage: ["Place the components in the holes.", "Join them using jumper wires.", "Connect power rails to the supply."],
    safety: ["Do not force thick wires into the holes.", "Check connections before powering on.", "Keep liquids away."],
    manual: "https://www.scribd.com/doc/282618512/Laboratories-Equipment-for-Electrical-engineering"
  },
  {
    id: "ele-logic", lab: "Electronics", name: "Logic Analyzer",
    assetId: "ELE-LOG-0219", location: "Electronics Lab, Block 30", custodian: "Dr. A. Kumar",
    description: "Captures and displays many digital signals at once, useful for debugging digital circuits.",
    specs: ["Channels: 16", "Sample rate: 100 MHz", "Interface: USB"],
    usage: ["Connect the probes to the digital signals.", "Connect the ground wire.", "Start capture from the software."],
    safety: ["Do not apply more than 5 V to the inputs.", "Always connect ground first.", "Use an anti-static mat if available."],
    manual: "https://www.scribd.com/doc/282618512/Laboratories-Equipment-for-Electrical-engineering"
  },
  {
    id: "ele-solder", lab: "Electronics", name: "Soldering Station",
    assetId: "ELE-SOL-0223", location: "Electronics Lab, Block 30", custodian: "Prof. S. Mehta",
    description: "A temperature-controlled iron used to join components to a circuit board.",
    specs: ["Power: 60 W", "Temperature: 200 - 480 °C", "Digital temperature display"],
    usage: ["Switch on and set the temperature to about 350 °C.", "Heat the pad and the lead together.", "Touch the solder wire to the joint, then remove."],
    safety: ["The tip is extremely hot - use the stand.", "Work in a ventilated area.", "Wear safety glasses and wash your hands afterwards."],
    manual: "https://www.scribd.com/doc/282618512/Laboratories-Equipment-for-Electrical-engineering"
  },

  // ---------------- MECHANICAL LAB ----------------
  {
    id: "mec-utm", lab: "Mechanical", name: "Universal Testing Machine",
    assetId: "MEC-UTM-0301", location: "Mechanical Workshop, Block 12", custodian: "Dr. P. Verma",
    description: "Tests the tensile and compressive strength of materials by pulling or pressing a sample until it breaks.",
    specs: ["Capacity: 400 kN", "Test types: Tension, Compression, Bending", "Computer controlled"],
    usage: ["Fix the specimen in the grips.", "Enter specimen dimensions in the software.", "Start the test and record the load vs elongation."],
    safety: ["Wear safety glasses and keep the guard closed.", "Stay behind the yellow line during the test.", "Only trained students may operate the machine."],
    manual: "https://www.iitk.ac.in/che/PG_research_lab/pdf/sop/SOP_UTM.doc.pdf"
  },
  {
    id: "mec-micrometer", lab: "Mechanical", name: "Outside Micrometer",
    assetId: "MEC-MIC-0305", location: "Mechanical Workshop, Block 12", custodian: "Dr. P. Verma",
    description: "A precise tool for measuring the outside diameter or thickness of machine parts.",
    specs: ["Range: 0 - 25 mm", "Least count: 0.01 mm", "Ratchet stop"],
    usage: ["Clean the anvil and spindle.", "Place the part and turn the ratchet.", "Read the sleeve and thimble scales."],
    safety: ["Do not over-tighten.", "Never measure a moving part.", "Store in its case."],
    manual: "https://assets.testequity.com/te1/Documents/pdf/mitutoyo/Mitutoyo_Series-103-Outside-Micrometers_DataSheet_0925.pdf"
  },
  {
    id: "mec-hardness", lab: "Mechanical", name: "Rockwell Hardness Tester",
    assetId: "MEC-HRD-0309", location: "Mechanical Workshop, Block 12", custodian: "Prof. K. Rao",
    description: "Finds how hard a metal is by pressing a small indenter into it.",
    specs: ["Scales: A, B, C", "Test force: 60 / 100 / 150 kgf", "Digital display"],
    usage: ["Place the clean specimen on the anvil.", "Raise it until it touches the indenter.", "Apply the load and read the hardness number."],
    safety: ["Keep fingers away from the anvil during testing.", "Do not test curved or rough surfaces.", "Use correct load for the material."],
    manual: "https://lattice.mse.ufl.edu/wp-content/uploads/sites/272/2020/06/SOP-Rockwell-Hardness.pdf"
  },
  {
    id: "mec-lathe", lab: "Mechanical", name: "Centre Lathe",
    assetId: "MEC-LTH-0314", location: "Mechanical Workshop, Block 12", custodian: "Prof. K. Rao",
    description: "A machine that rotates a workpiece while a cutting tool shapes it into a cylinder, thread or taper.",
    specs: ["Swing over bed: 300 mm", "Spindle speed: 50 - 2000 rpm", "Motor: 2 HP"],
    usage: ["Fix the job in the chuck.", "Set the speed and tool position.", "Take light cuts and check the size often."],
    safety: ["Wear safety glasses and tie back long hair.", "No loose clothing, rings or gloves.", "Never remove chips by hand."],
    manual: "https://www.me.ucr.edu/media/131/download"
  },
  {
    id: "mec-tachometer", lab: "Mechanical", name: "Digital Tachometer",
    assetId: "MEC-TAC-0318", location: "Mechanical Workshop, Block 12", custodian: "Dr. P. Verma",
    description: "Measures the rotation speed (rpm) of shafts and motors without touching them.",
    specs: ["Range: 2.5 - 99999 rpm", "Non-contact laser type", "Accuracy: ±0.05 %"],
    usage: ["Stick a reflective tape on the rotating part.", "Point the laser beam at the tape.", "Read the rpm on the display."],
    safety: ["Do not point the laser at eyes.", "Keep a safe distance from the rotating part.", "Do not use on very hot surfaces."],
    manual: "https://manualmachine.com/generaltools/lt2234c/1592040-user-manual"
  },
  {
    id: "mec-dial", lab: "Mechanical", name: "Dial Gauge",
    assetId: "MEC-DIA-0322", location: "Mechanical Workshop, Block 12", custodian: "Prof. K. Rao",
    description: "Checks small differences in height or alignment, such as shaft run-out.",
    specs: ["Range: 0 - 10 mm", "Least count: 0.01 mm", "Dial diameter: 58 mm"],
    usage: ["Fix the gauge on a magnetic stand.", "Touch the plunger on the surface.", "Zero the dial and note the deflection."],
    safety: ["Do not drop the gauge.", "Do not push the plunger sideways.", "Keep it away from oil and dust."],
    manual: "https://manuals.plus/mitutoyo/99mag014a1-dial-indicator-manual"
  },

  // ---------------- IoT LAB ----------------
  {
    id: "iot-arduino", lab: "IoT", name: "Arduino Uno R3",
    assetId: "IOT-ARD-0401", location: "IoT Lab, Block 34", custodian: "Dr. N. Gupta",
    description: "A beginner-friendly microcontroller board to read sensors and control LEDs, motors and more.",
    specs: ["Chip: ATmega328P", "Digital pins: 14", "Analog pins: 6", "Operating voltage: 5 V"],
    usage: ["Connect the board to the PC with a USB cable.", "Open Arduino IDE and select the board and port.", "Write the code and press Upload."],
    safety: ["Do not connect more than 5 V to the pins.", "Disconnect power before changing wires.", "Avoid touching the board's pins with wet hands."],
    manual: "https://docs.arduino.cc/hardware/uno-rev3"
  },
  {
    id: "iot-rpi", lab: "IoT", name: "Raspberry Pi 4",
    assetId: "IOT-RPI-0405", location: "IoT Lab, Block 34", custodian: "Dr. N. Gupta",
    description: "A small computer that runs Linux, used for IoT gateways, cameras and servers.",
    specs: ["CPU: Quad-core 1.5 GHz", "RAM: 4 GB", "Wi-Fi and Bluetooth", "40 GPIO pins"],
    usage: ["Insert the SD card with the OS.", "Connect keyboard, mouse and monitor.", "Power on with a 5 V 3 A adapter."],
    safety: ["Shut down properly before removing power.", "Use only the recommended adapter.", "GPIO pins work on 3.3 V only."],
    manual: "https://pip-assets.raspberrypi.com/categories/545-raspberry-pi-4-model-b/documents/RP-008344-DS-2-raspberry-pi-4-product-brief.pdf"
  },
  {
    id: "iot-esp32", lab: "IoT", name: "ESP32 Dev Board",
    assetId: "IOT-ESP-0409", location: "IoT Lab, Block 34", custodian: "Prof. M. Joshi",
    description: "A low-cost microcontroller with built-in Wi-Fi and Bluetooth for connected projects.",
    specs: ["CPU: Dual-core 240 MHz", "Wi-Fi + Bluetooth", "Logic level: 3.3 V", "34 GPIO pins"],
    usage: ["Install the ESP32 board package in Arduino IDE.", "Select the ESP32 board and port.", "Upload the code and open the Serial Monitor."],
    safety: ["Pins are NOT 5 V tolerant.", "Do not power from two sources together.", "Handle the board by its edges."],
    manual: "https://www.espressif.com/sites/default/files/documentation/esp32_datasheet_en.pdf"
  },
  {
    id: "iot-dht11", lab: "IoT", name: "DHT11 Temperature & Humidity Sensor",
    assetId: "IOT-DHT-0413", location: "IoT Lab, Block 34", custodian: "Prof. M. Joshi",
    description: "A low-cost digital sensor that measures air temperature and humidity.",
    specs: ["Temperature: 0 - 50 °C (±2 °C)", "Humidity: 20 - 90 % (±5 %)", "Supply: 3.3 - 5 V"],
    usage: ["Connect VCC, GND and DATA pins.", "Add the DHT library to the code.", "Read the values every 2 seconds or more."],
    safety: ["Check pin order before powering.", "Do not read faster than once every 2 seconds.", "Keep it away from water."],
    manual: "https://akizukidenshi.com/goodsaffix/DHT11_20180119.pdf"
  },
  {
    id: "iot-ultrasonic", lab: "IoT", name: "Ultrasonic Sensor HC-SR04",
    assetId: "IOT-ULT-0417", location: "IoT Lab, Block 34", custodian: "Prof. M. Joshi",
    description: "Measures distance to an object using sound waves.",
    specs: ["Range: 2 cm - 400 cm", "Accuracy: 3 mm", "Supply: 5 V"],
    usage: ["Connect VCC, GND, TRIG and ECHO.", "Send a 10 µs pulse on TRIG.", "Measure the ECHO time and convert it to distance."],
    safety: ["Use 5 V only.", "Do not touch the sensor faces.", "Keep it dry."],
    manual: "https://cdn.sparkfun.com/datasheets/Sensors/Proximity/HCSR04.pdf"
  },
  {
    id: "iot-relay", lab: "IoT", name: "Relay Module (4 Channel)",
    assetId: "IOT-REL-0421", location: "IoT Lab, Block 34", custodian: "Dr. N. Gupta",
    description: "An electrically operated switch that lets a microcontroller turn bigger loads such as lamps and fans on or off.",
    specs: ["Channels: 4", "Coil voltage: 5 V", "Contact rating: 10 A at 250 V AC"],
    usage: ["Connect the signal pins to the microcontroller.", "Connect the load through the relay terminals.", "Send HIGH or LOW to switch the relay."],
    safety: ["Mains voltage is dangerous - only use low voltage in the lab.", "Switch off power before wiring.", "Never touch the terminals when powered."],
    manual: "https://components101.com/switches/5v-four-channel-relay-module-pinout-features-applications-working-datasheet"
  }
];

// The four 2-hour slots available every day
const timeSlots = ["09:00 - 11:00", "11:00 - 13:00", "14:00 - 16:00", "16:00 - 18:00"];

// ---------- helper functions for bookings (saved in the browser) ----------
function getBookings() {
  const saved = localStorage.getItem("labBookings");   // text or null
  return saved ? JSON.parse(saved) : [];               // convert text -> array
}

function saveBookings(list) {
  localStorage.setItem("labBookings", JSON.stringify(list));  // array -> text
}

// find one equipment by its id
function findEquipment(id) {
  return equipmentList.find(function (item) { return item.id === id; });
}
