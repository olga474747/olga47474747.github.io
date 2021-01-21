function buildItems()
{
	const names = ['часы', 'картина', 'радио', 'ваза', 'книга', 'компьютер']
	const values = [175, 90, 20, 50, 10, 200]
	const weights = [10, 9, 4, 2, 1, 20]
	const items = []
	for (let i = 0; i < values.length; i++)
	{
		items.push({
			name:names[i],
			value: values[i],
			weight: weights[i],
			//value_on_weight: values[i]/weights[i]
		})
	}
	return items
}
const items = buildItems()

function* genBin(n)
{
	let b = []
	for(let i = 0; i < n; i++)
		b.push(0)
	yield b
	let i = n - 1
	while(true)
	{
		if(i == -1)
		{
			return
		}
		else if( b[i] == 1)
		{
			b[i] = 0
			i -= 1
		}
		else
		{
			b[i] = 1
			i = n - 1
			yield b
		}
	}
}
for(let x of genBin(6))
	console.log(x)


function* genPowerSet(items)
{
	for(let x of genBin(items.length))
	{
		let taken = []
		for (let i = 0; i < x.length; i++)
		{
			if (x[i] == 1) taken.push(items[i])
		}
		yield taken
	}
}


function weightTest(taken, maxWeight)
{
	totalWeight = 0
	for(let t of taken)
	{
		totalWeight += t.weight
		if(totalWeight > maxWeight)
		{
			return false
		}
	}
	return true
}

function* weightFilter(maxWeight, genSet)
{
	for(let taken of genSet)
	{
		if (weightTest(taken, maxWeight))
			yield taken
	}
	return
}

let setF = weightFilter(20, genPowerSet(items))
for(let taken of setF) console.log(taken)


function genSolution(xFGen)
{
	let totalValue = 0
	let taken = []
	for (let x of xFGen)
	{
		if (value(x) > totalValue)
		{
			totalValue = value(x)
			taken = x.slice()
		}
	}
	return {totalValue: totalValue, taken: taken}
}

function value(taken)
{
	let totalValue = 0
	for(let item of taken)
	{
		totalValue += item.value
	}
	return totalValue
}


//не работает!
let  sol = genSolution(setF)
console.log(sol.taken)
console.log(sol.totalValue)


function greedy(items, maxWeight, cmpFunction)
{
	items.sort(cmpFunction)
	items.reverse()
	let totalWeight = 0
	let totalValue = 0
	const taken = []
	for (let i = 0; i < items.length; i++)
	{
		if( totalWeight + items[i].weight <= maxWeight)
		{
			taken.push(items[i].name)
			totalWeight += items[i].weight
			totalValue += items[i].value
		}
	}
	return {totalValue: totalValue, taken: taken}
}

function cmpValue(itemA, itemB)
{
	let r = itemA.value - itemB.value
	return r
}

function cmpWeightInverse(itemA, itemB)
{
	let r = 1/itemA.weight - 1/itemB.weight
	return r
}

function cmpDensity(itemA, itemB)
{
    let r = itemA.value/itemA.weight - itemB.value/itemB.weight
    return r
}

function testGreedy(items, maxWeight, cmpFunction)
{
	const {totalValue, taken} = greedy(items, maxWeight, cmpFunction)
	console.log("Полная цена = ", totalValue)
	console.log("Взяли:", taken)
}

console.log("Сортировка по цене даёт:")
testGreedy(items, 20, cmpValue)
console.log("Сортировка по обратному весу даёт:")
testGreedy(items, 20, cmpWeightInverse)
console.log("Сортировка по удельному весу даёт:")
testGreedy(items, 20, cmpDensity)