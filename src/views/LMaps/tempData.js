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
            data: [
                {cord: '50.073658, 14.418540', timestamp: 2342342444},
                {cord: '50.173658, 14.518540', timestamp: 2342342444},
                {cord: '50.273658, 14.618540', timestamp: 2342342444},
                {cord: '50.373658, 14.718540', timestamp: 2342342444},
                {cord: '50.473658, 14.818540', timestamp: 2342342444},
                {cord: '50.573658, 14.918540', timestamp: 2342342444},
                {cord: '50.673658, 14.918540', timestamp: 2342342444},
                {cord: '50.773658, 14.818540', timestamp: 2342342444}
            ]
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
            data: [
                {cord: '32.434343, 43.043043', timestamp: 2342342444},
                {cord: '32.434343, 43.043043', timestamp: 2342342444},
                {cord: '32.434343, 43.043043', timestamp: 2342342444},
                {cord: '32.434343, 43.043043', timestamp: 2342342444},
                {cord: '32.434343, 43.043043', timestamp: 2342342444},
                {cord: '32.434343, 43.043043', timestamp: 2342342444}
            ]
        },
        {
            id: "0003",
            name: "Small Car 1",
            type: "moving_elem",
            icon: {icon: "fa fa-car", color: '#dd18ff'},
            status: 'enabled',
            cord: '46.9547232,7.3598507',
            prop: {
                is_moving: true,
                tags: ['is_car', 'is_beatiful', 'has_wheels']
            },
            data: [
                {cord: '32.434343, 43.043043', timestamp: 2342342444},
                {cord: '32.434343, 43.043043', timestamp: 2342342444},
                {cord: '32.434343, 43.043043', timestamp: 2342342444},
                {cord: '32.434343, 43.043043', timestamp: 2342342444},
                {cord: '32.434343, 43.043043', timestamp: 2342342444},
                {cord: '32.434343, 43.043043', timestamp: 2342342444}
            ]
        },
        {
            id: "0004",
            name: "Small Car 2",
            type: "moving_elem",
            icon: {icon: "fa fa-car", color: '#028fff'},
            status: 'enabled',
            cord: '47.5546492,7.5594406',
            prop: {
                is_moving: true,
                tags: ['is_car', 'is_beatiful', 'has_wheels']
            },
            data: [
                {cord: '32.434343, 43.043043', timestamp: 2342342444},
                {cord: '32.434343, 43.043043', timestamp: 2342342444},
                {cord: '32.434343, 43.043043', timestamp: 2342342444},
                {cord: '32.434343, 43.043043', timestamp: 2342342444},
                {cord: '32.434343, 43.043043', timestamp: 2342342444},
                {cord: '32.434343, 43.043043', timestamp: 2342342444}
            ]
        },
        {
            id: "0005",
            name: "Small Car 3",
            type: "moving_elem",
            icon: {icon: "fa fa-car", color: '#ff9902'},
            status: 'enabled',
            cord: '46.5285767,6.5824555',
            prop: {
                is_moving: true,
                tags: ['is_car', 'is_beatiful', 'has_wheels']
            },
            data: [
                {cord: '32.434343, 43.043043', timestamp: 2342342444},
                {cord: '32.434343, 43.043043', timestamp: 2342342444},
                {cord: '32.434343, 43.043043', timestamp: 2342342444},
                {cord: '32.434343, 43.043043', timestamp: 2342342444},
                {cord: '32.434343, 43.043043', timestamp: 2342342444},
                {cord: '32.434343, 43.043043', timestamp: 2342342444}
            ]
        },
        {
            id: "0006",
            name: "Small Car 4",
            type: "moving_elem",
            icon: {icon: "fa fa-car", color: '#2dda34'},
            status: 'enabled',
            cord: '46.0295228,8.9216256',
            prop: {
                is_moving: true,
                tags: ['is_car', 'is_beatiful', 'has_wheels']
            },
            data: [
                {cord: '32.434343, 43.043043', timestamp: 2342342444},
                {cord: '32.434343, 43.043043', timestamp: 2342342444},
                {cord: '32.434343, 43.043043', timestamp: 2342342444},
                {cord: '32.434343, 43.043043', timestamp: 2342342444},
                {cord: '32.434343, 43.043043', timestamp: 2342342444},
                {cord: '32.434343, 43.043043', timestamp: 2342342444}
            ]
        },
        
        ////////// heat 
        {
            id: "0101",
            name: "Temperature 1",
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
            id: "0102",
            name: "Temperature 2",
            type: "fixed_elem",
            icon: {icon: "fa fa-thermometer-empty", color: 'green'},
            status: 'enabled',
            cord: '50.7704562,15.0586805',
            severity: 'critical',
            prop: {
                is_moving: true,
                tags: ['is_sensor', 'is_small', 'fast_sensor']
            }
        },
        {
            id: "0103",
            name: "Temperature 3",
            type: "fixed_elem",
            icon: {icon: "fa fa-thermometer-empty", color: '#f9e10e'},
            status: 'enabled',
            cord: '46.109581,8.270543',
            severity: 'critical',
            prop: {
                is_moving: true,
                tags: ['is_sensor', 'is_small', 'fast_sensor']
            }
        },
        {
            id: "0104",
            name: "Temperature 4",
            type: "fixed_elem",
            icon: {icon: "fa fa-thermometer-empty", color: 'green'},
            status: 'enabled',
            cord: '47.3775499,8.4666756',
            severity: 'critical',
            prop: {
                is_moving: true,
                tags: ['is_sensor', 'is_small', 'fast_sensor']
            }
        },
        {
            id: "0105",
            name: "Temperature 5",
            type: "fixed_elem",
            icon: {icon: "fa fa-thermometer-empty", color: '#e4145b'},
            status: 'enabled',
            cord: '46.7650062,9.7738806',
            severity: 'critical',
            prop: {
                is_moving: true,
                tags: ['is_sensor', 'is_small', 'fast_sensor']
            }
        }
    ]
}