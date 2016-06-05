var DAG_VERTEX_COUNT = 9
//Add a start point "8"
var edges = {
	'0': [{ target: 2, weight: 2 }],
	'1': [{ target: 3, weight: 7 }],
	'2': [{ target: 3, weight: 3 }, { target: 4, weight: 1 }],
	'3': [{ target: 5, weight: 2 }],
	'4': [{ target: 5, weight: 2 }],
	'5': [{ target: 6, weight: 4 }],
	'6': [{ target: 7, weight: 5 }],
	'7': [],
	'8': [{ target: 0, weight: 0}, { target: 1, weight: 0 }],
}
var startPoint = 8

/*
	sort dag topologically
*/
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
	var routes = edges[index + '']
	for(var i = 0; i < routes.length; i++) {
		var routeTarget = routes[i].target
		inDegree[routeTarget]--
    if(inDegree[routeTarget] === 0) {
      next.push(routeTarget)
    }
  }
}

console.log(linearOrder)

/*
	calc shortest path
*/
var pathLength = []
for(var i = 0; i < DAG_VERTEX_COUNT; i++) {
	pathLength[i] = Number.MAX_VALUE
}
pathLength[startPoint] = 0
var preVertex = []


for(var i = 0; i < DAG_VERTEX_COUNT; i++) {
	//The first item of linearOrder will be start point
	var index = linearOrder[i]
	var routes = edges[index + '']
	for(var j = 0; j < routes.length; j++) {
		var routeTarget = routes[j].target
		var routeWeight = routes[j].weight
		//To checker whether this route is better
		if (pathLength[routeTarget] > pathLength[index] + routeWeight) {
			preVertex[routeTarget] = index
			pathLength[routeTarget] = pathLength[index] + routeWeight
		}
	}
}
var pointer = 7
var shortestPath = []
while (pointer !== startPoint) {
	shortestPath.push(pointer)
	pointer = preVertex[pointer]
}

shortestPath.reverse()
console.log(shortestPath)
