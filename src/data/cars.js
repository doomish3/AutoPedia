export const cars = [
  {
    id: "mustang",
    name: "Ford Mustang",
    subtitle: "The American steel horse",
    year: "1964 – Present",
    origin: "United States",
    category: "Muscle Car",
    color: "#C0392B",
    accent: "#E74C3C",
    image: "🐎",
    intro:
      "The Ford Mustang is one of the most iconic automobiles ever built. It created the 'pony car' category and became a symbol of freedom, power, and American culture. Since its debut in 1964, it has been the world's best-selling sports car.",
    history: [
      {
        year: "1964",
        event: "Birth of the Mustang",
        detail:
          "Lee Iacocca unveils the Mustang at the New York World's Fair. Over 22,000 units were sold on the very first day.",
      },
      {
        year: "1968",
        event: "Bullitt — Cinema legend",
        detail:
          "The Mustang Fastback GT390 stars in the legendary chase scene of the film Bullitt, with Steve McQueen behind the wheel.",
      },
      {
        year: "1971",
        event: "The Big Mustang",
        detail:
          "The model grows in size and power, adopting large-displacement V8 engines to meet increasing demand.",
      },
      {
        year: "2015",
        event: "Goes global",
        detail:
          "For the first time, the Mustang is officially sold worldwide, featuring an all-new independent rear suspension.",
      },
      {
        year: "2024",
        event: "Dark Horse — The pinnacle",
        detail:
          "The Dark Horse debuts with 500 hp, the most powerful street Mustang in the model's entire history.",
      },
    ],
    specs: {
      power: "500 hp",
      engine: "V8 5.0L",
      acceleration: "3.9 s",
      topSpeed: "155 mph",
      weight: "3,697 lbs",
      price: "~$58,000",
    },
    components: [
      {
        name: "Coyote V8 Engine",
        icon: "⚙️",
        desc: "5.0-liter displacement, 8 cylinders in a V configuration. Naturally aspirated, no turbo. Its guttural roar is unmistakable.",
      },
      {
        name: "MT82-D4 Transmission",
        icon: "🔧",
        desc: "6-speed synchronized manual gearbox. Delivers precise shifts and keeps the driver connected to the machine.",
      },
      {
        name: "Multilink Suspension",
        icon: "🔩",
        desc: "Fully independent system on all four wheels since 2015. Dramatically improves cornering handling.",
      },
      {
        name: "Brembo 6-Piston Brakes",
        icon: "🛑",
        desc: "6-piston calipers on the front axle. Large vented discs designed for confident, high-performance braking.",
      },
      {
        name: "SYNC 4 Dashboard",
        icon: "🖥️",
        desc: '13.2" touchscreen with Apple CarPlay and Android Auto. Digital instrument cluster measures 12.4".',
      },
      {
        name: "Fastback Body",
        icon: "🚗",
        desc: "2+2 coupe design with a sloped roofline. Drawn directly from the inspiration of classic 1960s models.",
      },
    ],
  },
  {
    id: "ferrari",
    name: "Ferrari 250 GTO",
    subtitle: "The work of art on wheels",
    year: "1962 – 1964",
    origin: "Italy",
    category: "Gran Turismo",
    color: "#8E1010",
    accent: "#C0392B",
    image: "🏎️",
    intro:
      "The Ferrari 250 GTO is considered the most valuable and beautiful automobile ever built. Only 36 units exist in the world. Designed to win at Le Mans and Sebring, one example sold for over $70 million in a private auction.",
    history: [
      {
        year: "1962",
        event: "Debut at Sebring",
        detail:
          "Bizzarrini designs the bodywork alongside Pininfarina. The GTO debuts by winning its class at the 12 Hours of Sebring.",
      },
      {
        year: "1963",
        event: "GT World Champion",
        detail:
          "Ferrari wins the World GT Championship with drivers including Phil Hill and John Surtees at the wheel.",
      },
      {
        year: "1964",
        event: "End of production",
        detail:
          "The final 3 examples are built. The FIA changes homologation rules, forcing the GTO into retirement.",
      },
      {
        year: "2018",
        event: "Historic auction record",
        detail:
          "A 250 GTO sells for $70 million in a private auction — the absolute record for any automobile.",
      },
    ],
    specs: {
      power: "300 hp",
      engine: "V12 3.0L",
      acceleration: "6.1 s",
      topSpeed: "174 mph",
      weight: "1,940 lbs",
      price: "+$70,000,000",
    },
    components: [
      {
        name: "Colombo V12 Engine",
        icon: "⚙️",
        desc: "3.0-liter, 12 cylinders in a 60° V. Six Weber carburetors. Widely regarded as the most elegant engine ever made.",
      },
      {
        name: "5-Speed Gearbox",
        icon: "🔧",
        desc: "Synchronized 5-speed manual transmission with a limited-slip differential (LSD) for optimal traction.",
      },
      {
        name: "Steel Tubular Chassis",
        icon: "🔩",
        desc: "Hand-welded by Maranello craftsmen. Light and rigid — the foundation of its competitive performance.",
      },
      {
        name: "Aluminium Body",
        icon: "✨",
        desc: "Hand-formed over wooden templates. No wind tunnel was used — shaped entirely by Bizzarrini's intuition.",
      },
      {
        name: "Borrani Wire Wheels",
        icon: "🔵",
        desc: "Centre-lock wire-spoke wheels. Iconic of Italian sports cars of the 1960s and a hallmark of the era.",
      },
      {
        name: "4-Wheel Disc Brakes",
        icon: "🛑",
        desc: "A pioneer in using disc brakes on all four wheels in a road-going GT racing car of the period.",
      },
    ],
  },
  {
    id: "beetle",
    name: "Volkswagen Beetle",
    subtitle: "The people's car",
    year: "1938 – 2019",
    origin: "Germany",
    category: "Economy Car",
    color: "#1A5276",
    accent: "#2980B9",
    image: "🪲",
    intro:
      "The Volkswagen Beetle is the most produced car in history with a single design: over 21 million units across 81 years. Conceived as the 'car for the people' and designed by Ferdinand Porsche, it became a symbol of the hippie movement in the 1960s.",
    history: [
      {
        year: "1938",
        event: "The KdF-Wagen project",
        detail:
          "Ferdinand Porsche designs the Volkswagen as an affordable car for everyday German citizens.",
      },
      {
        year: "1945",
        event: "Civilian rebirth",
        detail:
          "After the war, the British take over the Wolfsburg factory and restart mass civilian production.",
      },
      {
        year: "1959",
        event: "Think Small",
        detail:
          "The DDB agency launches the 'Think Small' campaign, widely considered the greatest advertising campaign of the 20th century.",
      },
      {
        year: "1972",
        event: "World production record",
        detail:
          "The Beetle surpasses the Ford Model T as the world's most produced car with a single design.",
      },
      {
        year: "2019",
        event: "The last Beetle",
        detail:
          "The final Beetle rolls off the assembly line in Puebla, Mexico, ending 81 years of history.",
      },
    ],
    specs: {
      power: "25–34 hp",
      engine: "Flat-4 Boxer",
      acceleration: "~25 s",
      topSpeed: "71 mph",
      weight: "1,675 lbs",
      price: "~1,500 DM (1950)",
    },
    components: [
      {
        name: "Rear Boxer Engine",
        icon: "⚙️",
        desc: "4 horizontally opposed cylinders, air-cooled. Mounted at the rear axle. No radiator required.",
      },
      {
        name: "4-Speed Transmission",
        icon: "🔧",
        desc: "Synchronized 4-speed gearbox. Simple, reliable, and serviceable by mechanics anywhere in the world.",
      },
      {
        name: "Monocoque Body",
        icon: "🔩",
        desc: "Unified chassis and body structure. The rounded design provides natural structural rigidity.",
      },
      {
        name: "Torsion Bar Suspension",
        icon: "🌀",
        desc: "Torsion bars on all four wheels. A unique system, inexpensive to manufacture and extraordinarily durable.",
      },
      {
        name: "Organic Aerodynamics",
        icon: "🌬️",
        desc: "The oval shape was not designed in a wind tunnel, yet proved to be highly aerodynamically efficient by intuition.",
      },
      {
        name: "Owner-Serviceable Design",
        icon: "🔨",
        desc: "Built so the owner could repair it themselves. The engine is accessible without any special tools.",
      },
    ],
  },
  {
    id: "mclaren",
    name: "McLaren F1",
    subtitle: "The ultimate hypercar",
    year: "1992 – 1998",
    origin: "United Kingdom",
    category: "Hypercar",
    color: "#1A3A1A",
    accent: "#F39C12",
    image: "⚡",
    intro:
      "The McLaren F1 was the fastest road car in the world for 12 years. Gordon Murray designed it with zero compromises: a central BMW V12 engine, a 24-karat gold-lined engine bay, and a unique central driving position found nowhere else on Earth.",
    history: [
      {
        year: "1988",
        event: "Murray's vision",
        detail:
          "Gordon Murray, after winning the F1 championship with McLaren, begins designing the ultimate road car.",
      },
      {
        year: "1992",
        event: "Unveiled in Monaco",
        detail:
          "The F1 is presented to the public at a price of $1 million. Only 106 units will ever be built.",
      },
      {
        year: "1994",
        event: "Victory at Le Mans",
        detail:
          "A GTR version wins the 24 Hours of Le Mans on its very first attempt — an unprecedented achievement.",
      },
      {
        year: "1998",
        event: "Speed record",
        detail:
          "The F1 sets the record for fastest production car: 240.1 mph (386.4 km/h), unbeaten until 2005.",
      },
    ],
    specs: {
      power: "627 hp",
      engine: "BMW V12 6.1L",
      acceleration: "3.2 s",
      topSpeed: "240 mph",
      weight: "2,509 lbs",
      price: "~$1,000,000",
    },
    components: [
      {
        name: "BMW S70/2 V12 Engine",
        icon: "⚙️",
        desc: "6.1-liter, 12 cylinders in a V. Developed exclusively by BMW Motorsport. Naturally aspirated, no forced induction.",
      },
      {
        name: "Central Driving Seat",
        icon: "🪑",
        desc: "The driver sits at the very centre of the car with one passenger on each side. A completely unique experience.",
      },
      {
        name: "Carbon Fibre Monocoque",
        icon: "🔩",
        desc: "Full carbon fibre chassis — the first ever on a road car, borrowed directly from Formula 1 technology.",
      },
      {
        name: "Gold-Lined Engine Bay",
        icon: "✨",
        desc: "The engine compartment is lined with 25-micron gold foil to reflect extreme heat away from components.",
      },
      {
        name: "Active Diffuser",
        icon: "🌬️",
        desc: "Flat underbody with a rear diffuser generating downforce without visible wings, minimising drag.",
      },
      {
        name: "No Compromises",
        icon: "⚖️",
        desc: "No air conditioning or stereo as standard. Every gram removed was a deliberate engineering decision.",
      },
    ],
  },
];
