'use strict';
const jsxl = require('jsxl')
//
//	
//
const providers = {
	aws: {
		identifier: /^[a-z_][a-z_0-9]+$/,
		regions: {
			// "ap-south-2": [ 'a', 'b', 'c'],
			// "us-east-1":  [ 'a', 'b', 'c', 'k'],
			// "eu-west-1":  [ 'a', 'b', 'c'],
			'ap-south-2': {
				a: ['t2.micro', 't2.small', 't2.medium'],
				b: ['t2.micro', 't2.small', 't2.medium'],
				c: ['t2.micro', 't2.small'],
				k: ['t2.micro', 't2.small']
			},
			'us-east-1': {
				a: ['t2.micro', 't2.small', 't2.medium'],
				b: ['t2.micro', 't2.small', 't2.medium'],
				c: ['t2.micro', 't2.small'],
				k: ['t2.micro', 't2.small']
			},
			'eu-west-2': {
				a: ['t2.micro', 't2.small', 't2.medium'],
				b: ['t2.micro', 't2.small', 't2.medium'],
				c: ['t2.micro', 't2.small'],
				k: ['t2.micro', 't2.small']
			}
		}
	}
};

const providerReference = (context, key, next) => {
	if (key in providers) return next();
	next(`is an invalid provider reference (${key})`);
};

const regionReference = (context, key, next) => {
	if (key in providers[context.context.context.key].regions) return next();
	next(`is an invalid ${context.context.context.key} region reference (${key})`);
};

const zoneReference = (context, key, next) => {
	if (key in providers[context.context.context.context.context.context.context.context.key].regions[context.context.context.context.context.context.context.key]) return next();
	next(`is an invalid zone reference (${key})`);
};

const subnetName = (context, key, next) => {
	if (key.match(providers[context.context.context.context.key].identifier)) return next();
	next(`is an invalid ${context.context.context.context.key} subnet name (${key})`);
};

const imageReference = (context, image, next) => {
	if (image in context.root.source[context.root.key].images) return next();
	next(`is an invalid image reference (${image})`);
};

const imageName = (context, key, next) => {
	if (key.match(providers[context.context.context.context.context.key].identifier)) return next();
	next(`is an invalid image name (${key})`);
};

const imageId = (context, id, next) => {    
	next();
};

const sizeReference = (context, size, next) => {
	if (providers[context.context.context.context.context.context.context.context.key].regions[context.context.context.context.context.context.context.key][context.context.key].includes(size)) return next();
	next(`is an invalid size reference (${size})`);
};

const vmOrContainer = (context, image, next) => {
    switch ((image.vm ? 1 : 0) + (image.container ? 1 : 0)) {
        case 0: return next('must contain either vm or container');
        case 1: return next();
        case 2: return next('cannot contain both vm and container');    
    }
};

const filter = {
	images: {
		$: { // images
			ingress: { $optional: true, $type: {
				
			}},
			image:  { $type: String, $transform: imageId },
			access: { $optional: true, $type: [{ $any: [ String, RegExp ] } ]},
			egress: { $optional: true, $type: {
				
			}},
		}
	},
	stages: {
		$: {
			preconditions: { $optional: true, $type: [
				null
			]},
			providers: {
				$: { // provider references
					$key: { $type: String, $transform: providerReference },
					$type: {
						$: { // region references
							$key: { $type: String, $transform: regionReference},
							$type: {
								$: { // subnet sets
									$key: { $type: String, $transform: subnetName },
									$type: {
										$: {// image name
											$key: { $type: String, $transform: imageName }, 
											$type: {
												image: { $type: String, $transform: imageReference },
												vm: {$optional: true, $type: {
													// size: {$type: String, $transform: sizeReference},
													zones: { //o zone name
                                                        $: {
                                                            $key: {$type: String, $transform: zoneReference},
                                                            $type: {
                                                                size: {$type: String, $transform: sizeReference},
                                                                count: Number
                                                            }
                                                        }
                                                    },	
                                                }
                                            },
												// container: {$optional: true, $type: {
													
												// }}	 
											},
											$transform: vmOrContainer
										}
									}
								}
							}
						}
					}
				},
			},
			tests: { $optional: true, $type: [
				null
			]},
			postconditions: { $optional: true, $type: [
				null
			]}
		}
	}
};

var cache;

module.exports = function(next) { 
	(next => {
		if (cache) return next(null, cache);
		jsxl.compile(filter, next);
	})((err, filter) => {
		if (err) return next(err);
		next(null, cache = filter);
	});
};