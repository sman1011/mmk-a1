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
            name: "Kinderzimmer",
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
                "carpet floor fine",
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
    ]
    
};
