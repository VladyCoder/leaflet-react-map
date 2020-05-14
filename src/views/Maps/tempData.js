export var data = {
    "map_elem": [
        {
            id: "0001",
            name: "Blue Car",
            type: "moving_elem",
            icon: {icon: "fa fa-car", color: 'blue'},
            status: 'enabled',
            cord: '50.073658, 14.418540',
            prop: {
                is_moving: true,
                tags: ['is_car', 'is_beatiful', 'has_wheels']
            },
            data: {
                '1': {cord: '32.434343, 43.043043', timestamp: 2342342444},
                '2': {cord: '32.434343, 43.043043', timestamp: 2342342444},
                '3': {cord: '32.434343, 43.043043', timestamp: 2342342444},
                '4': {cord: '32.434343, 43.043043', timestamp: 2342342444},
                '5': {cord: '32.434343, 43.043043', timestamp: 2342342444},
                '6': {cord: '32.434343, 43.043043', timestamp: 2342342444}
            }
        },
        {
            id: "0002",
            name: "Red Car",
            type: "moving_elem",
            icon: {icon: "fa fa-car", color: 'red'},
            status: 'enabled',
            cord: '49.7580791,13.3540124',
            prop: {
                is_moving: true,
                tags: ['is_car', 'is_beatiful', 'has_wheels']
            },
            data: {
                '1': {cord: '32.434343, 43.043043', timestamp: 2342342444},
                '2': {cord: '32.434343, 43.043043', timestamp: 2342342444},
                '3': {cord: '32.434343, 43.043043', timestamp: 2342342444},
                '4': {cord: '32.434343, 43.043043', timestamp: 2342342444},
                '5': {cord: '32.434343, 43.043043', timestamp: 2342342444},
                '6': {cord: '32.434343, 43.043043', timestamp: 2342342444}
            }
        },
        
        ////////// heat 
        {
            id: "0003",
            name: "High Temperature",
            type: "fixed_elem",
            icon: {icon: "fa fa-thermometer-empty", color: 'red'},
            status: 'enabled',
            cord: '49.9578316,15.8388234',
            severity: 'critical',
            prop: {
                is_moving: true,
                tags: ['is_sensor', 'is_small', 'fast_sensor']
            }
        },
        {
            id: "0004",
            name: "Low Temperature",
            type: "fixed_elem",
            icon: {icon: "fa fa-thermometer-empty", color: 'green'},
            status: 'enabled',
            cord: '50.7704562,15.0586805',
            severity: 'critical',
            prop: {
                is_moving: true,
                tags: ['is_sensor', 'is_small', 'fast_sensor']
            }
        }
    ]
}