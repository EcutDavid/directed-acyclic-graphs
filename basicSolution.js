var DAG_VERTEX_COUNT = 8
var edges = {
	'0': [2],
	'1': [3],
	'2': [3, 4],
	'3': [5],
	'4': [5],
	'5': [6],
	'6': [7],
	'7': []  
}

var inDegree = {}
for(var i = 0; i < DAG_VERTEX_COUNT; i++) {
	inDegree[i] = 0
  for(var j = 0; j < DAG_VERTEX_COUNT; j++) {
  	if(edges[j + ''].indexOf(i) !== -1) {
    	inDegree[i]++
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
		inDegree[edge[i]]--
    if(inDegree[edge[i]] === 0) {
      next.push(edge[i])
    }
  }
}

console.log(linearOrder)

