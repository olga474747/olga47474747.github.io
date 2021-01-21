const items = boildItems()
let res = genSolution(weightFilter(20, genPowerSet(items)))
console.log(res.totalValue)
console.log(res.taken)


function value(taken)
{
	let totalValue = 0
	for(let item of taken) totalValue += item.value
	return totalValue
}

function genSolution(xF)
{
	let totalValue = 0
	let taken = []
	for (let x of xF)
	{
		if (value(x) > totalValue)
		{
			totalValue = value(x)
			taken = x.slice()
		}
	}
	return {"totalValue": totalValue, "taken":taken}
}
function* weightFilter(maxWeight, genPowerSet)
{
	for (let taken of genPowerSet)
	{
		if (weightTest(taken, maxWeight))
		    yield taken
	}
}

function weightTest(taken, maxWeight)
{
	totalWeight = 0
	for (let t of taken)
	{
		totalWeight += t.weight
		if (totalWeight > maxWeight) return false
	}
	return true
}

function* genPowerSet(items)
{
	for(let x of genBin(items.length))
	{
		let taken = []
		for (let i = 0; i < x.length; i++)
		{
			if(x[i] == 1) taken.push(items[i])
		}
		yield taken
	}
}

function* genBin(n)
{
	let b = []
	for (let i = 0; i < n; i++) b.push(0)
	yield b
	let i = 0
	while(true)
	{
		if (i == n) return
		else if(b[i] == 1)
		{
			b[i] = 0
			i++
		}
		else
		{
			b[i] = 1
			i = 0
			yield b
		}
	}
}


function boildItems()
{
	const names = ['часы', 'картина', 'радио', 'выза', 'книга', 'компьютер']
	const values = [175, 90, 20, 50, 10, 200]
	const weights = [10, 9, 4, 2, 1, 20]
	const items = []
	for (let i = 0; i < values.length; i++)
	{
		items.push({
			name:names[i],
			value: values[i],
			weight: weights[i]
		})

	}
	return items
}
