const items = buildItems()
console.log("Сортировка по цене дает:")
testGreedy(items, 20, cmpValues)
console.log("Сортировка по обратному весу")
testGreedy(items, 20, cmpWeightInverse )

function testGreedy(items, maxWeight, cmpFunction)
{
	const res = greedy(items, maxWeight, cmpFunction)
    console.log("Полная цена =", res.totalValue)
    console.log("Взяли:", res.taken)
}

function greedy(items, maxWeight, cmpFunction)
{
    items.sort(cmpValues)
    items.reverse()
    let totalValue = 0
    let totalWeight = 0
    const taken = []
    for (let i = 0; i < items.length; i++)
    {
    	if (totalWeight + items[i].weight <= maxWeight)
    	{
    		taken.push(items[i].name)
    		totalWeight += items[i]["weight"]
    		totalValue += items[i].value
    	}
    }
    return { "totalValue": totalValue, "taken": taken}
}

function buildItems()
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
function cmpValues(a, b)
{
	const r = a.value - b.value
	return r
}

function cmpWeightInverse(a, b)
{
	r = 1/a.weight - 1/b.weight
	return r
}

function cmpDensity(a, b)
{

	   let r = a.value/a.weight - b.value/b.weight
       return r
}