export { mockData };

let mockData = {
    
    floors: [ 
        {
            id: 0,
            name: "2. OG"
        }, 
        {
            id: 1,
            name: "1. OG"
        }, 
        {
            id: 2,
            name: "EG"
        }, 
        {
            id: 3,
            name: "Garten"
        }
    ],

    rooms: [
        {
            id: 0,
            name: "Schlafzimmer",
            floor: 1
        },
        {
            id: 1,
            name: "Kinderzimmer 1",
            floor: 1
        },
        {
            id: 2,
            name: "Küche",
            floor: 2
        },
        {
            id: 3,
            name: "Wohnzimmer",
            floor: 2
        },
        {
            id: 4,
            name: "Gästezimmer",
            floor: 2
        },
        {
            id: 5,
            name: "Kinderzimmer 2",
            floor: 1
        },
        {
            id: 6,
            name: "Wohnzimmer",
            floor: 0
        },
        {
            id: 7,
            name: "Küche",
            floor: 0
        },
        {
            id: 8,
            name: "Kinderzimmer",
            floor: 0
        },
        {
            id: 9,
            name: "Bad",
            floor: 0
        },
        {
            id: 10,
            name: "Bad",
            floor: 1
        },
        {
            id: 11,
            name: "Gästebad",
            floor: 2
        },
        {
            id: 12,
            name: "Garten",
            floor: 3
        }
    ],
    
    robots: [
        {
            id: 0,
            name: "Robie Robot",
            floor: 2,
            vendor: "iRobot",
            model: "Roomba 9000",
            availableModes: [
                "parquet floor",
                "carpet floor coarse",
                "carpet floor fine"
            ],
            currentMode: "parquet floor"
        },
        {
            id: 1,
            name: "Määh",
            floor: 3,
            vendor: "Kärcher",
            model: "RLM 4000",
            availableModes: [
                "lawn low cut",
                "lawn medium cut",
                "lawn high cut",
                "sports field"
            ],
            currentMode: "lawn medium cut"
        },
        {
            id: 2,
            name: "Meddie Robot",
            floor: 1,
            vendor: "Medion Saugroboter",
            model: "Medion 18500",
            availableModes: [
                "parquet floor",
                "carpet floor coarse",
                "carpet floor fine"
            ],
            currentMode: "parquet floor"
        },
        {
            id: 3,
            name: "Rocky Wisch",
            floor: 0,
            vendor: "Roborock S5 Saugroboter mit Wischfunktion",
            model: "Roborock S5",
            availableModes: [
                "parquet floor",
                "laminate floor",
                "carpet floor coarse",
                "carpet floor fine"
            ],
            currentMode: "parquet floor"
        },
        {
            id: 4,
            name: "Braava Wisch",
            floor: 2,
            vendor: "iRobot Wischroboter Braava",
            model: "m6138",
            availableModes: [
                "parquet floor",
                "tile floor",
                "laminate floor"
            ],
            currentMode: "parquet floor"
        },
        {
            id: 5,
            name: "Xi",
            floor: 0,
            vendor: "roborock Xiaowa E20 Saugroboter",
            model: "Xiaowa E20",
            availableModes: [
                "parquet floor",
                "tile floor",
                "laminate floor"
            ],
            currentMode: "parquet floor"
        },
        {
            id: 6,
            name: "Meddie Wisch",
            floor: 1,
            vendor: "MEDION® Wischroboter MD 18379",
            model: "MD 18379",
            availableModes: [
                "parquet floor",
                "tile floor",
                "laminate floor"
            ],
            currentMode: "parquet floor"
        }

    ]
    
};
