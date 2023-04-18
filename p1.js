const input = {
    images: {
        redis: {
            image: "ami-234325"
        }
    },
    stages: {
        test: {
            providers: {
                aws: {
                    "us-east-1": {
                        subnetset1: {
                            redis6: {
                                image: 'redis',
                                vm: {
                                    zones: {
                                        a: {
                                            size: 't2.micro',
                                            count: 2 //first one will be the master
                                        },
                                        k: {
                                            size: 't2.micro',
                                            count: 1
                                        },
                                        b: {
                                            size: 't2.micro',
                                            count: 1
                                        }
                                    },
                                },
                                // container: {
                                //     nodes: ""
                                // },
                            }
                        }
                    }
                }
            }
        }
    }
};