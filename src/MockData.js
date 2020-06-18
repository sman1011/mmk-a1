export { mockData };

let mockData = {
    
    floors: [ 
        {
            id: 0,
            name: "2nd Floor"
        }, 
        {
            id: 1,
            name: "1st Floor"
        }, 
        {
            id: 2,
            name: "Ground Floor"
        }, 
        {
            id: 3,
            name: "Garden"
        }
    ],

    rooms: [
        {
            id: 0,
            name: "Bedroom",
            floor: 1
        },
        {
            id: 1,
            name: "Kids room 1",
            floor: 1
        },
        {
            id: 2,
            name: "Kitchen",
            floor: 2
        },
        {
            id: 3,
            name: "Living room",
            floor: 2
        },
        {
            id: 4,
            name: "Guest room",
            floor: 2
        },
        {
            id: 5,
            name: "Kids room 2",
            floor: 1
        },
        {
            id: 6,
            name: "Living Room",
            floor: 0
        },
        {
            id: 7,
            name: "Kitchen",
            floor: 0
        },
        {
            id: 8,
            name: "Kids Room",
            floor: 0
        },
        {
            id: 9,
            name: "Bathroom",
            floor: 0
        },
        {
            id: 10,
            name: "Bathroom",
            floor: 1
        },
        {
            id: 11,
            name: "Guest bathroom",
            floor: 2
        },
        {
            id: 12,
            name: "Garden",
            floor: 3
        },
	{
	    id: 13,
            name: "lawn",
            floor: 3
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
                "carpet floor fine"
            ],
            currentMode: "parquet floor"
        },
        {
            id: 1,
            name: "Mowww",
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
            name: "Rocky Wipe",
            floor: 0,
            vendor: "Roborock S5 vacuum robot with wipe function",
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
            name: "Braava Wipe",
            floor: 2,
            vendor: "iRobot Wiping Robot Braava",
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
            vendor: "roborock Xiaowa E20 vacuum robot",
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
            name: "Meddie Wipe",
            floor: 1,
            vendor: "MEDION® wiping robot MD 18379",
            model: "MD 18379",
            availableModes: [
                "parquet floor",
                "tile floor",
                "laminate floor"
            ],
            currentMode: "parquet floor"
        }

    ],

    dates: [
        {
            id: 0,
            name: "Cleaning Kitchen",
	        startDate: "2020-06-14",
	        repeat: "daily",
            robot: 0,
            room: 2,
            begin: "12:00",
            end: "13:00",
            color: "red",
        },
        {
            id: 1,
            name: "mowing",
	        startDate: "2020-06-14",
	        endDate: "2020-11-01",
	        repeat: "weekly",
            robot: 1,
            room: 4,
            begin: "10:00",
            end: "11:00",
            color: "green",
        },
    ],
};
