var DAG_VERTEX_COUNT = 8
var edges = {
	'0': [{ target: 2, weight: 2 }],
	'1': [{ target: 3, weight: 7 }],
	'2': [{ target: 3, weight: 3 }, { target: 4, weight: 1 }],
	'3': [{ target: 5, weight: 2 }],
	'4': [{ target: 5, weight: 2 }],
	'5': [{ target: 6, weight: 4 }],
	'6': [{ target: 7, weight: 5 }],
	'7': []
}

var inDegree = {}
for(var i = 0; i < DAG_VERTEX_COUNT; i++) {
	inDegree[i] = 0
  for(var j = 0; j < DAG_VERTEX_COUNT; j++) {
		var routes = edges[j + '']
		for(var k = 0; k < routes.length; k++) {
			if(routes[k].target === i) {
				inDegree[i]++
			}
		}
  }
}

var next = []
for(var i = 0; i < DAG_VERTEX_COUNT; i++) {
	if(inDegree[i] === 0) {
  	next.push(i)
  }
}

var linearOrder = []
while(next[0] !== undefined) {
	var index = next.pop()
  linearOrder.push(index)
	for(var i = 0; i < edges[index + ''].length; i++) {
  	var edge = edges[index + '']
		var routeTarget = edge[i].target
		inDegree[routeTarget]--
    if(inDegree[routeTarget] === 0) {
      next.push(routeTarget)
    }
  }
}

console.log(linearOrder)
